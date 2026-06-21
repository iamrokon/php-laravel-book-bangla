# মডিউল ৯: ডেটাবেজ সিডিং ও মাল্টিপল কানেকশন (Database Seeding & Multi-DB Connections)

লারাভেলে প্রজেক্টের ডেভেলপমেন্টের সময় ডামি বা রিয়েল লাইফ ইনিশিয়াল ডেটা স্বয়ংক্রিয়ভাবে ডেটাবেজে ইনসার্ট করতে আমরা **Seeder** ব্যবহার করি। এই চ্যাপ্টারে আমরা শিখব কীভাবে এক্সটার্নাল ডেটা সোর্স (যেমন JSON ফাইল) থেকে ডেটা নিয়ে সিডিং করতে হয় এবং একটি প্রজেক্টে কীভাবে মাল্টিপল ডেটাবেজ কানেকশন কনফিগার ও ব্যবহার করতে হয়।

---

## ১. এক্সটার্নাল ডেটা সোর্স থেকে সিডিং (Seeding from External Data Source)

অনেক সময় আমাদের এমন কিছু রিয়েল-ওয়ার্ল্ড ডেটা (যেমন: সব দেশের নাম, বিভাগ, জেলা ইত্যাদি) ডেটাবেজে ইনসার্ট করতে হয় যা ডামি বা ফেক হতে পারবে না। এই ধরনের ডেটার জন্য আমরা সরাসরি কোনো JSON ফাইল বা API থেকে ডেটা রিড করে সিড করতে পারি।

ধরা যাক, আমরা একটি JSON ফাইল থেকে বিভিন্ন দেশের তথ্য রিড করে `countries` টেবিলে ইনসার্ট করব।

### ক. মাইগ্রেশন ফাইল তৈরি করা (`create_countries_table.php`):
প্রথমে আমরা `countries` টেবিল তৈরির জন্য মাইগ্রেশন ফাইল প্রস্তুত করব:

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('code', 2); // যেমন: BD, US
            $table->string('name');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('countries');
    }
};
```

### খ. সিডার ফাইলে JSON ডেটা রিড করে ইনসার্ট করা:
আমরা `ProductSeeder` অথবা একটি নতুন `CountrySeeder` ক্লাসের `run()` ফাংশনের ভেতর JSON ফাইল রিড করার কোড বসিয়ে দেব।

```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;
use Illuminate\Support\Facades\File;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        // JSON ফাইল থেকে ডেটা রিড করা
        $json = File::get(database_path('data/countries.json'));
        $countries = json_decode($json, true);

        // ডেটাবেজে ইনসার্ট করা
        foreach ($countries as $country) {
            Country::create([
                'code' => $country['code'],
                'name' => $country['name'],
            ]);
        }
    }
}
```

### গ. `DatabaseSeeder` থেকে কল করা:
এরপর তৈরি করা সিডার ক্লাসটি আমরা প্রধান `DatabaseSeeder` এর `run()` মেথড থেকে কল করব:

```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            ProductSeeder::class,
            CountrySeeder::class,
        ]);
    }
}
```

### ঘ. সিডার রান করার কমান্ডসমূহ:
- **শুধুমাত্র একটি নির্দিষ্ট Seeder ক্লাস রান করতে কমান্ড:**
  ```bash
  php artisan db:seed --class=ProductSeeder
  ```
  অথবা `CountrySeeder`-এর জন্য:
  ```bash
  php artisan db:seed --class=CountrySeeder
  ```
- **সব সিডার একসাথে রান করতে কমান্ড:**
  ```bash
  php artisan db:seed
  ```

---

## ২. মাল্টিপল ডেটাবেজ কানেকশন (Multiple Database Connection)

লারাভেলে ডিফল্ট কানেকশনের বাইরেও আমরা চাইলে একই প্রজেক্টে একাধিক ভিন্ন ভিন্ন ডেটাবেজ ব্যবহার করতে পারি।

### ক. `config/database.php` ফাইলে কনফিগারেশন সেট করা:
এর জন্য আমরা আমাদের প্রজেক্টের `config/database.php` ফাইলের `connections` অ্যারের ভেতর নতুন আরেকটি ডেটাবেজের কনফিগারেশন সেট করব।

```php
use Illuminate\Support\Str;

return [

    'default' => env('DB_CONNECTION', 'mysql'),

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DATABASE_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

        'mysql' => [
            'driver' => 'mysql',
            // ডিফল্ট কানেকশন সেটিংস...
        ],

        // নতুন আরেকটি ডেটাবেজ কানেকশন যুক্ত করা
        'another_db' => [
            'driver' => 'mysql',
            'url' => env('ANOTHER_DATABASE_URL'),
            'host' => env('ANOTHER_DB_HOST', '127.0.0.1'),
            'port' => env('ANOTHER_DB_PORT', '3306'),
            'database' => env('ANOTHER_DB_DATABASE', 'forge'),
            'username' => env('ANOTHER_DB_USERNAME', 'forge'),
            'password' => env('ANOTHER_DB_PASSWORD', ''),
            'unix_socket' => env('ANOTHER_DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
        ],

    ],

];
```

### খ. `.env` ফাইলে এনভায়রনমেন্ট ভেরিয়েবল সেট করা:
আমাদের নতুন কানেকশনের জন্য `.env` ফাইলে ডেটাবেজ ক্রেডেনশিয়াল নিচের মতো করে ডিফাইন করে দেব:

```ini
ANOTHER_DB_CONNECTION=mysql
ANOTHER_DB_HOST=127.0.0.1
ANOTHER_DB_PORT=3306
ANOTHER_DB_DATABASE=another_db_name
ANOTHER_DB_USERNAME=root
ANOTHER_DB_PASSWORD=
```

---

## ৩. ভিন্ন কানেকশন থেকে ডেটা ফেচ ও স্কিমা তৈরি করা

লারাভেলে নতুন সেট করা দ্বিতীয় ডেটাবেজ থেকে ডেটা কুয়েরি করতে বা টেবিল তৈরি করতে আমাদের `connection()` মেথডের মাধ্যমে কানেকশনের নাম বলে দিতে হয়।

### ক. কোয়েরি বিল্ডারে অন্য ডেটাবেজ ব্যবহার করা:
ডিফল্ট কানেকশনের বদলে অন্য কানেকশন থেকে ডেটা আনতে `DB::connection('connection_name')` ব্যবহার করা হয়:

```php
use Illuminate\Support\Facades\DB;

// 'another_db' কানেকশনের countries টেবিল থেকে ডেটা নিয়ে আসা
$countries = DB::connection('another_db')->table('countries')->get();
```

### খ. মাইগ্রেশনে অন্য কানেকশন ব্যবহার করে টেবিল তৈরি করা:
যদি কোনো নির্দিষ্ট টেবিল অন্য কোনো ডেটাবেজে তৈরি করতে চান, তবে স্কিমা বিল্ডারে কানেকশনটি উল্লেখ করে দিতে হবে:

```php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;

Schema::connection('another_db')->create('comments', function (Blueprint $table) {
    $table->id();
    $table->string('username', 100);
    $table->text('body');
    $table->timestamps();
});
```

### গ. সিডারে অন্য কানেকশনে ডেটা ইনসার্ট করা:
```php
use Illuminate\Support\Facades\DB;

DB::connection('another_db')->table('comments')->insert([
    'username' => fake()->userName(),
    'body' => fake()->paragraph(),
    'created_at' => now(),
    'updated_at' => now(),
]);
```

### ঘ. ইলোকুয়েন্ট মডেলে (Eloquent Model) ভিন্ন কানেকশন ডিফাইন করা:
মডেল ক্লাসের ভেতর প্রোপার্টি হিসেবে কানেকশনের নাম ডিফাইন করে দিলে ঐ মডেলটি সবসময় ওই নির্দিষ্ট ডেটাবেজের সাথেই যোগাযোগ করবে:

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    // এই মডেলটি ডিফল্ট কানেকশনের বদলে 'another_db' কানেকশন ব্যবহার করবে
    protected $connection = 'another_db';
}
```

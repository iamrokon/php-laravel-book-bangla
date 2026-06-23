# মডিউল ৯: ডেটাবেজ সিডিং ও মাল্টিপল কানেকশন (Database Seeding & Multi-DB Connections)

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** লারাভেলে ডেটাবেজ সিডিং (Database Seeding) কী এবং মাল্টিপল ডেটাবেজ কানেকশন কীভাবে সেটআপ ও ব্যবহার করা হয় উদাহরণসহ লিখ।

লারাভেলে প্রজেক্ট ডেভেলপমেন্ট বা টেস্টিংয়ের সময় ডামি ডেটা (যেমন: ফেক ইউজার, প্রোডাক্ট বা পোস্ট) স্বয়ংক্রিয়ভাবে ডেটাবেজে ইনসার্ট করতে আমরা **Seeder** ব্যবহার করি। এর ফলে ম্যানুয়ালি ফর্ম ফিলাপ করে ডেটা ইনপুট করার প্রয়োজন হয় না। এই চ্যাপ্টারে আমরা ডেটাবেজ সিডিং, ফেকার (Faker) লাইব্রেরির ব্যবহার, এক্সটার্নাল JSON ডেটা সোর্স থেকে সিডিং এবং একাধিক ডাটাবেজ কানেকশন ব্যবহার করা শিখবো।

---

## ১. ডেটাবেজ সিডিং (Database Seeding Insights)

লারাভেল প্রজেক্টে সিডার ফাইলগুলো সাধারণত `database/seeders/` ডিরেক্টরিতে থাকে। প্রজেক্টের প্রধান সিডার ফাইলটি হলো `DatabaseSeeder.php`।

### ক. ডেমো প্রোডাক্ট টেবিল তৈরি করা:
প্রথমে আমরা প্রোডাক্টের জন্য একটি মাইগ্রেশন ফাইল তৈরি করে নেব:
```php
// create_products_table.php
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('seller_name');
            $table->text('description');
            $table->float('price');
            $table->boolean('available')->default(true);
            $table->timestamps();
        });
    }
};
```
মাইগ্রেশন ফাইল তৈরি শেষে `php artisan migrate` রান করবো।

### খ. লুপ এবং DB Facade দিয়ে বেসিক সিডিং:
সিডারে আমরা সাধারণ ইলোকুয়েন্ট (Eloquent) মডেল অথবা সরাসরি `DB` ফ্যাসাড (Facade) ব্যবহার করে ডেটা ইনসার্ট করতে পারি। 

**`DatabaseSeeder.php`**-এর `run()` মেথডে নিচের মতো একটি লুপ চালিয়ে আমরা ১০০টি ডামি প্রোডাক্ট তৈরি করতে পারি:
```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        for ($i = 0; $i < 100; $i++) {
            DB::table('products')->insert([
                'name' => Str::random(10),
                'seller_name' => Str::random(10),
                'description' => Str::random(100),
                'price' => random_int(10, 1000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
```
এরপর `php artisan db:seed` কমান্ডটি চালালে ডেটাবেজে ১০০টি ডামি প্রোডাক্ট ইনসার্ট হয়ে যাবে।

---

## ২. ফেকার লাইব্রেরি ব্যবহার (Realistic Data with Faker)

উপরের পদ্ধতিতে ডেটাগুলো হিজিবিজি (যেমন `Str::random`) তৈরি হয়। বাস্তবসম্মত ডেটা (যেমন আসল নাম, অ্যাড্রেস, প্যারাগ্রাফ ইত্যাদি) তৈরি করার জন্য লারাভেলে বিল্ট-ইন **Faker Library** যুক্ত রয়েছে। 

### ক. সিডারে Faker ব্যবহার করা:
বাস্তবসম্মত প্রোডাক্ট ডেটা তৈরি করতে আমরা সিডারে এভাবে `Faker` ব্যবহার করতে পারি:
```php
use Faker\Factory;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Factory::create();

        for ($i = 0; $i < 100; $i++) {
            DB::table('products')->insert([
                'name' => $faker->word(),
                'seller_name' => $faker->name(),
                'description' => $faker->realText(200),
                'price' => random_int(10, 1000),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
```

### খ. সিডার ফাইল আলাদা করা:
সব কোড `DatabaseSeeder.php` ফাইলে না রেখে আমরা প্রতিটি টেবিলের জন্য আলাদা Seeder ক্লাস তৈরি করে নিতে পারি:
```bash
php artisan make:seeder ProductSeeder
```
এটি `database/seeders/ProductSeeder.php` ফাইল তৈরি করবে। আমরা প্রোডাক্ট ইনসার্ট করার কোডটি এই ফাইলের `run()` মেথডে নিয়ে নেব।

### গ. `DatabaseSeeder` থেকে অন্যান্য Seeder কল করা:
আলাদা করা সিডার ক্লাসগুলো আমরা প্রধান `DatabaseSeeder.php` ফাইলের `run()` মেথড থেকে এভাবে কল করতে পারি:
```php
public function run(): void
{
    $this->call([
        ProductSeeder::class,
        // CountrySeeder::class, (অন্যান্য সিডার...)
    ]);
}
```

### ঘ. সিডিং কমান্ডসমূহ:
- **মাইগ্রেশন একদম নতুন করে রান করে সাথে সিডিং করতে (খুবই কাজের কমান্ড):**
  ```bash
  php artisan migrate:fresh --seed
  ```
- **শুধুমাত্র একটি নির্দিষ্ট Seeder ক্লাস রান করতে:**
  ```bash
  php artisan db:seed --class=ProductSeeder
  ```

---

## ৩. এক্সটার্নাল ডেটা সোর্স থেকে সিডিং (Seeding from External Data Source)

অনেক সময় আমাদের এমন কিছু কনস্ট্যান্ট রিয়েল-ওয়ার্ল্ড ডেটা (যেমন: দেশের তালিকা, বিভাগের তালিকা ইত্যাদি) ডেটাবেজে ইনসার্ট করতে হয় যা ডামি হতে পারবে না। এই ধরনের ডেটার জন্য আমরা কোনো JSON ফাইল থেকে ডেটা রিড করে ইনসার্ট করতে পারি।

ধরা যাক, আমরা একটি JSON ফাইল থেকে বিভিন্ন দেশের তথ্য রিড করে `countries` টেবিলে ইনসার্ট করবো।

### ক. দেশের মাইগ্রেশন ফাইল:
```php
Schema::create('countries', function (Blueprint $table) {
    $table->id();
    $table->string('code', 2); // যেমন: AF, BD, US
    $table->string('name');
    $table->timestamps();
});
```

### খ. JSON ফাইল প্রস্তুত করা (`database/data/countries.json`):
```json
{
    "AF" : "Afghanistan",
    "AX" : "Aland Island",
    "AL" : "Albania",
    "DZ" : "Algeria",
    "AS" : "American Samoa",
    "AD" : "Andorra",
    "AO" : "Angola",
    "AI" : "Anguilla"
}
```

### গ. `CountrySeeder.php` ফাইলে JSON ডেটা রিড ও ইনসার্ট করা:
```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountrySeeder extends Seeder
{
    public function run(): void
    {
        // JSON ফাইল থেকে ডেটা রিড করা
        $jsonPath = database_path('data/countries.json');
        $jsonString = file_get_contents($jsonPath);
        $countries = json_decode($jsonString, true);

        // ডেটাবেজে লুপের মাধ্যমে ইনসার্ট
        foreach ($countries as $code => $name) {
            DB::table('countries')->insert([
                'code' => $code,
                'name' => $name,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
```
এরপর `php artisan db:seed --class=CountrySeeder` রান করলে সব দেশের তালিকা ডাটাবেজে লোড হয়ে যাবে।

---

## ৪. মাল্টিপল ডেটাবেজ কানেকশন (Multiple Database Connection)

লারাভেলে ডিফল্ট কানেকশনের বাইরেও আমরা চাইলে একই প্রজেক্টে একাধিক ভিন্ন ভিন্ন ডেটাবেজ ব্যবহার করতে পারি।

### ক. `config/database.php` ফাইলে কনফিগারেশন সেট করা:
এর জন্য আমরা আমাদের প্রজেক্টের `config/database.php` ফাইলের `connections` অ্যারের ভেতর নতুন আরেকটি ডেটাবেজের কনফিগারেশন সেট করবো।

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
            'url' => env('ANOTHER_DB_DATABASE_URL'),
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

### খ. `.env` ফাইলে ক্রেডেনশিয়াল সেট করা:
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

## ৫. ভিন্ন কানেকশন থেকে ডেটা ফেচ ও স্কিমা তৈরি করা

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

---

> [!NOTE]
> **বাজারের নমুনা ডেটা (Sample Database Grocery Data):**
> প্রজেক্ট টেস্টিংয়ের সময় আমরা ইনভেন্টরি টেবিলে নমুনা ডেটা হিসেবে নিচের জিনিসগুলো ব্যবহার করতে পারি:
> - বুই (Bui) - ১৪৫টি - ওজন: ২০০kg
> - মুকোল (Mukol) - ১০২টি - ওজন: ১২৭kg
> - চিনাবাদাম (Peanut) - ৬ পিস - ওজন: ১৭kg
> - মটর (Peas) - ওজন: ১৮kg
> - তেলাপিয়া (Tilapia) - ওজন: ৫kg

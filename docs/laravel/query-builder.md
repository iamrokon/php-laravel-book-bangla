# মডিউল ৯: ডেটাবেজ কুয়েরি বিল্ডার (Database Query Builder)

লারাভেলের **Database Query Builder** আপনাকে ডেটাবেজ কুয়েরি তৈরি এবং রান করার জন্য একটি সুবিধাজনক ও ফ্লুয়েন্ট (Fluent) ইন্টারফেস প্রদান করে। এটি পিএইচপির PDO প্যারামিটার বাইন্ডিং ব্যবহার করে তৈরি করা হয়েছে, যা আপনার অ্যাপ্লিকেশনকে SQL Injection অ্যাটাক থেকে সুরক্ষিত রাখে। 

এই চ্যাপ্টারে আমরা ডেটাবেজ কুয়েরি বিল্ডারের সাহায্যে CRUD অপারেশন, টেবিল জয়েন, টিংকার ব্যবহার, র কুয়েরি (Raw SQL) দেখা এবং পারফরম্যান্স বেঞ্চমার্ক করা শিখব।

---

## ১. ডেমো স্কিমা ও ফ্যাক্টরি প্রস্তুত করা (Setting up Schema & Factories)

কুয়েরি বিল্ডারের কাজগুলো প্র্যাক্টিক্যালি দেখার জন্য প্রথমে আমরা কিছু ডেমো টেবিল, ফ্যাক্টরি এবং সিডার তৈরি ও মডিফাই করে নেব।

### ক. `users` টেবিল মাইগ্রেশন:
```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('country')->default('Bangladesh');
    $table->boolean('is_admin')->default(false);
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});
```

### খ. `UserFactory.php` ফাইল কনফিগারেশন:
```php
public function definition(): array
{
    return [
        'name' => fake()->name(),
        'email' => fake()->unique()->safeEmail(),
        'country' => fake()->country(),
        'is_admin' => fake()->boolean(),
        'email_verified_at' => now(),
        'password' => bcrypt('password'), // ডিফল্ট পাসওয়ার্ড
        'remember_token' => Str::random(10),
    ];
}
```

### গ. `posts` টেবিল মাইগ্রেশন (`create_posts_table.php`):
ইউজারদের সাথে রিলেশন দেখানোর জন্য আমরা একটি `posts` টেবিল তৈরি করব:
```php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    $table->string('title');
    $table->text('body');
    $table->timestamps();
});
```

### ঘ. `PostFactory.php` ফাইল কনফিগারেশন:
```php
public function definition(): array
{
    return [
        'title' => fake()->realText(30),
        'body' => fake()->realText(150),
    ];
}
```

### ঙ. `DatabaseSeeder.php` থেকে ফেক ডেটা জেনারেট করা:
লারাভেল ফ্যাক্টরি ব্যবহার করে আমরা ১০ জন ইউজার এবং প্রত্যেকের জন্য ৩টি করে পোস্ট তৈরি করব:
```php
use App\Models\User;

User::factory(10)->hasPosts(3)->create();
```
*(দ্রষ্টব্য: SQLite নিয়ে ভিজ্যুয়াল কাজ করতে চাইলে ভিএস কোডে **SQLite Explorer** এক্সটেনশনটি ব্যবহার করতে পারেন।)*

---

## ২. বেসিক ডেটা রিড ও ফাইন্ড অপারেশন (Basic Read Operations)

রাউট বা কন্ট্রোলারে কুয়েরি বিল্ডার ব্যবহার করতে উপরে অবশ্যই `use Illuminate\Support\Facades\DB;` ফাসাদটি ইম্পোর্ট করে নিতে হবে।

`routes/web.php` ফাইলে কিছু সাধারণ কুয়েরি উদাহরণ নিচে দেওয়া হলো:

```php
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

Route::get('/users', function () {
    // ১. ডেটাবেজ থেকে সকল ইউজারের নির্দিষ্ট কলামের ডেটা গেট করা
    $users = DB::table('users')->select(['name', 'email', 'country'])->get();
    
    // ২. আইডি (ID) অনুযায়ী সরাসরি নির্দিষ্ট কোনো ইউজারকে খুঁজে বের করা
    $user = DB::table('users')->find(10); // getFind() বলে কিছু নেই, সঠিক মেথড হলো find()
    
    // ৩. নির্দিষ্ট আইডি-এর ইউজারের নির্দিষ্ট কিছু কলাম সিলেক্ট করা
    $userColumns = DB::table('users')->find(10, ['name', 'email']);

    return response()->json([
        'all_users' => $users,
        'single_user' => $user,
        'user_columns' => $userColumns
    ]);
});
```

---

## ৩. আর্টিসান টিংকার দিয়ে কুয়েরি রান করা (Database Operations using Tinker)

টার্মিনাল থেকে সরাসরি ডেটাবেজ কুয়েরি টেস্ট বা রান করার জন্য লারাভেলের চমৎকার কমান্ড লাইন টুল হলো **Tinker**।

### ক. টিংকার চালু করার কমান্ড:
```bash
php artisan tinker
```

### খ. টিংকার থেকে ডেটা ইনসার্ট করা:
```php
DB::table('users')->insert([
    'name' => 'Al Nahian', 
    'email' => 'nahian@admin.com', 
    'password' => Hash::make('password'), 
    'country' => 'Canada'
]);
// আউটপুট: true (সফলভাবে ইনসার্ট হলে)
```

### গ. টিংকার থেকে ডেটা রিড করা:
```php
DB::table('users')->get();
```

---

## ৪. কুয়েরি বিল্ডারে CRUD অপারেশনস

### ক. রাউট ফাইলে একসাথে মাল্টিপল (Bulk) ডেটা ইনসার্ট করা:
```php
DB::table('users')->insert([
    [
        'name' => 'Al Nahian', 
        'email' => 'nahian@admin.com', 
        'password' => Hash::make('password'), 
        'country' => 'Turkey'
    ],
    [
        'name' => 'Al Sabbir', 
        'email' => 'sabbir@admin.com', 
        'password' => Hash::make('password'), 
        'country' => 'Cambodia'
    ]
]);
```

### খ. হোয়্যার ক্লজ (Where Clause) ও অপারেটর ব্যবহার:
আপনি যদি কুয়েরি বিল্ডার মেথড চেইনিং এর শেষ মাথায় `get()` কল না করে শুধু কুয়েরি রিটার্ন করেন, তবে এর ইন্টারনাল বাইন্ডিংস, কুয়েরি স্ট্রাকচার দেখতে পাবেন।
```php
// কুয়েরি অবজেক্টের বিভিন্ন ক্লজ ও অপারেটর চেক করা
DB::table('users');
```
লারাভেলের `where` ক্লজে বিভিন্ন ধরণের অপারেটর ব্যবহার করা যায়: `['=', '<', '>', '<=', '>=', 'like', 'in']` ইত্যাদি।
```php
// শুধুমাত্র অ্যাডমিন ইউজারদের খুঁজে আনা
$admins = DB::table('users')->where('is_admin', true)->get();
```

### গ. ডেটা আপডেট করা (Update Operation):
```php
// Canada তে থাকা সকল ইউজারের কান্ট্রি পরিবর্তন করে Bangladesh করা
$affected = DB::table('users')
    ->where('country', '=', 'Canada')
    ->update(['country' => 'Bangladesh']);
// আউটপুট: 1 (অর্থাৎ ১টি রো অ্যাফেক্ট হয়েছে)
```

### ঘ. ডেটা ডিলিট করা (Delete Operation):
```php
// Cambodia কান্ট্রির ইউজারদের ডিলিট করা
$deleted = DB::table('users')
    ->where('country', '=', 'Cambodia')
    ->delete();
// আউটপুট: 1 (অর্থাৎ ১টি রো ডিলিট হয়েছে)
```

### ঙ. লিমিট ও কাউন্ট করা (Limit & Count):
আমরা কতগুলো ডেটা নিতে চাই তা `limit()` মেথডের মধ্যে বলে দিতে পারি:
```php
// প্রথম ৩টি ইউজার ডেটা পাওয়া যাবে
$users = DB::table('users')->limit(3)->get();

// কুয়েরির ফলাফল গণনা করা
$count = DB::table('users')->limit(3)->get()->count(); // আউটপুট: 3

// সরাসরি ডেটাবেজ লেভেলে কাউন্ট করা
$totalUsers = DB::table('users')->count(); // আউটপুট: 12 (যেমন টোটাল ১২ জন ইউজার থাকলে)
```

---

## ৫. টেবিল জয়েন করা (Database Table Joins)

আমরা চাইলে একটি টেবিলকে অন্য আরেকটি টেবিলের সাথে খুব সহজেই `join` করতে পারি।

```php
Route::get('/users-posts', function() {
    // users টেবিলের সাথে posts টেবিল জয়েন করা
    return DB::table('users')
        ->join('posts', 'users.id', '=', 'posts.user_id')
        ->select('users.name', 'posts.title', 'posts.body')
        ->get();
});
```
একইভাবে আপনি প্রয়োজন অনুযায়ী `leftJoin()` এবং `rightJoin()` মেথড ব্যবহার করতে পারেন।

---

## ৬. কুয়েরি বিল্ডার বনাম ইলোকুয়েন্ট ওআরএম (Query Builder vs Eloquent ORM)

Eloquent ORM লারাভেলের একটি অত্যন্ত শক্তিশালী অবজেক্ট-রিলেশনাল ম্যাপার (ORM)। এর সাহায্যে কাজ করা অনেক বেশি সহজ ও রিডেবল।

### ক. ডেটা রিটার্ন করা:
```php
// Eloquent ORM এর মাধ্যমে সব ইউজার ডেটা
$users = User::all();

// Query Builder এর মাধ্যমে একই কাজ
$users = DB::table('users')->get();
```

### খ. নতুন রেকর্ড তৈরি করা:
```php
// Eloquent ORM এ নতুন রেকর্ড ক্রিয়েট করা
User::create([
    'name' => 'John Doe',
    'email' => 'john@doe.com',
    'password' => bcrypt('password')
]);
```
> [!TIP]
> **Eloquent ORM এর বড় সুবিধা:** Eloquent ORM ব্যবহার করলে লারাভেল স্বয়ংক্রিয়ভাবে `created_at` এবং `updated_at` কলামের টাইমস্ট্যাম্প ফিল্ড ম্যানেজ করে। কিন্তু র কুয়েরি বিল্ডার (`DB::table()->insert()`) ব্যবহার করলে এই টাইমস্ট্যাম্পের ভ্যালুগুলো ম্যানুয়ালি ইনসার্ট অ্যারেতে দিয়ে দিতে হয়।

---

## ৭. র কুয়েরি প্রদর্শন করা (Inspecting Raw SQL Queries)

ডেভেলপমেন্ট বা ডিবাগিং এর সময় লারাভেল ব্যাকগ্রাউন্ডে কী ধরনের SQL রান করছে তা দেখতে আমরা নিচের মেথডগুলো ব্যবহার করতে পারি:

- **`toRawSql()`:** কুয়েরি বিল্ডার বা ইলোকুয়েন্ট থেকে রিয়েল এসকিউএল স্ট্রিং বের করার জন্য (প্যারামিটার সহ):
  ```php
  DB::table('users')->select('name')->toRawSql();
  // আউটপুট: select `name` from `users`
  ```
- **`dumpRawSql()` / `dd()` / `dump()`:** কুয়েরি মাঝপথে থামিয়ে ব্রাউজারে বা কনসোলে প্রিন্ট করার জন্য এগুলো ব্যবহার করা যায়।

---

## ৮. পারফরম্যান্স বেঞ্চমার্ক (Performance Benchmarking) ★

সাধারণত সরাসরি **Database Query Builder** কুয়েরি এক্সিকিউশনে **Eloquent ORM** এর চেয়ে ফাস্টার বা দ্রুত হয়ে থাকে, কারণ Eloquent এ প্রচুর অতিরিক্ত অবজেক্ট ও রিলেশনশিপ প্রসেস করতে হয়।

আমরা চাইলে লারাভেলের `Benchmark` ক্লাসের মাধ্যমে এটি পরীক্ষা করে দেখতে পারি:

```php
use Illuminate\Support\Benchmark;
use App\Models\User;
use Illuminate\Support\Facades\DB;

Route::get('/benchmark', function () {
    return Benchmark::dd([
        'Eloquent ORM' => fn() => User::all(),
        'Database Query Builder' => fn() => DB::table('users')->get()
    ]);
});
```

### ব্রাউজারে আউটপুট (নমুনা):
```php
[
    'Eloquent ORM' => '22.96ms',
    'Database Query Builder' => '0.328ms'
]
```
*(কুয়েরি বিল্ডার এক্ষেত্রে বেশ দ্রুত রেসপন্স করে থাকে!)*

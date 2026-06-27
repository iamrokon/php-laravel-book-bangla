# মডিউল ৯: ডেটাবেজ কুয়েরি বিল্ডার (Database Query Builder)

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** লারাভেলে ডাটাবেজ কুয়েরি বিল্ডার (Query Builder) কি এবং এর মাধ্যমে CRUD অপারেশন উদাহরণসহ লিখ

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

---

## ৯. অ্যাডভান্সড কুয়েরি বিল্ডার ও ডিবি অপারেশনস (Advanced Query Builder & DB Operations)

অ্যাপ্লিকেশনের জটিল কুয়েরি ও রিপোর্ট তৈরির জন্য ডাটাবেজ কুয়েরি বিল্ডারের উন্নত মেথডগুলো জানা অত্যন্ত জরুরী। নিচে সেগুলো ডিটেইলস আলোচনা করা হলো:

### ক. সুনির্দিষ্ট কলামের মান ও অ্যাগ্রিগেট মেথডস (Value, Pluck & Aggregates):
অনেক সময় আমাদের সম্পূর্ণ মডেল বা অবজেক্টের ডেটা না নিয়ে শুধুমাত্র একটি কলামের মান বা নির্দিষ্ট কিছু হিসাব (যেমন: গড়, সর্বোচ্চ মান) করার প্রয়োজন পড়ে।

- **`value()`:** শুধুমাত্র একটি নির্দিষ্ট কলামের সিঙ্গেল ভ্যালু রিটার্ন করে (কালেকশন বা অবজেক্ট নয়)।
  ```php
  $email = DB::table('users')->where('name', 'John')->value('email');
  // Output: "john@example.com"
  ```
- **`find()` মেথডের ২য় প্যারামিটার:** আইডি দিয়ে খুঁজে পাওয়ার সাথে সাথে নির্দিষ্ট কলাম সিলেক্ট করা যায়:
  ```php
  $user = DB::table('users')->find(1, ['id', 'name', 'email']);
  // Output: { "id": 1, "name": "Rebeka Meder", "email": "rebeka@example.com" }
  ```
- **`pluck()`:** একটি টেবিলের নির্দিষ্ট কলামের সমস্ত মান নিয়ে একটি কালেকশন তৈরি করে:
  ```php
  $titles = DB::table('users')->pluck('name'); // এটি একটি Collection রিটার্ন করবে।
  ```
- **অ্যালাইয়াস (Alias) ব্যবহার করা:**
  ```php
  $users = DB::table('users')
      ->select('name', 'email as user_email')
      ->get();
  ```
- **`distinct()`:** ডুপ্লিকেট বাদ দিয়ে শুধুমাত্র ইউনিক মানগুলো তুলে আনে:
  ```php
  $users = DB::table('users')->distinct()->get();
  ```
- **ডাটাবেজ লেভেল অ্যাগ্রিগেটস (Fast Aggregates):** পিএইচপি লেভেলে কাউন্ট বা এভারেজ করার চেয়ে ডাটাবেজ লেভেলে করা অনেক দ্রুত ও মেমোরি সেভিং।
  ```php
  $count = DB::table('users')->count(); // সরাসরি COUNT(*) কোয়েরি রান হবে
  $maxPrice = DB::table('orders')->max('price'); // সর্বোচ্চ মূল্য
  $avgPrice = DB::table('orders')->avg('price'); // গড় মূল্য
  ```

---

### খ. র কুয়েরি ব্যবহার করা (Raw SQL Queries):
কুয়েরি বিল্ডারে যখন জটিল গাণিতিক হিসাব বা ডাটাবেজ স্পেসিফিক ফাংশন ব্যবহার করতে হয়, তখন **Raw Queries** ব্যবহার করতে হয়। লারাভেলে সিকিউরড উপায়ে র কুয়েরি লেখার জন্য বেশ কয়েকটি মেথড রয়েছে:

> [!WARNING]
> সরাসরি `DB::raw()` মেথডের ভেতর ইউজারের ইনপুট করা কোনো ভেরিয়েবল পাস করা উচিত নয়, কারণ এতে **SQL Injection** এর ঝুঁকি থাকে। নিরাপদে ডাটা পাস করার জন্য প্লেসহোল্ডার এবং বাইন্ডিং ব্যবহার করা উচিত।

- **`DB::raw()`:** কুয়েরির যেকোনো অংশে র এক্সপ্রেসন ইঞ্জেক্ট করতে ব্যবহৃত হয়।
  ```php
  $users = DB::table('users')
      ->select(DB::raw('count(*) as user_count, status'))
      ->where('status', '<>', 1)
      ->groupBy('status')
      ->get();
  ```
- **`selectRaw()`:** সরাসরি সিলেক্ট কুয়েরির ভেতর নিরাপদে প্লেসহোল্ডার সহ র কোড লেখা যায়:
  ```php
  $orders = DB::table('orders')
      ->selectRaw('price * ? as price_with_tax', [1.0825]) // প্লেসহোল্ডার '?' ব্যবহার করা হয়েছে
      ->get();
  ```
- **`whereRaw()` / `orWhereRaw()`:** কন্ডিশনের ভেতর র কুয়েরি রান করতে:
  ```php
  $orders = DB::table('orders')
      ->whereRaw('price > IF(state = "TX", ?, 100)', [200])
      ->get();
  ```
- **`havingRaw()`:** গ্রুপ-বাই করার পর কন্ডিশন ফিল্টার করতে:
  ```php
  $orders = DB::table('orders')
      ->select('department', DB::raw('SUM(price) as total_sales'))
      ->groupBy('department')
      ->havingRaw('SUM(price) > ?', [2500])
      ->get();
  ```
- **`orderByRaw()` & `groupByRaw()`:** সর্টিং ও গ্রুপিংয়ে র কুয়েরি ব্যবহার:
  ```php
  $orders = DB::table('orders')
      ->orderByRaw('updated_at, created_at DESC')
      ->get();

  $orders = DB::table('orders')
      ->select('city', 'state')
      ->groupByRaw('city, state')
      ->get();
  ```

---

### গ. জয়েন অপারেশনস (Database Join Operations - Deep Dive):
একাধিক টেবিলের মধ্যে সম্পর্ক স্থাপন করে সম্মিলিত ফলাফল পাওয়ার জন্য ডাটাবেজ জয়েন (Join) ব্যবহৃত হয়।

#### ১. ইনার জয়েন (Inner Join):
উভয় টেবিলে ম্যাচ করা কমন ডাটাগুলো শুধুমাত্র আউটপুটে আসবে।
```php
$users = DB::table('users')
    ->join('contacts', 'users.id', '=', 'contacts.user_id')
    ->join('orders', 'users.id', '=', 'orders.user_id')
    ->select('users.*', 'contacts.phone', 'orders.price')
    ->get();
```

#### ২. লেফট জয়েন (Left Join):
বাম টেবিলের সমস্ত ডাটা আসবে, এবং ডান টেবিলের শুধুমাত্র ম্যাচিং কমন ডাটাগুলো আসবে (ডান টেবিলে ম্যাচ না করলে `null` দেখাবে)।
```php
$users = DB::table('users')
    ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
    ->get();
```

#### ৩. ক্রস জয়েন (Cross Join):
এক টেবিলের প্রতিটি রো এর সাথে অন্য টেবিলের প্রতিটি রো এর গুণফল (Cartesian Product) তৈরি করে।
```php
$sizes = DB::table('sizes')
    ->crossJoin('colors')
    ->get();
```

#### ৪. ক্লোজার ব্যবহার করে অ্যাডভান্সড জয়েন (Advanced Join Clauses):
জটিল কন্ডিশন বা একাধিক অন (`on`) ক্লজের ওপর ভিত্তি করে জয়েন দেওয়ার জন্য ক্লোজার ফাংশন ব্যবহার করা যায়:
```php
DB::table('users')
    ->join('contacts', function ($join) {
        $join->on('users.id', '=', 'contacts.user_id')
             ->where('contacts.user_id', '>', 5);
    })
    ->get();
```

#### ৫. সাবকুয়েরি জয়েন (Subquery Joins):
একটি কুয়েরির ফলাফলের ওপর ভিত্তি করে অন্য টেবিল জয়েন করতে `joinSub()` ব্যবহার করা যায়:
```php
$latestPost = DB::table('posts')
    ->select('user_id', DB::raw('MAX(created_at) as last_post_created_at'))
    ->where('is_published', true)
    ->groupBy('user_id');

$users = DB::table('users')
    ->joinSub($latestPost, 'latest_posts', function ($join) {
        $join->on('users.id', '=', 'latest_posts.user_id');
    })
    ->get();
```

---

### ঘ. রেজাল্টসেট মার্জ করা (Union and UnionAll):
দুটি কুয়েরির ফলাফলকে একসাথে মার্জ করতে `union()` ব্যবহার করা হয়। (মনে রাখবেন, উভয় কুয়েরিতে কলামের সংখ্যা ও টাইপ সমান হতে হবে)।
- **`union()`:** শুধুমাত্র ইউনিক ডাটাগুলোকে মার্জ করে।
- **`unionAll()`:** ডুপ্লিকেট সহ সমস্ত ডাটা মার্জ করে (দ্রুত কাজ করে)।

```php
$first = DB::table('users')
    ->whereNull('first_name')
    ->union(DB::table('users')->whereNull('last_name'))
    ->get();
```

---

### ঙ. হোয়্যার ক্লজ ডিপ ডাইভ (Mastering WHERE Clause):
হোয়্যার ক্লজের মাধ্যমে আমরা কোয়েরির কন্ডিশন নির্ধারণ করি। লারাভেলে বিভিন্ন ধরণের হোয়্যার মেথড রয়েছে:

- **ডিফল্ট ইকুয়াল চেক:** অপারেটর না বলে দিলে বাই-ডিফল্ট `=` কন্ডিশন চেক করবে।
  ```php
  $users = DB::table('users')->where('votes', 100)->get();
  ```
- **অন্যান্য অপারেটর ব্যবহার:**
  ```php
  $users = DB::table('users')
      ->where('votes', '>=', 100)
      ->where('votes', '<>', 100) // Not equal check
      ->where('name', 'like', 'T%') // প্যাটার্ন ম্যাচিং
      ->get();
  ```
- **`whereIn` এবং `whereNotIn`:** অ্যারের ভেতরের ভ্যালু চেক করতে:
  ```php
  $users = DB::table('users')
      ->whereIn('age', [23, 25, 30])
      ->get();
  ```
- **লজিক্যাল AND এবং OR কন্ডিশন গ্রুপ করা:**
  একাধিক কন্ডিশন মেথড চেইনিং করলে তারা পরস্পর `AND` লজিকে কাজ করে। কিন্তু ব্র্যাকেট বা গ্রুপ কন্ডিশন তৈরি করতে আমরা ক্লোজার ফাংশন ব্যবহার করতে পারি:
  ```php
  // SELECT * FROM users WHERE (age = 25 OR salary < 4500) AND (name = 'Komal' OR name = 'Kaushik')
  $users = DB::table('customers')
      ->where(function ($query) {
          $query->where('age', 25)
                ->orWhere('salary', '<', 4500);
      })
      ->where(function ($query) {
          $query->where('name', 'Komal')
                ->orWhere('name', 'Kaushik');
      })
      ->get();
  ```

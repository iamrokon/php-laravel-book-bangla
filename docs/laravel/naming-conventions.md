# নেমিং কনভেনশন ও বেস্ট প্র্যাকটিস (Laravel Naming Conventions & Best Practices)

সফটওয়্যার ডেভেলপমেন্টে সঠিক নেমিং কনভেনশন মেনে চলা অত্যন্ত গুরুত্বপূর্ণ। বিশেষ করে লারাভেলের মতো ফ্রেমওয়ার্কে যেখানে **Convention over Configuration** নীতি অনুসরণ করা হয়, সেখানে সঠিক নাম ব্যবহার করলে কোড অনেক বেশি রিডেবল হয় এবং অতিরিক্ত কনফিগারেশনের প্রয়োজন হয় না।

---

## ১. কেন নেমিং কনভেনশন গুরুত্বপূর্ণ? (Why Naming Matters)

1. **Less Configuration (কম কনফিগারেশন):** লারাভেল ডিফল্ট কনভেনশন অনুসরণ করলে আড়ালে ডাটাবেজ টেবিল, রিলেশনশিপ ও মডেলগুলোর সংযোগ নিজে থেকেই করে নেয়। ফলে অতিরিক্ত কোড লিখতে হয় না।
2. **Easy Onboarding (সহজে নতুনদের মানিয়ে নেওয়া):** নতুন কোনো ডেভেলপার টিমে যোগ দিলে খুব সহজেই কোডবেজ বুঝতে পারেন।
3. **Efficient Decision Making (দ্রুত সিদ্ধান্ত গ্রহণ):** ফাইলের বা ভেরিয়েবলের নাম কী রাখা হবে তা নিয়ে অতিরিক্ত সময় নষ্ট হয় না।
4. **Reduced Bugs (কম বাগ):** স্বয়ংক্রিয় ম্যাপিং সঠিকভাবে কাজ করায় অনাকাঙ্ক্ষিত বাগ বা এরর তৈরি হয় না।

---

## ২. কেস স্টাইল ও জেনারেল কনভেনশন (Case Styles & General Conventions)

| কনভেনশন টাইপ | লেখার ধরন | উদাহরণ |
| :--- | :--- | :--- |
| **PascalCase** | প্রথম অক্ষর সহ প্রতিটি শব্দের প্রথম অক্ষর বড় হাতের | `ArticleController`, `FlightAttendant` |
| **camelCase** | প্রথম শব্দ ছোট হাতের, পরবর্তী শব্দের প্রথম অক্ষর বড় হাতের | `userPosts`, `firstName` |
| **snake_case** | সব ছোট হাতের শব্দ, মাঝে আন্ডারস্কোর | `user_id`, `created_at` |
| **UPPER_CASE** | সব বড় হাতের শব্দ, মাঝে আন্ডারস্কোর | `MY_CONSTANT`, `MAX_LIMIT` |

### ভেরিয়েবল নেমিং (Variables):
- ভেরিয়েবল সবসময় `camelCase` বা `snake_case` অনুসরণ করে। তবে লারাভেলের অফিশিয়াল স্টাইল গাইড অনুযায়ী মেথডের নাম `camelCase` হলে ভেরিয়েবলও সাধারণত `camelCase` হওয়া ভালো।
- ভেরিয়েবল নাম কখনো সংখ্যা দিয়ে শুরু হতে পারে না।
  ```php
  $userEmail = 'user@example.com'; // সঠিক
  $10Messi = 'Lionel';             // ভুল (সংখ্যা দিয়ে শুরু হয়েছে)
  ```

### ক্লাস নেমিং (Classes):
- ক্লাসের নাম সর্বদা **PascalCase** হবে।
  ```php
  class ArticleController extends Controller {
      // ক্লাস বডি
  }
  ```

### কনস্ট্যান্ট নেমিং (Constants):
- কনস্ট্যান্টের নাম সর্বদা **UPPER_CASE** হবে এবং একাধিক শব্দের মাঝে আন্ডারস্কোর (`_`) ব্যবহৃত হবে।
  ```php
  const MY_CONSTANT = 'UPPER_CASE';
  define('FULL_NAME', 'Rokon');
  ```

### নেমস্পেস (Namespaces):
- নেমস্পেস মূলত প্রজেক্টের ফোল্ডার ডিরেক্টরিকে নির্দেশ করে এবং এটি **PascalCase** এ লিখতে হয়।
  ```php
  namespace App\Http\Controllers;
  use App\Http\Controllers\ProfileController;
  ```

---

## ৩. ট্রেইট ও ইন্টারফেস কনভেনশন (Traits & Interfaces)

- **Trait ও Interface** এর নাম সর্বদা **PascalCase** হয়।
- লারাভেলে ট্রেইট ও ইন্টারফেসের নাম শেষে তাদের ভূমিকা বোঝাতে `Trait` বা `Interface` সাফিক্স জুড়ে দেওয়া যায়, তবে অফিশিয়াল লারাভেল কনভেনশনে সরাসরি অ্যাকশন বা অ্যাবিলিটি ব্যবহার করা হয় (যেমন: `Notifiable`, `Queueable`, `Authenticatable`)।
  ```php
  // ট্রেইট উদাহরণ:
  trait HasTags {
      // ...
  }

  // ইন্টারফেস উদাহরণ:
  interface DatabaseConnectionInterface {
      // ...
  }
  ```

---

## ৪. কন্ট্রোলার ও রাউটিং কনভেনশন (Controllers & Routing)

### কন্ট্রোলার (Controllers):
- কন্ট্রোলারের নাম **PascalCase** হবে এবং এটি সর্বদা **Singular** (একবচন) হতে হবে।
  - `ArticleController` (সঠিক)
  - `ArticlesController` (ভুল - Plural হওয়া উচিত নয়)
- কন্ট্রোলারের নামের শেষে `Controller` শব্দটি জুড়ে দেওয়া বাধ্যতামূলক।

### রাউটিং (Routes):
- **URL পাথ:** রাউটের ইউআরএল সবসময় ছোট হাতের (lowercase) হবে। একাধিক শব্দের ক্ষেত্রে হাইফেন (`-`) ব্যবহার করা উচিত।
  - `/user-posts` (সঠিক)
  - `/user_posts` বা `/userPosts` (অপ্রত্যাশিত)
- **রিসোর্স রাউট ইউআরএল:** রিসোর্স রাউটের ইউআরএল সাধারণত **Plural** (বহুবচন) হয়।
  - `/posts` (সব পোস্ট দেখার জন্য)
  - `/posts/{post}` (নির্দিষ্ট একটি পোস্টের জন্য - যেখানে `{post}` প্যারামিটারে আইডি পাস করা হয়)
- **নেস্টেড রাউট ইউআরএল:**
  - `posts/{post}/comments` (একটি পোস্টের সব কমেন্ট দেখতে)
  - `posts/{post}/comments/{comment}` (পোস্টের নির্দিষ্ট একটি কমেন্ট দেখতে)
- **রাউট নাম (Route Name):** রাউটের নাম ডিক্লেয়ার করার সময় আন্ডারস্কোর (`_`) এবং ডট (`.`) নোটেশন ব্যবহৃত হয়।
  ```php
  // রাউট ইউআরএলে হাইফেন, কিন্তু রাউট নেমে আন্ডারস্কোর এবং নেস্টিংয়ের জন্য ডট (.)
  Route::get('/user-profile', [UserController::class, 'show'])->name('user.profile_update');
  ```
- **রিসোর্স রাউট ডিক্লেয়ার করা:**
  ```php
  Route::resource('teachers', TeacherController::class);
  // নেস্টেড রিসোর্স রাউট
  Route::resource('teachers.posts', TeacherPostController::class);
  ```

---

## ৫. মডেল, মাইগ্রেশন, ফ্যাক্টরি ও সিডার (Models, Migrations, Factories & Seeders)

লারাভেলে মডেল ডিক্লেয়ার করলে তার সাথে সামঞ্জস্য রেখে অন্যান্য ফাইল তৈরির জন্য চমৎকার শর্টকাট রয়েছে:
```bash
# মডেলের সাথে migration, controller, resource, factory, এবং seeder একসাথে তৈরি করতে
php artisan make:model Flight -mcrfs
```

### মডেল (Model):
- মডেলের নাম সর্বদা **PascalCase** এবং **Singular** (একবচন) হবে। যেমন: `Tweet`।

### টেবিল ও মাইগ্রেশন (Tables & Migrations):
- ডাটাবেজের টেবিলের নাম সর্বদা **Plural** (বহুবচন) এবং **snake_case** হবে। যেমন: `tweets`।
- একাধিক ক্যাপিটাল লেটার বিশিষ্ট মডেলের ক্ষেত্রে টেবিল নেমে শব্দের মাঝে আন্ডারস্কোর বসবে। যেমন: `FlightAttendant` মডেলের টেবিল নাম হবে `flight_attendants`।
- পিভট টেবিল (Pivot Table) তৈরির সময় দুটি টেবিলের সিঙ্গুলার নাম বর্ণানুক্রমিকভাবে (alphabetic order) যুক্ত করে টেবিলের নাম তৈরি করতে হয়।
  - `tweet_user` (সঠিক, কারণ 't' বর্ণমালায় 'u' এর আগে আসে)
  - `user_tweet` (ভুল)

### ডেটাবেজ কলাম নেমিং (Columns):
- টেবিলের কলামের নাম সর্বদা **snake_case** হবে।
- কলামের নামের শুরুতে টেবিলের নাম প্রিফিক্স হিসেবে ব্যবহার করা **রেডান্ডেন্ট (Redundant)** এবং পরিহার করা উচিত।
  ```php
  Schema::create('tweets', function (Blueprint $table) {
      $table->string('content');       // সঠিক
      $table->string('tweet_content'); // ভুল (টেবিল নাম tweets প্রিফিক্স করার দরকার নেই)
      $table->string('large_content'); // সঠিক (snake_case)
  });
  ```
- **ফরেন কি (Foreign Keys):** ফরেন কি কলামের স্ট্যান্ডার্ড ফরম্যাট হলো `singular_table_name_id` (যেমন: `user_id`)। এটি রিলেশনশিপ ম্যাপ করতে সাহায্য করে।
  ```php
  $table->foreignId('user_id')->constrained()->cascadeOnDelete();
  ```

### অন্যান্য ক্লাস ও সাফিক্স:
নামের সংঘর্ষ (Collision) এড়াতে মডেল বাদে অন্যান্য সব ক্লাসের শেষে তাদের পারপাস বা কাজের নাম যুক্ত করা হয়:
- **Factory:** `TweetFactory.php`
- **Seeder:** `TweetSeeder.php` (যেখানে `Tweet::factory()->count(10)->create();` এর মাধ্যমে ডেটা সিড করা হয়)
- **Request:** `StoreTweetRequest.php` ও `UpdateTweetRequest.php`
- **Policy:** `TweetPolicy.php`
- **Event:** `TweetCreated.php` (তৈরি করতে: `php artisan make:event TweetCreated`)

---

## ৬. রিলেশনশিপ নেমিং কনভেনশন (Relationships)

ইলোকুয়েন্ট মডেলগুলোর মধ্যকার রিলেশনশিপ মেথডগুলোর নাম সর্বদা **camelCase** ফরম্যাটে হবে।
- **One to Many / Many to Many (বহুবচন বুঝালে):** মেথড নাম Plural হবে।
  ```php
  // User.php মডেল
  public function posts()
  {
      return $this->hasMany(Post::class);
  }
  ```
- **One to One / Belongs To (একবচন বুঝালে):** মেথড নাম Singular হবে।
  ```php
  // Post.php মডেল
  public function author()
  {
      return $this->belongsTo(User::class, 'author_id');
  }
  ```

---

## ৭. দরকারী টার্মিনাল কমান্ড ও লিংকসমূহ (Useful Commands & Links)

- **স্টোরেজ লিংক কমান্ড:**
  - `php artisan storage:link` (পাবলিক স্টোরেজের সাথে লিংক করতে)
  - `php artisan storage:unlink` (লিংকটি বিচ্ছিন্ন করতে)
- **রাউট লিস্ট কমান্ড:**
  - `php artisan route:list` (সব রাউট ও নামের তালিকা দেখতে)
- **কোড ফরম্যাটার:**
  - `laravel/pint` টুল ব্যবহার করে খুব সহজেই কোড পিএইচপি-এফআইজি (PSR-12) রুলস অনুযায়ী সাজিয়ে নেওয়া যায়।

> [!TIP]
> আরও বিস্তারিত জানতে ভিজিট করুন অফিশিয়াল বেস্ট প্র্যাকটিস গাইড: [Laravel Best Practices GitHub](https://github.com/alexeymezenin/laravel-best-practices)

# লারাভেল হেল্পার্স (Laravel Helpers)

লারাভেলে সাধারণ ও জটিল কার্যসম্পাদন সহজ করার জন্য অসংখ্য গ্লোবাল হেল্পার ফাংশন (Helper Functions) রয়েছে। এগুলো অ্যারে, অবজেক্ট, স্ট্রিং, পাথ, ইউআরএল, এনভায়রনমেন্ট কনফিগারেশন এবং ডাটাবেজ প্রসেসিংয়ের ক্ষেত্রে আমাদের অনেক সময় বাঁচিয়ে দেয়।

---

## ১. লারাভেল হেল্পার পরিচিতি (Introduction to Helpers)

লারাভেলের হেল্পারগুলোকে মূলত কয়েকটি ভাগে ভাগ করা যায়:
- **String Helpers:** স্ট্রিং ম্যানিপুলেশন ও কেসিং পরিবর্তনের জন্য।
- **Array Helpers:** অ্যারে ডেটা ফিল্টারিং, সর্টিং বা অ্যারে থেকে সুনির্দিষ্ট অংশ তুলে নেওয়ার জন্য।
- **Path & URL Helpers:** বিভিন্ন ডিরেক্টরি পাথ এবং ইউআরএল লিংক তৈরি করার জন্য।
- **Utility Helpers:** ডিবাগিং (`dd()`, `ddd()`), কনফিগারেশন হ্যান্ডলিং, ফেক ডেটা তৈরি ইত্যাদি কাজের জন্য।

---

## ২. স্ট্রিং হেল্পার্স (Common String Helpers)

স্ট্রিং ম্যানিপুলেশনের জন্য আমরা `Illuminate\Support\Str` ফ্যাসাড সরাসরি ব্যবহার করতে পারি অথবা রিডেবিলিটি বাড়ানোর জন্য ফ্লুয়েন্ট `str()` হেল্পার চেইনিং ব্যবহার করতে পারি।

টার্মিনাল থেকে `php artisan tinker` চালিয়ে আমরা এই হেল্পারগুলো খুব সহজেই টেস্ট করতে পারি।

```php
use Illuminate\Support\Str;

Route::get('playground', function () {
    // ১. স্ট্রিং এর লেন্থ বের করা:
    $length = Str::of('Hello World')->length(); 
    // Output: 11

    // ২. স্ট্রিং থেকে স্লাগ (Slug) তৈরি করা:
    $slug1 = Str::of('this is my happy song')->slug(); 
    // Output: this-is-my-happy-song
    
    // str() এর মাধ্যমে সরাসরি চেইনিং করে স্লাগ তৈরি করা:
    $slug2 = str('This is my...')->slug(); 
    // Output: this-is-my-slug (অথবা কাস্টম হাইফেন দিয়ে আলাদা করা)

    // ৩. হেডলাইন (Headline) কেস করা:
    $headline = str('this_is_a_happy_song')->headline();
    // Output: This Is A Happy Song

    // ৪. টাইটেল (Title) কেস করা:
    $title = str('This is my...')->title(); 
    // Output: This Is My...

    // ৫. র্যান্ডম (Random) স্ট্রিং জেনারেট করা:
    $random = str()->random(100); 
    // Output: ১০০ ক্যারেক্টার বিশিষ্ট একটি র্যান্ডম স্ট্রিং

    // ৬. ক্যামেল কেস (Camel Case) এ রূপান্তর:
    $camel = str('hey bro how are you?')->camel();
    // Output: "heyBroHowAreYou?"

    // ৭. কেবাব কেস (Kebab Case) এ রূপান্তর:
    $kebab = str('hey bro how are you?')->kebab();
    // Output: "hey-bro-how-are-you?"

    // ৮. স্নেক কেস (Snake Case) এ রূপান্তর:
    $snake = str('hey bro how')->snake();
    // Output: "hey_bro_how"

    // ৯. স্টাডলি কেস (Studly Case) এ রূপান্তর:
    $studly = str('hey bro how are you?')->studly();
    // Output: "HeyBroHowAreYou?"
    
    // ১০. আপারকেস (Uppercase) ও লোয়ারকেস (Lowercase):
    $upper = str('hey bro')->upper(); // Output: "HEY BRO"
    $lower = str('HEY BRO')->lower(); // Output: "hey bro"

    // ১১. ওয়ার্ড কাউন্ট (Word Count) করা:
    $wordCount = str('hey bro how are you?')->wordCount(); 
    // Output: 5

    // ১২. ক্যারেক্টার লিমিট (Character Limit) সেট করা:
    $limit1 = str('hey bro how are you?')->limit(6); 
    // Output: "hey br..."
    
    // কাস্টম শেষ চিহ্ন দিয়ে ক্যারেক্টার লিমিট সেট করা:
    $limit2 = str('hey bro how are you?')->limit(6, '***'); 
    // Output: "hey br***"

    // ১৩. ওয়ার্ড লিমিট (Word Limit) সেট করা:
    $words1 = str('hey bro how')->words(2); 
    // Output: "hey bro..."
    
    $words2 = str('hey bro how')->words(2, '###'); 
    // Output: "hey bro ###"

    // ১৪. রিপিট (Repeat) করা:
    $repeat = str('hello')->repeat(5); 
    // Output: "hellohellohellohellohello"

    // ১৫. সিঙ্গুলার (Singular) ও প্লুরাল (Plural) রূপান্তর:
    $singular = str('thieves')->singular(); // Output: "thief"
    $plural = str('tooth')->plural();       // Output: "teeth"

    // ১৬. মাস্কিং (Masking / অবfuscation):
    // মোবাইল নম্বর মাস্ক করা (৩য় ক্যারেক্টার থেকে পরবর্তী অংশ):
    $masked1 = str('01714535627')->mask('#', 3); 
    // Output: "017####5627"
    
    // নির্দিষ্ট সংখ্যক ক্যারেক্টার মাস্ক করা (৩য় ক্যারেক্টার থেকে শুরু করে ৫টি ক্যারেক্টার):
    $masked2 = str('01714535627')->mask('#', 3, 5); 
    // Output: "017#####627"
});
```

---

## ৩. অ্যারে হেল্পার্স (Common Array Helpers)

অ্যারে নিয়ে কাজ করার জন্য লারাভেলে `Illuminate\Support\Arr` ক্লাস ও হেল্পারস রয়েছে।

```php
use Illuminate\Support\Arr;

Route::get('playground', function() {
    $fruits = ['Mango', 'Peanut', 'Apple', 'Strawberry'];
    
    // ১. অ্যারের প্রথম ইলিমেন্ট বের করা:
    $first = Arr::first($fruits); 
    // Output: "Mango"
    
    // ২. অ্যারের শেষ ইলিমেন্ট বের করা:
    $last = Arr::last($fruits); 
    // Output: "Strawberry"

    $product = ['name' => 'Monitor', 'price' => 100, 'stock' => 'available'];
    
    // ৩. নির্দিষ্ট কি (Key) বাদ দিয়ে নতুন অ্যারে তৈরি করা:
    $except = Arr::except($product, ['stock']); 
    // Output: ['name' => 'Monitor', 'price' => 100]

    // ৪. ডট ডেকোরেশন দিয়ে অ্যারের ভ্যালু রিড করা:
    $name = Arr::get($product, "name"); 
    // Output: "Monitor"

    // ৫. অ্যারেতে নির্দিষ্ট কি (Key) আছে কিনা তা চেক করা:
    $hasPrice = Arr::has($product, "price"); 
    // Output: true

    // ৬. অ্যারে থেকে র্যান্ডম উপাদান নির্বাচন করা:
    $random = Arr::random($product); 
    // Output: "Monitor", 100, অথবা "available"

    $students = ['Nahian', 'Bruce', 'Aladin'];
    
    // ৭. অ্যারের ইলিমেন্টগুলোকে র্যান্ডমলি রি-অ্যারেন্জ বা এলোমেলো করা:
    $shuffled = Arr::shuffle($students); 
    // Output: ['Aladin', 'Nahian', 'Bruce'] (প্রতিবার র্যান্ডম আসবে)

    // ৮. অ্যারে ইলিমেন্টগুলোকে সেপারেটর দিয়ে জয়েন করা:
    $joined1 = Arr::join($students, ', '); 
    // Output: "Nahian, Bruce, Aladin"
    
    // জয়েন করার সময় শেষ ইলিমেন্টের আগে কাস্টম বাইন্ডার দেওয়া:
    $joined2 = Arr::join($students, ', ', ' and '); 
    // Output: "Nahian, Bruce and Aladin"

    // ৯. নেস্টেড অবজেক্ট/অ্যারে থেকে নির্দিষ্ট কী-এর ভ্যালুসমূহ প্লাক (Pluck) করে আনা:
    $posts = [
        [
            'id' => 1,
            'title' => 'This is a post title',
            'body' => 'post content',
            'comments' => [
                ['body' => 'This is 1st comment']
            ]
        ],
        [
            'id' => 2,
            'title' => 'This is another post title',
            'body' => 'More post content',
            'comments' => [
                ['body' => 'This is 2nd comment']
            ]
        ]
    ];

    $titles = Arr::pluck($posts, 'title');
    // Output: ["This is a post title", "This is another post title"]

    // ডট নোটিশন ব্যবহার করে নেস্টেড কি প্লাক করা:
    $comments = Arr::pluck($posts, 'comments.*.body');
    // Output: [["This is 1st comment"], ["This is 2nd comment"]]
});
```

---

## ৪. অন্যান্য গুরুত্বপূর্ণ হেল্পার ও ইউটিলিটি ফাংশন (Other Utility Helpers)

- **`asset()`:** লারাভেলের `public/` ডিরেক্টরিকে টার্গেট করে স্ট্যাটিক অ্যাসেট (ইমেজ, সিএসএস, জেএস) লিংক করার জন্য ব্যবহৃত হয়।
  ```html
  <img src="{{ asset('images/avatar.jpg') }}">
  ```
- **`to_route()`:** নির্দিষ্ট কোনো রাউট নেমে সরাসরি রিডাইরেক্ট করার একটি আধুনিক ও সংক্ষিপ্ত রূপ।
  ```php
  return to_route('students.enroll');
  ```
- **`public_path()`:** অ্যাপ্লিকেশনের `public/` ফোল্ডারের রুট বা এর ভেতরের ফাইলের সঠিক ডিরেক্টরি ফুল পাথ রিটার্ন করে।
  ```php
  $path = public_path('css/styles.css');
  // Output: G:\laragon\www\laravel-project\public\css\styles.css
  ```
- **`app_path()`:** `app/` ডিরেক্টরির ফাইল পাথ অ্যাক্সেস করতে ব্যবহৃত হয়।
  ```php
  $path = app_path('Models/User.php');
  ```
- **`storage_path()`:** `storage/` ডিরেক্টরির ফাইল পাথ অ্যাক্সেস করতে ব্যবহৃত হয় (যেমন লগ ফাইল অ্যাক্সেস করতে)।
  ```php
  $path = storage_path('logs/laravel.log');
  ```
- **`dd()` (Die and Dump):** পাসকৃত ভেরিয়েবলের ভেতরের ডেটা সুন্দর ফরমেটে ব্রাউজারে আউটপুট দেয় এবং পরবর্তী কোড এক্সিকিউশন বন্ধ (terminate) করে দেয়।
- **`ddd()` (Die, Dump and Debug):** `dd()` এর মতো কাজ করলেও এটিতে চমৎকার একটি ইন্টারেক্টিভ ডিবাগিং স্ক্রিন পাওয়া যায়, যেখানে স্ট্যাক ট্রেস এবং কনফিগারেশন ডেটা দেখা যায়।
- **`request()->all()`:** রিকোয়েস্টের বডি বা কুয়েরি প্যারামিটারে সাবমিট করা সমস্ত ইনপুট ডাটা অ্যারে আকারে রিটার্ন করে।
- **`time()` ও `today()`:** কারেন্ট ইউনিক্স টাইমস্ট্যাম্প এবং আজকের ডেট রিটার্ন করে।
- **`bcrypt()`:** যেকোনো প্লেইন টেক্সটকে (যেমন পাসওয়ার্ড) সিকিউর হ্যাশ (Bcrypt) ফরম্যাটে জেনারেট করে।
  ```php
  $password = bcrypt('secret');
  ```
- **`abort()`:** নির্দিষ্ট HTTP স্ট্যাটাস কোড পাঠিয়ে এক্সিকিউশন বন্ধ করে দেয়।
  ```php
  abort(403, 'Unauthorized Access');
  ```
- **`abort_if()` ও `abort_unless()`:** কোনো কন্ডিশনের ওপর ভিত্তি করে রিকোয়েস্ট অ্যাবোর্ট করতে ব্যবহৃত হয়।
  ```php
  abort_if(auth()->user()->is_blocked, 403);
  abort_unless(auth()->user()->is_admin, 403);
  ```
- **`collect()`:** যেকোনো সাধারণ অ্যারে-কে লারাভেলের শক্তিশালী কালেকশন অবজেক্টে রূপান্তর করে।
- **`config()`:** কনফিগ ফোল্ডারের ভেতর থেকে কোনো ডিক্লেয়ার করা ভ্যালু রিড করতে এবং প্রয়োজনে রানটাইমে তার ডিফল্ট ভ্যালু ওভাররাইড করতে ব্যবহৃত হয়।
  ```php
  $dbConnection = config('database.default'); // Output: mysql / sqlite
  $host = config('mail.mailers.smtp.host', 'smtp.mailtrap.io');
  ```
- **`env()`:** `.env` ফাইল থেকে সরাসরি এনভায়রনমেন্ট ভেরিয়েবল রিড করার জন্য এটি ব্যবহার করা হয়।
  ```php
  $appName = env('APP_NAME', 'Laravel Application');
  ```
- **`fake()`:** মডেল সিডার বা ফ্যাক্টরির ভেতর চমৎকার ফেক ডেটা (যেমন নাম, ঠিকানা, ইমেইল, মোবাইল ইত্যাদি) তৈরি করতে Faker লাইব্রেরি কল করতে এটি ব্যবহৃত হয়।
  ```php
  $name = fake()->name;
  $text = fake()->realText;
  ```
- **`info()` / `logger()`:** রানটাইম কোনো নোটিশ, মেসেজ বা ওয়ার্নিং ডিবাগিং ও ট্র্যাকিং করার সুবিধার্থে `storage/logs/laravel.log` ফাইলে রাইট করার জন্য ব্যবহৃত হয়।

---

## ৫. লারাভেলে কাস্টম হেল্পার তৈরি করা (Creating Custom Helpers)

অনেক সময় আমাদের প্রজেক্টে নিজস্ব কিছু ইউটিলিটি ফাংশন ব্যবহারের প্রয়োজন হয়। লারাভেলে খুব সহজে কাস্টম হেল্পার ফাংশন তৈরি এবং রেজিস্টার করা যায়।

### ধাপ ১: হেল্পার ফাইল তৈরি
প্রথমে `app` ডিরেক্টরির ভেতর `helpers.php` নামে একটি ফাইল তৈরি করুন। সেখানে আমাদের ফাংশনগুলো লিখব:

`app/helpers.php` ফাইলে:
```php
if (!function_exists('lower')) {
    function lower($string) {
        return strtolower($string);
    }
}
```
*(দ্রষ্টব্য: ফাংশন কলিং কলিশন এড়ানোর জন্য ফাংশন ডিক্লেয়ার করার সময় `if (!function_exists('...'))` কন্ডিশন ব্যবহার করা একটি ভালো অভ্যাস)*

### ধাপ ২: `composer.json` ফাইল কনফিগারেশন
ফাইলটি যাতে লারাভেল অ্যাপ্লিকেশনে সব জায়গায় অটোলোড হয়ে যায়, তার জন্য `composer.json` ফাইলের `autoload` সেকশনে `files` অ্যারের ভেতর এটি যুক্ত করতে হবে:

```json
"autoload": {
    "psr-4": {
        "App\\": "app/",
        "Database\\Factories\\": "database/factories/",
        "Database\\Seeders\\": "database/seeders/"
    },
    "files": [
        "app/helpers.php"
    ]
}
```

### ধাপ ৩: অটোলোড ক্যাশ রিফ্রেশ করা
টার্মিনালে নিচের কমান্ডটি চালিয়ে প্রজেক্টের অটোলোড ডেটা আপডেট করে নিন:
```bash
composer dump-autoload
```

---

### ক্লাস-ভিত্তিক হেল্পার তৈরি (Class-based Helper)
আমরা যদি কাস্টম গ্লোবাল ফাংশন তৈরি না করে অবজেক্ট ওরিয়েন্টেড উপায়ে স্ট্যাটিক মেথড ব্যবহার করতে চাই, তবে ক্লাস-ভিত্তিক হেল্পার তৈরি করতে পারি।

১. `app/Helpers/FileHelper.php` ফাইল তৈরি করুন:
```php
namespace App\Helpers;

class FileHelper
{
    public static function lower($string)
    {
        return strtolower($string);
    }
}
```

২. এবার আমরা `composer dump-autoload` রান করে যেকোনো জায়গা থেকে সরাসরি এটি ব্যবহার করতে পারব:
```php
use App\Helpers\FileHelper;

$text = FileHelper::lower('HELLO HOW ARE YOU');
// Output: "hello how are you"
```

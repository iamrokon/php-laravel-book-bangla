Module 14(2) Live Class 2: Caching ①

Caching: 123 × 450 = 55350 Not changeable
সিনারিও ১: 123 × 450 = 55350 আমাকে বলা হলো 123 × 450 = কত?
২ মিনিট পর আবার আমাকে বলা হলো 123 × 450 = কত?
আমরা সেই ক্যালকুলেশন আবার ক্যালকুলেশন করব না।
বরং আমার মাথায় ছিল সেটাই রিপ্লাই দেব।
ওটাই ক্যাশিং -> অর্থাৎ, মেমোরাইজ করা।
Storage: brain

যেমন এক ধরনের স্টোরেজ কিন্তু ক্যাশিং হলো মেমোরাইজেশন বা মনে রাখা।
কোন ভ্যালু ফাইল বা ডাটাবেজে রাখা হয় এবং ওটা সার্ভার সাইডে হয়।
কিন্তু ক্যাশিং হয় ক্লায়েন্ট সাইডে। ক্লায়েন্ট সাইডে এই রেসপন্স দ্রুত করার জন্য।

সিনারিও ২: What is the current time? 9:26 [Fixed for a certain time]
১০ সেকেন্ড পর আবার জিজ্ঞেস করলে আমরা পূর্বের উত্তরটাই দেব। কিন্তু ১০ মিনিট পর একই প্রশ্ন জিজ্ঞেস করলে আমরা আবার ঘড়ি দেখে রিপ্লাই দিতে পারব। অর্থাৎ এই ভ্যালু অন্য সময়ের জন্য fixed।

ক্লায়েন্টের কাছ থেকে কোন রিকোয়েস্ট আসলে আমরা যাতে তাকে চিনতে পারি এজন্য ব্যবহৃত হয় Session। অর্থাৎ আগের রিকোয়েস্ট কে করেছে এবং পরের রিকোয়েস্ট কে করেছে ওটা চেনার জন্য ব্যবহৃত হয় session।
কিন্তু ক্যাশিং টা ইন জেনারেল টার্ম। আমরা চাইলে যেকোনো ভ্যালুকে ক্যাশ করতে পারি অর্থাৎ ব্রাউজারে রাখতে পারি।

---

Caching করা হয় Faster রেসপন্সের জন্য।
Role, Permission এগুলো যদি ইউজার ক্রিয়েট করে রাখা হয়ে থাকে redis এ তবে আমরা ফাস্টার রেসপন্স পাব। কারণ ক্লায়েন্টের বারবার ডাটাবেজে হিট করার দরকার লাগবে না।

- CPU (L1, L2, L3) -> CPU লেভেলেও Caching করা যায়
- Browser -> Browser এ ক্যাশ করা হয়। Browser কিছু জিনিস ডিফল্ট ও কিছু জিনিস প্রোগ্রামিং দিয়ে ক্যাশ করে।
- Back-end (Query time optimization, CPU intensive task)
- Database (কীভাবে ও Faster রেসপন্সের জন্য cache করা যায়)

যেগুলো frequently দরকার হয় সেগুলো RAM এ রাখা হয়
Disk (HDD, SSD) -> Memory (RAM) -> Faster

Cache hit -> ভ্যালু cache এ থাকলে ও মেয়াদ থাকলে (not expired)
Cache miss -> " " " না " ও মেয়াদ থাকলে না থাকলে

Client -> Cache -> Storage
Client -> Cache Hit -> Cache
Client -> Cache Miss -> Storage

Cache hit বেশি হলে Better performance
Cache hit vs Cache miss

পার্ট ১
Laravel Telescope থেকে দেখা যায় কয়টা Call Cache hit হয়েছে আর কয়টা Call Cache miss হয়েছে।

---

PHP FPM ও সার্বিকভিত্তিক রিলেড করলে আবার opcache তেও বিবেচনা বিবেচনাভিত্তিক হয়। Cache ছাড়াও প্রোগ্রাম রানিং থাকবে।

APC driver -> এটা ডিরেক্টরি একটা ড্রাইভ যেটা দিয়ে In memory তে কাজ করা যায়। Testing করার সময় এটি ব্যবহৃত হয় না।
আমরা চাইলে প্রতিদিনের Invoice রিপোর্ট এর পারফরম্যান্স কাটাতে ৫ একটা টেবিলে ক্যাশ করে রাখতে পারি (সেকেন্ডেও)। আবার বিকালের ডেটা হতে config > cache.php টেবিলে ও রাখতে পারি।

Supported driver: "apc" (ব্যবহার হয় না), "array" (ব্যবহার হয় না), "database" (ব্যবহার করা যায় মিনারিও হিসেবে), "file" (প্রচুর হয়), "memcached", "redis", "dynamodb", "octane", "null"

এই তিনটি performance এর জন্য সেরা। কারণ ডাটাবেজের চেয়ে এগুলো ডাটা আনতে ফ্রন্ট এন্ডের কোয়েরি করতে হয়না।
ফাইল ক্যাশ ছোট অ্যাপ্লিকেশনের জন্য ভালো, কিন্তু বড় অ্যাপ্লিকেশনের জন্য ভালো নয়। redis -> সেরা। এটা In memory তে সবচেয়ে ভালো কাজ করে এবং database এর চেয়ে বেটার। তবে shared hosting এ অনেক সময় redis এর service থাকবে না।

-> File বেসড ক্যাশিং এ সমস্যার সৃষ্টি হয় যখন আমরা একাধিক সার্ভার থাকে। কারণ ক্যাশ তো একটা লোকাল সার্ভারে থাকবে।

User -> Load balancer -> Server 1, Server 2

ইন্ডাস্ট্রির ডাটাগুলো ফাইল ও ক্যাশ করে রাখা যায়।

...create_cache_table.php এই ফাইলটি আমরা ক্যাশ ডাটাবেজে রাখতে আমাদের cache ক্যাশে কাস্টম কাজ। Octane ভুল লারাভেলে octane টেবিল তৈরি করে নিতে হবে।

php artisan make:cache-table
php artisan migrate

---

Cache এর ডাটাগুলো একটা কী তে রাখতে হয় এবং একটি নির্দিষ্ট রিটার্ন করতে হয়। $value = Cache::get('key');

Route::get('/', function () {
    \Illuminate\Support\Facades\Cache::put('country', 'Bangladesh');
    return [
        'Bangladesh',
        'India',
        'Pakistan'
    ];
});

(১০০) এটা হলো Time to Live (TTL) -> সময় চিহ্নিত করার

Route::get('countries', function () {
    return Cache::get('country');
});

Route::get('countries', function () {
    return Cache::remember('country', 100, function () {
        return [
            'Bangladesh',
            'Pakistan'
        ];
    });
});

যদি Cache এ মান থাকে তবে সরাসরি রিটার্ন করবে। আর না থাকলে রিটার্ন করবে।

Cache::rememberForever('country')
কোনো নির্দিষ্ট সময়ের জন্য cache না করে indefinite সময়ের জন্য cache রাখতে চাইলে Cache::forget('key'); -> ক্যাশটি মুছে যাবে।

Time to Live (TTL) ও একটা নির্দিষ্ট সময় থাকে।

Stale while revalidate -> তে ডাটা আপডেট থাকা সত্ত্বেও
Cache::flexible() এর ক্ষেত্রে
10 -> valid time
20 -> expired
11 তম সেকেন্ডে কেউ আসলে Cache থেকে ভ্যালু রিটার্ন করবে এবং আবার Cache করার কাজ শুরু করবে।

---

$value = Cache::pull('key'); -> cache এটি তুলে আনবে এবং সাথে সাথে রিমুভ করবে।
$value = Cache::flexible('users', [5, 10], function () {
    return DB::table('users')->get();
});

flexible() এর জন্য লারাভেলে Deferred কাজ নামে নতুন একটি মেথড রয়েছে।

http এর Cache control মেকানিজম এ Stale while revalidate এর ব্যবহার রয়েছে। Cache-control: max-age=1, stale-while-revalidate=59
Can গুগল Stale while revalidate মেকানিজম টা ব্যবহার করে।
React hook ও এই কনসেপ্ট ব্যবহার হয়।
Deferred কাজের কারণে stale while revalidate

ফ্লেক্সিবিলিটি আনা সম্ভব হয়েছে। ইউজারের রেসপন্স পাঠানো শেষ defered ফাংশনের কাজ শুরু হয়। একটা কাজ কে সম্পন্ন করে।
$lock = Cache::lock('foo', 10); -> একটা কাজ কে সম্পূর্ণ করছে শেষ না করা পর্যন্ত ১০s লক থাকবে অন্য কেউ সেটা আর করতে পারবে না।

Queue, Job ও আমরা Long running প্রসেসগুলো ফেলতে পারি। কিন্তু deferred কোনো long running প্রসেস ফেললে হবে না। এতে Server এর উপর impact পড়বে।

Deferred function এখনো বিটা মোডে আছে।
আমরা চাইলে Cache ক্লাসের বদলে cache() হেল্পারও ব্যবহার করতে পারি।
যদি কোন ভ্যালুর রিসোর্স একই সাথে মাল্টিপল ইউজার আপডেট করার চেষ্টা করে তবে আমরা Cache::lock ব্যবহার করব।
if ($lock->get()) {
    // ...
    $lock->release();
}

---

php artisan migrate --isolated (একবার কোন একটি server থেকে মাইগ্রেশন শুরু হলে আবার যাতে অন্য সার্ভার থেকেও মাইগ্রেশন না শুরু হয় নতুন এমনও Atomic লকের মতো মেকানিজম ব্যবহৃত হয়)।

Cache invalidation -> Cache expire হওয়া সত্ত্বেও in valid না করার স্ট্র্যাটেজি সর্বদা প্রবলেম এটাই হবে।
অর্থাৎ stale, redundant বা ওভাররাইড হবে।
আবার খুব দ্রুত invalidate করলে Cache miss এর হার বাড়বে।

Role, permission -> 1 month এর Cache করা যেতে পারে কোনো পরিবর্তন না হলে। তবে ওয়াচ থাকলে পরিবর্তন হতে পারে যদি Role, permission এ কোনো CRUD অপারেশন চালায়।
User profile -> 1 month -> প্লেয়ার আপডেট হলে সরাসরি Cache::forget('user')
Cache key -> Cache key অনেক সময় বইপত্রমন্ডলী স্ট্রাকচার করতে হয়।

নতুন Cache ড্রাইভার সেটআপঃ পরের পেজ থেকে
আমাদের রেগুলার cache ড্রাইভার ৪ কে তারপর এক্সটেন্ড করতে হবে:
Cache::extends('mongo', function (Application $app) {
    return Cache::repository(new MongoStore);
});
তারপর এটাকে AppServiceProvider এ রেজিস্টার করতে হবে।
class AppServiceProvider extends ServiceProvider {
    $this->app->booting(function () {
        Cache::extends('mongo', ...);
    });
}

কিছু Cache থাকে global -> country, Role permission, city যা সব ইউজারের জন্য একই।
আবার কিছু Cache User based -> user-1-profile, user-1-transaction
Server যদি একাধিক হয় তবে - cache, storage, session এর ডাটাগুলো অন্য একটি জায়গায় রাখতে হবে। Docker container হলেও এই নিয়মগুলো মাথায় রাখতে হবে।

---

config > cache.php   বিষয়টি উল্লেখ দেওয়া যায়
'stores' => [
    'database' => [
        'driver' => 'database',
        'table' => 'env(...)'
    ],
    'redis-regular' => [
        'driver' => 'redis',
        'connection' => env(...)
    ],
    'redis-report' => [
        'driver' => 'redis',
    ]
]

এখানে আমরা দুটি redis ও দুটি ড্রাইভার ব্যবহার করতে পারি যেমন- session ক্যাশ, রিপোর্ট ক্যাশ।

এরপর আমাদের কোন কোন store এ ডাটা রাখতে চাই সেটা বলে দিতে হবে।
Cache::store('redis')->put('bar', 'baz', 600);
ডিফল্ট ক্যাশ store টা cache.php ফাইলে উল্লেখ থাকে যার নাম 'default' => env('CACHE_STORE', 'database'); ওটার store এর নাম আমরা যদি ডিফল্ট সার্ভিসগুলোর বদলে নতুন কোন সার্ভিস কে cache ড্রাইভার হিসেবে ব্যবহার করতে চাই আমরা ব্লকের মধ্যে নিচের মডিউলগুলো অবশ্যই থাকবে হতে হবে:

namespace App\Extensions;
use Illuminate\Contracts\Cache\Store;

class Mongostore implements Store {
    public function get($key) {}
    public function many(array $keys) {}
}
// ইত্যাদি মেথড
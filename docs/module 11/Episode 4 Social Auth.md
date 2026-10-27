
## Module 11 : Episode 4 : Social Auth

আমরা চাইলে আমাদের অ্যাপ্লিকেশনে Social লগইন ব্যবহার
করতে পারি। অর্থাৎ gmail বা facebook দিয়ে লগইন করা
যায়। OAuth এর মাধ্যমে এই কমিউনিকেশন হয়।
`ahmedshamim.hashnode.dev/how-do-you-authenticate-mate`

এই আর্টিকেলটি পড়ুন।
লারাবেল যে কোন অ্যাপ্লিকেশনে Social লগইন করার জন্য
একটি প্যাকেজ প্রদান করে যেটি হল Socialite।
composer require laravel/socialite

উদাহরণ স্বরূপ যদি আমরা github দিয়ে লগইন করতে দিতে
চাই তবে প্রথমে github এ গিয়ে একটি app তৈরি করতে হবে। সেখান
থেকে client_id, client_secret তৈরি করতে হবে। এইগুলা আমরা
github এ পাব। তারপর এগুলো আমাদের অ্যাপ্লিকেশনে
config/services.php তে বসাতে হবে।
```php
'github' => [
    'client_id' => env('GITHUB_CLIENT_ID'),
    'client_secret' => env('GITHUB_CLIENT_SECRET'),
    'redirect' => 'http://example.com/callback-url',
],

এরপর আমাদের দুটি রাউট ডিফাইন করতে হবে।
use Laravel\Socialite\Facades\Socialite;

Route::get('/auth/redirect', function () {
    return Socialite::driver('github')->redirect();
});

Route::get('/auth/callback', function () {
    $user = Socialite::driver('github')->user();
});
```


Module 11 (3) : Episode 4 : Error handling - Custom HTTP Error Pages

আমরা যখন অ্যাপ্লিকেশন এ কোন একটা পেজের রিকোয়েস্ট পাঠাই একটা রেসপন্স পাই সাথে একটা রেসপন্স কোড থাকে। যেমন কোনো রিকোয়েস্ট পেজ নাই যেমন: `127.0.0.1/abcd...`
`404 | যেমন: 127.0.0.1/abcd...`
`404 | Not Found`

404 - Not found পেজ, 500 ইত্যাদি পেজগুলো লারাভেলের ইন্টার্নাল কোরের ভিতরে আছে। এই পেজগুলো কাস্টমাইজ করতে হলে আমাদের কোরের ভিতরে গিয়ে আসতে হবে অথবা publish করতে হবে।   কম্যান্ড:
php artisan vendor:publish --tag=laravel-errors   এবার আমরা resources > views > errors ফোল্ডারে আমাদের এররগুলো দেখতে পাব। resources > views > errors

@extends('errors::minimal') -> একটি minimal পেজের টেমপ্লেট
@section('title', __('Not found'))
@section('code', 404)
@section('message', __('Not found'))
```

`{ $exception -> getMessage() } + Exception` এর মেসেজ দেখতে পাবে।
`minimal.blade.php`

```html
<body>
    <h1> Hello, error occurred </h1>
```

আমরা চাইলে fallback error পেজ ও বানাতে পারি। 
`4xx.blade.php` দিতে পারি সব এররের ক্ষেত্রে কাজ করবে। অর্থাৎ নির্দিষ্ট কোনো পেজ হলে।

---
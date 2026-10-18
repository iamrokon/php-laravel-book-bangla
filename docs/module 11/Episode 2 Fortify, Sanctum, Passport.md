Module 11: Episode 2: Fortify, Sanctum, Passport

Laravel Breeze এর মতোই fortify। লারাভেল Breeze ইন্সটল করলে আমরা দেখতে পাব এর রাউট গুলো routes> auth.php ফাইলে চলে গেছে। আর কন্ট্রোলার গুলো থাকবে app> Http> Controllers> Auth ফোল্ডারে।

Laravel Fortify শুধুমাত্র backend এর portion টুকু দেয়। আমরা চাইলে Breeze এর লজিকগুলো পরিবর্তন করতে পারি। কিন্তু Laravel Fortify এর কোডগুলো exposed থাকেনা এবং change করা যায়না।

Jetstream মূলত Laravel Fortify কেই ব্যবহার করে।

Sanctum মূলত Api Authentication নিয়ে কাজ করে। Single Page Application এ কাজ করে। এটি মূলত SPA Authentication।

একটি Session Based Authentication।

Laravel Passport মূলত OAuth2 এর স্ট্যান্ডার্ড মেইনটেইন করে। Api Authentication প্রদান করে।



Module 11 (3) : Episode 2: Error handling - Rendering Exceptions

এই অধ্যায়ে আমরা Exception Rendering দেখব।
app > Exceptions > Handler.php
এখানে Exception handling এর কিছু লজিক আছে।
লারভেল spatie/ignition প্যাকেজের মাধ্যমে Exception হ্যান্ডেল করে।

Route::get('/', function() {
    throw new Exception('Something went wrong');
});
এক্ষেত্রে আমরা window তে দেখতে পাব (STACK ট্রেস সহ)।

Exception ট্র্যাকিং এর জন্য আমরা দেখতে পাব রিডাইরেক্টের মাধ্যমে
CONTEXT মেনু তে আমরা দেখতে পাব (STACK মেনু তে)।
কাস্টম Exception তৈরি করার নিয়ম হলো:
app > Exceptions > Handler.php

public function register()
{
    $this->renderable(function (Exception $e, Request $request) {
        return response() -> view('test');
    });
}

আমরা চাইলে নিজেদের মত করে Exception ক্লাস বানাতে পারি।




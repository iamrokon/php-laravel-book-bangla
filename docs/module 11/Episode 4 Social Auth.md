① ৩০
Module 11 : Episode 4 : Social Auth

আমরা চাইলে আমাদের অ্যাপ্লিকেশনে Social লগইন ব্যবহার
করতে পারি। অর্থাৎ gmail বা facebook দিয়ে লগইন করা
যায়। OAuth এর মাধ্যমে এই কমিউনিকেশন হয়।
ahmedshamim.hashnode.dev/how-do-you-authenticate-mate

এই আর্টিকেলটি পড়ুন।
লারাবেল যে কোন অ্যাপ্লিকেশনে Social লগইন করার জন্য
একটি প্যাকেজ প্রদান করে যেটি হল Socialite।
composer require laravel/socialite

উদাহরণ স্বরূপ যদি আমরা github দিয়ে লগইন করতে দিতে
চাই তবে প্রথমে github এ গিয়ে একটি app তৈরি করতে হবে। সেখান
থেকে client_id, client_secret তৈরি করতে হবে। এইগুলা আমরা
github এ পাব। তারপর এগুলো আমাদের অ্যাপ্লিকেশনে
config/services.php তে বসাতে হবে।

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


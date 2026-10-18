Module 11 : Episode 3 : Guards and User providers

config/auth.php ফাইলে অথেনটিকেশন রিলেটেড কনফিগারেশন থাকে।

return [
    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],
];

এই 'web' guard মূলত ইউজারদের অথেনটিকেশন লজিক হ্যান্ডেল করে।

vendor/laravel/framework/src/Illuminate/Auth/AuthManager.php
public function createSessionDriver($name, $config) {
    // ইউজারদের জন্য সেশন ড্রাইভার তৈরি করে কিভাবে ইউজারকে রেজিস্ট্রেসন করা যাবে সেটার লজিক এখানে থাকে।
    $guard = new SessionGuard(
        $name,
        $provider,
        $this->app['session.store']
    );
}


সেশন বেজড অথেনটিকেশনের পুরা সিস্টেম Session Guard এর
ধাপ ১
... src\Illuminate\Auth\SessionGuard.php

আমরা চাইলে নিজেরই guard তৈরি করতে পারি।
class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Auth::extend('jwt', function (Application $app,
            string $name, array $config) {
            return new JwtGuard(Auth::createUserProvider(
                $config['provider']));
        });
    }
}

আমরা তৈরিকৃত Guard ক্লাসটি Illuminate\Contracts\
Auth\Guard কে ইমপ্লিমেন্ট করবে।

এই ড্রাইভারটি এখন auth.php তে দিয়ে দিব।
auth.php
'guards' => [
    'api' => [
        'driver' => 'jwt',
        'provider' => 'users',
    ],
]

আমরা আলাদা guard ক্লাস না বানিয়ে Closure দিয়েও এটা
করতে পারি।

public function boot()
{
    Auth::viaRequest('custom-token', function (Request $request) {
        return User::where('token', (string) $request->token)
            ->first();
    });
}

auth.php
'guards' => [
    'api' => [
        'driver' => 'custom-token',
    ],
],

আমরা চাইলে provider-ও তৈরি করতে পারি।
class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Auth::provider('mongo', function (Application $app, array $config) {
            return new MongoUserProvider($app->make('mongo')->connection());
        });
    }
}

'providers' => [
    'users' => [
    ]
],

কাস্টম User প্রোভাইডার বানাতে আমাদেরক Illuminate\Contracts\
Auth\UserProvider ইন্টারফেসকে ইমপ্লিমেন্ট করতে হবে এবং
আমাদেরকে বলে দিতে হবে যে, ডাটাবেস থেকে Id কিভাবে নেবে,
Token কেন, Remember টোকেন কে কিভাবে হ্যান্ডেল
করব ...

namespace Illuminate\Contracts\Auth;
interface UserProvider
{
    public function retrieveById($identifier);
    public function retrieveByToken($identifier, $token);
}

আমরা যদি কোন guard বানাই সেটা ব্যবহার করব
নিচের উপায়ে (উপরে বানানো web-admin গার্ড middleware হিসেবে):
Route::get('/flights', function () {
    //
})->middleware('auth:web-admin');

আমাদের অথেন্টিকেশন সেশন বেসড, নাকি টোকেন বেসড নাকি
Api অথেন্টিকেশন সেটা হ্যান্ডেল হয় Guard দিয়ে। আবার Guard
ব্যবহার করে UserProvider কে। কোন ইউজারের কাছ থেকে পাওয়া
টোকেন চেক করা হয় UserProvider দিয়ে।

Module 11(2) - Episode 3 Best practices - Laravel Pint 101
লারভেল Pint হল PHPCSfiner এর বিকল্প ব্যাপার।
এটা দিয়ে সহজেই কোড স্ট্যান্ডার্ড ঠিক করা যায়।
লারভেল ও তার আগের ভার্সনে Pint ব্যবহার করতে হলে ইন্সটল
করে নিতে হবে: composer require laravel/pint --dev ওই
pint শুধু dev ভার্সনেই ব্যবহৃত হয়।
কোন কাজ নেই, এই কমান্ড রান করে vendor ডিরেক্টরির
./vendor/bin/pint এই কমান্ডটি স্টাইল্ড ঠিক করে দেবে।
ব্যাস সব ঠিকঠাক।





৪০। কোডের কমান্ড রান করার আগে ./vendor/bin/pint --test কমান্ড রান করলে আমরা দেখতে পাব কোন ফাইলে কোন কোন ইস্যু আছে।

** যদি আমরা চাই যে আমরা নিজেদের মত করে কাস্টমাইজ করে নিতে পারি।

{
"preset": "symfony" -> symfony ফ্রেমওয়ার্কের কোডিং স্ট্যান্ডার্ড ব্যবহার করে কিছু ফিক্স করবে।
"preset": "psr12" -> psr12 এর কোডিং স্ট্যান্ডার্ড ব্যবহার করে কিছু ফিক্স করবে।

← করে কিছু ফিক্স করবে।
← কাস্টম রুল ব্যবহার করে স্ট্যান্ডার্ড ফিক্স করবে
"rule": {
"binary-operator-spaces": {
"default": "align_single_space_minimal"
}
}
}

আমরা চাইলে নির্দিষ্ট কোন ফাইল বা ফোল্ডারকে pint দিয়ে ফিক্স করতে পারি।
./vendor/bin/pint app/ -> app ডিরেক্টরির সকল ফাইলের স্ট্যান্ডার্ড ফিক্স করবে।



আমরা চাইলে নির্দিষ্ট কোন ফাইল বা ফোল্ডার বাদ রেখে
বাকিগুলোর উপরে pint কমান্ড অ্যাপ্লাই করতে পারি।

"pint": {"exclude": ["my-specific/folder"]} ডিরেক্টরির বাদে
বাকিগুলোকে pint কমান্ড রান করা শিখব।

composer.json
"scripts": {
"pint": "./vendor/bin/pint"
}

এবার আমরা composer pint এই কমান্ডের মাধ্যমে pint কে
রান করতে পারব।

Module 11(2) : Episode 4: Best practices: The art of
semantic versioning

প্রতিটি লাইব্রেরি, প্যাকেজ বা সফটওয়্যারের ভার্সন
নাম্বার থাকে। যেমন: ১.৫.২
Major -> Minor -> PATCH
বড় পরিবর্তন


1. MAJOR VERSION
1. Major version (MAJOR) indicates breaking changes.
2. It represents significant software modifications.
3. Major version updates can break compatibility.
4. It requires careful consideration when upgrading.
5. Major version changes imply substantial alterations.

• 5. MINOR VERSION
1. Minor version (MINOR) implies new features or enhancements.
2. It doesn't break existing functionality.
3. Minor updates offer added capabilities.
4. Safe to upgrade without major compatibility concerns.
5. Minor version changes signify incremental improvements.





1. Patch version (PATCH) signifies bug fixes and minor improvements.
2. It maintains backward compatibility with the current minor and major versions.
3. Patch updates address issues and increase stability.
4. Safe to upgrade without concerns about breaking changes.
5. Patch version changes indicate minor, non-disruptive adjustments.

Patch ভার্সন 0 থেকে শুরু হয়।
Semantic Versioning এর ওয়েবসাইট: semver.org

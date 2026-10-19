
# Module 14: Live Class 2: Rest Api Part-2
রিকুয়েস্ট, Debug করার জন্য আমরা Laravel Telescope ব্যবহার
করতে পারি।
Api তে version ম্যানেজ করা অত্যন্ত গুরুত্বপূর্ণ। web এর ক্ষেত্রে দেওয়া হবে যে এটাই নোট করবে। এবং versin ম্যানেজ করা আলোচনা।
কিন্তু Api এর ক্ষেত্রে আমরা আরকজন ক্লায়েন্ট কে যেহেতু বাটি দিচ্ছি নির্দিষ্ট ফরম্যাট ও তে দিতে আমরা যেখানে কোন লজিক চেক করলে ক্লায়েন্ট সাইডে ইস্যু তৈরি করবে, বা অ্যাপ্লিকেশনটি ব্রেক করবে, তখন Api তে ভার্সন ম্যানেজ করা অত্যন্ত গুরুত্বপূর্ণ। এভাবে ডকুমেন্টেশন তৈয়ার হতে হবে।


Api versining এর ইমপ্লিমেন্টেশনঃ

laravel-news.com/api-versioning-in-laravel-11
laravel 10
```php
RouteServiceProvider.php
public function boot()
{
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
    });

    $this->routes(function () {
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

        Route::middleware('api')
            ->prefix('api/v1')
            ->group(base_path('routes/api_v1.php'));

        Route::middleware('api')
            ->prefix('api/v2')
            ->group(base_path('routes/api_v2.php'));
    });
}
```

বিয়েঃ কোন ফোল্ডারে api, ভের্সনই করতে চাইলে internal-api.php নাম
3 external-api.php নাম

আমরা চাইলে কন্ট্রোলারও আলাদা করে তৈরি করি অনুয়ায়ী।
app>Http>Controller>API>v1
>v2

লাভেলে ১১ তে কোন RouteServiceProvider নাই। তাই
সেখানে api.php ফাইলেই আমাদের করতে হবে।





laravel 11 versioning
route RouteServiceProvider এ group (base_path('routes/api_v1.php');
api.php
Route::prefix('v1') -> group(base_path('routes/api_v2.php');

এভাবে require করতেও কাজ করবে। কিন্তু কিছু ক্ষেত্রে
prefix এর grouping এর route ফাইলগুলো
তৈরি করতে হয়।
api_v1.php
require __DIR__ . '/api_v1.php';

Route::prefix('v1') -> group(function() {
});

//
কিভাবে চেক করব কমান্ড: php artisan route:list -path=api/v1
আবার laravel 10 ও RouteServiceProvider ও আমরা যে কাজ
করছিলাম laravel 11 তেও then() প্যারামিটার সেটি পাস করতে
ফাইল থেকে withRouting() তে then() প্যারামিটার।



সূত্র: laravel-news.com/api-versioning-in-laravel-11
return Application::configure(dirname(__DIR__))
->withRouting(
->then: function () {
Route::middleware('api')
->prefix('api/v1')
->group(base_path('routes/api_v1.php'));
Route::middleware('api')
->prefix('api/v2')
->group(base_path('routes/api_v2.php'));
}





α, β রিলিজ: আমাদের প্রজেক্টটা মোটামুটি রেডি হওয়ার পর যেটা কিছু লিমিটেড মানুষের কাছে অ্যাক্সেস দেওয়া যেতে পারে B ইউজারদের কাছে "পাবলিকলি" ও ওপেন হিসেবে রিলিজ দেওয়া যেতে পারে যাতে ইউজাররা জানে যে প্রোডাক্ট এখন পুরোপুরি রেডি না। এখানে তেমন কিছু বাগ বা ইস্যু থাকতে পারে। α রিলিজের চেয়ে β রিলিজে আমরা আরেকটু কনফিডেন্ট যে, এখানে তেমন বড় বা ইস্যু নাই। এরপর আসে ফাইনাল রিলিজ যেখানে আমরা যেমন e.g. php 8.4 তখন α রিলিজ আছে।

Semantic ভার্সনিং হলো একটি ট্র্যাক রাখা যে আমরা যে ভার্সন রিলিজ দিচ্ছি তা বর্তমানে কি ধরনের চেঞ্জ হয়েছে।
আরেকটা মেইনটেইন করে এটা দিয়ে সফটওয়্যার ভার্সনিং।
API Versioning আর α, β, semantic এগুলো আলাদা।
কোন বাগ ফিক্স করার জন্য API এর ভার্সন চেঞ্জ হয় না।
বরং রিকোয়েস্ট, রেসপন্স এর ফরম্যাট চেঞ্জ হলে API এর ভার্সন চেঞ্জ হয়।
আর যখন চাইলেই কোন Api চেঞ্জ করা যায় না বরং যখন কাস্টমাররা ঠিকঠাক না তখন সেটার প্যারামিটার চেঞ্জ করতে অন্য কিছু চেঞ্জ করে তখন রিলিজ দেওয়া।

Sabar থেকে flight api এগুলা কখনোই api চেঞ্জ করে না।
Extreme কেস হলে মাঝখানে ব্যাপার বসাবে।
লার্নিং: ৩টা ক্ষেত্রে আমরা পূর্বে টোকেন কোড কপি করে নতুন API জেনারেট কী আমরা শুরু থেকেই করব।
কন্ট্রোলার Request জেনারেট সরাসরি।
API এর ডকুমেন্টেশন ইন্ট্রিগেশন। এর জন্য কোন কিছু ভুল আছে।
যেমন: Scramble + Laravel, Open AI (Swagger) Documentation.
→ কখনো আমাদের কোড কিছু কমেন্ট অ্যাড করতে হতে পারে।
Swagger ডকুমেন্টেশন বানাতে পারে।
একটি রিকোয়েস্ট থেকে কত ধরনের রেসপন্স হতে পারে সেগুলো
সবই Swagger দেখিয়ে দেয়। যেমন-(422, 404, 200 রেসপন্স)।
```consultation.megaminds.technology/docs/api#/operations/email.verify```
swagger তে গিয়ে মোটামুটি ভাল api ডকুমেন্টেশন এর জন্য অত
সাকসেসফুল হয় নয়।
পোস্টম্যান ও ডেটাবেজ আমাকে api গুলো ম্যানেজ করেন।
সহজ টেস্ট করা যায়।
আমরা লগইন ও login করলে যে token পাব সেটা
আমরা পোস্টম্যান এ script ভেরিয়েবলে সেট করে রাখলে
আমাদের আর টোকেন ম্যানুয়ালি কপি পেস্ট করতে হয়না।

Bearer Token {{token}}


POST /login


Script
var jsonData = pm.response.json();
pm.environment.set("token", jsonData.data.token);
pm.environment.set("patient_uuid", jsonData.data.uuid);


আমরা চাইলে রাউটে ও এই ভেরিয়েবলগুলো ব্যবহার করতে পারি।
```GET {{url}}/users/session:packages/{{session-package_uuid}}/availability/2024-08-24```

Ph13m
```Sanctum``` দিয়ে API অথেন্টিকেশন
```php
Schema::create('personal_access_tokens', function (Blueprint $table) {
    $table->id();
    $table->morphs('tokenable');
    $table->string('name');
    $table->string('token', 64)->unique();
    $table->text('abilities')->nullable();
    $table->timestamp('last_used_at')->nullable();
    $table->timestamp('expires_at')->nullable();
    $table->timestamps();
});
```





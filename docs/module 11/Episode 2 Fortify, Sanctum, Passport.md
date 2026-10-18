# Module 11: Episode 2 — Fortify, Sanctum, Passport

## Laravel Fortify, Sanctum ও Passport

Laravel Breeze-এর মতোই Fortify Laravel Authentication-এর সঙ্গে সম্পর্কিত। Laravel Breeze ইনস্টল করলে এর authentication routes সাধারণত `routes/auth.php` ফাইলে এবং controllers `app/Http/Controllers/Auth` ফোল্ডারে পাওয়া যায়।

### Laravel Fortify
Laravel Fortify মূলত authentication-এর backend logic প্রদান করে। Jetstream, Fortify ব্যবহার করে।

### Laravel Sanctum
Sanctum মূলত API Authentication এবং Single Page Application (SPA) Authentication-এর জন্য ব্যবহৃত হয়। এটি session-based authentication-ও সমর্থন করে।

### Laravel Passport
Laravel Passport OAuth2 স্ট্যান্ডার্ড অনুসরণ করে API Authentication প্রদান করে।

---

# Module 11: Episode 3 — Error Handling: Rendering Exceptions

## Exception Rendering

এই অধ্যায়ে আমরা Exception Rendering সম্পর্কে জানব।

### Exception Handling

Laravel-এ Exception Handling-এর জন্য বিভিন্ন ব্যবস্থা রয়েছে। Laravel-এর নতুন ভার্সনগুলোতে exception configuration সাধারণত `bootstrap/app.php` ফাইলে করা হয়।

### Exception তৈরি করা

```php
Route::get('/', function () {
    throw new Exception('Something went wrong');
});
```

এক্ষেত্রে Laravel-এর development error page-এ Stack Trace-সহ error দেখা যেতে পারে।

### Custom Exception Rendering

আমরা চাইলে নিজেদের মতো করে Exception-এর response তৈরি করতে পারি।

```php
use Illuminate\Http\Request;
use Throwable;

->withExceptions(function ($exceptions) {
    $exceptions->render(function (Throwable $e, Request $request) {
        return response()->view('test', [], 500);
    });
})
```


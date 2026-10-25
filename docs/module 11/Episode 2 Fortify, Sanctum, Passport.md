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

# Module 11 (3): Episode 2: Error handling - Rendering Exceptions   এই এপিসোডে আমরা Exception Rendering দেখব।


app > Exceptions > Handler.php
এখানে Exception handling এর কিছু লজিক আছে।
লারাভেল spatie/ignition প্যাকেজের মাধ্যমে Exception হ্যান্ডেল করে।

Route::get('/', function () {
    throw new Exception('Something went wrong!');
});
```

এই ক্ষেত্রে ব্রাউজারে বা উইন্ডোতে এই Exception এর ট্র্যাকিং বা স্ট্যাক ট্রেস (Stack Trace) দেখাবে।
**CONTEXT:** ভুল হয়েছে তা দেখতে পাব (stack trace তে)। আমরা চাইলে আমরা দেখতে পাব Request এর সাথে কাস্টম Exception থ্রো করে নিম্নরূপ:
`app > Exceptions > Handler.php`

```php
public function register()
{
    $this->renderable(function (\Exception $e, $request) {
        return response()->view('test');
    });
}
```

আমরা চাইলে নিজেদের মত করে Exception ক্লাস বানাতে পারি।

---
```php

ProductNotFoundException.php:

namespace App\Exceptions;

class ProductNotFoundException extends \Exception
{
    // ...
}
```

web.php:

```php
Route::get('/', function(){
    throw new App\Exceptions\ProductNotFoundException('Something went wrong!');
});
```

* এটিকে এবার আমাদের Exception এর Handler ক্লাসে হ্যান্ডেল করতে হবে নিম্নরূপে: প্রজেক্টের যথাস্থানে (`app > Exceptions > Handler.php`)

```php
public function register() {
    $this->renderable(function (ProductNotFoundException $e, Request $request) {
        return response()->view('test');
    });
}
```

* যেহেতু api এর ক্ষেত্রে কোনো ভুল হলে আমরা কোনো view page বা লারাভেলের ডিফল্ট এরর পেজ দেখাবো না, client এর জন্য পেজ না পাঠিয়ে json ডাটা পাঠিয়ে থাকি। সেটি আমরা নিম্নরূপ পাঠিয়ে থাকি।

```php
public function register()
{
    $this->renderable(function (NotFoundHttpException $e, Request $request) {
        if ($request->is('api/*')) {
            return response()->json([
                'message' => 'Record not found.'
            ], 404);
        }
    });
}
```
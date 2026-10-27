# Module 11 (3): Episode 3 — Guards and User Providers

## ১. Authentication Configuration

Laravel-এর `config/auth.php` ফাইলে Authentication-সম্পর্কিত configuration থাকে। এখানে Guard, User Provider এবং Password Reset-এর configuration নির্ধারণ করা হয়।

উদাহরণ:

```php
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
```

এখানে:

- `defaults` — ডিফল্ট Guard ও Password Broker নির্ধারণ করে।
- `web` — একটি Guard-এর নাম।
- `driver` — Authentication কীভাবে পরিচালিত হবে, তা নির্ধারণ করে।
- `session` — Session-based Authentication-এর জন্য ব্যবহৃত হয়।
- `provider` — কোন উৎস থেকে User-এর তথ্য পাওয়া যাবে, তা নির্ধারণ করে।
- `users` — `config/auth.php`-এ সংজ্ঞায়িত একটি User Provider-এর নাম।

## ২. Laravel-এর Session Guard

Laravel-এর Authentication Manager বিভিন্ন ধরনের Guard তৈরি ও পরিচালনা করে।

ফাইলের অবস্থান:

`vendor/laravel/framework/src/Illuminate/Auth/AuthManager.php`

Session Guard তৈরি করার ধারণাগত উদাহরণ:

```php
public function createSessionDriver($name, $config)
{
    // Guard-এর configuration অনুযায়ী
    // User Provider তৈরি করা হয়।

    $provider = $this->createUserProvider(
        $config['provider'] ?? null
    );

    $guard = new SessionGuard(
        $name,
        $provider,
        $this->app['session.store']
    );

    return $guard;
}
```

**নোট:** এটি বোঝানোর জন্য একটি সরলীকৃত উদাহরণ। Laravel-এর প্রকৃত source code version অনুযায়ী আলাদা হতে পারে।

Session-based Authentication-এর মূল কাজগুলো `SessionGuard` class পরিচালনা করে।

ফাইলের অবস্থান:

`vendor/laravel/framework/src/Illuminate/Auth/SessionGuard.php`

## ৩. Custom Guard তৈরি করা

Laravel-এ প্রয়োজন অনুযায়ী Custom Guard তৈরি করা যায়। উদাহরণস্বরূপ, আমরা JWT ব্যবহার করে Authentication পরিচালনা করতে চাইলে একটি Custom Guard তৈরি করতে পারি।

`app/Providers/AppServiceProvider.php` ফাইলে:

```php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Foundation\Application;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Auth::extend(
            'jwt',
            function (
                Application $app,
                string $name,
                array $config
            ) {
                $provider = Auth::createUserProvider(
                    $config['provider'] ?? null
                );

                return new JwtGuard($provider);
            }
        );
    }
}
```

এখানে `JwtGuard` একটি উদাহরণস্বরূপ Custom class। এটি আমাদের তৈরি করতে হবে এবং প্রয়োজনীয় Authentication logic implement করতে হবে।

Custom Guard-কে `Illuminate\Contracts\Auth\Guard` interface implement করতে হবে। Remember-me functionality প্রয়োজন হলে `Illuminate\Contracts\Auth\StatefulGuard`-ও প্রাসঙ্গিক হতে পারে।

### ৩.১. Custom Guard Configuration

`config/auth.php` ফাইলে:

```php
'guards' => [
    'api' => [
        'driver' => 'jwt',
        'provider' => 'users',
    ],
],
```

এখানে `jwt` হলো Custom Guard-এর driver name। `Auth::extend()`-এর মাধ্যমে এই driver register করা হয়েছে।

## ৪. Closure ব্যবহার করে Custom Request Guard

সব সময় আলাদা Guard class তৈরি করার প্রয়োজন হয় না। সাধারণ token-based Authentication-এর জন্য `Auth::viaRequest()` ব্যবহার করে একটি Request Guard তৈরি করা যায়।

`AppServiceProvider.php` ফাইলে:

```php
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

public function boot(): void
{
    Auth::viaRequest(
        'custom-token',
        function (Request $request) {
            $token = $request->bearerToken();

            if (! $token) {
                return null;
            }

            return User::where('token', $token)->first();
        }
    );
}
```

এখানে `bearerToken()` Request-এর Authorization header থেকে Bearer token সংগ্রহ করে।

**গুরুত্বপূর্ণ:** এটি শেখার জন্য একটি সরলীকৃত উদাহরণ। বাস্তব প্রজেক্টে plain-text token সংরক্ষণ না করে নিরাপদ token verification এবং token expiry-এর ব্যবস্থা করতে হবে।

### ৪.১. Request Guard Configuration

`config/auth.php` ফাইলে:

```php
'guards' => [
    'api' => [
        'driver' => 'custom-token',
    ],
],
```

এখানে `custom-token` হলো `Auth::viaRequest()`-এ register করা driver-এর নাম।

## ৫. Custom User Provider

Laravel-এ User Provider-এর কাজ হলো Authentication-এর জন্য User-এর তথ্য সংগ্রহ করা। সাধারণত এটি Database বা অন্য কোনো data source থেকে User-এর তথ্য নিয়ে আসে।

আমরা চাইলে Custom User Provider তৈরি করতে পারি। উদাহরণস্বরূপ, MongoDB থেকে User-এর তথ্য সংগ্রহ করার জন্য একটি Custom Provider তৈরি করা যেতে পারে।

`AppServiceProvider.php` ফাইলে:

```php
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Foundation\Application;

public function boot(): void
{
    Auth::provider(
        'mongo',
        function (Application $app, array $config) {
            return new MongoUserProvider(
                $app->make('mongo')->connection()
            );
        }
    );
}
```

এখানে `MongoUserProvider` একটি Custom class, যা আমাদের তৈরি করতে হবে।

### ৫.১. User Provider Configuration

`config/auth.php` ফাইলে:

```php
'providers' => [
    'users' => [
        'driver' => 'eloquent',
        'model' => App\Models\User::class,
    ],

    'mongo_users' => [
        'driver' => 'mongo',
    ],
],
```

এখানে `mongo` driver-টি `Auth::provider()` দিয়ে register করা হয়েছে।

### ৫.২. UserProvider Interface

Custom User Provider তৈরি করতে `Illuminate\Contracts\Auth\UserProvider` interface implement করতে হয়।

এর গুরুত্বপূর্ণ method-গুলো হলো:

- `retrieveById()` — User-এর identifier দিয়ে User খুঁজে বের করে।
- `retrieveByToken()` — Remember token দিয়ে User খুঁজে বের করে।
- `updateRememberToken()` — User-এর Remember token আপডেট করে।
- `retrieveByCredentials()` — Login credentials অনুযায়ী User খুঁজে বের করে।
- `validateCredentials()` — প্রদত্ত credentials যাচাই করে।
- `rehashPasswordIfRequired()` — প্রয়োজন হলে password hash পুনরায় তৈরি করে।

Interface-এর ধারণাগত উদাহরণ:

```php
namespace Illuminate\Contracts\Auth;

interface UserProvider
{
    public function retrieveById($identifier);

    public function retrieveByToken(
        $identifier,
        $token
    );

    public function updateRememberToken(
        Authenticatable $user,
        $token
    );

    public function retrieveByCredentials(
        array $credentials
    );

    public function validateCredentials(
        Authenticatable $user,
        array $credentials
    );
}
```

**নোট:** এটি মূল interface-এর সম্পূর্ণ সংজ্ঞা নয়। Laravel-এর সংস্করণ অনুযায়ী প্রয়োজনীয় method-এ পার্থক্য থাকতে পারে।

## ৬. Guard এবং Middleware ব্যবহার

কোনো Route-এ নির্দিষ্ট Guard ব্যবহার করতে চাইলে `auth` middleware-এর সঙ্গে Guard-এর নাম দেওয়া যায়।

```php
Route::get('/flights', function () {
    return 'Flights page';
})->middleware('auth:web-admin');
```

এখানে `web-admin` নামে একটি Guard আগে `config/auth.php` ফাইলে configure করা থাকতে হবে।

## ৭. Guard এবং User Provider-এর মধ্যে পার্থক্য

**Guard:** User কীভাবে Authentication সম্পন্ন করবে, তা পরিচালনা করে। যেমন Session-based বা Token-based Authentication।

**User Provider:** Authentication-এর জন্য User-এর তথ্য কোথা থেকে সংগ্রহ করা হবে এবং credentials কীভাবে যাচাই করা হবে, তা পরিচালনা করে।

সহজভাবে:

- Guard নির্ধারণ করে Authentication কীভাবে হবে।
- User Provider নির্ধারণ করে User-এর তথ্য কীভাবে পাওয়া ও যাচাই করা হবে।

---

# Module 11 (2): Episode 3 — Best Practices: Laravel Pint 101

## ১. Laravel Pint কী?

Laravel Pint হলো PHP কোডের Coding Style ঠিক করার একটি Code Formatter। এটি PHP-CS-Fixer-এর ওপর ভিত্তি করে তৈরি।

Pint ব্যবহার করে কোডের formatting, indentation, spacing এবং অন্যান্য coding style স্বয়ংক্রিয়ভাবে ঠিক করা যায়।

## ২. Laravel Pint ইনস্টলেশন

Laravel-এর যেসব প্রজেক্টে Pint আগে থেকে ইনস্টল করা নেই, সেখানে নিচের কমান্ড ব্যবহার করা যায়:

```bash
composer require laravel/pint --dev
```

এখানে `--dev` ব্যবহার করা হয়েছে, কারণ Pint সাধারণত development-এর সময় ব্যবহৃত হয়।

## ৩. Laravel Pint চালানো

প্রজেক্টের root directory থেকে নিচের কমান্ড চালাতে হবে:

```bash
./vendor/bin/pint
```

Windows PowerShell-এ সাধারণত এভাবে চালানো যায়:

```powershell
vendor/bin/pint
```

এটি প্রজেক্টের PHP ফাইলগুলোর coding style পরীক্ষা করে প্রয়োজনীয় formatting পরিবর্তন করবে।

## ৪. Pint-এর মাধ্যমে সমস্যা পরীক্ষা করা

কোনো ফাইলে পরিবর্তন করার আগে কোন কোন ফাইলে formatting issue আছে তা দেখতে নিচের কমান্ড ব্যবহার করা যায়:

```bash
./vendor/bin/pint --test
```

Windows PowerShell:

```powershell
vendor/bin/pint --test
```

এই কমান্ড শুধু issue পরীক্ষা করবে; কোড পরিবর্তন করবে না।

## ৫. Pint-এর Preset ব্যবহার

Pint বিভিন্ন coding style preset সমর্থন করে। যেমন:

- `laravel`
- `psr12`
- `symfony`

কোনো preset ব্যবহার করতে প্রজেক্টের root directory-তে `pint.json` ফাইল তৈরি করা যায়।

### PSR-12 Preset

```json
{
    "preset": "psr12"
}
```

### Symfony Preset

```json
{
    "preset": "symfony"
}
```

এই configuration অনুযায়ী Pint সংশ্লিষ্ট coding style অনুসরণ করবে।

## ৬. Custom Rules ব্যবহার

আমরা চাইলে `pint.json` ফাইলে custom rule-ও নির্ধারণ করতে পারি।

```json
{
    "preset": "laravel",
    "rules": {
        "binary_operator_spaces": {
            "default": "single_space"
        }
    }
}
```

এখানে binary operator-এর আশপাশে একটি space রাখার নিয়ম নির্ধারণ করা হয়েছে। Pint-এর configuration-এ rule-এর নাম ও value সমর্থিত হতে হবে।

## ৭. নির্দিষ্ট File বা Directory-তে Pint চালানো

শুধু `app` directory-এর ফাইলগুলো format করতে:

```bash
./vendor/bin/pint app/
```

নির্দিষ্ট একটি ফাইল format করতে:

```bash
./vendor/bin/pint app/Models/User.php
```

Windows PowerShell-এও একই path ব্যবহার করা যায়:

```powershell
vendor/bin/pint app/Models/User.php
```

## ৮. নির্দিষ্ট Directory বাদ দেওয়া

কোনো নির্দিষ্ট directory-কে formatting থেকে বাদ দিতে চাইলে `pint.json` ফাইলে `exclude` configuration ব্যবহার করা যায়।

```json
{
    "preset": "laravel",
    "exclude": [
        "my-specific/folder"
    ]
}
```

এখানে `my-specific/folder` directory-টি Pint-এর formatting থেকে বাদ দেওয়ার জন্য নির্দিষ্ট করা হয়েছে।

## ৯. Composer Script দিয়ে Pint চালানো

`composer.json` ফাইলের `scripts` অংশে Pint-এর command যোগ করা যায়।

```json
{
    "scripts": {
        "pint": "@php vendor/bin/pint"
    }
}
```

এরপর Pint চালাতে:

```bash
composer pint
```

এতে সরাসরি `vendor/bin/pint` path না লিখেও Composer-এর মাধ্যমে Pint চালানো যাবে।

---

# Module 11 (2): Episode 4 — Best Practices: The Art of Semantic Versioning

## ১. Semantic Versioning কী?

প্রতিটি Software, Library বা Package-এর একটি Version Number থাকে। Semantic Versioning বা SemVer হলো software-এর version number নির্ধারণের একটি নিয়ম।

উদাহরণ:

`1.5.2`

Semantic Versioning-এর সাধারণ Format:

`MAJOR.MINOR.PATCH`

এখানে:

- `MAJOR` — Breaking changes
- `MINOR` — নতুন feature বা functionality
- `PATCH` — Bug fixes ও ছোটখাটো সংশোধন

## ২. Major Version

Major version-এ এমন পরিবর্তন করা হয়, যা আগের version-এর সঙ্গে backward compatibility ভেঙে দিতে পারে।

উদাহরণ:

`1.5.2` → `2.0.0`

Major version পরিবর্তনের বৈশিষ্ট্য:

1. Breaking changes থাকতে পারে।
2. API বা function-এর ব্যবহার পরিবর্তিত হতে পারে।
3. পুরোনো কোড নতুন version-এ কাজ নাও করতে পারে।
4. Upgrade করার আগে compatibility যাচাই করা উচিত।
5. Migration বা code modification প্রয়োজন হতে পারে।

## ৩. Minor Version

Minor version-এ সাধারণত নতুন feature বা functionality যোগ করা হয়, তবে বিদ্যমান public API-এর backward compatibility বজায় রাখা হয়।

উদাহরণ:

`1.5.2` → `1.6.0`

Minor version-এর বৈশিষ্ট্য:

1. নতুন feature যোগ করা হয়।
2. বিদ্যমান functionality বজায় রাখা হয়।
3. নতুন capability যুক্ত হতে পারে।
4. সাধারণত backward-compatible হয়।
5. নতুন feature ব্যবহারের জন্য অতিরিক্ত configuration প্রয়োজন হতে পারে।

## ৪. Patch Version

Patch version-এ সাধারণত bug fix, security fix এবং ছোটখাটো সংশোধন করা হয়।

উদাহরণ:

`1.5.2` → `1.5.3`

Patch version-এর বৈশিষ্ট্য:

1. Bug fix করা হয়।
2. Software-এর stability উন্নত করা হয়।
3. সাধারণত নতুন public feature যোগ করা হয় না।
4. Backward compatibility বজায় রাখা হয়।
5. বিদ্যমান functionality পরিবর্তন না করেই সমস্যা সমাধান করা হয়।


# Module 11 (3) : Episode 3 : Error handling - Reporting exceptions

# Reporting exception:
যখন আমাদের অ্যাপ্লিকেশন-এ কোন এরর হয় আমরা চাইলে সেটাকে log করে রাখতে পারি বা কোন এরর ট্র্যাকিং তুলে সেটাকে স্টোর করতে পারি। পপুলার এরর ট্র্যাকিং টুলগুলো হলো:
Flare, Bugsnag, Sentry ইত্যাদি। এরর সম্পর্কিত বিস্তারিত তথ্য: কি কারণে এরর হয়েছে, কখন হয়েছে সব এই টুলগুলো থেকে দেখা যাবে বাই ডিফল্ট লারাভেল এররগুলোকে log করে রাখে। 

এরর ট্র্যাকিং টুল sentry ব্যবহারের জন্য ওদের সাইটে একটা একাউন্ট খুলতে হবে। সেই sentry-র ড্যাশবোর্ডেই আমরা এরর গুলো দেখতে পাব। এছাড়া Handler ক্লাসে reportable মেথডে সেটা বলে দিতে হবে।

```php
app > Exceptions > Handler.php
public function register()
{
    $this->reportable(function (Throwable $e) {
        Integration::captureUnhandledException($e);
    })->stop();
}
```

stop(): এর সাথে log করা stop হয়ে যাবে। অর্থাৎ শুধুমাত্র রিপোর্ট করার কাজ করবে।

এছাড়া এটি .env এ ইনক্লুড করতে হবে।

.env লোকাল এররের দরকার হবে না, শুধুমাত্র প্রডাকশন ডোমেইনে DSN ব্যবহার করব।
SENTRY_LARAVEL_DSN = https://...

এর পর টেস্ট করার জন্য এই কমান্ড চালাব:php artisan sentry:test

আমরা চাইলে নির্দিষ্ট কোন এররের জন্য আমাদের এরর রিপোটিং টুলটা ব্যবহার করতে পারি। তবে এটা সাধারণত করা হয় না।
```php
public function register()
{
    $this->reportable(function ProductNotFoundException $e) {
        Integration::captureUnhandledException($e);
    });
}
```

আমরা যদি চাই, কোন একটা রিপোর্ট sentry তে না যাক সেটাও বলে দিতে পারি।
```php
Handler.php
protected $dontReport = [
    ProductNotFoundException::class,
];
```

আমরা চাইলে আমাদের কাস্টম Exception ক্লাসে আমাদের বিষয়টি এর Rendering এর লজিক বলে দিতে পারি। 

```php
class ProductNotFoundException extends Exception
{
    // ...
    public function report()
    {
        // এর ভেতরে আমরা আমাদের সঠিক বলে দিব
    }
    public function render (Request $request)
    {
        return response (*); // Custom Logic বলতে পারি
    }
}
```

* এক্ষেত্রে আমাদের আর এই Exception হ্যান্ডলার ক্লাসে Handler ক্লাসে কিছু বলে দিতে হবে না।
Module 11: Live Class 2: Understanding Middleware (অবজারভেশন)
Sanctum এর ব্যবহার: Backend API
```PHP
Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

---

`AuthController.php`
```php
class AuthController {
    public function login(LoginRequest $request, AuthService $authService): JsonResponse
    {
        $validatedData = $request->validated();
        
        if (! $authService->attemptLogin($validatedData)) {
            return response()->json([
                'success' => false,
                'message' => 'Login credentials do not match',
            ], 401);
        }

        $user = auth()->user();

        if ($user->isSuspended()) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is suspended',
            ], 403);
        }

        $token = $authService->getFreshApiToken($user);
        // ...
    }
}


---

LoginRequest.php
class LoginRequest ... {
    public function rules()
    {
        return [
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
            'password' => ['required', Rules\Password::defaults()],
        ];
    }
}
```

`AuthService.php`
```php
public function attemptLogin (array $credentials) {
    return Auth::attempt($credentials); // লারাভেলের ফাংশন
}
```

`AuthController.php`
```php
public function login (...) {
    // ...
    $token = $authService->getFreshAPIToken($user);
    return response()->json([
        'success' => true,
        'message' => 'Login successfully',
        'data' => [
            'token' => $token->plainTextToken,
            ...(new MinimalUserResource($user))->toArray($request),
        ],
    ]);
}
```


AuthService.php

```PHP
public function getFreshAPSToken (User $user)
{
    $user->tokens()->delete(); // ইউজারের আগের টোকেনগুলো রিমুভ করা হচ্ছে যাতে multiple ডিভাইস থেকে লগইন করতে না পারে (অ্যাপ্লিকেশনের সিনারিও অনুযায়ী)
    
    $user->update([
        'last_login_at' => now()
    ]);
    
    return $user->createToken('token');
    // এই মেথড Sanctum প্রোভাইড করেছে এবং এজন্য User মডেলে HasApiTokens Trait টি ব্যবহার করা হয়েছে।
}

`trait HasApiTokens {`
```php
public function createToken (string $name, array $abilities = ['*'], DateTimeInterface ... )
{
    $plainTextToken = $this->generateTokenString();
    
    $token = $this->tokens()->create([
        'name' => $name,
        'token' => hash('sha256', $plainTextToken),
        'abilities' => $abilities,
        'expires_at' => $expiresAt
    ]);
    
    return new NewAccessToken($token, $token->getKey().'|'.$plainTextToken);
}
```

ইউজারকে লগইন করালে আমরা টোকেনটি দেখতে পাবো।

ইউজার লগইন করার পর প্রাপ্ত টোকেনকে পরবর্তী রিকোয়েস্টে Authorization হেডার এর মাধ্যমে Bearer Token আকারে পাঠাতে হবে।   ওয়েবের অ্যাপ্লিকেশনগুলোর ক্ষেত্রে রিকোয়েস্ট হলো ஸ்டেটফুল (Stateful), সাইটটিতে কুকি ব্যবহার করে সেশন হ্যান্ডেল করা হয়। তবে এপিআই (API) রিকোয়েস্টে প্রতিটি রিকোয়েস্ট আলাদা কিন্তু কিছু স্টেট মেইনটেইন করতে হয়।   সেই সাথে ইউজারকে মনে বা চিনতে পারি কারণ ব্যাকএন্ড থেকে সেশন বা কুকিতে সেশন আইডি পাঠানো হয়। ব্রাউজার কুকি বা সেশন আইডি পাঠানো হয়। ব্রাউজার থেকে যখন রিকোয়েস্ট পাঠায়, তখন সেই আইডি দিয়ে ব্যাকএন্ড ইউজারকে আইডেন্টিফাই করে।   আইডি দিয়ে ইউজারকে ভেরিফাই করে।   আইডি, timestamp কনভার্ট করে random টোকেন জেনারেট করা যায়।  


 # Module 11: Conceptual Class (Middleware)  


  Middleware হলো পেয়াজের লেয়ারের মত চিন্তা করা যায়। বাইরে দিক থেকে ভেতরে দিকে কোর (Core) জিনিসটি থাকে।   মূল জিনিসে যাওয়ার আগে মাঝের যে জিনিসগুলো ক্রস করে আসতে হয় সেইটেই Middleware।   




  লারাভেলের Middleware চেক ও Request, Response লাইফসাইকেল:\

```PHP
class Kernel {
    protected function sendRequestThroughRouter($request)
    {
        $this->app->instance('request', $request);
        Facade::clearResolvedInstances();
        return (new Pipeline($this->app))
            ->send($request)
            ->through($this->app->shouldSkipMiddleware() ? [] : $this->middleware)
            ->then($this->dispatchToRouter());
    }
}
```

* প্রথমে মিডলওয়্যার পাস করলে তারপর রাউটে যায়।
* এরপর `$this->dispatchToRouter()` রাউটের মাধ্যমে `Route Handler`-এ চলে যায়।

---

### **মিডলওয়্যারের কাজ:**
* **Request Validation $\rightarrow$ Before Middleware** দিয়ে করব।
* **Request Modification** $\rightarrow$ Request মিডলওয়্যার দিয়ে করব।
* **Response Modification $\rightarrow$ After Middleware** দিয়ে করব।
* রিকোয়েস্টগুলো যার যার ভেতর দিয়ে আবার ব্যাক করবে। তার ভেতর দিয়ে যাওয়ার সময় মিডলওয়্যারগুলো কোরের দিকে যেতে থাকে।

---

### **Middleware এর প্রকারভেদ:**
* **Before middleware**
* **After middleware**

* কন্ট্রোলারে কোন রিকোয়েস্ট যাওয়ার আগে আমরা যদি কোন কাজ করতে চাই, সেটাই **Before Middleware**।
* আর কন্ট্রোলার থেকে আসা রেসপন্সকে রাউটে যাওয়ার আগে চাইলে সেটা **After Middleware** দিয়ে করতে পারব।

---

নিচে থেকে থেকে কিছু ডেটা নিয়ে এসে পরেরগুলোর কাছে পাস করতে হয়।   ফাইনাল রেজাল্ট আসার পর আবার রিটার্ন করতে হয়।   পূর্বের মিডলওয়্যার শর্ত দিনে রিটার্ন করবে, এখানে অবজেক্ট শেষ হওয়ার পরে পাস করা শুরু করতে পারে।   ```PHP
function first ($arr) {
    $arr[] = 1;
    return $arr;
} ```

```php
function second ($arr) {
    $arr[] = 2;
    return $arr;
} // [1, 2]
```

```php
function finish ($arr) {
    $arr[] = 3;
    return $arr;
} // [1, 2, 3]
```

---

```php
$result = first([]); // [1, 2, 3]
var_dump($result); // [1, 2, 3]
```

```php
function first ($arr) {
    $arr[] = 1;
    return $arr;
}
```

```php
function second ($arr) {
    $arr[] = 2;
    return $arr;
}
```


```php
function finish ($arr) {
    $arr[] = 3;
    return $arr;
}
$result = first([]);
var_dump($result); // [3, 2, 1]
```




Covid 4th Class:
HomeController.php  
 Home.vue   
 এরপর আমরা tntsearch ব্যবহার করে searching টি ইমপ্লিমেন্ট করব।   আমরা কোনো চেঞ্জ করলে অন্য কোথাও তার effect পড়বে কিনা তা দেখতে পারি test case এর মাধ্যমে।   আমরা easypick এর datepicker ব্যবহার করব, যেখানে আমরা শুরুখানি disable করে দেব। আর যেগুলোতে স্লট ফাঁকা নাই সেগুলোতে disable করে নেব।   DB::transaction $\rightarrow$ ফেল হলে রোলব্যাক (rollback) করে।   Schedule $\rightarrow$ এর জন্য একটা কমান্ড তৈরি করব।   PHPSendVaccinationReminderJob::dispatch($registration);
```

* একসাথে ১০ হাজার মেইল পাঠাতে হবে, ওটা পাঠানোর পর hang হয়ে যাবে job না ব্যবহার করলে। একসাথে মেইল job দিয়ে পাঠিয়ে দেব, ভেতরে প্রসেসিং চলতে থাকবে।
* `php artisan send:`
* `Valet`, `Mailtrap` $\rightarrow$ মেইল পাঠানোর জন্য ব্যবহার করা যায়।


```php
SendVaccinationReminderJob implements ShouldQueue
{
    public function handle()
    {
        Mail::to(...);
        // ...
    }
}
```


একসাথে ১০ হাজার মেইল পাঠাতে গেলে সার্ভার হ্যাং (hang) হয়ে যায়, তাই ShouldQueue ব্যবহার করতে হয়।

এভাবে Notification ব্যবহার করলে ব্যাকগ্রাউন্ডে প্রসেস হতে থাকে।

সব কাজ হতে থাকবে, কিন্তু নোটিফিকেশন ব্যাকগ্রাউন্ডে প্রসেস হবে।

সব কাজ যেহেতু ডাটাবেজ বা সার্ভারে রান করতে হয়, তাই route:console, php -> ওই ফাইল থেকে আমরা কমান্ডকে প্রতিদিন রান করার শিডিউল সেট করতে পারি।

যেমন bootstrap > app.php থেকে:

withSchedule(function ($schedule) {

$schedule->command(...)->everyMinute();

// ...

})

VPS সার্ভারে (cPanel ওর পরিপূরক) Laravel প্রজেক্ট হোস্ট করলে প্রতিটি প্রজেক্টের জন্য ক্রন জব (cron job) বা শিডিউল রান করতে হয়।




মিডলওয়্যারগুলো Kernel ফাইলে ডিফাইন করা থাকে যা মূলত একটি অ্যারে।   PHP... Kernel {
    protected $middleware = [
        \App\Http\Middleware\TrustProxies::class,
        \Illuminate\Http\Middleware\HandleCors::class,
        // ...
    ]
}
```

* প্রতিটি মিডলওয়্যারের একটা `handle()` মেথড থাকে।

```php
class TrustProxies {
    public function handle(Request $request, Closure $next)
    {
        $request::setTrustedProxies([], $this->getTrustedHeaderNames());
        $this->setTrustedProxyIpAddresses($request);
        
        return $next($request); // একে যে কল করেছে তার কাছে রেসপন্সটি রিটার্ন করেছে।
    }
}
```

---

* `handle` মেথডে দুটো ইনপুট থাকে $\rightarrow$ 
  1. `$request` ভ্যালুটি, যা কল করবে। 
  2. পরবর্তী কোন মেথডকে সে কল করবে। 
* এই মেথড আগে নিজের কাজ করে, এরপর পরের জনকে কল করে। 
* এই জিনিসটা আমরা পূর্বে ফাংশনে ইমপ্লিমেন্ট করতে পারি নিম্নরূপ:

```php
class FirstMiddleware {
    function handle ($arr) {
        $arr = second ($arr);
        $arr[] = 1;
        return $arr;
    }
}

class SecondMiddleware {
    function handle ($arr) {
        $arr = finish ($arr);
        $arr[] = 2;
        return $arr;
    }
}

class FinishMiddleware {
    function handle ($arr) {
        $arr[] = 3;
        return $arr;
    }
}

$middlewares = [
    FirstMiddleware::class,
    SecondMiddleware::class,
    FinishMiddleware::class,
];

foreach ($middlewares as $middleware) {
    // $middleware instance, handle()
}
```

আমরা এথেকে চাইলেই মিডলওয়্যারগুলোকে কল করার অর্ডার চেঞ্জ করতে পারি। বর্তমানে প্রতিটি handle() মেথড থাকতে হবে।Before Middleware $\rightarrow$ এটি আগে নিজের কাজ করবে। তারপর পরের জনকে কল করবে অর্থাৎ নিজের কাজ করা শেষের পর পরের জনকে কল করে। পরের জনের কাজ শেষ হওয়ার পর আবার আগের জনের কাছে পাঠিয়ে দেয়।After Middleware $\rightarrow$ আগে কলিংকে পরের জনের কাছে পাস করে দেয়। পরের জনের থেকে পাওয়া রেজাল্ট নিয়ে কাজ করে। এরপর সে চাইলে সেই কাজকে রিটার্ন করতে পারে বা পরিবর্তিত রুপটিকে সে রিটার্ন করতে পারে।Before Middleware $\rightarrow$ রিকোয়েস্ট নিয়ে কাজ করা হয়।After Middleware $\rightarrow$ রেসপন্স নিয়ে কাজ করা হয়।আমরা ক্লায়েন্টকে যে রেসপন্স পাঠাব, তার একটা স্ট্রাকচার থাকতে হবে। যদি থাকে রেসপন্সে Content-Type: application/json পাঠাতে হবে।আমরা ওটা কন্ট্রোলার থেকে না করে After Middleware দিয়ে করতে পারি।PHPreturn response($content)
    ->header('Content-Type', $type);
পরের পেজে explain:আমরা যখন রিকোয়েস্ট করি, অর্থাৎ অ্যাকাউন্ট চেক দরকার (-ন পাস)।এখানে কোনো false রিটার্ন করব না। অর্থাৎ অ্যাকাউন্ট চেক করব কি না।নাইলে আমরা রিকোয়েস্টটা next করতে পারব না। কিন্তু অ্যাকাউন্ট চেক লাগলে আমরা চেক করব অ্যাকাউন্ট আছে কি না এবং তাছাড়াও তার অ্যাকাউন্ট সচল বা ডিবল হয়ে আছে কি না, থাকলে আমরা ভুল রিটার্ন করে দেব।





Before Middleware এর উদাহরণ:
PHP
namespace App\Http\Middleware; > AccountCheck.php
declare (strict_types = 1);
```[cite: 15] (এটি একটি মাল্টিটেনেন্ট অ্যাপ্লিকেশন)

```php
class AccountCheck {
    use ChecksRoutes;

    public function handle (Request $request, Closure $next): mixed
    {
        if (! $this->requiresAccount($request)) {
            return $next($request);
        }

        try {
            if ($request->user()->hasActiveAccessToAccount(account())) {
                return $next($request);
            }
        } catch (NoAccountIDException | NoAccountException | ModelNotFoundException) {
            // ...
        }

        $redirectRoute = route('accounts.index');

        if ($request->expectsJson()) {
            return response()->json([
                'indirectTo' => $redirectRoute
            ], 302);
        }

        return redirect($redirectRoute);
    }

    protected function requiresAccount($request): bool
    {
        if (! $request->user()) {
            return false;
        }

        if (static::namedRouteWithoutAccount($request)) {
            return false;
        }

        return true;
    }
}
```

* **Kernel** মোডে মিডলওয়্যার লিস্ট থাকে, যেখান থেকে পরে পেজে কল হচ্ছে।
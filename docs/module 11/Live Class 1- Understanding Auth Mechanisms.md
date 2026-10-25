Module 11: Live Class 1: Understanding Auth Mechanisms (অবজারভেশন)

```PHP
Http > Controllers > Auth > RegisteredUserController.php

public function store (...) {
    $user = DB::transaction(function () use ($request) {
        $isSeller = (bool) $request->is_seller;
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'present_address' => $request->present_address,
            'is_seller' => $isSeller,
            'is_seller_account_provided' => false,
        ]);

        if ($isSeller) {
            $categoryIds = Category::whereIn('uuid', $request->categories)->pluck('id');
            $user->categories()->sync($categoryIds);

            $locationIds = Location::whereIn('uuid', $request->locations)->pluck('id');
            $user->locations()->sync($locationIds);
        }

        return $user;
    });
}
```

```
event(new Registered ($user));
Auth::login($user);
```

আমরা মিডলওয়্যারের মাধ্যমে ইউজারের ইমেইল ভেরিফাইড কিনা তা চেক করে, তারপর রাউটে এক্সেস দিতে পারি[cite: 14]।

```php
Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('phone-verification', [PhoneVerificationController::class, 'getSendOTPP...']);
});
```

Login এর সময় যেন spam ইউজার বা যাতে বারবার রিকোয়েস্ট করতে না পারে, আমরা সেই rate limit টা চেক করতে পারি নিম্নরূপে:

`LoginRequest.php`
```php
public function authenticate()
{
    $this->ensureIsNotRateLimited(); // একটি লারাভেল প্রদত্ত ফাংশন
}
```

ইউজারের সাসপেন্ডেড কিনা তা চেক করা হয় `is_suspended` কলাম দিয়ে:
```php
if (User::where('email', $this->get('email'))->where('is_suspended', true)->exists())
```

ইউজারের অথেন্টিকেটেড হলে তার সেশন ক্রিয়েট করে 
```php
AuthenticatedSessionController.php (અથবা LoginRequest $request):
public function store (LoginRequest $request) {
    // ...
    $request->session()->regenerate();
    
    // ...
}
```

রেট লিমিট? এক্ষেত্রে কোন আইপি থেকে কয়বার সাইন ইন রিকুয়েস্ট পাঠানো হয়েছে, তা কনটপিক রাখে। যাতে DDoS অ্যাটাক প্রতিরোধ করা যায়।

**Remember me:**
যাতে সেশন টোকেন বা ব্রাউজারের কুকি তে থেকে যায়। আর ওটার লাইফটাইম আমরা চেক করে লগইন করার পর ৫০ বাকি সেশনগুলো (যেগুলোতে লগইন থাকে) ফিক্সড করতে পারি (যেমন সেশন নাম: `token : kaz360-session`)।

Remember me দেওয়ার পর ব্রাউজারে কুকি টা ক্রিয়েট হয়, যা আমাদের ব্রাউজারে লগইন করা লাগবে না কারণ অটোমেটিক কুকি থাকে। `remember_token` নামে একটা টোকেন সাথে ১ জীবনেও সেভ হয়। এটা কুকি হিসেবে সেভ হয়। এটা কুকির সাথে ম্যাচ করা হয়।


কন্টিনিউটার:

Browser $\rightarrow$ POST /login (store session) $\rightarrow$ Laravel Application   
rowser $\leftarrow$ response { session ID } save cookie $\leftarrow$ Laravel Application  
 Browser $\rightarrow$ request with cookie (check session) $\rightarrow$ Laravel Application   
 Browser $\leftarrow$ response $\leftarrow$ Laravel Application   
 .env ফাইলে SESSION_DRIVER = file দিলে ফাইল সেভ হবে storage > framework > sessions > ...  
  redis, memcache দ্রুত রেসপন্স দেয়। এর জন্য VPS এ রেডিস চালাতে হবে।   
  Scaling করার জন্য যদি আমরা multiple অ্যাপ্লিকেশন সার্ভার ব্যবহার করি, তবে SESSION_DRIVER ফাইলে রাখতে পারব না। তখন DB / Redis এ রাখতে হবে। (User $\rightarrow$ Load Balancer $\rightarrow$ App Server 1 & App Server 2 $\rightarrow$ DB/Redis, AWS S3)   সাধারণত ইউজার ও অ্যাডমিনের জন্য ভিন্ন ভিন্ন টেবিল লাগে না। তবে যদি তাদের অথেন্টিকেশন লজিক ভিন্ন হয় বা একটাতে nosql অন্যটাতে mysql ব্যবহার করা হয় সেক্ষেত্রে আলাদা করা লাগতে পারে। তবে এগুলো role দিয়েই manage করা সম্ভব। admins, users দুটো টেবিল সাধারণত লাগে না। middleware দিয়েই ওগুলো করা যায়।   





# মিডলওয়্যার তৈরি:
নিচের মতো মিডলওয়্যার auth মিডলওয়্যারের ভেতরে:

Route::middleware(['check.phone.verification'])->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    // ...
});
```

`Middleware > CheckPhoneVerification.php`
```php
class CheckPhoneVerification
{
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user() && ! auth()->user()->isPhoneVerified()) {
            return to_route('phone.verification.page');
        }
        return $next($request);
    }
}
```

CSRF টোকেন ব্রাউজার ছাড়া অন্য কোনোভাবে দিলে কাজ করে না। কারণ কুকিতেও একটা `X-CSRF-TOKEN` থাকে। এই দুটো ম্যাচ করানো হয়। CSRF টোকেন ভেরিফাই করার জন্য লারাভেলে রয়েছে `VerifyCsrfToken` নামে মিডলওয়্যার।

* `ethicalads.io` $\rightarrow$ অ্যাড দেখানোর জন্য ইউজারের ইনফো ট্র্যাক না করে।
* `usefathom.com`
---!


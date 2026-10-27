# Module 11 (3): Episode 5: Error handling - Logging
 এরর ছাড়াও আমাদের বিভিন্ন ধরনের ইনফরমেশন ট্র্যাক 
 রাখার প্রয়োজন পড়তে পারে। এর মাধ্যমে Log করতে পারি। 
 কোন একটা কাজ successfully হলো কিনা সেই জিনিসগুলোও
আমরা log করতে পারি।   ধরা যাক, আমাদের অ্যাপ্লিকেশনে 
একটা অথেন্থিকেশন থ্রেড করা আছে, যে সব ইউজার সব পথে
ভিজিট করতে পারবে না। যেমন কোন রুটে যদি ওরকম 
পারমিশন না থাকে। না হলে কোনো হ্যাকার যদি বারবার 
রিকুয়েস্ট পাঠিয়ে এটাকে হ্যাক করার চেষ্টা করে।
 সেক্ষেত্রে আমরা সেই পেইজ টার্গেটের ওপর log করে 
রাখি। পরে তাকে ডিফেন্সিভ ড্রেস বা এন্ট্রি করে 
ব্লক করতে পারি। আবার আমরা log এর মাধ্যমে আমাদের
সিস্টেমের বাক বা ত্রুটির জন্য, বা খুব রান করলেই 
এই জিনিসগুলো ঠিকমতো কাজ করছে কিনা, তাও আমরা log করতে পারি। Logging অনেকভাবেই করা যায়! যেমন - কোনো একটা করলে log করা যায় বা Slack জাতীয় কোনো Channel ও পাঠানো যায়। 


Log Reader: airplane.ghost.io/content/images

Message | Type (লেভেল অনুসারে)
Backup success — INFO
Backup failed — EMERGENCY
Verification failed — CRITICAL
Job fail — ALERT
Unknown value found — ERROR

12factor.net → লগের মেকানিজমটি মূলত এন্ট্রিরাইট অংশ।

লোগলি নামক সাইট স্টোরেজ হিসেবে কাজ করে।

config/logging.php

= laravel.log ফাইলে এররটা সেভ করে আমরা যেকোনো লগ রাখতে পারি। Log ফরম্যাটে টাইপ দেওয়া থাকে।

Log::emergency($message); → Emergency level  
 Log::alert($message); → Alert level  
Log::critical($message); → Critical level 
Log::error($message); → Error level
Log::warning($message); → Warning level
Log::info($message); → Info leve
এগুলো হলো বিভিন্ন লেভেল।

```php
class UserController
{
    public function show($id)
    {
        Log::info('Showing the user profile for user: {id}', [
            'id' => $id
        ]);
    }
}
```

আমরা চাইলে কনটেকচুয়াল ডাটা বা লগ বাহির করতে পারি।

```php
namespace App\Http\Middleware;

class AssignRequestId implements Middleware
{
    public function handle(Request $request)
    {
        $requestId = (string) Str::uuid();

        Log::withContext([
            'request-id' => $requestId
        ]);
    }
}
```


আমরা চাইলে ভিন্ন ভিন্ন চ্যানেলে ভিন্ন ভিন্ন টাইপের লগ রাখতে পারি। ডিফেল্টভাবে সব লগ বাটা একটা ফাইলকেই রাইট হয়।
config/logging.php
daily → প্রতিদিনের log গলি আলাদা আলাদা ফাইলে রাইট হয়।
stack → stack এ log রাইট হবে।   আমরা চাইলে একসাথে মাল্টিপল চ্যানেলে log রাখতে  পারি।

'stack' [
    'driver' => 'stack',
    'channels' => ['single', 'stack']
]
``

একটি ফাইলে অনেক লগ থাকলে সেটা খুঁজে বের করা কঠিন। এজন্য আমরা `log-viewer` নামে একটা প্যাকেজ ব্যবহার করতে পারি।
`[github.com/opcodesio/log-viewer](https://github.com/opcodesio/log-viewer)`

---





Module 12: Episode 6: Eloquent ORM: Route Model binding.md

লারাভেলে রাউটে যদি আমরা কোনো id পাস করতে চাই, অথবা কোনো রিসোর্সের ডাটা পাস করতে চাই তখন আমরা নিম্নরূপে রাউট ডিক্লেয়ার করি।
Route::get('users/{id}', [UserController::class, 'show']);

class UserController extends Controller
{
    public function show ($id) {
        $user = User::find ($id);
        dd ($id); -> আমরা রাউটে যে আইডি পাঠাব তার ভ্যালু সেখানে পেয়ে যাব।
    }
}
আইডি পাঠালে আমাদেরকে আবার সেই আইডি ধরে ইউজারকে খুঁজে আনতে হয়। আরো সহজে এই কাজটা করার জন্য রাউট মডেল বাইন্ডিং ব্যবহার করা হয় যা নিম্নরূপে করা হয়: -> সেখানে আমরা user ইনস্ট্যান্স চাই।
Route::get('users/{user}', [UserController::class, 'show']);
public function show (User $user) {
    -> কোন মডেলের ইনস্ট্যান্স চাই তা দিয়ে টাইপ হিন্ট করে দেব।
    dd ($user);
}
-> রাউট ও মেথডের ভেরিয়েবল নাম একই হতে হবে ($user)।
```



রাউট মডেল বাইন্ডিং এ ঐ মেথডের মধ্যে টাইপ হিন্ট না করলে কাজ করবে না। এক্ষেত্রে আমরা কন্টেইনার থেকে আইডিটিই পাব। লারাভেল উক্ত আইডি ধরে কন্টেইনার থেকে ঠিক তান মেথডের মধ্যে ইনজেক্ট করে। একেই বলে Dependency Injection।

এর Doc: laravel.com/.../routing/route-model-binding

ক্লোজার দিয়ে রাউট ডিক্লেয়ার করলে ক্লোজারের ফাংশনের মধ্যে টাইপ হিন্ট করে দিতে হবে।

আমরা চাইলে id বাদ দিয়ে অন্য কোনো ফিল্ডের ওপর ভিত্তি করে ডাটাকে তুলে এনে রাউট মডেল বাইন্ডিং করতে পারি।

Route::get('posts/{post:slug}', function (Post $post) {
    return $post; // এটি স্লাগ ধরে Post কে তুলে আনবে
});

Route::get('users/{user:uuid}', function (User $user) {
    // 
});

আবার কোনো ফিল্ড ধরে এমনিতেই তুলে আনবে তা আমরা মডেলেও বলে দিতে পারি getRouteKeyName() ফাংশনের মাধ্যমে।


class User {
    public function getRouteKeyName()
    {
        return 'uuid';
    }
}

আমরা যদি একটা নোটে ১ একন slub বা আইডি পাঠাতে চাই, তবে সেই পেজটি শো করাব কিনা, তবে সেই পেজটি শো করতে পারি নিম্নরূপে:
Route::get('/users/{user}/posts/{post:slug}', function (User $user, Post $post) {
    3});

আমরা যদি পাঠাই যে কোনো slug বা id পাঠালাম যেটা ডাটাবেজে পাওয়া যায় না, তখন আমরা রেসপন্স পাব 404 Not Found। এক্ষেত্রে আমরা চাইলে একটা কাস্টম ইউজার যুক্ত করতে পারি বা missing নামের একটা রেসপন্স পাব 404 Not Found। আমরা চাইলে একটা কাস্টম হ্যান্ডেল যুক্ত করতে পারি।

Route::get('/locations/{location:slug}', [LocationController::class, 'show'])
    ->name('locations.view')
    ->missing(function (Request $request) {
        return Redirect::route('locations.index');
    });
```

রাউট মডেল বাইন্ডিং এর ক্ষেত্রে ভেরিয়েবলের নাম কি হবে এবং কোন মডেল দিয়ে বাইন্ড হবে সেটাও বলে দিতে পারি RouteServiceProvider এ। তখন আর আমাদের controller এ টাইপ হিন্ট করতে হবে না[cite: 15]।

RouteServiceProvider.php
{
    public function boot() {
        Route::model('user', User::class);
    }
}

class UserController
{
    public function show ($user)
    {
        dd ($user);
    }
}

আমরা চাইলে সেটা ফাইন্ড করার কাস্টম লজিক ও RouteServiceProvider এ অ্যাড করতে পারি।

class RouteServiceProvider
{
    public function boot()
    {
        Route::bind('user', function (string $value){
            return User::where('name', $value)->firstOrFail();
        });
    }
}
```


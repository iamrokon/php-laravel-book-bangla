# মডিউল ৮: কন্ট্রোলার পরিচিতি (Introduction to Controllers)

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** লারাভেলে কন্ট্রোলার (Controller) কি এবং রিসোর্স কন্ট্রোলার কীভাবে তৈরি ও ব্যবহার করা হয় উদাহরণসহ লিখ

এমভিসি (MVC) আর্কিটেকচার প্যাটার্নের অত্যন্ত গুরুত্বপূর্ণ অংশ হলো **Controller**। এটি আপনার অ্যাপ্লিকেশনের ব্যবসার লজিক বা ব্রেন হিসেবে কাজ করে। রাউটিং ফাইলে সরাসরি বড় ফাংশন বা লজিক না লিখে সমস্ত রিকোয়েস্ট হ্যান্ডেল করার কাজগুলো কন্ট্রোলারের মাধ্যমে করা একটি বেস্ট প্র্যাকটিস।

---

## ১. কন্ট্রোলার কীভাবে তৈরি করবেন?

লোকাল মেশিনে আর্টিসান (Artisan) কমান্ডের সাহায্যে খুব সহজেই কন্ট্রোলার তৈরি করা যায়।

### ক. কন্ট্রোলার তৈরির কমান্ড:
টার্মিনালে নিচের কমান্ডটি রান করুন:
```bash
php artisan make:controller HomePageController
```
কমান্ডটি রান করলে আপনার প্রজেক্টের **`app/Http/Controllers/`** ফোল্ডারে `HomePageController.php` নামের একটি ফাইল তৈরি হবে।

### খ. বেসিক কন্ট্রোলার ফাইলের গঠন:
```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomePageController extends Controller
{
    // কন্ট্রোলারের একটি অ্যাকশন মেথড
    public function index()
    {
        return 'Welcome to LWR Book Home Page';
    }

    public function about()
    {
        return 'About Us Page';
    }
}
```

---

## ২. রাউটে কন্ট্রোলার ম্যাপ করা (Routing to Controllers)

তৈরি করা কন্ট্রোলার মেথডটিকে রাউট ফাইল (`routes/web.php`)-এ কল করার জন্য আমরা নিচের মতো অ্যারে সিনট্যাক্স ব্যবহার করি:
```php
use App\Http\Controllers\HomePageController;
use Illuminate\Support\Facades\Route;

// HomePageController এর index মেথডকে রুট পাথের সাথে ম্যাপ করা
Route::get('/', [HomePageController::class, 'index']);

// HomePageController এর about মেথডকে ম্যাপ করা
Route::get('/about', [HomePageController::class, 'about']);
```

---

## ৩. রিসোর্স কন্ট্রোলার (Resource Controller) ★

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** রিসোর্স কন্ট্রোলার কী? এর মাধ্যমে লারাভেলে কয়টি ডিফল্ট CRUD রাউট তৈরি হয়?

আমরা যখন কোনো নির্দিষ্ট রিসোর্স (যেমন: User, Product, Photo ইত্যাদি) নিয়ে কাজ করি, তখন তার জন্য সাধারণত ৭টি কমন অ্যাকশনের প্রয়োজন হয় (ডাটা রিড, সেভ, এডিট, ডিলিট)। লারাভেলে এই ৭টি অ্যাকশন স্বয়ংক্রিয়ভাবে হ্যান্ডেল করতে যে বিশেষ কন্ট্রোলার ব্যবহার করা হয়, তাকেই **Resource Controller** বলা হয়।

### ক. রিসোর্স কন্ট্রোলার তৈরির কমান্ড:
```bash
php artisan make:controller UserController --resource
```
এই কমান্ডটি রান করলে আপনার কন্ট্রোলারে স্বয়ংক্রিয়ভাবে ৭টি প্রয়োজনীয় মেথড জেনারেট হয়ে যাবে।

### খ. কমপ্লিট রিসোর্স রাউট ডিক্লারেশন:
রাউট ফাইলে শুধুমাত্র একটি লাইনের মাধ্যমে ৭টি রাউট রেজিস্টার করতে পারেন:
```php
use App\Http\Controllers\UserController;

Route::resource('users', UserController::class);
```

### গ. রিসোর্স রাউট ও অ্যাকশন টেবিল (CRUD Matrix) ★

| HTTP Method | URI | Controller Action | Description (কাজ) |
| :--- | :--- | :--- | :--- |
| **GET** | `/photos` | `index` | সমস্ত ফটোর তালিকা দেখাবে (List view) |
| **GET** | `/photos/create` | `create` | নতুন ফটো তৈরির ফর্ম দেখাবে (Form view) |
| **POST** | `/photos` | `store` | নতুন ফটো ডাটাবেজে সংরক্ষণ করবে (Create) |
| **GET** | `/photos/{photo}` | `show` | একটি নির্দিষ্ট ফটোর বিস্তারিত তথ্য দেখাবে (Detail view) |
| **GET** | `/photos/{photo}/edit` | `edit` | ফটো এডিট করার ফর্ম দেখাবে (Edit form view) |
| **PUT/PATCH** | `/photos/{photo}` | `update` | নির্দিষ্ট ফটো ডাটাবেজে আপডেট করবে (Update) |
| **DELETE** | `/photos/{photo}` | `destroy` | নির্দিষ্ট ফটো ডাটাবেজ থেকে মুছে ফেলবে (Delete) |

### ঘ. রিসোর্স রাউট লিমিট করা (only & except)
আপনি যদি কোনো রিসোর্সের জন্য সব রাউট ওপেন রাখতে না চান (যেমন: আপনি ইউজারদের ডিলিট বা এডিট করতে দিতে চান না):
```php
// শুধুমাত্র নির্দিষ্ট কিছু মেথড এক্টিভ রাখতে
Route::resource('users', UserController::class)->only([
    'index', 'show', 'create', 'store'
]);

// নির্দিষ্ট কোনো মেথড বাদ দিতে (বাদবাকি সব একটিভ থাকবে)
Route::resource('users', UserController::class)->except([
    'destroy'
]);
```

---

## ৪. মেথড ডিপেন্ডেন্সি ইনজেকশন (Dependency Injection)

আমরা কন্ট্রোলারের যেকোনো মেথডের প্যারামিটারে লারাভেলের সার্ভিস কন্টেইনার থেকে সরাসরি কোনো ক্লাস (যেমন: `Illuminate\Http\Request`) ইনজেক্ট বা টাইপ-হিন্ট করতে পারি। লারাভেল স্বয়ংক্রিয়ভাবে তার অবজেক্ট তৈরি করে মেথডে পাস করবে:
```php
class UserController extends Controller
{
    public function index(Request $request)
    {
        // রিকোয়েস্ট অবজেক্টের সমস্ত ডেটা ডাম্প করা
        dd($request->all());
    }
}
```

---

## ৫. ইনভোকেবল কন্ট্রোলার (Invokable / Single Action Controller) ★

> [!NOTE]
> **Invokable Controller** হলো এমন এক বিশেষ কন্ট্রোলার যাতে শুধুমাত্র একটি মাত্র অ্যাকশন বা মেথড থাকে।

আপনি যদি কোনো কন্ট্রোলারে শুধুমাত্র একটি কাজ বা সিঙ্গেল অ্যাকশন রাখতে চান, তবে পিএইচপির ম্যাজিক মেথড **`__invoke()`** ব্যবহার করে ইনভোকেবল কন্ট্রোলার তৈরি করতে পারেন।

### ক. ইনভোকেবল কন্ট্রোলার তৈরির কমান্ড:
```bash
php artisan make:controller HomeController --invokable
```

### খ. ফাইলের গঠন:
```php
namespace App\Http\Controllers;

class HomeController extends Controller
{
    // এই ম্যাজিক মেথডটি স্বয়ংক্রিয়ভাবে রান হবে
    public function __invoke()
    {
        return "Welcome to the Server Page (Invoked!)";
    }
}
```

### গ. রাউটে কল করার নিয়ম (মেথডের নাম উল্লেখ করার প্রয়োজন নেই):
```php
use App\Http\Controllers\HomeController;

Route::get('/server', HomeController::class);
```

### ঘ. পিএইচপিতে `__invoke()` ম্যাজিক মেথডের কার্যপ্রণালী:
পিএইচপিতে কোনো ক্লাসের অবজেক্টকে যদি সরাসরি ফাংশন হিসেবে কল করা হয়, তখন ইন্টারনালি `__invoke()` মেথডটি এক্সিকিউট হয়।
```php
class User {
    public function __invoke() {
        echo "Here! Object called as a function.";
    }
}

$user = new User();
$user(); // আউটপুট: Here! Object called as a function.
```

---

## ৬. বেজ কন্ট্রোলার এক্সটেন্ড করার সুবিধা (Extending Base Controller)

ডিফল্টভাবে লারাভেলের সমস্ত কাস্টম কন্ট্রোলার `App\Http\Controllers\Controller` নামক বেজ ক্লাসকে এক্সটেন্ড (Extend) করে থাকে।
এটি এক্সটেন্ড না করলেও আপনার কোড রান করবে, তবে এক্সটেন্ড করার ফলে বেশ কিছু চমৎকার হেল্পার মেথড সরাসরি ব্যবহারের সুবিধা পাওয়া যায়:
- **`$this->authorize()`:** ইউজারের পারমিশন বা অথরাইজেশন চেক করার জন্য।
- **`$this->validate()`:** রিকোয়েস্টের ইনপুট ডেটা ভ্যালিডেশন বা যাচাই করার জন্য।
- **Traits:** বেজ কন্ট্রোলারে থাকা বিভিন্ন পিএইচপি Traits প্রজেক্টের সমস্ত কন্ট্রোলারে অটোমেটিক শেয়ার হয়ে যায়।

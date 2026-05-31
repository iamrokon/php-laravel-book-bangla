# মডিউল ৮: ভিউ ও ব্লেড টেমপ্লেট (Views & Blade Template Engine)

এমভিসি (MVC) প্যাটার্নের **View** লেয়ারটি ইউজারের কাছে সুন্দর ও আকর্ষণীয় উপায়ে ডেটা প্রদর্শন করার কাজটি করে থাকে। লারাভেলে ভিউ ম্যানেজ করার জন্য অত্যন্ত জনপ্রিয় এবং শক্তিশালী টেমপ্লেট ইঞ্জিন **Blade** ব্যবহার করা হয়।

---

## ১. লারাভেলে ভিউ ফাইল কোথায় থাকে?

লারাভেলের ভিউ ফাইলগুলো প্রজেক্টের **`resources/views/`** ফোল্ডারে থাকে। ব্লেড টেমপ্লেটের সমস্ত চমৎকার ফিচার ও সিনট্যাক্স ব্যবহার করার জন্য ভিউ ফাইলগুলোর নামের শেষে অবশ্যই **`.blade.php`** এক্সটেনশন দিতে হবে (যেমন: `users.blade.php`)।

### ক. হেল্পার ফাংশনের মাধ্যমে ভিউ ফাইল লোড করা:
রাউটে বা কন্ট্রোলারে কোনো ভিউ ফাইল রিটার্ন করতে `view()` নামক গ্লোবাল হেল্পার ফাংশন ব্যবহার করা হয়:
```php
Route::get('/', function () {
    // resources/views/users.blade.php ফাইলটি লোড করবে
    return view('users'); 
});
```

---

## ২. ভিউ ফাইলে ডেটা পাঠানো (Passing Data to Views) ★

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** কন্ট্রোলার থেকে ভিউ ফাইলে ডেটা পাঠানোর পদ্ধতিগুলো কী কী?

কন্ট্রোলার বা রাউট থেকে ভিউ ফাইলে ডেটা পাঠানোর ৩টি জনপ্রিয় উপায় নিচে দেওয়া হলো:

### ১. অ্যাসোসিয়েটিভ অ্যারে পদ্ধতি:
```php
public function index() {
    $data = [
        'name' => 'Rokon',
        'email' => 'rokon@gmail.com'
    ];
    return view('users', $data);
}
```

### ২. `compact()` ফাংশন ব্যবহার (সবচেয়ে বেশি ব্যবহৃত):
পিএইচপির বিল্ট-ইন `compact()` ফাংশন ভেরিয়েবলের নামগুলো নিয়ে স্বয়ংক্রিয়ভাবে একটি কি-ভ্যালু অ্যাসোসিয়েটিভ অ্যারে তৈরি করে দেয়।
```php
public function index() {
    $users = [
        ['id' => 1, 'name' => 'Rokon', 'email' => 'rokon@gmail.com']
    ];
    
    // ভিউ ফাইলে $users ভেরিয়েবল হিসেবে ডেটাটি পাওয়া যাবে
    return view('users', compact('users')); 
}
```

### ৩. `with()` মেথড চেইনিং:
```php
public function index() {
    return view('users')
        ->with('name', 'Rokon')
        ->with('occupation', 'Astronaut');
}
```

---

## ৩. ব্লেড সিনট্যাক্স বনাম র পিএইচপি (Blade vs Raw PHP) ★

র পিএইচপিতে এইচটিএমএল ডিজাইনের ভেতর ডেটা প্রদর্শন করতে বা লুপ চালাতে আমাদের প্রচুর ওপেনিং ও ক্লোজিং ট্যাগ ব্যবহার করতে হতো, যা কোডকে জটিল ও রিডাবিলিটি কমিয়ে দিত। ব্লেড টেমপ্লেট ইঞ্জিন এটিকে অত্যন্ত সহজ ও রিডাবল করে দিয়েছে।

### ক. র পিএইচপিতে লুপ চালানো:
```php
<!-- views/products/show.php -->
<h1>Products</h1>
<?php foreach ($products as $product) { ?>
    <ul>
        <?php foreach ($product as $key => $value) { ?>
            <li><?php echo htmlspecialchars($key); ?>: <?php echo htmlspecialchars($value); ?></li>
        <?php } ?>
    </ul>
<?php } ?>
```

### খ. ব্লেড সিনট্যাক্সে একই লুপ চালানো (অনেক বেশি ক্লিন!):
```html
<!-- resources/views/products/show.blade.php -->
<h1>Products</h1>
@foreach ($products as $product)
    <ul>
        @foreach ($product as $key => $value)
            <li>{{ $key }} : {{ $value }}</li>
        @endforeach
    </ul>
@endforeach
```

### ব্লেড কীভাবে কাজ করে?
আপনি যখন ব্রাউজারে ব্লেড ফাইল ব্রাউজ করেন, তখন লারাভেলের ব্লেড কম্পাইলার স্বয়ংক্রিয়ভাবে সমস্ত `@foreach` বা `{{ }}` ডাবল কার্লি ব্র্যাকেটকে স্ট্যান্ডার্ড পিএইচপি কোডে রূপান্তর করে ক্যাশ করে নেয়। এই ক্যাশ করা ফাইলগুলো প্রজেক্টের **`storage/framework/views/`** ডিরেক্টরিতে সংরক্ষিত থাকে।

---

## ৪. ভিউ ক্যাশ কমান্ডস (View Caching Commands)

- **ভিউ ফাইলগুলো ক্যাশ করা (প্রোডাকশন সার্ভারে স্পিড বৃদ্ধির জন্য):**
  ```bash
  php artisan view:cache
  ```
- **ক্যাশ ক্লিয়ার করা (ডেভেলপমেন্টের সময় নতুন পরিবর্তন দেখতে চাইলে):**
  ```bash
  php artisan view:clear
  ```

---

## ৫. গ্লোবাল ডেটা শেয়ারিং ও ভিউ কম্পোজার (View Composers & Creators) ★

> [!NOTE]
> অনেক সময় আমাদের কোনো নির্দিষ্ট ভ্যালু (যেমন কোম্পানির নাম বা হেডার/ফুটারের ডাইনামিক ডেটা) অ্যাপ্লিকেশনের সব ভিউ ফাইলে বা নির্দিষ্ট একগুচ্ছ ভিউ ফাইলে শেয়ার করার প্রয়োজন পড়ে।

### ক. সব ভিউ ফাইলে ডেটা শেয়ার করা (`View::share`):
আপনার প্রজেক্টের `app/Providers/AppServiceProvider.php` ফাইলের `boot()` মেথডে নিচের কোডটি লিখে সমস্ত ভিউ পেজে গ্লোবালি ডেটা অ্যাক্সেস করতে পারেন:
```php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        // সব ভিউ ফাইলেই {{ $companyName }} ভেরিয়েবলটি পাওয়া যাবে
        View::share('companyName', 'Interactive Cares');
    }
}
```

### খ. ভিউ কম্পোজার (`View::composer`):
যদি আপনি সব পেজে শেয়ার না করে শুধুমাত্র নির্দিষ্ট পেজে (যেমন: শুধুমাত্র `home` বা `profile` পেজে) ভিউ রেন্ডার হওয়ার সময় ডাটাবেজ থেকে কোনো কুয়েরি করা ডেটা পাঠাতে চান, তবে **View Composer** ব্যবহার করা সবচেয়ে বেস্ট অপশন:
```php
use Illuminate\Support\Facades\View;

// শুধুমাত্র home.blade.php ফাইল লোড হওয়ার সময় এই ডেটা পাস হবে
View::composer('home', function ($view) {
    $view->with('name', 'Shaon');
});
```

### গ. ভিউ ক্রিয়েটর (`View::creator`):
ভিউ কম্পোজারের মতোই এটিও নির্দিষ্ট ভিউতে ডেটা বাইন্ড করতে ব্যবহৃত হয়। তবে এদের মধ্যে সূক্ষ্ম একটি পার্থক্য রয়েছে:
- **`View::composer`:** ভিউ ফাইলটি পুরোপুরি রেন্ডার বা বুটস্ট্র্যাপ হওয়ার একদম শেষ মুহূর্তে এক্সিকিউট হয়।
- **`View::creator`:** ভিউ ইনস্ট্যান্সটি মেমরিতে তৈরি হওয়ার সাথে সাথেই (ভিউ রেন্ডার হওয়ার পূর্বে) এক্সিকিউট হয়।

---

## ৬. ব্লেড কাস্টম ডিরেক্টিভস (Blade Directives)

লারাভেলে প্রচুর বিল্ট-ইন ব্লেড ডিরেক্টিভস রয়েছে যা কন্ডিশনাল চেকিংকে অনেক সহজ করে দেয়:

- **`@auth` / `@endauth`:** ইউজার লগইন করা থাকলে এই ব্লকের কোডটি রান হবে।
- **`@production` / `@endproduction`:** শুধুমাত্র প্রোডাকশন (Live Server) এনভায়রনমেন্টে এই ব্লকের কোডটি এক্সিকিউট হবে।
- **`@isset` / `@endisset`:** কোনো ভেরিয়েবল সেট করা থাকলে তা চেক করার জন্য।
- **`@empty` / `@endempty`:** কোনো অ্যারে বা ভেরিয়েবল খালি (Empty) থাকলে তা চেক করতে।
- **`@include('shared.errors')`:** অন্য কোনো ব্লেড ফাইলের ডিজাইন বা পার্টস বর্তমান ফাইলে ইম্পোর্ট করতে এটি ব্যবহৃত হয়।

---

## ৭. রিইউজেবল ব্লেড কম্পোনেন্টস (Reusable Blade Components)

মডার্ন ফ্রন্টএন্ড ফ্রেমওয়ার্কগুলোর (যেমন: React বা Vue) মতো লারাভেলেও সহজে রিইউজেবল কম্পোনেন্ট তৈরি করা যায়।

### ক. কম্পোনেন্ট তৈরির কমান্ড:
```bash
php artisan make:component Alert
```
কমান্ডটি রান করলে ২টি ফাইল তৈরি হবে:
1. `app/View/Components/Alert.php` (লজিক ও প্রোপার্টি ফাইলের জন্য)
2. `resources/views/components/alert.blade.php` (এইচটিএমএল ভিউ ফাইলের জন্য)

### খ. কম্পোনেন্ট ক্লাস কনফিগারেশন (`Alert.php`):
কম্পোনেন্ট ক্লাসে অবশ্যই সমস্ত প্রোপার্টিগুলো **`public`** হিসেবে ডিক্লেয়ার করতে হবে, যাতে ভিউ ফাইল সরাসরি সেগুলোকে রিড করতে পারে।
```php
namespace App\View\Components;

use Illuminate\View\Component;
use Illuminate\View\View;

class Alert extends Component
{
    public function __construct(
        public string $type,
        public string $message
    ) {}

    public function render(): View
    {
        return view('components.alert');
    }
}
```

### গ. কম্পোনেন্ট ভিউ ফাইল (`alert.blade.php`):
```html
<div class="alert alert-{{ $type }}">
    {{ $message }}
</div>
```

### ঘ. যেকোনো ব্লেড ফাইলে কম্পোনেন্টটি ব্যবহারের নিয়ম:
```html
<x-alert type="danger" :message="$errorMessage" />
```
*(দ্রষ্টব্য: ডাইনামিক পিএইচপি ভেরিয়েবল পাস করার জন্য প্যারামিটারের নামের পূর্বে কোলন `:` ব্যবহার করতে হয়।)*

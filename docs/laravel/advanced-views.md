# মডিউল ৯(২): অ্যাডভান্সড ব্লেড ভিউ ও টেমপ্লেট ইনহেরিটেন্স (Advanced Blade Views & Layouts)

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** লারাভেলে অ্যাডভান্সড ব্লেড ভিউ ও টেমপ্লেট ইনহেরিটেন্স কীভাবে কাজ করে উদাহরণসহ লিখ

এইচটিএমএল ফাইলের ভেতর বারবার পিএইচপির ওপেনিং ও ক্লোজিং ট্যাগ লিখে কোড করা অত্যন্ত সময়সাপেক্ষ এবং ঝামেলার। এই কাজটি সহজ করতে লারাভেলে যুক্ত হয়েছে অত্যন্ত শক্তিশালী এবং নমনীয় টেমপ্লেটিং ইঞ্জিন **Blade**। 

ব্লেডের সাহায্যে আমরা খুব সহজেই কোড পুনর্ব্যবহার (Reuse), লেআউট ইনহেরিটেন্স, ভিউ কম্পোজার এবং কাস্টম ডিরেক্টিভ ব্যবহার করতে পারি।

---

## ১. ব্লেড টেমপ্লেট ইঞ্জিন পরিচিতি (Intro to Blade Templating Engine)

ব্লেড ফাইলে সাধারণ পিএইচপি ফাইলের মতোই কোড লেখা যায়, তবে এটি কোডের রিডাবিলিটি বহুগুণ বাড়িয়ে দেয়। ব্লেড ফাইলগুলোর নামের শেষে অবশ্যই `.blade.php` এক্সটেনশন দিতে হয়।

### ক. ভেরিয়েবল বা স্ট্রিং প্রদর্শন (Echoing Data):
ব্লেডে কোনো স্ট্রিং বা ভেরিয়েবলকে echo বা প্রদর্শন করতে ডাবল কার্লি ব্রেস `{{ }}` ব্যবহার করা হয়:
```html
{{ "Hello world" }}
```
কার্লি ব্রেসের ভেতর যেকোনো পিএইচপি ফাংশনও সরাসরি ব্যবহার করা যায়:
```html
{{ ucwords("i'm a little nice string") }}
<!-- আউটপুট: I'm A Little Nice String -->
```

### খ. আনএসকেপড ডেটা প্রদর্শন (Unescaped Data):
ডিফল্টভাবে `{{ }}` এইচটিএমএল ক্যারেক্টারগুলোকে নিরাপদ রাখতে এস্কেপ (Escape) করে ফেলে। তবে আপনি যদি কোনো এইচটিএমএল ট্যাগসহ ডেটা ব্রাউজারে সরাসরি রেন্ডার করতে চান, তবে কার্লি ব্র্যাকেটের পরিবর্তে `{!! !!}` ব্যবহার করতে হবে:
```html
{!! "<h1>Hello, I'm a string</h1>" !!}
```
> [!WARNING]
> ইউজার ইনপুট দেওয়া ডেটা কখনো সরাসরি `{!! !!}` দিয়ে প্রিন্ট করবেন না। এতে আপনার অ্যাপ্লিকেশনে **XSS (Cross-Site Scripting)** সিকিউরিটি হোল তৈরি হতে পারে।

---

## ২. ব্লেড ডিরেক্টিভ ও কন্ট্রোল স্ট্রাকচার (Blade Directives)

র পিএইচপিতে কন্ডিশন বা লুপ ব্যবহারের চেয়ে ব্লেডের `@` ডিরেক্টিভগুলো ব্যবহার করা অনেক বেশি সহজ।

### ক. কন্ডিশনাল চেকিং (`@if`, `@else`):
```html
@if ($isAdmin)
    {{ 'Now you see me' }}
@else
    {{ 'You are not permitted' }}
@endif
```
কন্ট্রোলার ফাইল থেকে ডেটা পাঠানোর সঠিক নিয়ম:
```php
namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        $users = [
            ['name' => 'Al Nahian', 'age' => 25, 'profession' => 'Engineer'],
            ['name' => 'Rokon', 'age' => 28, 'profession' => 'Developer']
        ];
        $isAdmin = true;

        return view('users', compact('users', 'isAdmin'));
    }
}
```

### খ. লুপ ডিরেক্টিভস (`@for`, `@foreach`, `@forelse`):
- **@for লুপ:**
  ```html
  @for ($i = 0; $i <= 10; $i++)
      {{ "Hello World $i" }}
  @endfor
  ```
  *(দ্রষ্টব্য: সিঙ্গেল কোটের বদলে ডাবল কোট ব্যবহার করলে স্ট্রিং এর ভেতর পিএইচপি ভেরিয়েবল ইন্টারপোলেট হয়।)*

- **@foreach লুপ ও `$loop` ভেরিয়েবল:**
  প্রতিটি `@foreach` লুপের ভেতরে লারাভেল স্বয়ংক্রিয়ভাবে একটি বিশেষ **`$loop`** ভেরিয়েবল সরবরাহ করে। এর মাধ্যমে বর্তমান লুপের নানাবিধ তথ্য (যেমন কততম ইটারেশন, লুপের শুরু বা শেষ কিনা) জানতে পারি:
  ```html
  @foreach ($users as $user)
      <ul>
          <li>ইটারেশন নম্বর: {{ $loop->iteration }}</li>
          <li>নাম: {{ $user['name'] }}</li>
          <li>বয়স: {{ $user['age'] }}</li>
          <li>পেশা: {{ $user['profession'] }}</li>
      </ul>
  @endforeach
  ```
  `$loop` ভেরিয়েবলের কয়েকটি প্রয়োজনীয় প্রোপার্টি:
  - `$loop->iteration`: লুপের বর্তমান সূচক (১ থেকে শুরু)।
  - `$loop->first`: লুপের প্রথম আইটেম হলে `true` রিটার্ন করে।
  - `$loop->last`: লুপের শেষ আইটেম হলে `true` রিটার্ন করে।

- **@forelse লুপ (ডেটা না থাকলে বিকল্প প্রদর্শন):**
  `@forelse` লুপটি `@foreach` এর মতোই কাজ করে। তবে যদি ডাটাবেজ বা অ্যারে খালি থাকে, তখন কী ডিজাইন বা লেখা দেখাতে হবে তা `@empty` ব্লকের মাধ্যমে সহজে বলে দেওয়া যায়:
  ```html
  @forelse ($users as $user)
      <li>{{ $user['name'] }}</li>
  @empty
      <h2>No users available</h2>
  @endforelse
  ```

### গ. র পিএইচপি ব্লক (`@php`):
ব্লেড ফাইলের ভেতর সরাসরি কোনো নতুন ভেরিয়েবল ডিফাইন বা প্রসেসিং করতে চাইলে আমরা `@php` ডিরেক্টিভ ব্যবহার করতে পারি:
```html
@php
    $name = 'Al Nahian';
    $name = ucwords($name);
    echo $name;
@endphp
```
*(টিপস: এই ধরনের ডাটা প্রসেসিং সরাসরি কন্ট্রোলারের মধ্যে করাই সবচেয়ে বেস্ট প্র্যাকটিস)।*

---

## ৩. ব্লেড কমেন্ট এবং ফর্ম ডিরেক্টিভস (Comments, CSRF & Method Spoofing)

### ক. ব্লেড কমেন্ট:
এইচটিএমএল কমেন্ট ব্রাউজারের "View Source" এ দেখা যায়, যা সিকিউরিটির জন্য রিস্কি হতে পারে। কিন্তু ব্লেড কমেন্ট কম্পাইল হয়ে ব্রাউজারে যায় না, তাই এটি সম্পুর্ণ নিরাপদ:
```html
{{-- এটি একটি ব্লেড কমেন্ট --}}
<!-- এটি একটি এইচটিএমএল কমেন্ট, যা ব্রাউজারে দেখা যাবে -->
```

### খ. CSRF ও মেথড স্পুফিং (Method Spoofing):
এইচটিএমএল ফর্ম সরাসরি `POST` ছাড়া `PUT`, `PATCH` বা `DELETE` রিকোয়েস্ট সাপোর্ট করে না। লারাভেলে এই রিকোয়েস্টগুলো সফলভাবে পাঠাতে এবং নিরাপত্তা নিশ্চিত করতে ফর্মে নিচে দুটি ডিরেক্টিভ ব্যবহার করতে হয়:
```html
<form action="/users/1" method="POST">
    @csrf
    @method('PATCH')
    
    <button type="submit">Update</button>
</form>
```
এই ডিরেক্টিভগুলোর কারণে ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে দুটি হিডেন ইনপুট ফিল্ড যুক্ত হয়ে যায়:
```html
<input type="hidden" name="_token" value="T7HSS...">
<input type="hidden" name="_method" value="PATCH">
```

---

## ৪. লেআউট ইনহেরিটেন্স (Layout Inheritance Using Blade)

লেআউট ইনহেরিটেন্সের মূল কাজ হলো একটি কমন ডিজাইন বা লেআউট (যেমন হেডার, ফুটার, সাইডবার) তৈরি করে তা একাধিক পেজে বারবার রিইউজ করা।

### ক. প্যারেন্ট লেআউট ফাইল তৈরি করা (`resources/views/layouts/app.blade.php`):
```html
<html>
<head>
    <title>@yield('title')</title>
    @stack('blog-styles')
</head>
<body>
    <!-- Navbar -->
    <nav class="bg-blue-500 p-4">
        <ul>
            @yield('navbar')
        </ul>
    </nav>

    <!-- Main Container -->
    <div class="flex">
        <div class="sidebar">
            <h2>Sidebar</h2>
            @yield('sidebar')
        </div>
        <div class="content">
            @yield('content')
        </div>
    </div>

    @stack('main-scripts')
</body>
</html>
```

### খ. চাইল্ড ভিউ ফাইল তৈরি করা (`resources/views/blog/index.blade.php`):
প্যারেন্ট লেআউটকে এক্সটেন্ড করতে চাইল্ড ফাইলে `@extends` এবং বিভিন্ন অংশের কন্টেন্ট ডিফাইন করতে `@section` ব্যবহার করতে হয়:
```html
@extends('layouts.app')

@section('title')
    This is My Title
@endsection

@section('navbar')
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
@endsection

@section('sidebar')
    <h1>This is my sidebar contents</h1>
@endsection

@section('content')
    <h1>Welcome to My Blog</h1>
    <p>Lorem ipsum dolor sit amet...</p>
@endsection
```

### গ. প্যারেন্ট ব্লককে ওভাররাইড না করে এক্সটেন্ড করা (`@parent`):
ডিফল্টভাবে `@section` প্যারেন্টের সেকশনকে সম্পূর্ণ ওভাররাইট করে দেয়। তবে আপনি যদি প্যারেন্টের কোড বজায় রেখে নতুন কিছু যোগ করতে চান, তবে `@parent` ব্যবহার করবেন:
```html
@section('styles')
    @parent
    <link rel="stylesheet" href="style.css">
@endsection
```

### ঘ. স্ট্যাক ও পুশ ডিরেক্টিভ (`@stack` ও `@push`):
পেজ-স্পেসিফিক অতিরিক্ত সিএসএস বা জেএস ফাইলগুলো প্যারেন্ট লেআউটের নির্দিষ্ট জায়গায় পুশ করতে আমরা `@stack` ও `@push` ব্যবহার করি:
```html
<!-- index.blade.php এ পুশ করা -->
@push('blog-styles')
    <link rel="stylesheet" href="custom-theme.css">
@endpush
```

---

## ৫. এইচটিএমএল টেমপ্লেটকে লারাভেল প্রজেক্টে রূপান্তর (Convert HTML to Laravel)

চলুন প্র্যাক্টিক্যালি Windmill Dashboard Template নামক একটি রেডিমেড HTML টেমপ্লেটকে লারাভেলের ব্লেড ইনহেরিটেন্সের সাহায্যে ডায়নামিক প্রজেক্টে রূপান্তর করা শিখি।

### ধাপ ১: অ্যাসেট কপি করা
Windmill এর ডাউনলোড করা CSS, JS ও ইমেজ অ্যাসেট ফোল্ডারটি আমাদের লারাভেল প্রজেক্টের **`public/`** ডিরেক্টরিতে পেস্ট করব।

### ধাপ ২: প্যারেন্ট লেআউট প্রস্তুত করা
`index.html` পেজের সম্পূর্ণ কোড কপি করে `resources/views/layouts/app.blade.php` ফাইলে পেস্ট করব। এরপর মেইন কন্টেন্ট এলাকাটি চিহ্নিত করে সেখানে ডায়নামিক সেকশন ডিফাইন করব:
```html
<main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
        @yield('content')
    </div>
</main>
```

### ধাপ ৩: সাইডবার ও নেভবার আলাদা করা
সাইডবার ও নেভবারের কোডগুলো আমরা কেটে নিয়ে যথাক্রমে:
- `resources/views/partials/sidebar.blade.php`
- `resources/views/partials/navbar.blade.php`
ফাইলে রেখে দেব এবং প্রধান লেআউটে সেগুলোকে `@include` করে দেব:
```html
<body>
    <div>
        @include('partials.sidebar')
        @include('partials.navbar')
        
        @yield('content')
    </div>
</body>
```

### ধাপ ৪: চাইল্ড পেজ ডায়নামিক করা (`resources/views/users/edit.blade.php`)
```html
@extends('layouts.app')

@section('content')
    <h2>Hello from Edit Page</h2>
@endsection
```

### ধাপ ৫: রাউট কনফিগার করা (`routes/web.php`)
```php
Route::get('/users/edit', function () {
    return view('users.edit');
});
```

### ধাপ ৬: `asset()` হেল্পার ব্যবহার ও ডায়নামিক অ্যাসেট লোড
লারাভেলে সঠিক পাবলিক লিংক পেতে আমরা `asset()` হেল্পার মেথড ব্যবহার করব:
```html
<link rel="stylesheet" href="{{ asset('assets/css/tailwind-output.css') }}">
```
যদি কোনো পেজে স্পেসিফিক অতিরিক্ত কোনো স্ক্রিপ্ট (যেমন পাই-চার্টের জন্য `chart.js`) লাগে, তবে আমরা তা হেডার/বডির স্ট্যাকে পুশ করে দেব:
```html
<!-- profile.blade.php ফাইলে -->
@push('head-styles')
    <link href="{{ asset('assets/css/chart.min.css') }}" rel="stylesheet">
@endpush

@push('main-scripts')
    <script src="{{ asset('assets/js/charts-pie.js') }}"></script>
@endpush
```

---

## ৬. ভিউ কম্পোজার (View Composers)

অনেক সময় বিভিন্ন পেজের আংশিক ডিজাইনে (যেমন নেভবারে ক্যাটাগরি লিস্ট বা সাইট সেটিংস) একই ডেটা বারবার প্রয়োজন হয়। প্রতিবার কন্ট্রোলার থেকে আলাদা করে ডেটা না পাঠিয়ে ভিউ কম্পোজারের মাধ্যমে এক জায়গায় বসিয়ে সব পেজে শেয়ার করা যায়।

### ক. গ্লোবাল শেয়ারিং (`View::share`):
সব ভিউ ফাইলে সরাসরি কোনো ডেটা পেতে `AppServiceProvider.php` এর `boot()` মেথডে শেয়ার করতে পারি:
```php
namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;

class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        View::share('siteName', 'My Awesome Site');
        View::share('siteAuthor', 'Al Nahian');
    }
}
```

### খ. ক্লোজার ভিত্তিক ভিউ কম্পোজার (`View::composer`):
শুধুমাত্র নির্দিষ্ট কোনো ভিউ ফাইলে (যেমন: `partials.navbar`) ডেটা প্রজেক্ট করতে চাইলে:
```php
use Illuminate\Support\Facades\View;

View::composer('partials.navbar', function ($view) {
    $navigationLinks = [
        ['label' => 'Home', 'route' => route('home')],
        ['label' => 'About', 'route' => route('about')],
        ['label' => 'Contact', 'route' => route('contact')]
    ];
    $view->with('navigationLinks', $navigationLinks);
});
```

### গ. ক্লাস ভিত্তিক কম্পোজার (Class Based Composer):
প্রজেক্ট বড় হলে কোড ক্লিন রাখতে ক্লাস ভিত্তিক কম্পোজার ব্যবহার করাই শ্রেয়।
১. প্রথমে একটি ক্লাস ফাইল তৈরি করুন `app/View/Composers/NavigationComposer.php`:
```php
namespace App\View\Composers;

use Illuminate\View\View;

class NavigationComposer
{
    public function compose(View $view): void
    {
        $navigationLinks = [
            ['label' => 'Home', 'route' => route('home')],
            ['label' => 'About', 'route' => route('about')],
            ['label' => 'Contact', 'route' => route('contact')]
        ];

        $view->with('navigationLinks', $navigationLinks);
    }
}
```
২. এরপর `AppServiceProvider.php` ক্লাসের `boot()` মেথডে ভিউয়ের সাথে উক্ত ক্লাস রেজিস্টার করে দিন:
```php
use App\View\Composers\NavigationComposer;
use Illuminate\Support\Facades\View;

View::composer('partials.navbar', NavigationComposer::class);
```
*(টিপস: ভিউ কম্পোজারে যেকোনো পরিবর্তনের পর ক্যাশ ক্লিয়ার করতে `php artisan optimize:clear` বা `php artisan view:clear` কমান্ড রান করুন)।*

---

## ৭. কাস্টম ব্লেড ডিরেক্টিভস (Custom Blade Directives)

লারাভেলে আমরা আমাদের নিজেদের সুবিধার্থে কাস্টম ব্লেড ডিরেক্টিভ তৈরি করতে পারি।

### ক. কাস্টম স্ট্রিং ডিরেক্টিভ তৈরি করা:
আমাদের কোনো লেখাকে ক্যাপিটাল লেটার করতে `@upper` ডিরেক্টিভ তৈরি করতে `AppServiceProvider.php` এর `boot()` মেথডে লিখব:
```php
use Illuminate\Support\Facades\Blade;

Blade::directive('upper', function ($expression) {
    return "<?php echo strtoupper($expression); ?>";
});
```
**ব্লেড ফাইলে এর ব্যবহার:**
```html
<p>Welcome @upper('home') !</p>
<!-- আউটপুট: Welcome HOME ! -->
```

### খ. কাস্টম কন্ডিশনাল ডিরেক্টিভ তৈরি করা (`Blade::if`):
রোল বা পারমিশন চেক করার জন্য কাস্টম কন্ডিশনাল ডিরেক্টিভ তৈরি করা বেশ সহজ:
```php
use Illuminate\Support\Facades\Blade;

Blade::if('admin', function (string $value) {
    return $value === 'admin';
});

Blade::if('editor', function (string $value) {
    return $value === 'editor';
});
```
**ব্লেড ফাইলে এর ব্যবহার:**
```html
@admin($userRole)
    <p>This is visible only to Admin</p>
@endadmin

@editor($userRole)
    <p>You can see this because you are an Editor</p>
@endeditor
```
ডিফল্টভাবে লারাভেলে অথেন্টিকেশনের জন্য `@auth ... @endauth` এবং আন-অথরাইজড ইউজারের জন্য `@guest ... @endguest` ডিরেক্টিভ তো রয়েছেই।

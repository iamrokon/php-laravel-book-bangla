
## Module 13:Episode 2 Service Container in Laravel and Live Class 1: How to handle forms in Laravel 



### Topics

- CSRF Protection
- Method Spoofing (`put` / `patch` / `delete`)
- Handling form data
- Form input validation
- Uploading files
- Classless CSS (যেমন—Pico CSS)। আমরা চাইলে নিজস্ব ডিজাইন ব্যবহার করতে পারি (যেমন—Pico CSS)। নিজে নিজে ডিজাইন না করে নিতে নেব।
- `picoess.com`

### `welcome.blade.php`

```html
<link rel="stylesheet" href="picoess.css cdn link"> <!-- pico css minified version -->

<body>
    <article>
        <form method="POST" action="{{ route('upload') }}">
            @csrf
            <input type="text" name="title" placeholder="Write your post title">
            <br>
            <textarea name="content" rows="5"></textarea>

            <button type="submit">Post</button>
        </form>
    </article>
</body>
```

### `web.php`

```php
Route::post('/upload', function (Request $request) {
    // ফর্মের ডাটাগুলো Request ক্লাসের মাধ্যমে request() হেল্পার ফাংশন ব্যবহার করে পেতে পারি।
    // ফর্মের ডাটাগুলো পেতে request() এর মধ্যে input() দিতে পারি।
    // শুধু ফিল্ডের নাম দিয়েও পেতে পারি।

    $title = $request->input('title'); // $request->title
    $content = $request->input('content');
});
```

### CSRF Protection

`419 | PAGE EXPIRED` এরর যদি CSRF token না দিলে আসে। এটি না দিলে সিকিউরিটি এরর ব্রাউজার করবে। ফেচ দিলে আমাদের হেডার থেকে বাইরে থেকে বডি ফর্ম সাবমিট করতে পারে না।

ফর্ম Ajax রিকোয়েস্ট নিয়ে কাজ করলে হেডারের `X-CSRF-TOKEN`-টাই দিতে হবে এবং তার মধ্যে `csrf_token()` দিতে হবে।

CURL রিকোয়েস্টে payload এর মধ্যে ভ্যালুগুলো পাঠিয়ে দিতে হয়।

`$request`-কে dump করলে `request > parameters`-এর মধ্যে আমরা ফর্মের প্যারামিটারগুলো দেখতে পাব।

ফাইল:
`laravel-framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php`

এটাই হলো লারাভেলে টোকেনটি ম্যাচ করায়। টোকেনটা ঠিকঠাক কিনা।

```php
$this->tokensMatch();

protected function tokensMatch($request)
{
    $token = $this->getTokenFromRequest($request);

    return is_string($token) &&
           is_string($request->session()->token()) &&
           hash_equals($token, $request->session()->token());

    // এখানে টোকেন এবং সেশনের মাধ্যমে টোকেন ম্যাচ করতে হবে।
}
```

### Validation

`php artisan docs validation` এই কমান্ড রান করলে লারাভেল আমাদের ভ্যালিডেশনের ডকুমেন্টেশন নিয়ে যাবে।

```php
Route::post('/upload', function (Request $request) {
    $validated = $request->validate([
        'title' => 'required|max:255|string|lowercase',
        'content' => 'required|string',
    ]);
});
```

আমরা চাইলে ভ্যালিডেশন এররগুলো চেক করলে (শো করতে পারি):

```blade
@if ($errors->any())
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{ $error }}</li>
        @endforeach
    </ul>
@endif
```

লারাভেলে ডিফল্টভাবে স্যানিটাইজেশন করে না। তবে আমাদের ফিল্টার বা স্টাইলে স্যানিটাইজড করে নিতে হবে।

### HTTP Methods

নির্দিষ্ট মেথড যেমন `Route::delete()` ব্যবহৃত হয় ডেটা ডিলিটের জন্য।

`Route::put()` বা `Route::patch()` ব্যবহৃত হয় আপডেট করার জন্য।

ফর্ম শুধুমাত্র দুটি মেথড গ্রহণ করে: `GET` ও `POST`। এজন্য আমাদের মেথডকে spoof করতে হবে। কারণ আমরা REST-এর স্ট্রাকচার ফলো করছি।

```html
<form action="{{ route('edit') }}" method="POST">
    @csrf
    @method('PUT')
    <!-- ফর্মে _method নামে একটা hidden field add হবে যার value হবে put -->

    @method('DELETE')
    <!-- এটি দিলে value হবে delete -->
</form>
```

এটি হলো Method spoofing। সবগুলো Entity আপডেট না চাইলে আমরা `PATCH` মেথড ব্যবহার করতে পারি।

### File Upload

#### HTML

```html
<form action="{{ route('upload') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <input type="file" name="avatar">
    <button type="submit">Upload</button>
</form>
```

ফাইল রিকোয়েস্টকে dump করলে আমরা ফাইলের ইনফোগুলো দেখতে পাব `Illuminate\UploadedFile` এই অবজেক্টে।

#### Upload Route

```php
Route::post('/upload', function (Request $request) {
    // ফাইলেই কোনো সমস্যা করা হয়েছে কিনা তা চেক করতে hasFile() মেথড ব্যবহৃত হয়।
    $request->hasFile('avatar');

    // ফাইলটির এক্সটেনশন দেখার জন্য getExtension() মেথড ব্যবহৃত হয়।
    // টেম্পোরারি ফাইলের এক্সটেনশন দেখার জন্য extension() মেথড ব্যবহৃত হয়।
    $request->file('avatar')->getExtension(); // tmp
    $request->file('avatar')->extension(); // Output: jpg

    // ফাইলকে স্টোরেজে করতে store() মেথড ব্যবহৃত হয়।
    $request->file('avatar')->store();
    // এটি ফাইলের একটা কাস্টম নামে লোকালি ড্রাইভে সেভ হয়ে থাকে।

    $request->file('avatar')->store('images');
    // এটি দিয়ে ফোল্ডারের নাম দিয়ে সেভ হতে পারে।

    // আমাদের সেকশনে storage > app > public-এ আমরা ফাইলটি দেখতে পারি।
    // কাস্টম নামে কন্ট্রোলিং মেথড করতে storeAs() মেথড ব্যবহৃত হয়।

    $file = $request->file('avatar');
    $file->storeAs('images', 'avatar.png'); // avatar.jpg নামে ফাইল সেভ হবে।

    // এই ফাইলটি পাবলিকলি অ্যাক্সেসিবল নয়।
    // কারণ ফাইলটি storage > app > images ডিরেক্টরিতে সেভ হয়।
});
```

কোনো ফাইলকে পাবলিকলি স্টোর করতে `storePubliclyAs()` মেথড ব্যবহৃত হয়। তাছাড়া এই ফাইলটার symlink-ও করে দিতে হবে।

```php
$file->storePubliclyAs('public', 'avatar_' . time() . '.' . $file->extension());
```

`php artisan storage:link` এই কমান্ড চালালে symlink তৈরি হবে।

এটির মাধ্যমে `127.0.0.1:8000/storage/avatar_1725641883.png` URL-এ ফাইলটি ব্রাউজারে অ্যাক্সেস করা যাবে।

আমরা চাইলে কাস্টম ভ্যালিডেটর-এর মাধ্যমে ভ্যালিডেশন মেসেজগুলো API-এর মাধ্যমে রিটার্ন করে দিতে পারি।

```php
$validator = Validator::make($request->all(), [
    'title' => 'required',
]);

if ($validator->fails()) {
    return redirect('/post/create')
                ->withErrors($validator)
                ->withInput();
}
```

`storage > app > public` ফোল্ডারের `.gitignore` নামে ফাইল দেখতে পাবে। কোনো একটা ফোল্ডারের কোন ফাইল Git-এ জমাবে না, তা Git ignore করে।

---

## Module 10: Live Class 2: Building CRUD: The Right Way

ডেটাবেজ বা কোনো স্টোরেজ ইউজ করে নতুন Read, Write অ্যাপ্লিকেশনই (CREATE, UPDATE, DELETE) CRUD অপারেশন।

### Project Idea: Dreamify

- `pinkary.com` → Pest PHP-এর নির্মাতা এই ওয়েবসাইট তৈরি করেছেন।
- **IDEA:** Dreamify নামে একটি অ্যাপ্লিকেশন বানাবো যেখানে কেউ লগইন করে নিজের Dream-গুলোকে ছোট ছোট মেসেজ আকারে পোস্ট করতে পারবে।
- সেখান থেকে Dashboard থেকে Create, Read, Update, Delete করা যায় এমন ফিচার থাকবে এবং এগুলো ইউজাররা (সবার Dream) দেখতে পারবে।

### Steps

1. Initialize the project
2. Setting up the database, migrations, factory, and seeders.
3. Setting up routes to perform CRUD operations.
4. Setting up views.
5. Creating controllers.
6. Performing CRUD operations with proper input validation.
7. Refactoring the code.

আমরা আমাদের প্রজেক্টে starter kit হিসেবে Breeze ব্যবহার করব।

- Dark mode → no
- Testing → PHPUnit
- Git → yes

### Useful Links

- `github.com/pinkary-project`
- Laravel Cloud: `cloud.laravel.com` — এখানে আমরা আমাদের সাইট হোস্ট করতে পারি।
- Chrome-এর Momentum extension → নতুন ওয়ালপেপার, টুকটাক নোট, Todo।
- `laravel-news.com`

### Project Environment

`.env`:

```dotenv
APP_NAME=Dreamify
APP_URL=http://dreamify.test
```

### Database Design Notes

#### Users

#### Dreams

#### Other example tables

`drawSQL.net`

**password_resets**
- `email`
- `token`
- `created_at`

**playlists**
- `id`
- `user_id`
- `name`
- `rules`
- `created_at`
- `updated_at`

**playlist_song**
- `id`
- `playlist_id`
- `song_id`

**users**
- `id`
- `name`
- `email`
- `password`
- `is_admin`
- `preferences`
- `remember_token`
- `created_at`
- `updated_at`

**interactions**
- `id`
- `user_id`
- `song_id`
- `liked`
- `play_count`
- `created_at`
- `updated_at`

**songs**
- `id`
- `album_id`
- `artist_id`
- `title`
- `length`
- `track`
- `disk`
- `lyrics`
- `path`

**artists**
- `id`
- `name`
- `image`
- `created_at`
- `updated_at`

**albums**
- `id`
- `artist_id`
- `name`
- `cover`
- `created_at`
- `updated_at`

**settings**
- `key`
- `value`

### Migrations

টেবিলের নাম plural রাখতে হবে। যেমন:

`create_users_table.php`

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});
```

আমরা পরবর্তীতে এই টেবিলে নতুন কলাম যুক্ত করার জন্য:

```bash
php artisan make:migration add_is_admin_column_to_users_table
```

```php
public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->boolean('is_admin')->default(false);
    });
}

public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn('is_admin');
    });
}
```

#### Dreams Table

```php
Schema::create('dreams', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->cascadeOnDelete();
    // user delete hole dream o delete hoye jabe
    $table->string('content');
    $table->timestamps();
});
```

এবার আমরা `php artisan migrate` করব।

### Seeders and Factories

এখন আমরা এভাবে প্রত্যেকবারের জন্য সিডার তৈরি করে রাখব, যাতে প্রত্যেকবার রান করাতে আমাদের সময় নষ্ট না হয়। ওটাই Best Practice।

#### `DatabaseSeeder.php`

```php
public function run(): void
{
    User::factory()->create([
        'name' => 'Al Nahian',
        'email' => 'nahian@admin.com',
        'is_admin' => true,
    ]);
}
```

```php
DB::table('dreams')->insert([
    'user_id' => DB::table('users')->inRandomOrder()->first()->id,
    // এটি দিলে আইডিগুলো র্যান্ডমলি ঢুকবে
    'content' => fake()->realText(150),
    'created_at' => now(),
    'updated_at' => now(),
]);
```

এবার আমরা `php artisan db:seed` এই কমান্ড রান করলে আমাদের ডাটাগুলো Workbench-এ দেখতে পাব।

### Middleware

মিডলওয়্যার একটা গার্ডের মতো, যে চেক করে রিকোয়েস্টের পারমিশন আছে কি না, নির্দিষ্ট কোনো কন্ডিশন ফুলফিল হচ্ছে কি না। Next স্টেপে যেতে দেয়।

লারাভেলে বাই ডিফল্ট কিছু মিডলওয়্যার দেয়: `auth`, `guest`।

### Routes and Controller

অনেকগুলো Dream রান করার জন্য এই রুটগুলো:

```php
Route::get('/admin/dreams', [DreamController::class, 'index']);
Route::get('/admin/dreams/{dream}', [DreamController::class, 'show']);
```

```bash
php artisan make:controller DreamController
```

```php
Route::get('/admin/dreams/create', [DreamController::class, 'create']);
Route::post('/admin/dreams/store', [DreamController::class, 'store']);
Route::get('/admin/dreams/{dream}/edit', [DreamController::class, 'edit']);
```

আমরা চাইলে Resource Route ব্যবহার করে উপরের সবগুলো কাজ একসাথে করতে পারি।

```bash
php artisan make:controller Admin\\DreamController --resource
```

```php
Route::resource('admin/dreams', DreamController::class)->middleware('auth');
```

### Navigation

`navigation.blade.php`

```html
<div>
    <x-responsive-nav-link :href="route('dreams.index')" :active="request()->routeIs('dreams.index')">
        Dreams
    </x-responsive-nav-link>

    <x-responsive-nav-link :href="route('dreams.create')">
        Post a Dream
    </x-responsive-nav-link>
</div>
```

`resources/views/admin/dreams/index.blade.php` একটি ফাইল তৈরি করে, নিচে এসে Tailwind দিয়ে ডিজাইন করা।

পাওয়ার জন্য `php artisan dev` কমান্ড চালাব।

### Dream List: `DreamController.php`

```php
public function index()
{
    $dreams = DB::table('dreams')
        ->where('user_id', auth()->user()->id)
        ->get();

    return view('admin.dreams.index', compact('dreams'));
}
```

### Dream List View: `dreams/index.blade.php`

```html
<table>
    <thead>
        <tr>
            <th>#</th>
            <th>The Dream</th>
            <th>Created At</th>
            <th>
                <span>Edit</span>
                Delete
            </th>
        </tr>
    </thead>
```

কোনো Dream না পাওয়া গেলে Default text দেখায়। এজন্য আমরা `forelse` লুপ চালাব।

```blade
<tbody>
    @forelse ($dreams as $dream)
        <tr>
            <td>{{ $dream->id }}</td>
            <td>{{ str($dream->content)->limit(30) }}</td>
            <td>{{ $dream->created_at }}</td>
            <!-- diffForHumans -->
            <td>
                <a href="{{ route('dreams.edit', $dream->id) }}">Edit</a>
            </td>
        </tr>
    @empty
    @endforelse
</tbody>
```

### Date কে Carbon Instance-এ Convert করা

`DreamController.php`

```php
public function index()
{
    $dreams->map(function ($dream) {
        $dream->created_at = Carbon::make($dream->created_at);
        $dream->updated_at = Carbon::make($dream->updated_at);
    });
}
```

### Create Dream

`dreams/create.blade.php`

`dashboard.blade.php` থেকে কোডগুলো কপি করে আনব।

```blade
<x-app-layout>
    <x-slot name="header">
        <h2>{{ __('Post a dream') }}</h2>
    </x-slot>
</x-app-layout>
```

Flowbite থেকে একটি ফর্ম আনব।

#### `DreamController.php`

```php
public function create()
{
    return view('admin.dreams.create');
}
```

#### `dreams/create.blade.php`

```html
<form action="{{ route('dreams.store') }}" method="POST">
    @csrf
    <label>Your Message</label>
    <textarea id="content" name="content"></textarea>
    <x-primary-button type="submit">Post your Dream</x-primary-button>
</form>
```

### Store Dream

`DreamController.php`

```php
public function store(Request $request)
{
    $validated = $request->validate([
        'content' => 'required|max:255|string'
    ]);

    $dream = DB::table('dreams')->insertGetId([
        ...$validated,
        'user_id' => auth()->user()->id,
        'created_at' => now(),
        'updated_at' => now(),
    ]);

    if ($dream) {
        return to_route('dreams.index');
    }

    return back();
}
```

### Edit Dream

`dreams/edit.blade.php`

এই ফাইলটি `create.blade.php` থেকে কোডগুলো কপি করে এনে বসিয়ে দেব।

```html
<form action="{{ route('dreams.update', $dream->id) }}" method="POST">
    @csrf
    @method('PUT')

    <label>Dream</label>
    <textarea name="content">{{ $dream->content }}</textarea>

    <x-primary-button type="submit">Update your dream</x-primary-button>
</form>
```

#### `DreamController.php`

```php
public function edit(string $id)
{
    $dream = DB::table('dreams')
        ->where([
            ['id', '=', $id],
            ['user_id', '=', auth()->user()->id]
        ])
        ->first();

    if (!$dream) {
        return to_route('dreams.index');
    }

    return view('admin.dreams.edit', compact('dream'));
}
```

আরেকভাবে query:

```php
public function edit(...)
{
    $dream = DB::table('dreams')
        ->where('id', $id)
        ->where('user_id', auth()->user()->id)
        ->first();
}
```

### Update Dream

`DreamController.php`

```php
public function update(Request $request, string $id)
{
    $validated = $request->validate([
        'content' => 'required|max:255|string'
    ]);

    $dream = DB::table('dreams')
        ->where('id', $id)
        ->where('user_id', auth()->user()->id)
        ->update([
            ...$validated,
            'updated_at' => now()
        ]);

    return to_route('dreams.show', $id);
}
```

### Show Dream

`DreamController.php`

```php
public function show(string $id)
{
    return view('admin.dreams.show', [
        'dream' => DB::table('dreams')->where('id', $id)->first()
    ]);
}
```

#### `dreams/show.blade.php`

`dashboard.blade.php` থেকে কোডগুলো কপি করে দেব।

```blade
<x-app-layout>
    <x-slot name="header">
        <h2>{{ $dream->id }}</h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ $dream->content }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
```

### Delete Dream

এর পর Dream ডিলিট করব।

`DreamController.php`

```php
public function destroy(string $id)
{
    $dream = DB::table('dreams')
        ->where('id', $id)
        ->where('user_id', auth()->user()->id)
        ->first();

    if ($dream) {
        DB::table('dreams')
            ->where('id', $id)
            ->delete();
    }

    return back();
}
```

#### `index.blade.php`

```html
<form action="{{ route('dreams.destroy', $dream->id) }}" method="POST" onsubmit="return confirm('Are you sure?')">
    @csrf
    @method('DELETE')
    <input type="submit" value="Delete">
</form>
```

### Welcome Page: সব Dream দেখানো

`welcome.blade.php` ফাইলে আমরা সব Dream-গুলো দেখাবো।

এর রুটটি `web.php`-তে:

```php
Route::get('/', function () {
    $dreams = DB::table('dreams')
        ->join('users', 'dreams.user_id', '=', 'users.id')
        ->select(
            'dreams.id as dream_id',
            'dreams.content',
            'dreams.created_at',
            'dreams.user_id',
            'users.name',
            'users.email'
        )
        ->get();

    return view('welcome', compact('dreams'));
});
```

```php
$dreams->map(function ($dream) {
    $dream->created_at = Carbon::make($dream->created_at);
    $dream->updated_at = Carbon::make($dream->updated_at);
});

return view('welcome', compact('dreams'));
```

#### `welcome.blade.php`

```blade
<body>
    @forelse ($dreams as $dream)
        <h1>{{ $dream->content }}</h1>
        <pre>
            <small>by {{ $dream->name }} - {{ $dream->created_at->diffForHumans() }}</small>
        </pre>
    @empty
        No dreams have been posted yet
    @endforelse
</body>
```

### Refactoring and Service Pattern

এছাড়া আমরা প্রোটোটাইপ ব্যবহার করতে পারি, যেমন: Service Pattern, Repository Pattern, Singleton Pattern—এগুলো ব্যবহার করে কোডকে সুন্দর করা যায়।

আমরা আমাদের কোডে Service Pattern ব্যবহার করব।

```bash
php artisan make:class Services\\DreamServices
```

এই কমান্ড দিয়ে `app > Services > DreamServices.php` ফাইল তৈরি করতে হবে।

#### `DreamServices.php`

```php
class DreamServices
{
    public function index()
    {
        $dreams = DB::table('dreams')
            ->where('user_id', auth()->user()->id)
            ->get();

        $dreams->map(function ($dream) {
            $dream->created_at = Carbon::make($dream->created_at);
            $dream->updated_at = Carbon::make($dream->updated_at);
        });

        return $dreams;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|max:255|string'
        ]);

        $dream = DB::table('dreams')->insert([
            ...$validated,
            'user_id' => auth()->user()->id,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return $dream;
    }
}
```

#### `DreamController.php`

```php
class DreamController
{
    public function index(DreamServices $dreamServices)
    {
        $dreams = $dreamServices->index();

        return view('admin.dreams.index', compact('dreams'));
    }

    public function store(Request $request, DreamServices $dreamServices)
    {
        $dream = $dreamServices->store($request);

        if ($dream) {
            return to_route('dreams.index');
        }

        return back();
    }
}
```

### Blade-এ সরাসরি PHP কোড

লারাভেল Blade টেমপ্লেটের মধ্যে আমরা সরাসরি PHP কোড রান করতে পারি। যেমন:

```blade
@php
    $name = "Hello <h3>h3</h3>";
@endphp
```

যদি আমরা ট্যাগগুলোকে আউটপুট হিসেবে `<h3>` ট্যাগ হিসেবে রেন্ডার করতে চাই, তবে তা নিম্নরূপ করতে পারি:

```blade
{!! $name !!} <!-- Hello <h3>h3</h3> -->
```

Modular Laravel Benchmark নিয়ে আমরা পরিমাপ করতে পারি কোন ফ্রেমওয়ার্ক কেমন সময় নিচ্ছে।



```PHP
$process = new Process(['ls', '-la']);
$process->run();
```
ইউজারের থেকে কোনো কমান্ড নেওয়া যাবে না। ত্রুটি আমরা কমান্ডটা বলে দেব। একটা প্রসেস রান করলে সেটা শেষ না হলে পরের লাইনে কোডের কন্ট্রোল যাবে না। এজন্য আমরা run() এর পরিবর্তে start() মেথড ব্যবহার করতে পারি। ফলে Asynchronous পদ্ধতিতে Process টি রান হবে। অর্থাৎ Process টি start করে দিয়ে কোড পরের লাইনে এক্সিকিউট করবে।

ইউজার একটা বাটন ক্লিক করলে আমরা ডাটাবেজ Export করে ইউজারের দিকে দেব এই কাজটি আমরা Process দিয়ে করাতে পারি। কারণ ডাটাবেজ export করতে কমান্ড রান করতে হয়। এই কাজ করতে আমাদের mysql এর কমান্ড রান করতে হবে। এছাড়া CSV তে রূপান্তর, বা কোনো কিছুকে json to csv তে কনভার্ট করতে, বা বড় ফাইলকে স্ক্রিপ্ট দিয়ে প্রসেস করতে এই ধরনের কাজে Process ব্যবহৃত হয়।

[github.com/laravel/pail](https://github.com/laravel/pail)
রিয়েল টাইম লগ দেখার জন্য unix-এর tail কমান্ড ব্যবহৃত হয়।
লারাভেল Pail দিয়ে php artisan pail কমান্ড দিয়ে লগগুলো দেখতে পারি। টার্মিনালের জন্য কমান্ডটি চমৎকার।
composer require laravel/pail
কমান্ড চালানোর পর কোনো এরর হচ্ছে কি না তা চেক করা যায়।
Laravel server-monitor -> Spatie-র প্যাকেজ
এটাও Symfony-র Process ব্যবহার করে বানানো।

Artisan::
এটি শুধুমাত্র php artisan টেক্সট কমান্ডগুলো রান করার জন্য।
কিন্তু Process:: দিয়ে artisan সহ যেকোনো জেনেরিক কমান্ডও রান করা যায়।

Task Scheduling
Cron Job

ধরা যাক, প্রতিদিন রাত ৯টায় আমরা কোনো কাজ করাতে চাই, তা নিয়ন্ত্রণ করাতে:crontab -e টাইপ করে আমরা দেখতে পারি কী job schedule করা আছে।

Crontab Syntax: crontab.guru"At 04:05" -> 5 4 * * *

* -> any value

, -> value list separator

- -> range of values

/ -> step values

0-23 -> allowed values

ক্রন জব দিয়ে Task scheduling সমস্যার সমাধান করেছে লারাভেলের Task Scheduling এবং crontab guru। Hostinger.com-এ গিয়ে crontab-এ গিয়ে সেট করা যায়।
ধরা যাক, আমার ৫টা job রান হবে। একটা রাত ৪টার সময়, একটা প্রতি মিনিটে, একটা ১ ঘণ্টা পরপর। এটা crontab দিয়ে করা কঠিন (hourly(), weekly(...))। তাই লারাভেলে এভাবে এটাকে solve করেছে।

লারাভেলে বিভিন্ন মেথড দিয়ে আমরা ভিন্ন ভিন্ন সময়ে task schedule করতে পারি। যেমন - প্রতি মিনিটে কোনো job রান করায় নিম্নরূপ:

everyMinute()

everySecond() -> প্রতি সেকেন্ডে

everyThirtySeconds() -> ৩০ সেকেন্ড পরপর

Supervisord কোনো task দিয়ে হেরে গেলে যেটাকে আবার Re schedule করে। একে self healing বলে। pm2 হলো process monitoring টুল।

Task Scheduling এর ক্ষেত্রে Timezone টা খেয়াল রাখতে হবে।
শুধু লারাভেলে প্রতি মিনিটে রান হয় এরকম একটা cronjob ডিফাইন করে দিতে হবে। তাহলেই আমরা লারাভেলের যে কোনো scheduler function ব্যবহার করে রান করতে পারব।

Bash
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
ক্রন জব রান করলে যেহেতু সার্ভার বিজি হয়ে যায় তাই ক্রনজবকে আমরা ভিন্ন সার্ভার থেকে রান করতে পারি। অনেক সময় queue-তেও অনেক টাস্ক জমে যায়।




Scrapping এর ক্ষেত্রেও Task scheduling ব্যবহৃত হয়।   বিভিন্ন ওয়েবসাইট থেকে নিউজ এনে আমাদের সাইটে শো করা Task Scheduling দিয়ে করা যায়।   Cronjob এর কারণে সার্ভারে বেশি লোড পড়লে ক্রনজবগুলো শুধু queue তে পুশ করবে। ঐ সার্ভার থেকে আমরা queue গুলোকে প্রসেস না করে ভিন্ন সার্ভার থেকে প্রসেস করতে পারি। এছাড়া আমরা frequency ও কমাতে পারি। যেমন: ১ মিনিটের জায়গায় ৫ মিনিট পরপর job টাকে শিডিউল করতে পারি।   প্রতিদিন রান হয় এরকম শিডিউলার সেট করা হয় নিম্নরূপে:
routes > console.php ফাইলে:   PHPSchedule::call(function () {
    DB::table('recent_users')->delete();
})->daily();
```

এছাড়া আমরা `bootstrap/app.php` ফাইলে ও schedule করতে পারি[cite: 10]।
`use Illuminate\Console\Scheduling\Schedule;`[cite: 10]

```php
->withSchedule(function (Schedule $schedule) {
    $schedule->call(new DeleteRecentUsers)->daily();
})
```

`->everySecond();` এর ব্যাখ্যা: `php artisan schedule:run` এই কমান্ড রান করলে (কমান্ডটি `* * * * * cd /path-to-your-project ...` কাজ + রানিং থাকবে) সে চেক করবে যে রান করার মতো কোনো শিডিউল আছে কিনা। থাকলে রান করবে এবং তার কাজ শেষ। আবার পরের মিনিটে এই কমান্ড রান হবে। কিন্তু sub-minute শিডিউল পেলে সে এই কমান্ডটিকে 60s ওয়েট করায় এবং সে ওই কমান্ডের ভেতর থেকেই চেক করে 1s হয়েছে কিনা, 10s হয়েছে কিনা। তারপর এক্সিকিউট করে।

---





forge.laravel.com -> এটি সাইটের অ্যাপ্লিকেশন মনিটরিং এর জন্য ব্যবহৃত হয়। cPanel এর মতো কোন একটি অ্যাপ্লিকেশন অনেক সিস্টেম লেভেলের কাজ করা যায়। যেমন - সার্ভার তৈরি, সাইট তৈরি।   আমরা যদি cPanel এর মতো কোনো সার্ভার মনিটরিং টুল বানাতে চাই তবে তা আমাদের একটা ড্যাশবোর্ড দেবে। এই ড্যাশবোর্ড টা আমরা লারাভেল দিয়ে বানাতে পারি। এই ড্যাশবোর্ডে কিছু বাটন, কিছু অপশন যেমন বাটনে ক্লিক করলে কোনো অ্যাকশন হবে যেমন সার্ভার স্ট্যাটাস দেখা, বা ড্রপডাউন মেনু তৈরি হওয়া—এই ধরনের সিনারিও হ্যান্ডেল করতে অর্থাৎ অ্যাপ্লিকেশন থেকে সিস্টেম লেভেলের কোনো কমান্ড রান করতে তখন আমাদের লাগে Process।   লারাভেলের Process হিসেবে যে ফাংশনালিটি দেয় সেটা মূলত Symfony Component এর উপর বেস করে বানানো।   কোন প্রসেসটা প্রসেস সে জায়গায় আমরা Symfony Process ব্যবহার করতে পারি।  

 ```PHP
 $process = new Process(['ls', '-la']); // মূল কমান্ড এবং flag
$process->run();
if (!$process->isSuccessful()) { // এখানে যেকোনো এক্সেপশন থ্রো করা হয়েছে
    throw new ProcessFailedException($process);
}
echo $process->getOutput(); // 'ls -la' কমান্ড রান করলে যে আউটপুট দেখা যায়
```

---


লারাভেলে Process রান করা হয় নিম্নরূপে:

PHP
use Illuminate\Support\Facades\Process;

$result = Process::run('ls -la');
```
শেষে `return $result->output();`
* `$result->successful();`
* `$result->failed();`  $\rightarrow$ রেজাল্টের স্ট্যাটাস
* `$result->exitCode();`

CMD বা টার্মিনাল দিয়ে যত কমান্ড রান করা যায়, Process দিয়েও উক্ত কমান্ডগুলো রান করা যায়। কারণ তার কাছে পাথ দেওয়া হয় তাই সে কমান্ড টার্মিনালে পাঠিয়ে দেয়। `exec()`, `shell_exec()` কমান্ডগুলো PHP দিয়ে রান করা যায়। তবে বেটার হলো `Process`।

মাল্টিপল কমান্ড প্যারালালি রান করতে `Process::pool` কমান্ড ব্যবহৃত হয়।

```php
use Illuminate\Support\Pool;

$pool = Process::pool(function (Pool $pool) {
    $pool->path(__DIR__)->command('bash import-1.sh');
    $pool->path(__DIR__)->command('bash import-2.sh');
})->start(function (string $type, string $output, int $key) {
    //
});
```

ফেক প্রসেসগুলো টেস্ট করার জন্য লারাভেল মেথড প্রোভাইড করে।


# Faking Process:

```PHP
use Illuminate\Support\Facades\Process;
use Illuminate\Support\...

Route::get('/import', function () {
    Process::run('bash import.sh');
    return 'Import complete';
});
```

**প্রসেস টেস্ট করা:**
```php
namespace Tests\Feature;

use Illuminate\Process\PendingProcess;
use Illuminate\Contracts\Process\ProcessResult;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_process_is_invoked(): void
    {
        Process::fake(); // ফেক করার মেথড প্রোভাইড করে
        $response = $this->get('/import');

        Process::assertRan('bash import.sh');
        // assert করার মেথড প্রোভাইড করে।
    }
}
```

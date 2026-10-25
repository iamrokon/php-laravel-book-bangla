# Module 12: Episode 1: Intro to Eloquent ORM

আমরা ডাটাবেজের সাথে কমিউনিকেশনের জন্য পিএইচপিতে **MySQLi** বা **PDO** ব্যবহার করি। এর সহজ রূপ হলো **Eloquent Object Relational Mapper (ORM)**।

---

## ওআরএম আর্কিটেকচার (ORM Architecture Diagram)

```
   +------------------------------------+
   |            Application             |
   +------------------------------------+
            |                 ^
            | OOP             | Object
            v                 |
   +------------------------------------+
   |                ORM                 |
   |     (Eloquent / ORM Engine)        |
   +------------------------------------+
            |                 ^
            | SQL             | Array
            v                 |
   +------------------------------------+
   |              Database              |
   |      [ MySQL / PostgreSQL ]        |
   +------------------------------------+
```

---

## ইলোকুয়েন্ট ওআরএম-এর মূল কাজ

* **Communication:** ডাটাবেজ কানেকশন হ্যান্ডেল করা (CONNECT, DISCONNECT)।
* **Query Execution:** ডেটা ম্যানিপুলেশন (INSERT, UPDATE, DELETE, FETCH/READ)।

আমরা অবজেক্ট ওরিয়েন্টেড (OOP) উপায়ে ওআরএম-এর মাধ্যমে কাজ করি। ওআরএম সেই নির্দেশকে এসকিউএল (SQL) কোয়েরিতে কনভার্ট করে ডাটাবেজে পাঠায় এবং ডাটাবেজ থেকে অ্যারে হিসেবে ফিরে আসা ডেটাকে অবজেক্ট আকারে অ্যাপ্লিকেশনে ফেরত দেয়।

---

## কোয়েরি রূপান্তর উদাহরণ (Query Example)

### র এসকিউএল কোয়েরি (Raw SQL):

```sql
SELECT * FROM flight WHERE active = 1 ORDER BY 'name' LIMIT 10;
```

### ইলোকুয়েন্ট ওআরএম কোড (Eloquent Code):

```php
$flights = Flight::where('active', 1)
    ->orderBy('name')
    ->take(10)
    ->get();
```

> **নোট:** এখানে ওআরএম স্বয়ংক্রিয়ভাবে লারাভেলের মেথডগুলোকে মূল এসকিউএল কোয়েরিতে রূপান্তর করে ডাটাবেজ থেকে ডাটা তুলে আনে।




DB থেকে তুলে আনা ডাটাগুলোকে অবজেক্ট এর Collection এ কনভার্ট করে ORM রিটার্ন করবে।

ডাটাবেজের টেবিল তৈরির কাজ আবার ORM করে না। ওটা করে Migration।

ORM এর অবজেক্ট তৈরি হয় Model এর মাধ্যমে। 
যেমন: Flight, Post মডেল টি ডাটাবেজের একটি টেবিল কে সূচিত করে।

app\Models\Post.php -> এটি posts টেবিল কে represent করে
class Post extends Model
{
    // আমরা যদি posts বাদে ভিন্ন কোন টেবিলকে এই মডেল দিয়ে সূচিত করতে চাই তা নিম্নরূপ করতে পারি:
    protected $table = 'app-posts';

    protected $primaryKey = 'o_id'; -> primary key id বাদে অন্য কলামকে সেট করতে ব্যবহৃত হয়।

    // একটা টেবিলের সাথে রিলেটেড টেবিলকে ডিফাইন করা হয় নিম্নরূপে:
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
অর্থ: আমরা যে টেবিল নিয়ে কাজ করছি অর্থাৎ posts টেবিলে author_id নামে একটি ফিল্ড আছে সেটা belong করে আরেকটি মডেলের উপর (User মডেল)।


বেজ মডেল ক্লাস:
vendor > laravel > framework > src > Illuminate > Database > Eloquent > Model.php

abstract class Model ...
{
    protected $connection;
    protected $table;
    protected $primaryKey = 'id';
}

foreach (Flight::all() as $flight) {
    echo $flight->name;
}

অর্থ: একটা টেবিলের প্রতিটি রো একটা সিঙ্গেল Model অবজেক্ট কে রিপ্রেজেন্ট করে।

একটা মডেল অবজেক্ট তথা টেবিলের একটা রো থেকে আমরা তার রিলেটেড টেবিলগুলোর ডাটাও foreign-key দিয়ে তুলে আনতে পারি। পূর্বের পেজের author() ফাংশন থেকে উক্ত পোস্টের সাথে Author এর পুরা রো এর ডাটা পেয়ে যাব (name সহ বাকি ফিল্ডগুলো)।


Route::get('/', function () {
    $post = Post::find(-1);
    // আবার অবজেক্টের সাথে তার রিলেশনশিপকে লোড করতে পারি নিম্নরূপে:
    $post = Post::with('author')->find(1);
});

Hydration (Water absorption):
Route::get('/', function () {
    $post = new Post(); -> প্রথমে Empty অবজেক্ট তৈরি হয়
    $post = $post->where('id', 1)->first(); // তারপর এটি ডাটাবেজ থেকে কোয়েরি করে এবং আগের তৈরি Empty Object -> Populate with data এই প্রসেসটিই Hydration
});

ডিবাগারে গিয়ে আমরা কোয়েরিটা দেখতে পাব।

















# Module 12(2) - Episode 1: File storage : Explaining file storage mechanism, disks and drivers

লারাভেল ফাইল নিয়ে কাজ করার জন্য Flysystem নামে একটা প্যাকেজ ব্যবহার করে যা thephleague এর। file ক্ষেত্রে ও disk ও driver ব্যবহৃত হয়।

`config/filesystems.php` এই ফাইলের ডিফল্ট ডিস্ক হিসেবে `local` সেট থাকে। ড্রাইভার => local বলতে বোঝায় অ্যাপ্লিকেশনের মধ্যেই সেভ করবে। ফাইলটা সেভ করবে। ড্রাইভার => s3 বলতে বোঝায় আমাজনের s3 ড্রাইভার ব্যবহার করবে। যেখানে ফাইল সেভ করবে।

`default` => env('FILESYSTEM_DISK', 'local'),
disks => [
    'local' => [
        'driver' => 'local',
        'root' => storage_path('app'), // [storage>app] ফোল্ডারে ফাইল সেভ করবে।
    ]
]


'public' => [
    'driver' => 'local',
    'root' => storage_path('app/public'), // [storage>app>public এ ফাইল সেভ হবে]
],

public ফোল্ডারে আমরা শুধুমাত্র সেই ফাইলগুলোই রাখি যেগুলো পাবলিকলি অ্যাক্সেসিবল - যেমন - css, js, ইমেজ ইত্যাদি। 
ইউজার যে ফাইলগুলো আপলোড করবে কিংবা যেমন - ইমেজ, পিডিফগুলো পাবলিকলি অ্যাক্সেসিবল নয়। তাই ওগুলো storage ফোল্ডারে রাখতে হবে।

আমরা কোন ডিস্কে ফাইল রাখব সেটা বলে দিতে হয়। যেমনঃ
Storage::disk('local')->put('example.txt', 'contents')

`php artisan storage:link` এই কমান্ড রান করলে public>storage নামে একটা ফোল্ডার তৈরি হবে যার লিঙ্ক থাকবে storage>app>public ফোল্ডারের সাথে। একে বলা হয় সিমিলিংক (symlink) (সিম্বোলিক লিঙ্ক)। সেই ডাটাগুলো আমরা পাবলিকলি অ্যাক্সেস করতে দিবনা সেগুলো আবার সেই ফোল্ডারে রাখা যাবেনা। এক্ষেত্রে যদিও ফাইলটা storage>app>public ফোল্ডারে আপলোড হবে কিন্তু সেগুলোকে আমরা public>storage এর মাধ্যমে অ্যাক্সেস করতে পারব।
```
সিম্বলিক লিঙ্কের মাধ্যমে আপলোডকৃত ফাইলের লিঙ্ক দেখানো যায় নিম্নরূপে:
echo asset('storage/file.txt'); // root হলো মূলত 'storage > app > public' ফোল্ডারকে বোঝাবে symlink এর মাধ্যমে।

'links' => [
    public_path('storage') => storage_path('app/public'),
    // public > storage -> storage > app > public
]

Module 12(2): Episode 2: File storage and retrieval

<form action="{{ route('file.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <input type="file" name="profile-photo">
    <button type="submit">Submit</button>
</form>

Route::post('/post', function (Request $request) {
    $path = Storage::putFile('public', $request->file('profile-photo'));
    // $path = Storage::putFileAs('public', $request->file('profile-photo'), '1.jpg');
    // $request->file('profile-photo')->store('public');
    // ->storeAs(...)
});


Markdown
সিম্বলিক লিঙ্কের মাধ্যমে আপলোডকৃত ফাইলের লিঙ্ক দেখানো যায় নিম্নরূপেঃ
echo asset('storage/file.txt'); // এটি মূলত storage>app>public ফোল্ডারকে বোঝাবে symlink এর মাধ্যমে।

'links' => [
    public_path('storage') => storage_path('app/public'),
    // public > storage -> storage > app > public




# Module 12(3) : Episode 1 : Demystifying facades

লারাভেলে Facade সার্ভিস কন্টেইনারের ক্লাসগুলোর জন্য static proxy হিসেবে কাজ করে অথবা interface হিসেবে কাজ করে।

class Sample
{
    public static function sayHello()
    {
        echo "hello";
    }
}

Sample::sayHello();
মেথডটি static না হলে অবজেক্ট তৈরি করে কল করতে হতোঃ
(new sample())->sayHello();




$yourModel = YourModel::find(1);
$yourModel
    ->addMedia($pathToFile)
    ->preservingOriginal()
    ->toMediaCollection(); // এক্ষেত্রে ডাটাবেজে মডেলের সাথে ফাইলটাকে কানেক্ট করে দেওয়া হবে।

ইমেজের অরিজিনাল ভার্সনটাও রাখবে। ইমেজটাকে তুলে আনবো বা শো করবো নিম্নরূপে:
$mediaItems = $yourModel->getMedia("*"); // মাল্টিপল ইমেজ হলে
// ->getFirstMedia() -> একটাই ইমেজ নিতে


Module 12(3) : Episode 1 : Demystifying facades

লারাভেলে Facade সার্ভিস কন্টেইনারের ক্লাসগুলোর জন্য static proxy হিসেবে কাজ করে অথবা interface হিসেবে কাজ করে।

class Sample
{
    public static function sayHello()
    {
        echo "hello";
    }
}



Sample::sayHello();
মেথডটি static না হলে অবজেক্ট তৈরি করে কল করতে হতোঃ
(new sample())->sayHello();

যে মেথড মূল ক্লাসে নাই সেগুলোকে facade এর মাধ্যমে কল করলে কাজ করব না। প্রবলেমটা হলো facade ক্লাস ব্যবহার করলে আমাদের আর ক্লাসের অবজেক্ট তৈরির ঝামেলা থাকে না।

লারাভেল facade অ্যাপ্লিকেশনটার সার্ভিস কন্টেইনারের মাধ্যেম একটি "static ইন্টারফেস (প্রক্সি) প্রদান করে। অর্থাৎ স্ট্যাটিক্যালি ক্লাসের মেথডগুলো কল করা যায়।

লারাভেল:
use Illuminate\Support\Facades\Cache; -> লারাভেলের মূল কনটেইনার থেকে কন্টেইনার থেকে resolve করে তার get() মেথডকে কল করে।

Route::get('/cache', function() {
    return Cache::get('key');
});

vendor\laravel\framework\src\Illuminate\Support\Facades\Facade.php এই

class Facade {
    public static function __callStatic($method, $args)
    {
        $instance = static::getFacadeRoot();
        // কন্টেইনার থেকে Resolve করে $instance টাকে পাই
        
        return $instance->$method(...$args);
    }
}
``





প্রত্যেকটা ইনস্ট্যান্সকে resolve করার সময় আবার তা resolved ইন্সট্যান্স এ ক্যাশ করে রাখে। যাতে পরবর্তীতে resolvedFacadeInstance($name) {
    protected static function resolveFacadeInstance($name) {
    
লারাভেলের ডিফল্ট ক্লাসগুলোকে অ্যালিয়াস হিসেবে রাখা হয়ে থাকে। Facade ক্লাসে
public static function defaultAliases()
{
    return collect([
        'App' => App::class,
        'Arr' => Arr::class,
    ]);
}

অন্য কোনো ক্লাসের জন্য facade না হলে আমরা সেটা এড করতে পারি `config > app.php` ফাইলের 'aliases' => facade :: defaultAliases()->merge([
    // এখানে facade এড করর
]);

ফ্র্যাকুয়েড কলী:
Route::get('/', function() {
    \App::register(); // আমরা চাইলে facade এর বদলে helper() ফাংশনও ব্যবহার করতে পারি।
    app()->register(); // দুটোর একেই কাজ করে।
}
পূর্ব Facade কে টেস্ট করা যেত না যে লারাভেল বর্তমানে Facade কে টেস্ট করার পদ্ধতি আমাদের দিয়েছে। shouldReceive(), partialMock(), এই ফাংশনগুলোর মাধ্যমে Facade কে টেস্ট করা যায়।

Illuminate\Support\Facades\App.php এর মধ্যে
class App extends Facade {
    protected static function getFacadeAccessor()
    {
        return 'app';
    }
}
অর্থাৎ এটি মূলত সার্ভিস কন্টেইনারে key হিসেবে বাইন্ড করা থাকে। এই key তে যে অবজেক্টটা resolve আছে সেই অবজেক্টটা App Facade কে কল করবে।
```


আমরা যখন বিভিন্ন প্যাকেজ ব্যবহার করি সেগুলোও নিজস্ব Facade প্রদান করে। যেমন: স্প্যাটি প্যাকেজ `spatie/laravel-activitylog` যেটি স্প্যাটি প্যাকেজের `\Spatie\Facades\LogBatch::php` ফাইলে থাকে।

এখন আমরা কোন প্যাকেজ তৈরি করলে সেখানেও Facade প্রোভাইড করতে পারি যাতে প্যাকেজের ক্লাসগুলোকে স্ট্যাটিক্যালি ব্যবহার করা যায়।

Real time facade: আমরা একটা নতুন কন্টেইনারের মাধ্যমে রিয়েলটাইম Facade ব্যবহার করা যায়।

app > services > SampleService.php
class SampleService {
    public function doSomething() {
        echo "doing a lot of thing";
    }
}

সাধারণত Service ক্লাসটাকে আমরা এভাবে ব্যবহার করি, অবজেক্ট তৈরি করে, ডিপেন্ডেন্সি হিসেবে ইনজেক্ট করে।

UserController.php
use App\Services\SampleService;
class UserController {
    public function __construct(
        protected SampleService $sampleService
    ) {}
}



public function index() {
    (new SampleService())->doSomething();
}

এছাড়া আমরা ক্লাসকে রিয়েল টাইম ফ্যাসাড হিসেবে ডিক্লেয়ার করে এর মেথডকে স্ট্যাটিক্যালি কল করতে পারি। শুধু ' facades\ ' যুক্ত করতে হবে।
use facades\App\Services\SampleService;

class UserController
{
    public function index()
    {
        SampleService::doSomething(); // -> রিয়েল টাইম Facade
    }
}

মূলত রিয়েল টাইম ফ্যাসাড storage > framework > cache ফোল্ডারে একটা facade তৈরি হয়।

cache > facade-a546....php
namespace facade\App\Services;

class SampleService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'App\Services\SampleService';
    }
}
```



একটা ক্লাসে যত বেশি Facade ব্যবহার করা হবে তত ক্লাসের ডিপেন্ডেন্সি তত বাড়তে থাকবে যেটি Best design নয়। এজন্য আমরা চেষ্টা করব পারতপক্ষে কম Facade ব্যবহার করা যায়।

# Module 17: Live Class 1: Filament


packpack -> এডমিন প্যানেল (paid)
filament (free) -> এডমিন প্যানেল
এর অনেক প্লাগইন আছে।

Nova -> এটাও লারাভেলের এডমিন প্যানেল
whizzy.dev -> ai বেসড টুল যেটার মাধ্যমে আমাদের প্রয়োজন অনুযায়ী এডমিন প্যানেল তৈরি করা যায়

composer require filament/filament:"^3.2"
php artisan filament:install

Providers > Filament > AdminPanelProvider


php artisan filament:user -> এডমিন ইউজার তৈরি হবে।

আমরা আমরা CRUD অপারেশন করব।
php artisan filament:resource

PostResource.php
Table\Columns\TextColumn::make('title') -> ফর্মে title নামে একটা ফিল্ড দেবে।
->required()

Module 15: Live Class 2: Livewire

Single Page Application এর মতো সাইডের অভিজ্ঞতা দেওয়ার জন্য Livewire ব্যবহার করা হয়.
laravel-livewire.com

Livewire মূলত VueJS বা ReactJS এর মতো কাজ করে, কিন্তু Laravel এ এই লাইব্রেরিগুলো ব্যবহার করতে হয়.
Livewire দিয়ে আমরা যা যা কাজ করতে পারব: Forms validation, Datatable, Table (pagination, filtering, sorting), Charts, Image Upload (প্রিভিউ সহ), AlpineJS ইন্টিগ্রেশন (ইনস্টল করতে হয় না), Livewire screencasts -> Paid.

ইনস্টল করার নিয়ম: composer require livewire/livewire

এই ইনস্টল করার আগে Ensure করতে হবে যেন সিস্টেমে Livewire ইন্সটল করা থাকে এবং AlpineJS না থাকে।

php artisan make:livewire counter
কাউন্টার কম্পোনেন্ট তৈরি করার জন্য লারাভেলের full-stack ভিউ ব্যবহার করা যায়। যার সাহায্যে php ফাইলে ডাইনামিক UI কম্পোনেন্ট তৈরি করা যায়।
php artisan livewire // php artisan livewire:make counter
views -> counter.blade.php কম্পোনেন্টে তৈরি করতে হবে

<div> -> প্রতিটিতে livewire কম্পোনেন্টে অবশ্যই একটা রুট রাখতে হবে
<button wire:click='plus'>+</button>
<p>{ $count }</p>
<button wire:click='minus'>-</button>
</div>

Counter কম্পোনেন্ট তৈরি হলে প্রধান দুইটা ফাইল পাবে:
1. views > counter.blade.php
2. app > Livewire > Counter.php

Route::get('/', function () { return view('welcome'); });

(ভিতরে কোড) HTML (বডি ট্যাগ সহ)
<body>
<main>
<Livewire:counter>
</main>
</body>

Livewire মূলত ডেমোক্রেটিক AJAX রিকোয়েস্টের মাধ্যমে কাজ করে। 
অ্যাক্টিভিটির Network ট্যাব এর Fetch/XHR ফিল্ডে গেলে আমরা লাইভওয়্যার এর রিকোয়েস্টগুলো দেখতে পাব। 
Livewire তে বিভিন্ন রুলস বা প্রপার্টি দেওয়া যায়।

আমরা যদি খুঁজে দেখি app > Livewire > Counter.php

class Counter extends Component
{
    public $count = 0;

    public function plus()
    {
        $this->count++;
    }

    public function minus()
    {
        if ($this->count > 0) {
            $this->count--;
        }
    }
}


public function render()
{
    return view('livewire.counter');
}

আমরা Memes তৈরি করার জন্য: ১. লাইভ কম্পোনেন্ট তৈরি, ২. ভিউ ফাইল তৈরি করে mems (দেখতে পারব) rename করব না, খোলা রূপ! ৩. ব্লেড Memes যুক্ত করা
php artisan livewire:make Memes[cite: 32]
memes.blade.php ফাইল (কম্পোনেন্ট) তৈরি হবে। live.debounce দিলে সাথে সাথে change হবে memes.blade.php -> live.debounce দিলে কিছু সময় পরে change হবে।
live.throttle মিলিসেকেন্ড পর পর text live.throttle.1000ms মিলিসেকেন্ড পর পর text change হবে।

<div class=>
<form wire:submit='save'>
<input wire:model.live='meme' placeholder="add your meme text">
<button type="submit">Add <button>
</form>

Your next meme is: { $meme }

@foreach ($memes as $memeTemplate)
<li>{ $memeTemplate }</li>
@endforeach

web.php
Route::get('/memes', Memes::class)->name('memes');

php artisan make:livewire layout -> এই ফাইলটি না বানালে সরাসরি কাজ করবে livewire লেআউট মেইন পেজ বা।
``





alpine.js

Memes.php
use Livewire\Attributes\Title;
use Livewire\Attributes\Layout;

# Title('All Memes') -> এটি হলো পিএসডি অ্যাট্রিবিউট বা ডাইনামিক দিয়ে আমরা লেআউট কন্ট্রোল করলাম।

class Memes extends Component
{
    public $memes = [];

    public function render()
    {
        return view('livewire.memes', [
            'memes' => [...]
        ]);
    }
}

আরেকটা বিষয় হলো, কম্পোনেন্ট বা ভিউ ফাইল রিনেম করা যাবে না, খোলা রূপ! রিনেম করা যাবে না!

Livewire এ আমরা চাইলে inline HTML ও লিখতে পারি।

Counter.php
public function render() {
    return <<< 'HTML'
    <div>
        <button wire:click='plus'>+</button>
        <h1>{ $count }</h1>
        <button wire:click='minus'>-</button>
    </div>
    HTML;
}

HTML;
```



livewire কম্পোনেন্টকে যখন আমরা full page কম্পোনেন্ট হিসেবে render করতে চাই তখন সে একেকটা করে যৌক্তিকভাবে একটা লেআউট এর মধ্যে রাখা হয় (components > layouts)
app.blade.php

livewire এর লেআউট তৈরির কমান্ড: php artisan livewire:layout

livewire এর 8000/memes
127.0.0.1:8000/memes

livewire এর lifecycle hook:
mount() -> কম্পোনেন্ট তৈরি করা। অনেকটা constructor এর মতো।
hydrate() -> ...
boot() -> ...

যেমন: সাদিক নামে একজন জন্ম নিয়েছে -> টা একটা event
সাদিক স্কুলে যাওয়া শুরু করেছে -> টা তার life এর একটা stage
সাদিক বিয়ে করেছে -> টা তার life এর একটা stage
কম্পোনেন্টগুলোও

সাদিক স্কুলে গেলে তাকে আমরা একটা কাজ চিনিয়ে দেব। বিয়ে করলে একটা ঘর বানিয়ে দেব। তেমনি কম্পোনেন্টের বিভিন্ন lifecycle এ আমরা বিভিন্ন কাজ করতে পারি।

class Memes extends Component
{
    public $memes = [];

    public function mount() {
        $this->memes = [
            'ডার্টি কম কলার পিও',
            'মাদার না',
        ];
    }
}
``





public function render() { return view('livewire.memes'); }[cite: 31]

class Meme {
    public $meme = '';[cite: 31]
    public $memes = [[cite: 31]
        'সাদিক কম কত কিছু, কিপ্টী জিনিয়াস্টি',[cite: 31]
        'মাদার না',[cite: 31]
    ];[cite: 31]

    public function save() {[cite: 31]
        $this->memes[] = $this->meme;[cite: 31]
        $this->reset('meme');[cite: 31]
    }
}

length
আমরা চাইলে লাইভ ভিউতে লেংথ ও শো করতে পারি alpinejs দিয়ে[cite: 31]।

Your next meme is: <span x-text="$wire.meme.length"><span>[cite: 31]
</form>[cite: 31]

এখনি meme অ্যাড করলে স্পিন হুইল লাইভওয়্যার দিয়ে <p wire:loading wire:target="save">Saving Meme...</p> এভাবে আমরা লোডিং স্পিনার শো করব ।




components > layouts > app.blade.php
web.php
Route::get('/', Counter::class);
components > layouts > app.blade.php
<body>
<nav>
<a href="/" wire:navigate>Counter<a>
<a href="{{ route('memes') }}" wire:navigate>Memes<a>
<a href="{{ route('posts') }}" wire:navigate>Posts<a>
<nav>

অন্যান্য post রাউট (মডেল সহ)
php artisan make:model Post -mf

Post.php
class Post extends Model
{
    protected $fillable = ['title', 'content'];
}

create_posts_table.php
Schema::create('posts', function (Blueprint $table) {
    $table->string('title');
    $table->table->content('content');
});

PostFactory.php
public function definition() {
    return [
        'title' => fake()->realText(80),
        'content' => fake()->realText(1)
    ];
}






DatabaseSeeder.php
{
    Post::factory(10)->create();
}

php artisan migrate --seed
php artisan livewire:make Posts
পোস্টগুলোকে লাইভওয়্যার দিয়ে শো করব।
Livewire > Posts.php

class Posts extends Component
{
    public function render() {
        return view('livewire.posts', [
            'posts' => Post::all()
        ]);
    }
}

posts.blade.php
<div>
<ul>
@forelse ($posts as $post)
<li>
<h2>{ $post->title }</h2>
<p>{ $post->content }</p>
</li>
@empty
No posts to show
@endforelse
</ul>

<form>
<input type="search" placeholder="search by post title">
</form>
{ $posts->links() } -> pagination লিঙ্ক বাটন
</div>







web.php
Route::get('/posts', Posts::class)->name('posts');

posts.blade.php
<div>
<form wire:submit="">
<input type="search" wire:model.live.debounce="search"
placeholder="search by post title">
</form>
</div>

Posts.php
use Livewire\Attributes\Url;[cite: 19]use Livewire\WithPagination;
class Posts extends Component {
    use WithPagination;

    #[Url(as: 's')] public $search = '';[cite: 19]// রাউট এর এসাইন
    
    public function render() {[cite: 19]
        return view('livewire.posts',[cite: 19]
            'posts' => Post::where('title', 'LIKE', '%' . $this->search . '%')->paginate(3)
        ]);
    }
}

With Pagination নামক trait ব্যবহার করতে হয়[cite: 19]livewire এ পেজিনেশনের জন্য।

php artisan livewire:make UploadMeme[cite: 19]
livewire তে আমরা upload() নামে কোনো মেথড লিখতে পারব না কারণ এটি livewire এর রিজার্ভ কিওয়ার্ড।
```






ফাইল আপলোড
web.php
Route::get('upload', UploadMeme::class)->name('upload');

app.blade.php
<a href="{{ route('upload') }}" wire:navigate>Upload a meme<a>

UploadMeme.php
use Livewire\WithFileUploads;

class UploadMeme extends Component
{
    use WithFileUploads;

    public $image;

    public function save() {
        $this->validate(['required|image']);
        $this->image->store('memes', 'disk'); // storage>app>private>memes
    }

    public function render() {
        return view('livewire.upload-meme');
    }
}

uploadd-meme.blade.php (লাইন লান)
<div>
<form wire:submit='save' enctype="multipart/form-data">
<input type="file" wire:model.live='image'>
<button type="submit">Upload </button>
</form>

@error('image')
<span class="error">{ $message }</span>
@enderror

@if ($image)
<div>
<h3>Uploaded image preview</h3>
<img src="{{ $image->temporaryUrl() }}" alt="Uploaded">
</div>
@endif
</div>
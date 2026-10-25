Module 11 (3): Episode 6: Debugging tools and techniques
(dd, var dump server, debugbar, ray, telescope etc)   ডিবাগিং: আমাদের কোড ঠিকমতো আসছে কিনা তা দেখার জন্য ডিবাগ করতে হয়।  

```php
Route::get('/', function () {
    $person = [
        'name' => 'Shaon'
    ];
    var_dump($person);
});
```

* `var_dump($person);` (Variable dump) কোডের এক্সিকিউশন অফ করে দেয় না।]
* `dd($person);` (Dump and die) কোডের এক্সিকিউশন অফ করে দেয়।
* ডিবাগিং এর মাধ্যমে dd করতে পারি।

আমরা চাইলে এভাবে চেইনিং এর মাধ্যমেও `dd` করতে পারি।

```php
collect(['Jane Doe', 'Jane Doe'])
    ->map()
    ->dd();
```

কোন কোড রান হতে কতটুকু সময় নিচ্ছে আমরা চাইলে সেটা Benchmark করে ও দেখতে পারি।

```php
Benchmark::dd(fn () => User::find (1));
```
`Output: 8.262 ms`

---
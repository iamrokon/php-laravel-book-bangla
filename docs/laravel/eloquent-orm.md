# ইলোকুয়েন্ট ওআরএম ও অপটিমাইজেশন (Eloquent ORM & Optimization)

লারাভেলের **Eloquent ORM** হলো ডেটাবেজের সাথে ইন্টারেক্ট করার একটি অত্যন্ত চমৎকার এবং অবজেক্ট-ওরিয়েন্টেড মাধ্যম। তবে বড় অ্যাপ্লিকেশনে কাজ করার সময় পারফরম্যান্স ধরে রাখতে ইলোকুয়েন্ট অপটিমাইজেশন জানা অত্যন্ত জরুরি। নিচে এর গুরুত্বপূর্ণ বিষয়গুলো আলোচনা করা হলো:

---

## ১. N+1 কুয়েরি প্রবলেম ও সমাধান (N+1 Query Problem & Eager Loading)

ইলোকুয়েন্টে কোনো রিলেশন ডিফল্টভাবে **Lazy Loaded** থাকে। অর্থাৎ, যখন আমরা রিলেশনশিপের ডেটা কল করি, তখনই কেবল নতুন একটি কুয়েরি চলে। এর ফলে **N+1 প্রবলেম** তৈরি হয়।

### N+1 প্রবলেম উদাহরণ:
```php
// এখানে ১টি কুয়েরি চলবে সব বই রিট্রিভ করার জন্য
$books = Book::all(); 

foreach ($books as $book) {
    // প্রতিবার লুপ ঘুরলে ১টি করে কুয়েরি চলবে লেখকের নাম পাওয়ার জন্য
    echo $book->author->name; 
}
```
যদি আমাদের কাছে ২০টি বই থাকে, তবে মোট কুয়েরি চলবে:
$$\text{মোট কুয়েরি} = 1 \text{ (সব বইয়ের জন্য)} + 20 \text{ (প্রতিটি বইয়ের লেখকের জন্য)} = 21 \text{ টি}$$
এটিই হলো **N+1 কুয়েরি প্রবলেম**। ডাটাবেজে বেশি ডেটা থাকলে এটি আপনার অ্যাপ্লিকেশনকে মারাত্মক স্লো করে দেবে।

### সমাধান (Eager Loading):
`with()` মেথড ব্যবহার করে আমরা সব রিলেশনের ডেটা একসাথে লোড করে নিতে পারি যাকে **Eager Loading** বলা হয়।
```php
// এখানে মাত্র ২টি কুয়েরি চলবে!
$books = Book::with('author')->get(); 

foreach ($books as $book) {
    echo $book->author->name; // কোনো অতিরিক্ত কুয়েরি রান হবে না
}
```

### ব্যাকএন্ডে কুয়েরি কীভাবে কাজ করে?
লারাভেল আড়ালে এভাবে কুয়েরিগুলো চালায়:
1. প্রথমে মূল টেবিল থেকে ডেটা নেয়:
   ```sql
   SELECT * FROM books;
   ```
2. এরপর আইডিগুলো কালেক্ট করে (`$author_ids = [1, 2, 3, 4, 5, 6, 7]`) একবারে `IN` কুয়েরির মাধ্যমে লেখকদের লোড করে:
   ```sql
   SELECT * FROM authors WHERE id IN (1, 2, 3, 4, 5, 6, 7);
   ```
3. সংগৃহীত লেখকগুলোকে তাদের রেসপেক্টিভ বইয়ের সাথে ম্যাপ করে দেয়:
   ```php
   foreach ($books as $book) {
       $book->author = $authors->find($book->author_id);
   }
   ```

---

## ২. বড় ডেটাবেজের জন্য চাঙ্কিং (Database Chunking)

ডাটাবেজে হাজার হাজার বা লক্ষাধিক ডেটা থাকলে একসাথে `all()` বা `get()` দিয়ে সব ডেটা মেমরিতে লোড করা যাবে না। এর ফলে মেমরি লিমিট এক্সিড (Memory Limit Exceeded) হতে পারে। এই সমস্যা এড়াতে ডেটা ছোট ছোট ভাগে ভাগ করে নেওয়া বা **Chunking** করা উচিত।

```php
use Illuminate\Database\Eloquent\Collection;

// একসাথে ১০০০ টা করে ডেটা নিয়ে মেমরি সাশ্রয়ী উপায়ে প্রসেস করা
Flight::chunk(200, function (Collection $flights) {
    foreach ($flights as $flight) {
        // প্রতিটি ফ্লাইটের ডেটা প্রসেস করুন
    }
});
```
> [!NOTE]
> `chunk()` মেথডের প্রথম আর্গুমেন্ট হলো আমরা একবারে কতটি রেকর্ড লোড করতে চাই (যেমন: ২০০), এবং দ্বিতীয় আর্গুমেন্ট হলো ক্লোজার ফাংশন যা ওই চাঙ্কড ডেটা প্রসেস করবে।

---

## ৩. প্রাইমারি কি হিসেবে UUID ব্যবহার (UUID vs Auto-incrementing ID)

সাধারণত আমরা প্রাইমারি কি হিসেবে অটো-ইনক্রিমেন্টিং `integer` ব্যবহার করি। তবে এপিআই বা ডাটাবেজ সিকিউরিটিতে সরাসরি এই আইডিগুলো এক্সপোজ করলে কিছু সমস্যা হতে পারে:
- হ্যাকার বা আক্রমণকারীরা আইডি গেস করে (Brute force) আইডি পরিবর্তনের মাধ্যমে খুব সহজেই ডেটা হাতিয়ে নিতে পারে (যা **IDOR - Insecure Direct Object References** নামে পরিচিত)।
- এই কারণে অ্যাপ্লিকেশনে সিকিউরিটি বাড়াতে আমরা আইডির পরিবর্তে **UUID** (Universally Unique Identifier) ব্যবহার করি। এটি একটি ৩৬ ক্যারেক্টারের ইউনিক স্ট্রিং।

মডেলে কাস্টম প্রাইমারি কি এবং টাইপ বলে দিতে হয়:
```php
class Flight extends Model
{
    // যদি id ছাড়া অন্য কলামকে primary key করতে চান
    protected $primaryKey = 'flight_id';

    // যদি প্রাইমারি কি অটো-ইনক্রিমেন্টিং না হয়
    public $incrementing = false;

    // প্রাইমারি কি-র ডেটা টাইপ বলে দেওয়া
    protected $keyType = 'string';
}
```

---

## ৪. সফট ডিলিট (Soft Deletes)

অ্যাপ্লিকেশন থেকে কোনো ডেটা ডিলিট করার পর তা যদি আবার পুনরুদ্ধার (retrieve) করতে হয়, তখন **Soft Delete** ব্যবহৃত হয়। এতে ডেটাবেজের টেবিল থেকে রেকর্ডটি সরাসরি ডিলিট না হয়ে শুধুমাত্র `deleted_at` কলামে ডিলিট করার তারিখ ও সময় বসে।

```php
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Flight extends Model
{
    use SoftDeletes;

    // soft delete এর জন্য deleted_at টাইমস্ট্যাম্প ট্র্যাকিং করবে
    protected $dates = ['deleted_at'];
}
```
সফট ডিলিট করা ডেটা রিট্রিভ করতে চাইলে:
```php
// সফট ডিলিট হওয়া রেকর্ডসহ লোড করা
$flights = Flight::withTrashed()->get();

// শুধুমাত্র সফট ডিলিট হওয়া রেকর্ডগুলো লোড করা
$deletedFlights = Flight::onlyTrashed()->get();

// সফট ডিলিট হওয়া ডেটা পুনরুদ্ধার করা
$flight->restore();
```

---

## ৫. ইলোকুয়েন্ট কুয়েরি বিল্ডার (Eloquent Query Builder)

Eloquent ব্যবহার করলে আমরা কাস্টিং, রিলেশনশিপ ইত্যাদির এক্সট্রা বেনিফিট পাই। তবে বড় জয়েন (Join), সাব-কুয়েরি (Subquery) বা কমপ্লেক্স কুয়েরির ক্ষেত্রে আমরা সরাসরি Eloquent-এর পাশাপাশি **Eloquent Query Builder** ব্যবহার করতে পারি।

---

## ৬. লোকাল স্কোপ (Local Scopes)

লোকাল স্কোপের মাধ্যমে আমরা কমন কুয়েরিগুলোকে মডেলে ছোট মেথড হিসেবে ডিফাইন করে কোড রিইউজেবল করতে পারি।

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    // local scope ডিফাইন করার নিয়ম (scope শব্দ দিয়ে শুরু করতে হবে)
    public function scopeAdmin(Builder $query): Builder
    {
        return $query->where('role', 'admin');
    }
}
```
এখন কন্ট্রোলারে বা অন্য কোথাও শর্টকাটে এটি ব্যবহার করতে পারি:
```php
// scopeAdmin মেথডটিকে admin() হিসেবে কল করা
$admins = User::admin()->get();
$firstAdmin = User::admin()->first();
```

---

## ৭. কন্ডিশনাল রিলেশন লোডিং (Eager Loading with Constraints)

রিলেশন লোড করার সময় যদি নির্দিষ্ট কোনো ফিল্টার অ্যানালিসিস বা কন্ডিশন প্রয়োগ করতে হয়, তবে `with()` এর ভেতরে ক্লোজার পাস করা যায়:

```php
use Illuminate\Database\Eloquent\Builder;

// শুধুমাত্র ১ নম্বর শপের প্রোডাক্টসহ ইউজার লোড করা
$user = User::with(['products' => function (Builder $query) {
    $query->where('shop_id', 1);
}])->find(1);

// এতে মূলত দুটি আলাদা কুয়েরি চলবে:
// 1. SELECT * FROM users WHERE id = 1;
// 2. SELECT * FROM products WHERE user_id = 1 AND shop_id = 1;
```

---

## ৮. পারফরম্যান্স ও মনিটরিং টুলস (Eloquent Performance Tools)

Eloquent কোয়েরিগুলোর পারফরম্যান্স ইন্ট্রোস্পেকশন করার জন্য অর্থাৎ কুয়েরিগুলো কেমন লেখা হচ্ছে, বটলনেক (Bottlenecks) কোথায় হচ্ছে, ডাটাবেজ কলাম ইনডেক্স সঠিক আছে কি না তা দেখতে বেশ কিছু টুল ব্যবহার করা যায়:
1. **Laravel Telescope:** লারাভেল অ্যাপ্লিকেশনের সব রিকোয়েস্ট, কুয়েরি, লগ, মেল ট্র্যাকিংয়ের চমৎকার লোকাল অ্যাসিস্ট্যান্ট।
2. **Laravel Pulse:** রিয়েল-টাইম অ্যাপ পারফরম্যান্স, স্লো কোয়েরি এবং সার্ভার মেমোরি ট্র্যাকিংয়ের অফিশিয়াল টুল।
3. **Database Indexing:** ডাটাবেজ ইনডেক্সিং রিড অপারেশনকে দ্রুত করলেও রাইট (Write/Insert/Update) অপারেশনকে কিছুটা স্লো করে দেয়। তাই প্রয়োজনীয় কলামেই কেবল ইনডেক্স ব্যবহার করা উচিত।

---

## ৯. অ্যাক্সেসর ও মিউটেটর (Accessors & Mutators)

আমরা ডেটাবেজে র-ফরম্যাটে ডেটা সেভ করলেও অ্যাপ্লিকেশন সাইটে ডেটাটি মডিফাই করে ব্যবহার করার জন্য Accessor ও Mutator ব্যবহার করা হয়। (যেমন: `first_name` ও `last_name` মিলিয়ে `fullName` প্রদর্শন করা)।

### Accessor (ডেটা রিড করার সময় মডিফাই করা):
```php
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Model
{
    // Accessor: প্রথম অক্ষর বড় হাতের করা
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn (mixed $value, array $attributes) => ucfirst($attributes['first_name'] ?? '') . ' ' . ucfirst($attributes['last_name'] ?? ''),
        );
    }
}
```

### Mutator (ডেটাবেজে সেভ করার সময় মডিফাই করা):
```php
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Model
{
    // Accessor ও Mutator একসাথে ডিফাইন করা
    protected function firstName(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucfirst($value),      // দেখানোর সময় প্রথম অক্ষর বড় হবে
            set: fn (string $value) => strtolower($value),   // ডাটাবেজে সেভ হওয়ার সময় সব ছোট হাতের হবে
        );
    }
}
```

---

## ১০. কাস্টিং ও রিফ্রেশিং (Casting & Refreshing)

### Attribute Casting:
কাস্টিংয়ের কাজ হলো ডাটাবেজ থেকে রিট্রিভ করা ডেটার টাইপ অটোমেটিক কনভার্ট করা। যেমন: ০ বা ১ হিসেবে সেভ থাকা ডাটাগুলোকে `boolean` (true/false) হিসেবে রিটার্ন করা:
```php
class User extends Model
{
    // attribute casts ডিফাইন করা
    protected function casts(): array
    {
        return [
            'is_admin' => 'boolean',
        ];
    }
}
```

### refresh() মেথড:
মডেলের অবজেক্ট মডিফাই করার পর ডাটাবেজের লেটেস্ট ফ্রেশ ডেটা পুনরায় লোড করে মেমরি সিঙ্ক করার জন্য `refresh()` ব্যবহার করা হয়:
```php
$user = User::find(1);
$user->name = 'Nahian';

// ডাটাবেজ থেকে লেটেস্ট আপডেট বা ফ্রেশ ভ্যালু পুনরায় রিলেশনসহ লোড করতে
$user->refresh();
```

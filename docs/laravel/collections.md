# লারাভেল কালেকশনস (Laravel Collections)

লারাভেল **Collections** অ্যারে ডেটা নিয়ে কাজ করার জন্য একটি অত্যন্ত শক্তিশালী, ফ্লুয়েন্ট এবং অবজেক্ট-ওরিয়েন্টেড র‍্যাপার (Object-oriented wrapper) প্রদান করে। এটি পিএইচপির রানিং মেমোরিতে অ্যারে-কে অবজেক্টে রূপান্তর করে বিভিন্ন চেইনিং অপারেশন চালানোর সুবিধা দেয়।

---

## ১. লারাভেল কালেকশন পরিচিতি (Introduction to Laravel Collections)

লারাভেলে মূলত দুটি প্রধান কালেকশন ক্লাস রয়েছে:
1. **`Illuminate\Support\Collection`:** সাধারণ অ্যারে-কে কালেকশনে রূপান্তর করে প্রসেস করার জন্য এটি ব্যবহৃত হয়।
2. **`Illuminate\Database\Eloquent\Collection`:** ডাটাবেজ কোয়েরির ফলাফল (যেমন: `User::all()`) রিটার্ন করার জন্য এটি তৈরি, যা মূল সাপোর্ট কালেকশন ক্লাসটিকে এক্সটেন্ড করে এবং মডেল রিলেটেড অতিরিক্ত কিছু মেথড অফার করে।

### কালেকশন তৈরির বেসিক উদাহরণ:
আমরা `collect()` হেল্পার মেথড দিয়ে কালেকশন তৈরি করতে পারি:

```php
$titles = ["Sample Title One", "Another Example", "Third Title"];

// টাইটেলগুলোকে স্লাগ (Slug) এ ম্যাপ করে অ্যারে রিটার্ন করা:
$slugs = collect($titles)->map(function ($title){
    return str($title)->slug();
})->all();

// $slugs এর আউটপুট: ["sample-title-one", "another-example", "third-title"]
```

---

## ২. সচরাচর ব্যবহৃত কালেকশন মেথডস - পার্ট ০১ (Collection Methods - Part 1)

নিচের উদাহরণগুলো বোঝার জন্য একটি বেসিক কালেকশন ডিফাইন করে নেওয়া যাক:
```php
$collection = collect([10, 20, 50, 100, 70, 90]);
```

### ক. কালেকশন থেকে প্লেইন অ্যারে পাওয়া (`all`):
মেথড চেইনিং এর পর ফলাফলকে পুনরায় পিএইচপি অ্যারেতে রূপান্তর করতে `all()` ব্যবহার করা হয়।
```php
dump(collect([1, 2, 3])->all());
// Output: [1, 2, 3]
```

### খ. কি (Key) দিয়ে ভ্যালু গেট করা (`get`):
```php
$rolesPermissions = collect([
    'admin' => ['view user', 'create user', 'edit user', 'delete user'],
    'user' => ['view user', 'create user'],
    'subscriber' => ['view user']
]);

dump($rolesPermissions->get('subscriber'));
// Output: ["view user"]
```

### গ. কালেকশনের সংখ্যা গণনা করা (`count`):
```php
dump($rolesPermissions->count()); // Output: 3
```

### ঘ. প্রথম ও শেষ ইলিমেন্ট পাওয়া (`first` / `last`):
```php
dump($collection->first()); // Output: 10
dump($collection->last());  // Output: 90
```

### ঙ. গাণিতিক অপারেশনস (`min`, `max`, `sum`, `avg`):
```php
dump($collection->min()); // সবচেয়ে ছোট ভ্যালু। Output: 10
dump($collection->max()); // সবচেয়ে বড় ভ্যালু। Output: 100
dump($collection->sum()); // যোগফল। Output: 340
dump($collection->avg()); // গড় বা এভারেজ। Output: 56.66
```

### চ. কালেকশন খালি কিনা চেক করা (`isEmpty` / `isNotEmpty`):
```php
dump($collection->isEmpty());    // Output: false
dump($collection->isNotEmpty()); // Output: true
```

### ছ. লিমিট করে ইলিমেন্ট নেওয়া ও বাদ দেওয়া (`take` / `skip`):
- `take(3)`: প্রথম ৩টি ইলিমেন্ট নিবে।
- `skip(3)`: প্রথম ৩টি ইলিমেন্ট বাদ দিয়ে বাকিগুলো নিবে।
- `take(-3)`: শেষ দিক থেকে ৩টি ইলিমেন্ট নিবে।
```php
dump($collection->take(3)->all()); 
// Output: [10, 20, 50]

dump($collection->skip(3)->all()); 
// Output: [100, 70, 90]

dump($collection->take(-3)->all()); 
// Output: [100, 70, 90]
```

### জ. ডিবাগিং করা (`dd` / `dump`):
কালেকশনের মেথড চেইনিং এর মাঝপথে ডেটার অবস্থা দেখার জন্য কালেকশনের নিজস্ব `dd()` বা `dump()` মেথড ব্যবহার করা যায়।
```php
$collection->skip(3)->dd(); 
// এক্সিকিউশন বন্ধ করে ডাটা ডাম্প করবে
```
> [!IMPORTANT]
> কালেকশনের `dd()` এবং `dump()` মেথড দুটি অবশ্যই কালেকশন ইনস্ট্যান্সের সাথে মেথড চেইন করে ব্যবহার করতে হবে।

### ঝ. এলোমেলো ও উল্টো করা (`shuffle` / `reverse`):
```php
dump($collection->shuffle()->all()); // উপাদানগুলো র্যান্ডমলি বিন্যস্ত হয়ে যাবে
dump($collection->reverse()->all()); // উল্টো হবে। Output: [90, 70, 100, 50, 20, 10]
```

---

## ৩. সচরাচর ব্যবহৃত কালেকশন মেথডস - পার্ট ০২ (Collection Methods - Part 2)

### ক. লুপ চালানো (`each`):
কালেকশনের ভেতরের ইলিমেন্টগুলোকে লুপ করার জন্য `each()` মেথড ব্যবহার করা হয়।
```php
$rolesPermissions->each(function ($value, $key) {
    dump($key . ': ' . implode(', ', $value));
});
```

### খ. কন্ডিশনাল ম্যাপ করা (`map`):
```php
$posts = collect(['Post Title 1', 'Post Title 2']);
$slugs = $posts->map(function ($title) {
    return str($title)->slug();
});
dump($slugs->all()); // Output: ["post-title-1", "post-title-2"]
```

### গ. ফিল্টারিং করা (`filter` / `reject`):
- **`filter()`:** যে উপাদানগুলো কন্ডিশন সত্য (true) করবে, শুধুমাত্র সেগুলোকে রাখবে।
- **`reject()`:** কন্ডিশন সত্য হলে সেগুলোকে বাদ দিবে (ফিল্টারের বিপরীত)।
```php
$numbers = collect([1, 2, 3, 4, 5]);

// ২ এর চেয়ে বড় উপাদানগুলো ফিল্টার করা:
$filtered = $numbers->filter(function ($value) {
    return $value > 2;
});
dump($filtered->all()); // Output: [3, 4, 5]

// ২ এর চেয়ে বড় উপাদানগুলো রিজেক্ট (বাদ) করা:
$rejected = $numbers->reject(function ($value) {
    return $value > 2;
});
dump($rejected->all()); // Output: [1, 2]
```

### ঘ. ইলিমেন্ট সার্চ করা (`search`):
কোনো ভ্যালু খুঁজলে এটি সেই উপাদানের ইনডেক্স/কি রিটার্ন করে। খুঁজে না পেলে `false` রিটার্ন করে।
```php
$fruits = collect(['apple', 'banana', 'cherry']);
dump($fruits->search('cherry')); // Output: 2

$numbers = collect([10, 12, 11]);
dump($numbers->search('11', true)); 
// ২য় প্যারামিটারে true দিলে টাইপসহ (Strict type check) চেক করবে। এক্ষেত্রে string '11' খুঁজলে Output: false হবে।
```

### ঙ. কলামের ভ্যালু প্লাক করা (`pluck`):
মাল্টি-ডাইমেনশনাল অ্যারে বা অবজেক্ট কালেকশন থেকে সুনির্দিষ্ট কোনো কলামের মান তুলে আনতে এটি ব্যবহৃত হয়।
```php
$users = collect([
    ['name' => 'John', 'age' => 30],
    ['name' => 'Jane', 'age' => 25]
]);

dump($users->pluck('name')->all());
// Output: ["John", "Jane"]
```

### চ. খন্ড করা (`chunk`):
কালেকশনকে ছোট ছোট উপ-অ্যারে বা ভাগে বিভক্ত করতে `chunk()` ব্যবহার করা হয়।
```php
$permissions = collect([
    'view user', 'create user', 'edit user',
    'delete user', 'view post', 'create post'
]);

dump($permissions->chunk(3)->toArray());
// Output: ৩টি করে উপাদানের ২টি গ্রুপ তৈরি হবে।
```

---

## ৪. সচরাচর ব্যবহৃত কালেকশন মেথডস - পার্ট ০৩ (Collection Methods - Part 3)

### ক. কি চেক করা (`has`):
কালেকশনে নির্দিষ্ট কোনো কি উপস্থিত আছে কিনা চেক করতে:
```php
$collection = collect(['name' => 'Nahian', 'age' => 20]);
dump($collection->has('age')); // Output: true
```

### খ. কন্ডিশনাল কোয়েরি ফিল্টারিং (`where`):
ডাটাবেজ কুয়েরি বিল্ডারের মতো কালেকশনের ডেটাবেজ ফিল্টারিংয়েও এটি কাজ করে।
```php
$users = collect([
    ['name' => 'Nahian', 'age' => 20],
    ['name' => 'Shaon', 'age' => 30],
    ['name' => 'Xavier', 'age' => 30],
]);

// বয়স ৩০ যাদের তাদের ফিল্টার করা (ডিফল্ট অপারেটর '='):
dump($users->where('age', 30)->all());

// কাস্টম অপারেটর ব্যবহার করে ফিল্টার:
dump($users->where('age', '<', 30)->all());
```

### গ. ফরম্যাট কনভার্সন (`toArray` / `toJson`):
```php
$users->toArray(); // প্লেইন অ্যারেতে কনভার্ট করবে
$users->toJson();  // JSON ফরম্যাটে কনভার্ট করবে
$users->toJson(JSON_PRETTY_PRINT); // সুন্দর ইনডেন্টেড JSON দেখাবে
```

### ঘ. কি ও ভ্যালু কম্বাইন করা (`combine`):
একটি কালেকশনকে কি এবং আরেকটি অ্যারেকে ভ্যালু হিসেবে ব্যবহার করে নতুন ডিকশনারি কালেকশন তৈরি করা:
```php
$keys = collect(['name', 'age']);
$values = ['John', 30];

dump($keys->combine($values)->all());
// Output: ['name' => 'John', 'age' => 30]
```

### ঙ. ডুপ্লিকেট বের করা (`duplicates`):
কালেকশনের ভেতর ডুপ্লিকেট ভ্যালু এবং তাদের ইনডেক্স খুঁজে বের করে:
```php
$collection = collect([10, 10, 20, 30, 40, 50, 60, 60]);
dump($collection->duplicates()->all());
// Output: [1 => 10, 7 => 60]
```

### চ. নির্দিষ্ট কি ফিল্টার করা (`only`):
কালেকশন থেকে শুধুমাত্র নির্দিষ্ট কি-এর ভ্যালুগুলো নিয়ে নতুন কালেকশন রিটার্ন করে:
```php
$rolesPermissions = collect([
    'admin' => ['view user', 'create user'],
    'user' => ['view user'],
    'subscriber' => ['view user']
]);

dump($rolesPermissions->only(['admin', 'subscriber'])->all());
```

---

> [!TIP]
> **ফ্রন্টএন্ড টিপ:** জাভাস্ক্রিপ্টেও যদি লারাভেলের মতো সুন্দর ও শক্তিশালী কালেকশন ব্যবহার করতে চান, তবে [collect.js](https://collect.js.org/) লাইব্রেরিটি ব্যবহার করতে পারেন। এর সিনট্যাক্স ও মেথডগুলো হুবহু লারাভেলের কালেকশনের মতো।

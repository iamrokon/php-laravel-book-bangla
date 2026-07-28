# Episode 6: Array Manipulation

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** পিএইচপি তে অ্যারে ম্যানিপুলেশন করার পদ্ধতি এবং কমন বিল্ট-ইন ফাংশনগুলোর ব্যবহার উদাহরণসহ লিখ

পিএইচপিতে অ্যারেকে ম্যানিপুলেট করার জন্য অনেক বিল্ট-ইন ফাংশন রয়েছে। এই ফাংশনগুলোর মাধ্যমে খুব সহজেই অ্যারের ডেটা **গণনা (Count), খোঁজা (Search), সাজানো (Sort), যোগ (Add), বাদ (Remove) এবং পরিবর্তন (Modify)** করা যায়।

### count()
`count()` ফাংশনটি একটি অ্যারেতে মোট কতটি এলিমেন্ট রয়েছে তা গণনা করার জন্য ব্যবহৃত হয়।

```php
$heroes = ["Wolverine", "Superman", "Batman"];
echo count($heroes); // 3
```

### sort()
ছোট থেকে বড় বা বড় থেকে ছোট সাজানোকে বলা হয় সর্টিং।

`sort()` ফাংশনটি অ্যারের এলিমেন্টগুলোকে **Ascending Order (A → Z বা ছোট → বড়)** অনুযায়ী সাজায়।

```php
$heroes = ["Wolverine", "Superman", "Batman" , "America" , "Abs"];
sort($heroes);
print_r($heroes);
Array([0]=> Abs [1]=> America [2]=> Batman [3]=> Superman [4]=> Wolverine)
```

যদি দুটি শব্দের প্রথম বর্ণ একই হয়, তাহলে সর্টিং করার সময় পরবর্তী বর্ণগুলো তুলনা করা হয়।

### array_search()
অ্যারের ভেতর কোনো একটি এলিমেন্ট আছে কিনা অথবা সেটির **Index/Position** বের করতে `array_search()` ফাংশন ব্যবহার করা হয়।

```php
echo array_search("Batman", $heroes); // পজিশন রিটার্ন করবে
```

যদি এলিমেন্টটি না থাকে, তাহলে এটি `false` রিটার্ন করে।

### array_reverse()
`array_reverse()` অ্যারের এলিমেন্টগুলোকে উল্টো (Reverse) ক্রমে সাজিয়ে একটি নতুন অ্যারে রিটার্ন করে।

```php
print_r(array_reverse($heroes));
```

### array_unique()
অ্যারে থেকে ডুপ্লিকেট ভ্যালুগুলো বাদ দিয়ে শুধুমাত্র ইউনিক ভ্যালুগুলো বের করে।

```php
$heroes = ["Batman", "Superman", "Batman"];
print_r(array_unique($heroes)); // ["Batman", "Superman"]
```

এটি ডুপ্লিকেট ডেটা অপসারণ করার জন্য খুবই উপকারী একটি ফাংশন।

### array_values() & array_keys()
অ্যাসোসিয়েটিভ অ্যারে থেকে শুধুমাত্র ভ্যালু বা কিগুলো বের করে আনতে ব্যবহৃত হয়।

```php
$heroes = ["marvel" => "Avengers", "dc" => "Justice League"];
print_r(array_values($heroes));
print_r(array_keys($heroes));
```

`array_values()` শুধুমাত্র Values এবং `array_keys()` শুধুমাত্র Keys রিটার্ন করে।

### array_shift() & array_unshift()
`array_shift()` অ্যারের শুরু থেকে একটি এলিমেন্ট বাদ দেয় (FIFO - First In First Out)।

`array_unshift()` লিস্টের শুরুতে নতুন ডাটা যুক্ত করে।

এগুলো অ্যারের **শুরুর (Beginning)** অংশ নিয়ে কাজ করার জন্য ব্যবহৃত হয়।

### array_pop() & array_push()
`array_pop()` অ্যারের শেষ থেকে ডাটা তুলে আনে।

`array_push()` অ্যারের শেষে ডাটা যুক্ত করে।

এগুলো অ্যারের **শেষ (End)** অংশ নিয়ে কাজ করার জন্য ব্যবহৃত হয় এবং `array_pop()` **LIFO (Last In First Out)** নীতি অনুসরণ করে।
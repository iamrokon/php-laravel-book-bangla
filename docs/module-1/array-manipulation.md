# Episode 6: Array Manipulation

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** পিএইচপি তে অ্যারে ম্যানিপুলেশন করার পদ্ধতি এবং কমন বিল্ট-ইন ফাংশনগুলোর ব্যবহার উদাহরণসহ লিখ

পিএইচপিতে অ্যারেকে ম্যানিপুলেট করার জন্য অনেক বিল্ট-ইন ফাংশন রয়েছে।

### count()
অ্যারেতে কতগুলো এলিমেন্ট আছে তা আমরা কাউন্ট করতে পারি নিম্নরূপে -
```php
$heroes = ["Wolverine", "Superman", "Batman"];
echo count($heroes); // 3
```

### sort()
ছোট থেকে বড় বা বড় থেকে ছোট সাজানোকে বলা হয় সর্টিং ।

এলিমেন্টগুলোকে সর্ট বা সাজাতে ব্যবহৃত হয়।
```php
$heroes = ["Wolverine", "Superman", "Batman" , "America" , "Abs"];
sort($heroes);
print_r($heroes);
Array([0]=> Abs [1]=> America [2]=> Batman [3]=> Superman [4]=> Wolverine)
```
যদি দুটি শব্দের প্রথম বর্ণ একই হয় তবে সর্টিং এর ক্ষেত্রে পরের বর্ণ চেক করবে

### array_search()
অ্যারের ভেতর কোন একটা এলিমেন্ট আছে কিনা বা তার পজিশন কি তা বের করতে   array_search() ফাংশন ব্যাবহার করা হয় ।

```php
echo array_search("Batman", $heroes); // পজিশন রিটার্ন করবে
```

### array_reverse()
অ্যারের এলিমেন্টগুলোকে উল্টো করে দেয়।
```php
print_r(array_reverse($heroes));
```

### array_unique()
অ্যারে থেকে ডুপ্লিকেট ভ্যালুগুলো বাদ দিয়ে ইউনিক ভ্যালুগুলো বের করে।
```php
$heroes = ["Batman", "Superman", "Batman"];
print_r(array_unique($heroes)); // ["Batman", "Superman"]
```

### array_values() & array_keys()
অ্যাসোসিয়েটিভ অ্যারে থেকে শুধুমাত্র ভ্যালু বা কিগুলো বের করে আনতে ব্যবহৃত হয়।
```php
$heroes = ["marvel" => "Avengers", "dc" => "Justice League"];
print_r(array_values($heroes));
print_r(array_keys($heroes));
```

### array_shift() & array_unshift()
`array_shift()` অ্যারের শুরু থেকে একটি এলিমেন্ট বাদ দেয় (FIFO - First In First Out)।
`array_unshift()` লিস্টের শুরুতে নতুন ডাটা যুক্ত করে।

### array_pop() & array_push()
`array_pop()` অ্যারের শেষ থেকে ডাটা তুলে আনে।
`array_push()` অ্যারের শেষে ডাটা যুক্ত করে।

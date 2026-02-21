# Episode 6: Array Manipulation

পিএইচপিতে অ্যারেকে ম্যানিপুলেট করার জন্য অনেক বিল্ট-ইন ফাংশন রয়েছে।

### count()
অ্যারেতে কতগুলো এলিমেন্ট আছে তা জানতে ব্যবহৃত হয়।
```php
$heroes = ["Wolverine", "Superman", "Batman"];
echo count($heroes); // 3
```

### sort()
এলিমেন্টগুলোকে সর্ট বা সাজাতে ব্যবহৃত হয়।
```php
sort($heroes);
print_r($heroes);
```

### array_search()
কোনো এলিমেন্ট অ্যারেতে আছে কি না এবং তার পজিশন কত তা বের করে।
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

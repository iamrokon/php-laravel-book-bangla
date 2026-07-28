# Episode 11: Intro to Closures

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** পিএইচপি তে ক্লোজার (Closures) বা অ্যানোনিমাস ফাংশন কি এবং এর ব্যবহার উদাহরণসহ লিখ

নামবিহীন (Unnamed) ফাংশনকে **Anonymous Function** বা **Closure** বলা হয়। সাধারণত ছোট, অস্থায়ী (Temporary) বা শুধুমাত্র একবার ব্যবহার করার মতো কাজের জন্য এগুলো ব্যবহৃত হয়। প্রয়োজনে এগুলোকে একটি ভ্যারিয়েবলে সংরক্ষণ করে পরে ফাংশনের মতো কল করা যায়।

```php
$years = [2002, 2003, 2004, 2005];
$incrementYear = function($year) {
    return $year + 10;
};

$updatedYears = array_map($incrementYear, $years);
print_r($updatedYears);
```

### Local Variable in Closures

Closure বা Anonymous Function-এর নিজস্ব **Local Scope** থাকে। তাই গ্লোবাল স্কোপে থাকা কোনো ভেরিয়েবলকে ক্লোজারের ভেতর ব্যবহার করতে চাইলে `use` কিওয়ার্ডের মাধ্যমে সেটি ইমপোর্ট করতে হয়।

```php
$username = "Al Nahian";
$greetings = ["Hello", "👋"];

$formatted = array_map(function($greeting) use ($username) {
    return "$greeting, $username!";
}, $greetings);
```

### Arrow Functions

**Arrow Function** হলো PHP 7.4-এ যুক্ত হওয়া একটি সংক্ষিপ্ত (Short Syntax) Anonymous Function। ছোট ও এক লাইনের এক্সপ্রেশন লেখার জন্য এটি ব্যবহৃত হয়।

Arrow Function (`fn`) ব্যবহার করলে `use` কিওয়ার্ড ছাড়াই বাইরের (Outer Scope) ভেরিয়েবল স্বয়ংক্রিয়ভাবে access করা যায়।

```php
$formatted = array_map(fn($greeting) => "$greeting, $username!", $greetings);
```
Array ফাংশন সরাসরি ভ্যালু রিটার্ন করে।

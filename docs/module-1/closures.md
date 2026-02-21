# Episode 11: Intro to Closures

নামবিহীন ফাংশনকে **Anonymous Function** বা **Closure** বলে। এগুলো খুব ছোট কাজের জন্য ব্যবহৃত হয় যা শুধুমাত্র একবারই করা হবে।

```php
$years = [2002, 2003, 2004, 2005];
$incrementYear = function($year) {
    return $year + 10;
};

$updatedYears = array_map($incrementYear, $years);
print_r($updatedYears);
```

### Local Variable in Closures
গ্লোবাল স্কোপে থাকা কোনো ভেরিয়েবলকে ক্লজারের ভেতর অ্যাকসেস করতে `use` কিওয়ার্ড ব্যবহার করতে হয়।

```php
$username = "Al Nahian";
$greetings = ["Hello", "👋"];

$formatted = array_map(function($greeting) use ($username) {
    return "$greeting, $username!";
}, $greetings);
```

### Arrow Functions
পিএইচপি ৭.৪ থেকে অ্যারো ফাংশন (`fn`) চালু হয়েছে। এতে `use` ব্যবহার ছাড়াই বাইরের ভেরিয়েবল সরাসরি অ্যাকসেস করা যায়।

```php
$formatted = array_map(fn($greeting) => "$greeting, $username!", $greetings);
```
অ্যারো ফাংশন সরাসরি ভ্যালু রিটার্ন করে।

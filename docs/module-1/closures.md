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

Closure বা Anonymous Function-এর নিজস্ব **Local Scope** থাকে। তাই বাইরের (Outer Scope) কোনো Variable-কে Closure-এর ভেতরে সরাসরি ব্যবহার করা যায় না।

বাইরের Variable ব্যবহার করতে চাইলে `use` Keyword-এর মাধ্যমে সেই Variable-কে Closure-এর মধ্যে **Import** করতে হয়।

```php
$username = "Al Nahian";

$greetings = ["Hello", "👋"];

$formatted = array_map(function($greeting) use ($username) {

    return "$greeting, $username!";

}, $greetings);
```

এখানে `$username` বাইরের Scope-এ রয়েছে। `use ($username)` ব্যবহার করার মাধ্যমে এটিকে Closure-এর মধ্যে ব্যবহার করার জন্য Import করা হয়েছে।

### Arrow Functions

**Arrow Function** হলো PHP 7.4-এ যুক্ত হওয়া একটি সংক্ষিপ্ত (Short Syntax) Anonymous Function। ছোট এবং সাধারণ Expression-এর ক্ষেত্রে কম কোডে Function লেখার জন্য এটি ব্যবহার করা হয়।

Arrow Function-এ `fn` Keyword ব্যবহার করা হয় এবং সাধারণত একটি মাত্র Expression থাকে, যার Value **স্বয়ংক্রিয়ভাবে Return** হয়।

সবচেয়ে গুরুত্বপূর্ণ বিষয় হলো, Arrow Function-এর ক্ষেত্রে `use` Keyword লেখার প্রয়োজন হয় না। বাইরের (Outer Scope) Variable-গুলো **স্বয়ংক্রিয়ভাবে Access** করা যায়।

```php
$formatted = array_map(
    fn($greeting) => "$greeting, $username!",
    $greetings
);
```

এখানে `$username` বাইরের Scope থেকে সরাসরি Access করা হয়েছে এবং `fn` ব্যবহার করার কারণে `use ($username)` লেখার প্রয়োজন হয়নি।

> **Note:** Closure-এ বাইরের Variable ব্যবহার করতে সাধারণত `use` Keyword লাগে, কিন্তু Arrow Function-এ Outer Scope-এর Variable স্বয়ংক্রিয়ভাবে Access করা যায়।

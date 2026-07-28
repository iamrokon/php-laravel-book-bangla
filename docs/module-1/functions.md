# Episode 7: Intro to Functions

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** পিএইচপি তে ফাংশন কি এবং এটি কীভাবে ডিক্লেয়ার ও ব্যবহার করা হয় উদাহরণসহ লিখ

**Function** হলো একগুচ্ছ কোডের সমষ্টি যা একটি নির্দিষ্ট কাজ সম্পন্ন করে। একই কোড বারবার না লিখে প্রয়োজন অনুযায়ী যতবার ইচ্ছা ফাংশন কল করা যায়।

ফাংশন ব্যবহার করলে কোডের **Encapsulation** নিশ্চিত হয় এবং কোড **Reusable**, **Readable** ও **Maintainable** হয়। **Encapsulation** হলো ইমপ্লিমেন্টেশন ডিটেইল হাইড করে রেখে শুধুমাত্র প্রয়োজনীয় অংশ ব্যবহারকারীর জন্য উন্মুক্ত রাখা।

```php
function shout() {
    return "Hello World";
}

echo shout();
```

> **Note:** `function` কীওয়ার্ড দিয়ে ফাংশন ডিক্লেয়ার করা হয় এবং ফাংশন কল করলে তবেই এর ভেতরের কোড এক্সিকিউট হয়।

### Parameters & Arguments

ফাংশনে বাইরে থেকে ডাটা পাঠাতে **Parameter** এবং **Argument** ব্যবহার করা হয়।

- **Parameter:** ফাংশন ডিক্লেয়ার করার সময় ব্যবহৃত ভ্যারিয়েবল।
- **Argument:** ফাংশন কল করার সময় পাঠানো প্রকৃত ভ্যালু।

```php
function greet($message) { // Parameter
    echo $message;
}

greet("Hey everyone"); // Argument
```

### Default Values

আমরা চাইলে প্যারামিটারের জন্য একটি **Default Value** সেট করতে পারি। যদি Argument না পাঠানো হয়, তাহলে সেই ডিফল্ট ভ্যালু ব্যবহার হবে।

```php
function shout($message, $times = 3) {
    echo str_repeat("$message<br/>", $times);
}

shout("Hey everyone!"); // ৩ বার প্রিন্ট হবে
shout("Hey everyone", 20); // ২০ বার প্রিন্ট হবে
```

> **Note:** Default Parameter সাধারণত Parameter List-এর শেষে রাখা উত্তম।
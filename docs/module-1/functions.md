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

ফাংশনে বাইরে থেকে ডাটা পাঠানোর জন্য **Parameter** এবং **Argument** ব্যবহার করা হয়।

* **Parameter:** ফাংশন **Declare/Define** করার সময় বন্ধনীর মধ্যে ব্যবহৃত ভ্যারিয়েবলকে Parameter বলে।
* **Argument:** ফাংশন **Call** করার সময় Parameter-এর জন্য যে প্রকৃত Value পাঠানো হয়, তাকে Argument বলে।

```php
function greet($message) { // Parameter

    echo $message;

}

greet("Hey everyone"); // Argument
```

এখানে `$message` হলো **Parameter**, আর `"Hey everyone"` হলো **Argument**।

### Default Values

আমরা চাইলে কোনো Parameter-এর জন্য একটি **Default Value** নির্ধারণ করে দিতে পারি। Function Call করার সময় সেই Parameter-এর জন্য কোনো Argument পাঠানো না হলে, Function স্বয়ংক্রিয়ভাবে Default Value ব্যবহার করবে।

```php
function shout($message, $times = 3) {

    echo str_repeat("$message<br/>", $times);

}

shout("Hey everyone!"); // ৩ বার প্রিন্ট হবে

shout("Hey everyone", 20); // ২০ বার প্রিন্ট হবে
```

প্রথমবার `shout()` Call করার সময় `$times`-এর কোনো Value দেওয়া হয়নি, তাই এর Default Value `3` ব্যবহার হয়েছে। দ্বিতীয়বার `20` পাঠানো হয়েছে, তাই Default Value-এর পরিবর্তে `20` ব্যবহার হবে।

> **Note:** Default Parameter সাধারণত **Parameter List-এর শেষে** রাখা উচিত। কারণ Default Value-যুক্ত Parameter-এর পরে Required Parameter রাখা হলে Function Call করার ক্ষেত্রে সমস্যা বা বিভ্রান্তি তৈরি হতে পারে।

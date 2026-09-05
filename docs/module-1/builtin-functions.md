# Episode 8: Built-in Functions

> [!IMPORTANT]

> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** পিএইচপিতে Built-in Function কী এবং গুরুত্বপূর্ণ কয়েকটি Built-in Function-এর ব্যবহার উদাহরণসহ লিখ।

**Built-in Functions** হলো PHP-এর পূর্বনির্ধারিত (Predefined) Function, যেগুলো PHP নিজেই প্রদান করে। এগুলোর মাধ্যমে বিভিন্ন সাধারণ ও প্রয়োজনীয় কাজ কম কোডে, সহজে এবং দ্রুত সম্পন্ন করা যায়।

### String Functions

String নিয়ে বিভিন্ন ধরনের অপারেশন করার জন্য PHP-তে অনেক Built-in Function রয়েছে।

* `strlen()` → একটি String-এর মোট **Character** সংখ্যা গণনা করে।
* `ucfirst()` → String-এর **প্রথম অক্ষর** বড় হাতের (Uppercase) করে।
* `lcfirst()` → String-এর **প্রথম অক্ষর** ছোট হাতের (Lowercase) করে।
* `strtolower()` → String-এর **সব অক্ষর** ছোট হাতের (Lowercase) করে।
* `strtoupper()` → String-এর **সব অক্ষর** বড় হাতের (Uppercase) করে।
* `ucwords()` → String-এর **প্রতিটি শব্দের প্রথম অক্ষর** বড় হাতের করে।
* `str_word_count()` → একটি String-এ মোট **কতটি শব্দ** রয়েছে তা গণনা করে।

### `explode()` & `implode()`

`explode()` একটি String-কে নির্দিষ্ট **Delimiter** অনুযায়ী ভাগ করে একটি Array তৈরি করে।

`implode()` বা `join()` একটি Array-এর Elementগুলোকে নির্দিষ্ট Separator দিয়ে একত্র করে একটি String তৈরি করে।

```php
$tags = "JS, PHP, Laravel";

$tagArray = explode(", ", $tags);

echo implode(" | ", $tagArray);
// JS | PHP | Laravel
```

### Number Functions

`number_format()` কোনো Number-কে নির্দিষ্ট Format-এ প্রদর্শন করতে ব্যবহৃত হয়। যেমন—Decimal সংখ্যা এবং হাজারের Separator (Comma) ব্যবহার করে Number-কে সুন্দরভাবে দেখানো।

```php
echo number_format(5306000, 2, ".", ",");
// 5,306,000.00
```

### Date & Time

* `date()` → নির্দিষ্ট Format অনুযায়ী **তারিখ ও সময়** প্রদর্শন করে।
* `time()` → **১ জানুয়ারি ১৯৭০ (Unix Epoch)** থেকে বর্তমান সময় পর্যন্ত মোট সেকেন্ডের সংখ্যা অর্থাৎ **Unix Timestamp** রিটার্ন করে।

### File Functions

PHP-তে File তৈরি, পড়া, যাচাই এবং ডিলিট করার জন্য বিভিন্ন Built-in Function রয়েছে।

* `file_get_contents()` → একটি ফাইলের **সম্পূর্ণ Content পড়ে** String হিসেবে রিটার্ন করে।
* `unlink()` → নির্দিষ্ট **File ডিলিট** করে।
* `file_exists()` → নির্দিষ্ট **File বা Directory আছে কিনা** যাচাই করে এবং `true` বা `false` রিটার্ন করে।

> **💡 Interview Tip:** Built-in Functions ব্যবহার করলে কম কোড লিখে সাধারণ কাজগুলো দ্রুত, সহজ এবং Efficientভাবে সম্পন্ন করা যায়। ইন্টারভিউতে Function-এর নামের পাশাপাশি **কী কাজ করে এবং কোথায় ব্যবহার করা হয়**—এটিও জানা গুরুত্বপূর্ণ।

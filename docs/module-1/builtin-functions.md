# Episode 8: Built-in Functions

পিএইচপিতে অসংখ্য বিল্ট-ইন ফাংশন রয়েছে যা আমাদের কাজকে সহজ করে দেয়।

### String Functions
- `strlen()`: স্ট্রিং-এ কতগুলো ক্যারেক্টার আছে তা বের করতে।
- `ucfirst()`: প্রথম অক্ষর বড় হাতের করতে।
- `lcfirst()`: প্রথম অক্ষর ছোট হাতের করতে।
- `strtolower()` / `strtoupper()`: সব অক্ষর ছোট বা বড় হাতের করতে।
- `ucwords()`: প্রতিটি শব্দের প্রথম অক্ষর বড় হাতের করতে।
- `str_word_count()`: কতগুলো শব্দ আছে তা গুনতে।

### explode() & implode()
`explode()` দিয়ে স্ট্রিং ভেঙে অ্যারে তৈরি করা হয়।
`implode()` বা `join()` দিয়ে অ্যারেকে স্ট্রিং-এ কনভার্ট করা হয়।

```php
$tags = "JS, PHP, Laravel";
$tagArray = explode(", ", $tags);
echo join(" | ", $tagArray); // JS | PHP | Laravel
```

### Number Functions
- `number_format()`: নাম্বারকে নির্দিষ্ট ফরম্যাটে (যেমন কমা সেপারেটেড) দেখাতে।
```php
echo number_format(5306000, 2, ".", ","); // 5,306,000.00
```

### Date & Time
- `date()`: বর্তমান ডেট দেখাতে।
- `time()`: ১৯৭০ সালের ১ জানুয়ারি থেকে এখন পর্যন্ত মোট সেকেন্ড (Unix Timestamp)।

### File Functions
- `file_get_contents()`: ফাইলের কন্টেন্ট রিড করতে।
- `unlink()`: ফাইল ডিলিট করতে।
- `file_exists()`: ফাইল আছে কি না চেক করতে।

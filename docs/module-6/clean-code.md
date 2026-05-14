# Module 6: Clean Code Practice

ক্লিন কোড (Clean Code) বলতে এমন কোডকে বোঝায় যা সহজে পড়া যায় (Readable), সহজে মেইনটেইন করা যায় (Manageable) এবং অন্য যেকোনো ডেভেলপার সহজে বুঝতে পারে (Easy to Understand)।

---

## ১. নেমিং কনভেনশন (Naming Related)

ভেরিয়েবল বা ক্লাসের নাম এমন হওয়া উচিত যা দেখে তার কাজ বোঝা যায়।

**Bad Practice:**
```php
$d = date('Y-m-d'); // $d দিয়ে কি বোঝায় তা পরিষ্কার নয়
$cnt = 1000;
class Transitr {}
```

**Better Code:**
```php
$orderCreationDate = date('Y-m-d');
$maxAttempt = 1000;
class Translator {}
```

### অপ্রয়োজনীয় প্রিফিক্স এড়িয়ে চলুন:
```php
class Course {
    public $courseName; // Redundant: Course->courseName
    public $courseFee;
}

// Better
class Course {
    public $name;
    public $fee;
}
```

---

## ২. ফাংশন এবং মেথড (Functions & Methods)

### Early Return (আগে ফেরত আসা):
নেস্টেড ইফ-এলস (Nested if-else) কোডের রিডাবিলিটি কমিয়ে দেয়। এর বদলে আমরা কন্ডিশন না মিললে শুরুতেই রিটার্ন করে দিতে পারি।

**Bad Practice:**
```php
function calculatePrice($productPrice, $quantity) {
    if ($quantity > 0) {
        if ($quantity > 10) {
            return ($productPrice * $quantity) - 50;
        } else {
            return ($productPrice * $quantity);
        }
    } else {
        return "Quantity must be positive";
    }
}
```

**Better (Early Return):**
```php
function calculatePrice($productPrice, $quantity) {
    if ($quantity <= 0) {
        return "Quantity must be positive";
    }

    $total = $productPrice * $quantity;
    if ($quantity > 10) {
        return $total - 50;
    }
    return $total;
}
```

### মেথড ফ্ল্যাগ (Flag) এড়িয়ে চলুন:
একটি মেথডে বুলিয়ান ফ্ল্যাগ পাঠিয়ে আলাদা আলাদা কাজ করার চেয়ে আলাদা মেথড তৈরি করা ভালো।
```php
// Avoid
function saveFile($path, $temporary = false) { ... }

// Better
function saveFile($path) { ... }
function saveTemporaryFile($path) { ... }
```

---

## ৩. লুপ এবং কন্ডিশন (Loops & Conditions)

- **foreach:** পিএইচপিতে লিস্টের ওপর লুপ চালানোর জন্য `foreach` সবচেয়ে জনপ্রিয় এবং রিডাবল।
- **Look-up Tables:** বড় ইফ-এলস বা সুইচ কেসের বদলে ম্যাপ বা অ্যারে ব্যবহার করুন।

```php
// Better than long if-else
function getBanglaDay($day) {
    $dayMap = [
        'Saturday' => 'শনিবার',
        'Sunday'   => 'রবিবার',
        'Monday'   => 'সোমবার',
        // ...
    ];
    return $dayMap[$day] ?? '';
}
```

---

## ৪. কনস্ট্যান্ট এবং এনাম (Constants & Enums)

হার্ড-কোডেড স্ট্রিং বা নাম্বার ব্যবহার করা থেকে বিরত থাকুন। এতে বানান ভুল হওয়ার সম্ভাবনা থাকে এবং কোড বোঝা কঠিন হয়।

**Bad Practice:**
```php
if ($task->status == 'pending') { ... }
if ($task->attempts > 5) { ... }
```

**Good Practice:**
```php
class Task {
    const STATUS_PENDING = 'pending';
    const MAX_RETRY = 5;
}

if ($task->status == Task::STATUS_PENDING) { ... }
if ($task->attempts > Task::MAX_RETRY) { ... }
```
পিএইচপি ৮.১ এর পরে এ কাজের জন্য **Enum** ব্যবহার করা আরও শ্রেয়।

---

## ৫. ডন'ট রাইট গড অবজেক্টস (Avoid God Classes)

একটি ক্লাসের মধ্যেই সব ফাংশনালিটি (লগইন, রেজিস্ট্রেশন, পেমেন্ট, স্ট্যাটিস্টিকস) লিখবেন না। মেথড তৈরির সময় খেয়াল রাখুন সেটি আসলেই ঐ ক্লাসের দায়িত্ব (Responsibility) কি না। প্রয়োজনে আলাদা ক্লাস (যেমন: `UserStatistics`, `UserAuth`) তৈরি করুন।

---

## ৬. রিমোট জবের ক্ষেত্রে টিপস

কোডিং টেস্টে সাধারণত ৩টি কারণে মানুষ বাদ পড়ে:
১. **কোড ফরমেটিং ঠিক না থাকলে** (ক্লিন কোড না হলে)।
২. **টেস্ট (Unit Test) না লিখলে**।
৩. **ওভার-ইঞ্জিনিয়ারিং করলে** (সাধারণ সমস্যার অনেক জটিল সমাধান দেওয়া)।

**মনে রাখবেন:** কোডে কমেন্ট না লিখে এমনভাবে কোড লেখা উচিত যাতে নাম দেখেই কাজ বোঝা যায়। তবে "কিভাবে" (How) হচ্ছে তার চেয়ে "কেন" (Why) করা হয়েছে তা বোঝাতে কমেন্ট ব্যবহার করা যেতে পারে।

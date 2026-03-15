# Programming Paradigm in PHP

## What is Programming Paradigm?
Paradigm বলতে বোঝায় আমরা কীভাবে কোনো একটা জিনিসকে দেখি বা বুঝতে পারি (Point of view / The way we interpret something)।
আগে আমরা কোনো জিনিসকে যেভাবে চিন্তা করতাম, সেটাকে নতুনভাবে চিন্তা করাই হলো **Paradigm Shift**।
কম্পিউটার সায়েন্সে **Programming Paradigm** হলো একটি মৌলিক স্টাইল (Fundamental style) বা আমরা কোন স্ট্রাকচারে বা ওয়েতে একটি কম্পিউটার প্রোগ্রাম লিখি তার ধরন। কোনো একটি প্রবলেম সলভ করার জন্য পুরো জিনিসটাকে কীভাবে সাজালে প্রবলেম সলভ করা সহজ হবে, সেটি নির্ধারণ করতেই এর উৎপত্তি।

প্রোগ্রামিং প্যারাডাইম প্রধানত ২ প্রকার:
1. **Imperative Programming:** (কম্পিউটারকে নির্দেশ দেওয়া বা Command করা - *কীভাবে হবে*)। এর মধ্যে পড়ে:
   - Procedural Programming
   - Object-Oriented Programming (OOP)
2. **Declarative Programming:** (*কী চাই* তা বলে দেওয়া, কীভাবে হবে তা না বলা)। এর মধ্যে পড়ে:
   - Functional Programming
   - Logic Programming (e.g. SQL)

> কিছু ল্যাঙ্গুয়েজ Single Paradigm, আবার JavaScript, PHP এর মতো ল্যাঙ্গুয়েজ হলো Multi-paradigm.

---

## 1. Imperative Programming
"Imperative" শব্দটি ল্যাটিন "impero" (I command) থেকে এসেছে। এই পদ্ধতিতে আমরা নির্দিষ্ট অর্ডারে (Order) ডিটেইল ইনস্ট্রাকশন দিয়ে কম্পিউটারকে নির্দেশ দেই যে কোড কীভাবে কাজ করবে।

**উদাহরণ (কীভাবে ডাটা ফিল্টার করব তা বলে দেওয়া):**
```js
const nums = [1, 4, 3, 6, 7, 8, 9, 2];
const result = []; 

for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 5) {
        result.push(nums[i]);
    }
}
console.log(result); // Output: [6, 7, 8, 9]
```

## 2. Declarative Programming
এখানে আমরা নির্দিষ্ট করে বলে দিই যে আমাদের কী অর্জন করতে হবে (What to achieve), কিন্তু কীভাবে হবে (How to run) তার বিস্তারিত লজিক লিখি না।

**উদাহরণ (JavaScript `filter`):**
```js
const nums = [1, 4, 3, 6, 7, 8, 9, 2];
console.log(nums.filter(num => num > 5)); // Output: [6, 7, 8, 9]
```

আরেকটি উদাহরণ হলো ডাটাবেজ কোয়েরি (SQL):
```sql
SELECT * FROM students WHERE department = 'Computer Science';
```
এখানে আমরা শুধু কী ডেটা লাগবে তা বলে দিয়েছি, ডাটাবেজ ইঞ্জিন নিজে থেকে ডিসাইড করবে কীভাবে সে তা রিটার্ন করবে।

---

## PHP -তে বিভিন্ন প্যারাডাইমের প্রয়োগ

### 1. Procedural Programming
যখন একটার পর একটা ইনস্ট্রাকশন লিখে কোনো প্রোগ্রাম তৈরি করা হয় এবং রিইউজ (Reuse) করার অংশগুলোকে কোনো ফাংশন (Function) বা প্রোসিডিউরে আলাদা করে ফেলা হয়:
```php
function calculateVAT(float $amount, float $taxPercentage): float {
    return ($amount * $taxPercentage) / 100;
}

function calculateDiscount(float $amount, float $discount, string $discountType = "flat"): float {
    if ($discountType == 'percent') {
        return ($amount * $discount) / 100;
    }
    return $discount;
}

// Usage
$balance = 500;
$balanceWithVAT = $balance + calculateVAT($balance, 5);
$finalBalance = $balanceWithVAT - calculateDiscount($balance, 10, 'flat');
echo $finalBalance;
```

### 2. Object-Oriented Programming (OOP)
যেখানে প্রোপার্টি এবং মেথডকে একটি ক্লাসের (Class) মধ্যে রাখা হয় এবং অবজেক্ট তৈরি করে কাজ করা হয়:
```php
class Discount {
    public function __construct(private string $type, private float $amount) {}

    public function getDiscountAmount($price): float {
        if ($this->type == 'percent') {
            return ($price * $this->amount) / 100;
        }
        return $this->amount;
    }
}

class Bill {
    private float $taxPercentage = 5.0;

    public function __construct(private float $balance, private Discount $discount) {}

    private function addVat() {
        $this->balance += ($this->balance * $this->taxPercentage) / 100;
    }

    private function subtractDiscount() {
        $this->balance -= $this->discount->getDiscountAmount($this->balance);
    }

    public function getFinalBalance() {
        $this->addVat();
        $this->subtractDiscount();
        return $this->balance;
    }
}

// Usage
$bill = new Bill(500, new Discount('flat', 10));
echo $bill->getFinalBalance();
```

### 3. Functional Programming
ফাংশনাল প্রোগ্রামিং-এ ফাংশনকে ফার্স্ট-ক্লাস সিটিজেন (First-class citizen) হিসেবে বিবেচনা করা হয়। একটি ফাংশনকে আর্গুমেন্ট হিসেবে পাস করা যায় বা ভ্যারিয়েবলে স্টোর করা যায়। একে পিওর ফাংশন (Pure function) বলা হয় যা বাইরের কনটেক্সট বা গ্লোবাল ভ্যারিয়েবলের উপর নির্ভর করে না।

```php
function criteria_greater_than($min) {
    return function($item) use ($min) {
        return $item > $min;
    };
}

$input = [1, 2, 3, 4, 5, 6];
$output = array_filter($input, criteria_greater_than(3));

print_r($output); // Output: Array ( [3] => 4 [4] => 5 [5] => 6 )
```

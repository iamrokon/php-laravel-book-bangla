# Module 4: Magic Methods

ম্যাজিক মেথডগুলো অনেকটা লাইফসাইকেল হুক (Lifecycle hook) এর মতো। কোনো ক্লাস ক্রিয়েট হওয়া থেকে শুরু করে, ক্লাসের অবজেক্ট নিয়ে বিভিন্ন কাজ করা, অথবা ক্লাসটি ডেস্ট্রয় (Destroy) হওয়া—এমন বিভিন্ন পর্যায় বা লাইফসাইকেলে স্বয়ংক্রিয়ভাবে কিছু মেথড কল হয়। এগুলোকেই ম্যাজিক মেথড বলে।

পিএইচপিতে ম্যাজিক মেথডগুলো সবসময় দুটি আন্ডারস্কোর `__` দিয়ে শুরু হয়।

### ১. `__construct()`
অবজেক্ট ক্রিয়েট হওয়ার সময় এটি স্বয়ংক্রিয়ভাবে কল হয়। সাধারণ মেথডকে কল করার প্রয়োজন হয়, কিন্তু কন্সট্রাক্টরকে আলাদাভাবে কল করতে হয় না।

### ২. `__destruct()`
অবজেক্টের কাজ শেষ হয়ে গেলে বা অবজেক্টটি মেমোরি থেকে মুছে যাওয়ার সময় এটি কল হয়।

### ৩. `__call()`
যদি আমরা অবজেক্টের ওপর এমন কোনো মেথড কল করি যেটি উক্ত ক্লাসে নেই, তবে পিএইচপি সেই কলকে `__call()` নামক ম্যাজিক মেথডে পাঠিয়ে দেয়।

### ৪. `__callStatic()`
ক্লাসের নাম দিয়ে কোনো স্ট্যাটিক মেথড কল করা হলে এবং সেটি যদি ক্লাসে না থাকে, তবে `__callStatic()` মেথডটি কল হয়।

---

### উদাহরণ:

```php
class Person
{
    public function __construct() {
        printf("Initializing...\n");
    }

    public function walk() {
        printf("Walking...\n");
    }

    // ডাইনামিক মেথড হ্যান্ডলিং
    public function __call(string $methodName, array $arguments) {
        printf("Method '%s' does not exist. Arguments: %s\n", $methodName, implode(', ', $arguments));
    }

    // স্ট্যাটিক মেথড হ্যান্ডলিং
    public static function __callStatic(string $methodName, array $arguments) {
        printf("Static method '%s' does not exist.\n", $methodName);
    }

    public function __destruct() {
        printf("Destructing...\n");
    }
}

$person = new Person(); // Output: Initializing...
$person->walk();        // Output: Walking...
$person->sing('Lalala'); // sing() মেথড নেই, তাই __call() কল হবে

// Static call
Person::dance(); // dance() স্ট্যাটিক মেথড নেই, তাই __callStatic() কল হবে

// Output samples:
// Initializing...
// Walking...
// Method 'sing' does not exist. Arguments: Lalala
// Static method 'dance' does not exist.
// Destructing... (একদম শেষে কল হবে)
```

**কেন এদের ম্যাজিক মেথড বলা হয়?**
কারণ এদেরকে সরাসরি কল করার প্রয়োজন হয় না। নির্দিষ্ট ইভেন্ট বা লাইফসাইকেলে এরা অটোমেটিক্যালি (Automatically) কল হয়। লারাভেলের মতো ফ্রেমওয়ার্কে এদের প্রচুর ব্যবহার রয়েছে (যেমন: `Facade`, `Eloquent Model` ইত্যাদি)।

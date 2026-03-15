# SOLID Principles in PHP

সফটওয়্যার তৈরি করার সময় কোডের Reusability, Maintainability এবং Extendability নিশ্চিত করতে **SOLID Principles** খুবই গুরুত্বপূর্ণ। এখানে ৫টি নিয়মের বর্ণনা দেওয়া হলো:

## 1. Single Responsibility Principle (SRP)
একটি ক্লাস বা মেথডের একটাই স্পেসিফিক দায়িত্ব বা কাজ (Responsibility) থাকা উচিত। 

**Bad Practice:**
একটি `Report` ক্লাসে ডাটা তৈরি ও তা JSON-এ ফরম্যাট করার লজিক একসাথে রাখা:
```php
class Report {
    public function getContents() {
        return ['title' => 'Title', 'date' => '2023-10-01'];
    }
    // Mixing output formatting
    public function formatJson() {
        return json_encode($this->getContents());
    }
}
```

**Good Practice:**
রিপোর্টের কাজ আর ফরম্যাটিংয়ের কাজকে দুটো আলাদা ক্লাসে ভাগ করা:
```php
class Report {
    public function getContents() {
        return ['title' => 'Title', 'date' => '2023-10-01'];
    }
}

interface Formatter {
    public function format(Report $report);
}

class JsonReportFormatter implements Formatter {
    public function format(Report $report) {
        return json_encode($report->getContents());
    }
}

// Usage
$report = new Report();
$formatter = new JsonReportFormatter();
$formatter->format($report);
```

## 2. Open/Closed Principle (OCP)
কোড বা ক্লাস এমনভাবে ডিজাইন করতে হবে যা সম্প্রসারণের জন্য উন্মুক্ত (Open for Extension) কিন্তু পরিবর্তনের জন্য আবদ্ধ (Closed for Modification)। অর্থাৎ নতুন কিছু যুক্ত করতে হলে এক্সিস্টিং ক্লাসকে পরিবর্তন না করে, তা ইন্টারফেস বা এক্সটেনশনের মাধ্যমে করতে হবে।

**Bad Practice:**
নতুন কোনো পেমেন্ট মেথড আসলে `PaymentProcessor` ক্লাসের ভেতরে `if-else` ব্লক এডিট করা লাগে:
```php
class PaymentProcessor {
    public function processPayment($amount, $paymentType) {
        if ($paymentType == 'Paypal') {
            // ... Paypal Logic
        } elseif ($paymentType == 'Stripe') {
            // ... Stripe Logic
        }
    }
}
```

**Good Practice:**
```php
interface PaymentMethod {
    public function process($amount);
}

class PaypalPayment implements PaymentMethod {
    public function process($amount) { /* ... */ }
}

class StripePayment implements PaymentMethod {
    public function process($amount) { /* ... */ }
}

class PaymentProcessor {
    private $paymentMethod;
    
    public function __construct(PaymentMethod $paymentMethod) {
        $this->paymentMethod = $paymentMethod;
    }
    
    public function processPayment($amount) {
        $this->paymentMethod->process($amount);
    }
}

// Usage
$paypal = new PaypalPayment();
$processor = new PaymentProcessor($paypal);
$processor->processPayment(100);
```

## 3. Liskov Substitution Principle (LSP)
চাইল্ড ক্লাসকে (Child class) এমনভাবে ডিজাইন করতে হবে যেন তাকে প্যারেন্ট ক্লাসের (Parent class) জায়গায় রিপ্লেস করা বা সাবস্টিটিউট (Substitute) করা যায়, এবং তাতে কোড ভেঙে না যায়। চাইল্ড ক্লাস প্যারেন্ট ক্লাসের কোনো বিহেভিয়ার অফ করতে পারবে না।

**Bad Practice:**
`ReadOnlyFile` রাইট করতে পারে না, কিন্তু `File` পারে।
```php
class File {
    public function read() {}
    public function write() {}
}

class ReadOnlyFile extends File {
    public function write() {
        throw new Exception("Cannot write to read only file");
    }
}

class FileProcessor {
    public function writeToFile(File $file) {
        $file->write();
    }
}

$processor = new FileProcessor();
$processor->writeToFile(new ReadOnlyFile()); // Exception! Breaks LSP
```

**Good Practice:**
ইন্টারফেস বা ট্রেইট ব্যবহার করে শুধু যোগ্য ক্লাসকেই রাইটেবল করা:
```php
interface Readable { public function read(); }
interface Writable { public function write(); }

class RegularFile implements Readable, Writable {
    public function read() {}
    public function write() {}
}

class ReadOnlyFile implements Readable {
    public function read() {}
}

class FileProcessor {
    public function writeToFile(Writable $file) {
        $file->write(); // Always safe!
    }
}
```

## 4. Interface Segregation Principle (ISP)
অনেক বড় একটি ইন্টারফেস তৈরি করার চেয়ে, ক্লায়েন্ট অনুযায়ী ছোট ছোট ইন্টারফেস তৈরি করা ভালো। যাতে অপ্রয়োজনীয় মেথডগুলো ইমপ্লিমেন্ট করতে অন্য ক্লাসের বাধ্যবাধকতা তৈরি না হয়।

**Bad Practice:**
```php
interface Rider {
    public function ride($person);
    public function foodDelivery($foodItem);
    public function parcelDelivery($item);
}

// Normal BikeRider doesn't do food Delivery!
class BikeRider implements Rider {
    // Has to implement unneeded methods
}
```

**Good Practice:**
```php
interface RideService { public function ride($person); }
interface FoodDeliveryService { public function foodDelivery($foodItem); }
interface ParcelDeliveryService { public function parcelDelivery($item); }

class BikeRider implements RideService {
    public function ride($person) { /* ... */ }
}

class DeliveryBoy implements RideService, FoodDeliveryService {
    public function ride($person) { /* ... */ }
    public function foodDelivery($foodItem) { /* ... */ }
}
```

## 5. Dependency Inversion Principle (DIP)
উচ্চস্তরের (High-level) ক্লাস কখনো নিম্নস্তরের (Low-level) কনক্রিট ক্লাসের উপর সরাসরি ডিপেন্ড করবে না। উভয়কেই একটি অ্যাবস্ট্রাকশন (Interface) এর উপর ডিপেন্ড করতে হবে।

**Bad Practice:**
```php
class ShoppingCart {
    private $paymentProcessor;
    
    public function __construct() {
        $this->paymentProcessor = new PaypalPayment(); // Strictly uses Paypal
    }
    
    public function checkout($amount) {
        $this->paymentProcessor->processPayment($amount);
    }
}
```

**Good Practice:**
(OCP-এর `PaymentProcessor` এক্সাম্পলটি মূলত DIP-এরও একটি উদাহরণ)।
```php
class ShoppingCart {
    private $paymentProcessor;
    
    public function __construct(PaymentProcessor $processor) {
        $this->paymentProcessor = $processor;
    }
    
    public function checkout($amount) {
        $this->paymentProcessor->processPayment($amount);
    }
}

$paypal = new PaypalPayment();
$cart = new ShoppingCart($paypal);
$cart->checkout(100);
```
এখানে `ShoppingCart` একটি `PaymentProcessor` ইন্টারফেসের উপর নির্ভরশীল, ফলে কোডটি Loosely Coupled হয়।

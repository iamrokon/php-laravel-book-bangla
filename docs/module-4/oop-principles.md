# OOP Design Principles

প্রোগ্রামিংয়ে **Principle** বা মূলনীতি হলো গাইডলাইন, আর **Design Pattern** হলো কোনো নির্দিষ্ট সমস্যার প্রমাণিত সমাধান (Specific problem solution)। ভালো মানের ডিজাইন করতে গেলে কিছু বেসিক প্রিন্সিপাল মাথায় রাখতে হয়।

## 1. Encapsulate what varies
Identify the aspects of your application that vary and separate them from what stays the same.

একটি ক্লাসের কিছু অংশ নতুন রিকয়ারমেন্ট আসার সাথে সাথে পরিবর্তিত হতে পারে, আবার কিছু অংশ ফিক্সড থাকে। যে অংশটি পরিবর্তিত হতে পারে, তাকে একই জায়গায় না রেখে আলাদাভাবে এনক্যাপসুলেট করতে হয়। 

**Bad Practice:**
```php
function getOrderTotal($order) {
    $total = 0;
    foreach ($order->items as $item) {
        $total += ($item->price * $item->quantity);
    }

    // Tax calculation logic (Can vary)
    if ($order->country === 'US') {
        $total += ($total * 0.07);
    } elseif ($order->country === 'EU') {
        $total += ($total * 0.20);
    }
    return $total;
}
```

**Good Practice:**
পরিবর্তনশীল ট্যাক্স ক্যালকুলেশনকে আলাদা ক্লাস বা মেথডে ভাগ করে ফেলা:
```php
class TaxCalculator {
    public function getTaxRate($country, $state) {
        if ($country === 'US') {
            return $this->getUsTaxRate($state);
        } elseif ($country === 'EU') {
            return $this->getEuTaxRate($country);
        }
        return 0;
    }
    
    // ... private sub-methods for USA, EU
}

class Order {
    protected TaxCalculator $taxCalculator;
    
    public function getOrderTotal($order) {
        $total = 0;
        foreach ($order->items as $item) {
            $total += ($item->price * $item->quantity);
        }
        // Encapsulated tax calculation
        $total += ($total * $this->taxCalculator->getTaxRate($order->country, $order->state));
        return $total;
    }
}
```

## 2. Composition over Inheritance
অপ্রয়োজনীয় ইনহেরিটেন্স (Inheritance) ব্যবহার না করে একটি ক্লাসের অবজেক্টকে অন্য ক্লাসে ইনজেক্ট করে কাজ করাকে "ফেভার কম্পোজিশন ওভার ইনহেরিটেন্স" বা **Composition** বলা হয়। 

**Dependency Injection:** কোনো ক্লাসের ভেতরে আরেকটা ক্লাসের অবজেক্ট `new` কি-ওয়ার্ড দিয়ে সরাসরি তৈরি না করে, কনস্ট্রাক্টরের (Constructor) মাধ্যমে বাইরে থেকে পাস করে দেওয়াটাই হলো ডিপেন্ডেন্সি ইনজেকশন। এটি ডাইরেক্ট হার্ড-কোডিং কমায় এবং loose coupling নিশ্চিত করে। লারাভেলে একে স্বয়ংক্রিয় করার জন্য Service Container বা IoC Container ব্যবহৃত হয় (যেমন: `$car = app()->make(Car::class);`)।

**Inheritance Example (Tightly Coupled):**
```php
class Engine {
    public function startEngine() { /* ... */ }
}
class Car extends Engine {
    // Inheritance usage
}
```

**Composition & Dependency Injection (Loosely Coupled):**
```php
class Vehicle {
    public Engine $engine;
    
    public function __construct(Engine $engine) {
        $this->engine = $engine;
    }
    
    public function start() {
        $this->engine->startEngine(); // Composition
    }
}
// Usage: Outside instantiation
$car = new Vehicle(new Engine());
$car->start();
```

## 3. Program to an interface, not an implementation (Depend on Abstraction)
ধরা যাক আমরা ফাইলে বা ডেটাবেজে কোনো কিছু সেভ করতে চাই বা নোটিফিকেশন পাঠাতে চাই। যদি সরাসরি `MySQLDatabase` বা `EmailNotifier` ক্লাসের উপর নির্ভর করে আমাদের সিস্টেম বানাই, তবে পরে অন্য কোনো ডেটাবেজ বা SMS নোটিফিকেশন যুক্ত করা কষ্টকর হয়ে যাবে।
তাই নির্দিষ্ট কোনো **Concrete Class**-এর উপর ডিপেন্ড না করে, একটি **Interface** বা Abstraction-এর উপর ডিপেন্ড করতে হবে।

**Bad Practice:**
```php
class MySQLDatabase {
    public function connect() { /* ... */ }
    public function query($sql) { /* ... */ }
}

class UserRepository {
    private $database;
    public function __construct() {
        $this->database = new MySQLDatabase(); // Tightly coupled
    }
}
```

**Good Practice (Interface):**
```php
interface DatabaseInterface {
    public function connect();
    public function query($sql);
}

class MySQLDatabase implements DatabaseInterface {
    public function connect() {}
    public function query($sql) {}
}

class PostgreSQLDatabase implements DatabaseInterface {
    public function connect() {}
    public function query($sql) {}
}

class UserRepository {
    private $database;

    // Depend on Interface, not concrete class
    public function __construct(DatabaseInterface $database) {
        $this->database = $database;
    }

    public function getUser($id) {
        return $this->database->query("SELECT * FROM users WHERE id = $id");
    }
}

// Usage
$mysqlDb = new MySQLDatabase();
$userRepo = new UserRepository($mysqlDb);

// Switching to PostgreSQL is very easy now
$postgresDb = new PostgreSQLDatabase();
$userRepo = new UserRepository($postgresDb);
```
লারাভেলের বিভিন্ন মাল্টিপল অপশন (Database, Queue, Cache, Notification) এভাবেই ইন্টারফেসের উপর নির্ভরশীল হয়ে কাজ করে।

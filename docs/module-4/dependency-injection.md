# Composition, Inheritance & Dependency Injection

## Inheritance vs Composition
- **Inheritance (`is-a` relationship):** যখন একটি ক্লাস প্যারেন্ট ক্লাসের বৈশিষ্ট্যগুলো অ্যাক্সেস করে।
- **Composition (`has-a` relationship):** যখন একটি ক্লাসের ভেতরে অন্য আরেকটি ক্লাসের অবজেক্টকে প্রোপার্টি হিসেবে ব্যবহার করা হয়।

**Composition Example:**
```php
class Engine {
    public function start() { /* ... */ }
}

class Vehicle {
    private Engine $engine; // Composition: Vehicle has-a Engine

    public function start() {
        $this->engine->start();
    }
}
```

ইনহেরিটেন্সের ক্ষেত্রে প্যারেন্ট ক্লাসের সব পাবলিক ও প্রোটেক্টেড ফিচার চাইল্ড ক্লাসে চলে আসে। যেমন- `Mobile` প্যারেন্ট ক্লাস হলে, `AppleMobile is-a Mobile` এবং `Iphone is-a AppleMobile`।

---

## Favour Composition over Inheritance
সফটওয়্যার ইঞ্জিনিয়ারিংয়ে একটি কমন নীতি হলো- "ইনহেরিটেন্সের চেয়ে কম্পোজিশনকে প্রাধান্য দেওয়া"।

**Problem with Inheritance:**
ধরা যাক আমাদের একটি প্যারেন্ট ক্লাস `Book` আছে।
```php
class Book {
    protected $numberOfPage;
    public function purchase() { /* ... */ }
    public function lend() { /* ... */ } // ধার দেওয়া
}

class Ebook extends Book {
    // Inherits everything
}

class AudioBook extends Book {
    // Problem 1: AudioBook doesn't have numberOfPage
    // Problem 2: AudioBook cannot be lent structurally like a physical book
}
```
ইনহেরিটেন্সের ক্ষেত্রে প্যারেন্টের এমন কিছু প্রোপার্টি বা মেথড থাকতে পারে, যা চাইল্ড ক্লাসের জন্য অপ্রয়োজনীয় বা অকার্যকর (যেমন `AudioBook`-এ `lend` বা `numberOfPage`)। এছাড়া ক্লাস টেস্টিং (Mocking) অনেক কঠিন হয়ে যায় কারণ প্যারেন্ট ক্লাসের বিহেভিয়ারও মাথায় রাখতে হয়।

**Solution - Composition:**
কম্পোজিশন ব্যবহার করলে আমরা শুধুমাত্র যতটুকু ফিচার প্রয়োজন, ঠিক ততটুকুই ব্যবহার করতে পারি এবং কোড অনেক ফ্লেক্সিবল ও টেস্টেবল হয়। 
```php
class AudioBook {
    public Book $book;
    
    // Now AudioBook only uses what is needed from Book and ignores the rest.
}
```

---

## Dependency Injection (DI)
কোনো একটি ক্লাসে অন্য আরেকটি ক্লাসের অবজেক্টকে ডিপেন্ডেন্সি হিসেবে সরাসরি ইনস্ট্যানশিয়েট না করে বাইর থেকে ইনজেক্ট করাকে ডিপেন্ডেন্সি ইনজেকশন বলে।

**Tightly Coupled (Bad Practice):**
```php
class Vehicle {
    public Engine $engine;
    
    public function __construct() {
        $this->engine = new Engine(); // Tightly Coupled
    }
}
```

**Loosely Coupled via Dependency Injection (Good Practice):**
```php
class Vehicle {
    public Engine $engine;
    
    // Constructor Injection
    public function __construct(Engine $engine) {
        $this->engine = $engine; 
    }
    
    // Setter Injection
    public function setEngine(Engine $engine) {
        $this->engine = $engine;
    }
}

// Usage
$engine = new Engine();
$vehicle = new Vehicle($engine);
```
এইভাবে ক্লাসগুলোর মধ্যে কাপলিং কমানো হয়। ডিপেন্ডেন্সিগুলো সহজে ম্যানেজ করার জন্য লারাভেলের মতো ফ্রেমওয়ার্কে **Dependency Injection Container (IoC Container)** ব্যবহৃত হয়।

---

## Program to an Interface, not to an Implementation
ডিপেন্ডেন্সি ইনজেকশনের ক্ষেত্রে কংক্রিট ক্লাসের (Concrete Class) বদলে ইন্টারফেস (Interface) ব্যবহার করলে কোড আরও ফ্লেক্সিবল হয়। 

**Using Concrete Class (Restricted):**
```php
class Driver {
    protected Bike $bike;
    
    // Restricted to only Bike
    public function __construct(Bike $bike) {
        $this->bike = $bike;
    }
}
```

**Using Interface (Flexible):**
```php
interface VehicleInterface {
    public function start();
}

class Driver {
    protected VehicleInterface $vehicle;
    
    // Open to any Vehicle (Bike, Car, Truck)
    public function __construct(VehicleInterface $vehicle) {
        $this->vehicle = $vehicle;
    }
    
    public function startRide() {
        $this->vehicle->start();
    }
}
```
এর ফলে আমরা যেকোনো নতুন ক্লাস (যিনি `VehicleInterface` ইমপ্লিমেন্ট করেছে) অনায়াসেই `Driver` ক্লাসে ইনজেক্ট করতে পারব।

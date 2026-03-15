# OOP Deep Dive

## Meta Programming
পিএইচপিতে অবজেক্ট ওরিয়েন্টেড ও প্রোসিডিউরালের বাইরেও আরেকটি Programming Paradigm আছে, যাকে বলা হয় **Meta Programming**। এটি মূলত একটি জেনেরিক প্রোগ্রামিং প্যারাডাইম। এর মূল বিষয় হলো রানটাইমে কোড নিজেকে নিজে পড়তে পারে অথবা অন্য কোনো প্রোগ্রামকে রিড করতে পারে। একে বলা হয় `Code as a Data`। পিএইচপিতে `Reflection API` ব্যবহার করে এক্সিকিউট হওয়া কোড রিড করা যায়। এর সাধারণ উদাহরণ হলো ম্যাজিক মেথডসমূহ (Magic Methods)।

## Class and Object
OOP সিস্টেমে কোনো মডেল চিন্তা করার সময় আমরা প্রতিটি জিনিসকে একটি **Object** হিসেবে ধরে নিই।
যেমন- একটি Sales Management System-এর ক্ষেত্রে আমরা Noun (বিশেষ্য) গুলোকে খুঁজব। 
এখানে অবজেক্ট হতে পারে: `Shop`, `Salesman`, `Product`, `Order`, `Invoice`।

**Class** হলো অবজেক্টের ব্লু-প্রিন্ট (Blueprint) বা কাঠামো। একই বৈশিষ্ট্যের অনেকগুলো অবজেক্ট তৈরি করতে ক্লাস ব্যবহৃত হয়। অবজেক্টের দুটি জিনিস থাকে:
1. **Property (Data/State):** অবজেক্টের বৈশিষ্ট্য।
2. **Behaviour (Method):** অবজেক্টের কাজ।

```php
class Task {
    public $name;
    private $status;
    public static $members = [];

    // Constructor
    public function __construct($members = []) {
        self::$members = $members;
    }

    // Property set/get (Behaviour)
    public function setName($name) {
        $this->name = $name; // $this refers to current object
    }

    public function changeStatus($status) {
        $this->status = $status;
    }

    // Static Method
    public static function setMembers() {
        // ...
    }

    // Destructor
    public function __destruct() {
        // Obects destroy হওয়ার সময় কাজ করে
    }
}

// Object Instantiation
$task_one = new Task();
$task_one->setName('Task A');

$task_two = new Task();
$task_two->setName('Task B');

// Static method call without object
Task::setMembers();
```
> আমরা চেষ্টা করব ক্লাসের বেশিরভাগ প্রোপার্টিকে `private` বা `protected` রাখতে, যাতে ক্লাসের বাইরে থেকে সরাসরি চেঞ্জ করা না যায়। `static` প্রোপার্টি যেকোনো এক জায়গায় পরিবর্তন করলে সব জায়গায় এর প্রভাব পড়ে, তাই এটি কম ব্যবহার করা ভালো।
> ক্লাসের অবজেক্ট তৈরি করার সময় নিজে থেকেই `__construct` মেথডটি কল হয়।

## 4 Pillars of OOP

### 1. Abstraction
কোনো রিয়েল লাইফ জিনিসের শুধুমাত্র প্রয়োজনীয় প্রোপার্টি এবং মেথডগুলোকে ক্লাসে আইসোলেট বা মডেল করাটাই হলো Abstraction। যেমন- Plane ক্লাসের মাধ্যমে আমরা শুধুমাত্র আমাদের প্রয়োজনীয় মেথডগুলো লিপিবদ্ধ করতে পারি।

### 2. Encapsulation
বিভিন্ন প্রোপার্টি এবং মেথডকে একসাথে একটি ক্লাসের মধ্যে আবদ্ধ করে রাখার নামই Encapsulation। বাইরের অপ্রত্যাশিত অ্যাক্সেস থেকে ডেটাকে সিকিউর রাখা এর উদ্দেশ্য।

### 3. Inheritance (is-a relationship)
কোনো একটি ক্লাস যদি আরেকটি ক্লাসের বিহেভিয়ার বা বৈশিষ্ট্যকে এক্সটেন্ড (Extend) বা রেপ্লিকেট করে, তাকে ইনহেরিটেন্স বলে। ইনহেরিটেন্স তখনই প্রযোজ্য যখন দুটি ক্লাসের মধ্যে **is-a** রিলেশনশিপ থাকে। 
- Car *is a* Vehicle (Valid) 
- Bird *is a* Vehicle (Invalid)

```php
class User {
    public $role;
    public function login() { /* ... */ }
}

class Employee extends User {
    // Employee automatically gets $role and login()
}

$employee = new Employee();
$employee->login();
```

### 4. Polymorphism
Polymorphism মানে বহুরূপিতা (Poly = Many, Morphism = Forms)। এটি দুটি উপায়ে অর্জিত হয়:
1. **Method Overloading (Compile-time):** একই নামে আলাদা প্যারামিটার দিয়ে একাধিক মেথড তৈরি। (PHP এটি সরাসরি সাপোর্ট করে না)।
2. **Method Overriding (Run-time):** চাইল্ড ক্লাসে প্যারেন্ট ক্লাসের কোনো মেথডকে পুনরায় সংজ্ঞায়িত করা বা ওভাররাইড করা। 

**Run-time Polymorphism Example:**
রানটাইমে ডিসাইড হয় যে কোন ক্লাসের মেথড কল হবে।
```php
class Vehicle {
    public function getTotal() { return 50; }
}

class Car extends Vehicle {
    public function getTotal() { return 100; } // Method Overridden
}

class Invoice {
    public function getInvoice(Vehicle $vehicle) {
        return $vehicle->getTotal();
    }
}

$car = new Car();
echo (new Invoice())->getInvoice($car); // Output: 100
```


---

## Abstract Classes
যখন প্যারেন্ট ক্লাসে এমন কিছু মেথড থাকে যার নির্দিষ্ট ইমপ্লিমেন্টেশন প্যারেন্টে দেওয়া সম্ভব নয়, বরং চাইল্ড ক্লাসে তা ইমপ্লিমেন্ট করা বাধ্যতামূলক (Mandatory), তখন ঐ মেথডগুলোকে `abstract` মেথড বলে। এবং ক্লাসটিও `abstract` ক্লাস হয়ে যায়। 

যেমন- Ride Sharing সার্ভিসে Vehicle এর `getBaseFare()` সব চাইল্ডের জন্য একই হবে না।
```php
abstract class Vehicle {
    abstract public function getBaseFare(): int;
    abstract public function getPerKiloFare(): int;

    // Common concrete method
    public function getTotal(int $kilo): int {
        return $this->getBaseFare() + ($kilo * $this->getPerKiloFare());
    }
}

class Car extends Vehicle {
    public function getBaseFare(): int { return 50; }
    public function getPerKiloFare(): int { return 10; }
}

class Bike extends Vehicle {
    public function getBaseFare(): int { return 20; }
    public function getPerKiloFare(): int { return 5; }
}

$car = new Car();
echo $car->getTotal(5); // Output: 100 (50 + 5*10)
```

---

## Interfaces
ইন্টারফেস হলো একটি কনট্র্যাক্ট (Contract)। অ্যাবস্ট্রাক্ট ক্লাসে কংক্রিট মেথড ও প্রপার্টি থাকতে পারে, কিন্তু ইন্টারফেসে শুধুমাত্র বিহেভিয়ার বা মেথড সিগনেচার থাকে (কোনো বডি থাকে না)। ক্লাসে মাল্টিপল ইন্টারফেস ইমপ্লিমেন্ট করা যায়।

ধরা যাক, আমরা গাড়িকে Hourly ভাড়া দেওয়ার সিস্টেম করব, যা শুধু Car এবং CNG-তে থাকবে, Bike-এ থাকবে না।
```php
interface HourlyRentable {
    public function getHourlyRate(): int;
}

interface DailyRentable {
    public function getDailyRate(): int;
}

class Car extends Vehicle implements HourlyRentable, DailyRentable {
    public function getHourlyRate(): int {
        return 100;
    }
    public function getDailyRate(): int {
        return 800;
    }
}

class CNG extends Vehicle implements HourlyRentable {
    public function getHourlyRate(): int {
        return 50;
    }
}
```
পরবর্তীতে অন্য কোনো সার্ভিসে (যেমন Daily Rent) রেট বা বিহেভিয়ার যুক্ত করতে হলে, শুধু ঐ ক্লাসে ইন্টারফেসটি ইমপ্লিমেন্ট করে দিলেই হবে। এটি কোডে দারুন ফ্লেক্সিবিলিটি দেয়।

# OOP Design Principles

প্রোগ্রামিংয়ে **Principle** বা মূলনীতি হলো গাইডলাইন, আর **Design Pattern** হলো কোনো নির্দিষ্ট সমস্যার প্রমাণিত সমাধান (Specific problem solution)। ভালো মানের ডিজাইন করতে গেলে কিছু বেসিক প্রিন্সিপাল মাথায় রাখতে হয়।

## 1. Encapsulate what varies (পরিবর্তনশীল অংশকে আলাদা করা)

Identify the aspects of your application that vary and separate them from what stays the same.

একটি ক্লাসের কিছু অংশ নতুন রিকয়ারমেন্ট আসার সাথে সাথে পরিবর্তিত হতে পারে, আবার কিছু অংশ ফিক্সড থাকে। যে অংশটুকু পরিবর্তন হবে সেটিকে আমরা fixed অংশের সাথে একসাথে রাখা যাবে না।

ধরা যাক, আমাদের একটি `Invoice` ক্লাস আছে যেখানে অর্ডার টোটাল ক্যালকুলেট করা হয়। এখানে ভ্যাট বা ট্যাক্স ক্যালকুলেশন একেক দেশের জন্য একেক রকম হতে পারে।

**Bad Practice:**
এখানে ট্যাক্স ক্যালকুলেশন লজিকটি সরাসরি `getOrderTotal` মেথডের ভেতর আছে। নতুন কোনো দেশের ট্যাক্স রুল আসলে এই মেথডটি বারবার পরিবর্তন করতে হবে।
```php
class Invoice
{
    public function getOrderTotal($order, array $items): float
    {
        $total = 0;
        foreach ($items as $item) {
            $total += ($item->price * $item->quantity);
        }

        // এই অংশটুকু প্রতিনিয়ত পরিবর্তন হতে পারে (Varies)
        if ($order->country === 'US') {
            $total += ($total * 0.07);
        } else if ($order->country === 'EU') {
            $total += ($total * 0.20);
        }

        return $total;
    }
}
```

**Good Practice:**
পরিবর্তনশীল ট্যাক্স ক্যালকুলেশনকে আলাদা মেথড বা ক্লাসে ভাগ করে ফেলা। ফলে ট্যাক্স রিলেটেড কোনো চেঞ্জ আসলে শুধু ঐ নির্দিষ্ট অংশেই পরিবর্তন করলেই হবে।
```php
class Invoice
{
    public function getTaxRate($country): float
    {
        if ($country == 'US') {
            return 0.07;
        } else if ($country == 'EU') {
            return 0.20;
        }
        return 0;
    }

    public function getOrderTotal($order, array $items): float
    {
        $total = 0;
        foreach ($items as $item) {
            $total += ($item->price * $item->quantity);
        }

        // ট্যাক্স ক্যালকুলেশন এখন আলাদা মেথডে এনক্যাপসুলেটেড
        $total += ($total * $this->getTaxRate($order->country));

        return $total;
    }
}
```
ট্যাক্স রিলেটেড ক্যালকুলেশন আরও জটিল হলে আমরা আলাদা ক্লাস বানিয়ে ফেলতে পারি।

## 2. Composition over Inheritance
অপ্রয়োজনীয় ইনহেরিটেন্স (Inheritance) ব্যবহার না করে একটি ক্লাসের অবজেক্টকে অন্য ক্লাসে ইনজেক্ট করে কাজ করাকে "ফেভার কম্পোজিশন ওভার ইনহেরিটেন্স" বা **Composition** বলা হয়। এটি **has-a** রিলেশনশিপ মেইনটেইন করে।

**Composition & Dependency Injection (Loosely Coupled):**
```php
class Engine {
    public function startEngine() { /* ... */ }
}

class Vehicle {
    protected Engine $engine;
    
    public function __construct(Engine $engine) {
        $this->engine = $engine;
    }
    
    public function start() {
        $this->engine->startEngine(); // Composition (Vehicle has an Engine)
    }
}

$car = new Vehicle(new Engine());
$car->start();
```

## 3. Program to an interface, not an implementation (ইন্টারফেসের ওপর নির্ভর করা)

সরাসরি কোনো concrete অবজেক্টের ওপর ডিপেন্ড না করে আমরা একটা ক্লাসের Interface বা Abstract ক্লাসের ওপর ডিপেন্ড করব। একেই বলে **Program to an interface, not an implementation**।

ধরা যাক, আমাদের একটি `Driver` ক্লাস আছে যা কোনো যানবাহন চালায়।

**Bad Practice:**
এখানে `Driver` সরাসরি `Bike` ক্লাসের ওপর নির্ভরশীল। যদি ড্রাইভারকে `Car` চালাতে হয়, তবে আমাদের `Driver` ক্লাস পরিবর্তন করতে হবে। কারণ আমরা এখানে ডিপেন্ডেন্সি হিসেবে `Bike` কে ফিক্সড (Hardcoded) করে দিয়েছি।
```php
class Bike {
    public function start() {
        printf("Bike started");
    }
}

class Driver {
    protected $bike;
    public function __construct(Bike $bike) {
        $this->bike = $bike;
    }
    public function startRide() {
        $this->bike->start();
    }
}
```

**Good Practice:**
এই সমস্যা সমাধানের জন্য আমরা একটি `VehicleInterface` তৈরি করতে পারি। `Bike` এবং `Car` উভয়ই এই ইন্টারফেসটি ইমপ্লিমেন্ট করবে। ফলে `Driver` এখন যেকোনো `Vehicle` চালানোর সক্ষমতা অর্জন করবে।

```php
interface VehicleInterface {
    public function start();
}

class Bike implements VehicleInterface {
    public function start() {
        printf("Bike started ");
    }
}

class Car implements VehicleInterface {
    public function start() {
        printf("Car started ");
    }
}

class Driver {
    protected VehicleInterface $vehicle;

    public function __construct(VehicleInterface $vehicle) {
        $this->vehicle = $vehicle;
    }

    public function startRide() {
        $this->vehicle->start();
    }
}

// ব্যবহারের সময়:
$bike = new Bike();
$driver = new Driver($bike);
$driver->startRide();

$car = new Car();
$driver = new Driver($car); // এখন কার দিয়েও চালানো যাবে
$driver->startRide();
```
ইন্টারফেস ব্যবহারের ফলে আমরা সহজেই নতুন কোনো Vehicle নিয়ে আসতে পারব (যেমন: Boat), যার জন্য মূল `Driver` ক্লাসে কোনো পরিবর্তন করতে হবে না।

```php
class Boat implements VehicleInterface {
    public function start() {
        printf("Boat started");
    }
}

$boat = new Boat();
$driver = new Driver($boat);
$driver->startRide();
```

**কখন ইন্টারফেস ব্যবহার করবেন?**
যদি একটি ক্লাসের ডিপেন্ডেন্সি হিসেবে ভিন্ন ভিন্ন ফ্যাসিলিটি দিতে হয়, তবে আমরা Interface এর ওপর ডিপেন্ড করব। কিন্তু আমরা যদি নিশ্চিত হই যে, সেই ক্লাসে ঐ নির্দিষ্ট টাইপের অবজেক্ট ছাড়া অন্য কোনো অবজেক্ট ডিপেন্ডেন্সি হিসেবে আসবে না, সেক্ষেত্রে ইন্টারফেস ব্যবহার না করলেও চলবে।

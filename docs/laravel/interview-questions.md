# PHP, OOP & Laravel Interview Questions & Answers (ইন্টারভিউ প্রস্তুতি)

> [!TIP]
> সফটওয়্যার ইঞ্জিনিয়ার এবং লারাভেল ডেভেলপার ইন্টারভিউয়ের জন্য সর্বাধিক জিজ্ঞাসিত প্রশ্নাবলী (FAQ) এবং বিস্তারিত সমাধান। এখানে পিএইচপি, ওওপি, ডাটাবেজ, সিস্টেম ডিজাইন, লারাভেল ইন্টারনালস এবং ফ্রন্টএন্ড সম্পর্কিত গুরুত্বপূর্ণ বিষয়গুলো সহজ বাংলায় উপস্থাপন করা হয়েছে।

---

## সূচিপত্র (Table of Contents)

1. [পিএইচপি ও ওওপি (PHP Core & OOP Principles)](#১-পিএইচপি-ও-ওওপি-php-core--oop-principles)
2. [লারাভেল আর্কিটেকচার ও কোর কনসেপ্ট (Laravel Architecture & Core Concepts)](#২-লারাভেল-আর্কিটেকচার-ও-কোর-কনসেপ্ট-laravel-architecture--core-concepts)
3. [ইলোকুয়েন্ট, ডাটাবেজ ও পারফরম্যান্স (Eloquent, Database & Query Optimization)](#৩-ইলোকুয়েন্ট-ডাটাবেজ-ও-পারফরম্যান্স-eloquent-database--query-optimization)
4. [ক্যাশিং, কিউ, মেইল ও ব্যাকগ্রাউন্ড প্রসেসিং (Cache, Queue, Mail & Workers)](#৪-ক্যাশিং-কিউ-মেইল-ও-ব্যাকগ্রাউন্ড-প্রসেসিং-cache-queue-mail--workers)
5. [ওয়েব সিকিউরিটি, এপিআই, ডিভঅপ্স ও আর্কিটেকচার (Security, APIs, DevOps & Architecture)](#৫-ওয়েব-সিকিউরিটি-এপিআই-ডিভঅপ্স-ও-আর্কিটেকচার-security-apis-devops--architecture)
6. [ফ্রন্টএন্ড ও ভিউ-জেএস (Frontend & Vue.js)](#৬-ফ্রন্টএন্ড-ও-ভিউ-জেএস-frontend--vuejs)

---

## ১. পিএইচপি ও ওওপি (PHP Core & OOP Principles)

### Q1: Composer কি এবং আমরা এটি কেন ব্যবহার করি? (What is Composer, why do we use it?)
**উত্তরাংশ:**
* **Composer কি:** Composer হলো PHP-এর জন্য একটি **Dependency Manager** (প্যাকেজ ম্যানেজার)।
* **কেন ব্যবহার করি:**
  1. থার্ড-পার্টি লাইব্রেরি বা প্যাকেজ (যেমন: Guzzle, Carbon, Intervention Image) প্রজেক্টে যুক্ত করা ও আপডেট করা সহজ করে।
  2. **Autoloading (PSR-4):** ফাইলগুলোকে ম্যানুয়ালি `require` বা `include` না করেই ক্লাসের নেমস্পেস ধরে স্বয়ংক্রিয়ভাবে লোড করে।
  3. প্যাকেজের ডিপেন্ডেন্সি ভার্সন কনফ্লিক্ট সমাধান করে।

---

### Q2: অ্যাবস্ট্রাকশন, এনক্যাপসুলেশন ও ইনফরমেশন হাইডিং এর পার্থক্য ব্যাখ্যা কর।
**উত্তরাংশ:**
এই ৩টি কনসেপ্ট সফটওয়্যার ডিজাইন ও OOP-তে ঘনিষ্ঠভাবে সম্পর্কিত:

* **Abstraction (বিমূর্তকরণ):** 
  * প্রয়োজনীয় বিষয়গুলোকে ফোকাসে রেখে অপ্রয়োজনীয় জটিলতা ইগনোর বা হাইড করা।
  * *উদাহরণ:* ফ্যানের সুইচ অন-অফ করার সময় ভেতরের সার্কিট কীভাবে কাজ করছে তা জানার প্রয়োজন নেই। সফটওয়্যারে `BusTicketBooking` ক্লাসে বাসের ইঞ্জিন নম্বর না রেখে শুধু সিট ও রুট সংক্রান্ত প্রপার্টি রাখা।
* **Encapsulation (সংবরণ):** 
  * ডেটা (Properties) এবং বিহেভিয়ার (Methods)-কে একটি একক ইউনিটে (Class/Object) আবদ্ধ রাখা। 
  * *উদাহরণ:* মেডিসিন ক্যাপসুলের মতো ডেটা ও মেথডকে এক জায়গায় রাখা যা প্রসিডিউরাল কোডিংয়ে সম্ভব ছিল না।
* **Information Hiding (তথ্য গোপনীয়তা):** 
  * অবজেক্টের কোন ডেটা বাইরে প্রকাশ পাবে এবং কোনটা লুকানো থাকবে তা নিয়ন্ত্রণ করা।
  * *উদাহরণ:* OOP-তে `private`, `protected`, `public` অ্যাক্সেস মডিফায়ার দিয়ে Information Hiding এনশিওর করা হয়।

---

### Q3: ক্লাস, অবজেক্ট এবং ইন্সট্যান্স এর পার্থক্য ব্যাখ্যা কর (`instanceof` কি?)
**উত্তরাংশ:**
* **Class (ক্লাস):** অবজেক্ট তৈরির ব্লুপ্রিন্ট বা নকশা। এতে ডেটা ও মেথডের গঠন সংজ্ঞায়িত থাকে।
* **Object (অবজেক্ট):** ক্লাসের ওপর ভিত্তি করে মেমোরিতে তৈরি হওয়া বাস্তব সত্তা (Real-world entity)।
* **Instance (ইন্সট্যান্স):** মেমোরিতে নির্দিষ্ট কোনো অবজেক্টের অস্তিত্বের রূপায়নকে ইন্সট্যান্স বলে।
* **`instanceof` অপারেটর:** কোনো একটি অবজেক্ট নির্দিষ্ট ক্লাসের ইন্সট্যান্স কিনা তা চেক করতে `instanceof` ব্যবহার করা হয়।
  ```php
  $user = new User();
  var_dump($user instanceof User); // true
  ```

---

### Q4: পিএইচপিতে অপারেটর ওভারলোডিং কীভাবে করা হয়?
**উত্তরাংশ:**
PHP-তে C++ বা Python-এর মতো ট্র্যাডিশনাল **Operator Overloading** (যেমন: `+` অপারেটরকে রিডিফাইন করা) সরাসরি বিল্ট-ইনভাবে সমর্থিত নয়।

তবে PHP-তে ম্যাজিক মেথড (যেমন: `__call()`, `__get()`, `__set()`, `__toString()`) ব্যবহার করে অপারেটর বা অবজেক্টের মেথড অ্যাক্সেস বিহেভিয়ার সিমুলেট বা ওভারলোড করা যায়।

---

### Q5: ওভারলোডিং এবং ওভাররাইডিং এর পার্থক্য ব্যাখ্যা কর।
**উত্তরাংশ:**
| বিষয় | Overloading (ওভারলোডিং) | Overriding (ওভাররাইডিং) |
| :--- | :--- | :--- |
| **সংজ্ঞা** | একই ক্লাসে একই নামের মেথড ভিন্ন প্যারামিটারে ডিফাইন করা। | প্যারেন্ট ক্লাসের মেথডকে চাইল্ড ক্লাসে নতুনভাবে ইমপ্লিমেন্ট করা। |
| **PHP সমর্থন** | সরাসরি নেই। ম্যাজিক মেথড (`__call`) দিয়ে সিমুলেট করা হয়। | সম্পূর্ণ সমর্থিত। |
| **পলিমরফিজম** | Compile-time Polymorphism | Run-time Polymorphism |

---

### Q6: Interface এবং Abstract Class এর মধ্যে পার্থক্য কি?
**উত্তরাংশ:**
| বৈশিষ্ট্য | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Method Types** | Abstract (বডি ছাড়া) এবং Concrete (বডি সহ) দুটোই থাকতে পারে। | শুধুমাত্র Method Signature থাকবে (কোনো বডি থাকবে না)। |
| **Access Modifiers**| `public`, `protected`, `private` সব থাকতে পারে। | সব মেথড অবশ্যই `public` হতে হবে। |
| **Variables** | Normal variables/properties থাকতে পারে। | কোনো instance variables থাকতে পারে না। |
| **Inheritance** | একটি ক্লাস একটি মাত্র Abstract Class-কে `extend` করতে পারে। | একটি ক্লাস একাধিক Interface-কে `implement` করতে পারে। |

---

### Q7: পলিমরফিজম কি এবং এর মাধ্যমে কিভাবে নতুন মেথড যুক্ত করা যায়?
**উত্তরাংশ:**
Polymorphism (বহুরূপিতা) হলো একি নামের মেথড বা ইন্টারফেস বিভিন্ন অবজেক্টে ভিন্ন আচরণ করা। 
একটি Interface-কে extend করে নতুন Interface বানানোর মাধ্যমে অথবা Interface implement করা চাইল্ড ক্লাসে নির্দিষ্ট মেথড যোগ করার মাধ্যমে নতুন বিহেভিয়ার অর্জিত হয়।

---

### Q8: ক্লাসের ভেতরে কনস্ট্যান্ট কীভাবে তৈরি করা যায়?
**উত্তরাংশ:**
`const` কিওয়ার্ড ব্যবহার করে ক্লাসের ভেতরে কনস্ট্যান্ট তৈরি করা হয় এবং `self::` বা `Classname::` দিয়ে অ্যাক্সেস করা যায়:
```php
class AppConfig {
    public const VERSION = '1.0.0';
}
echo AppConfig::VERSION;
```

---

### Q9: PHP-তে Garbage Collection কি?
**উত্তরাংশ:**
* **Garbage Collection (GC):** মেমোরিতে যেসব ভেরিয়েবল বা অবজেক্টের আর কোনো রেফারেন্স নেই, সেগুলোকে মেমোরি (RAM) থেকে মুছে মেমোরি ফ্রি করার মেকানিজম।
* **PHP-তে কীভাবে কাজ করে:** 
  PHP একটি Reference Counting (Zval architecture) ভিত্তিক মেমোরি ম্যানেজার ব্যবহার করে। সাথে **Cycle Collecting Algorithm** যুক্ত থাকে যাতে চক্রাকার রেফারেন্স (Circular reference) ক্লিনআপ করা যায়।
* **সুবিধা:** প্রোগ্রামারকে ম্যানুয়ালি মেমোরি ফ্রি (`free()`) করা নিয়ে চিন্তা করতে হয় না।

---

### Q10: DRY Principle কি?
**উত্তরাংশ:**
* **DRY = Don't Repeat Yourself.**
* **ব্যাখ্যা:** একই কোড বা লজিক বারবার প্রজেক্টের বিভিন্ন জায়গায় না লিখে রিইউজেবল ফাংশন, ক্লাস, ট্রেইট বা সার্ভিস আকারে সংরক্ষণ করা। এতে বাগ কমে এবং কোড মেইনটেনেন্স সহজ হয়।

---

### Q11: OOP এর ৪টি মূল পিলার কি কি?
**উত্তরাংশ:**
1. **Encapsulation:** ডেটা ও মেথডকে ক্লাসে সংবদ্ধ রাখা ও ইনফরমেশন হাইড করা।
2. **Abstraction:** জটিল বাস্তবায়ন লুকিয়ে রেখে শুধু প্রয়োজনীয় ইন্টারফেস প্রকাশ করা।
3. **Inheritance:** প্যারেন্ট ক্লাসের বৈশিষ্ট্য চাইল্ড ক্লাসে ডেরাইভ করা।
4. **Polymorphism:** একই মেথড বিভিন্ন ক্লাসে ভিন্নভাবে আচরণ করা।

---

### Q12: SOLID Principles ব্যাখ্যা কর।
**উত্তরাংশ:**
* **S - Single Responsibility Principle (SRP):** একটি ক্লাসের পরিবর্তনের জন্য একটিমাত্র কারণ থাকা উচিত (এক ক্লাস = এক দায়িত্ব)।
* **O - Open/Closed Principle (OCP):** সফটওয়্যার এন্টিটি Extensions এর জন্য উন্মুক্ত, কিন্তু Modification এর জন্য বন্ধ থাকবে।
* **L - Liskov Substitution Principle (LSP):** Subclass অবজেক্টগুলো প্যারেন্ট ক্লাসের জায়গায় কোনো ভুল আচরণ ছাড়া প্রতিস্থাপিত হতে পারবে।
* **I - Interface Segregation Principle (ISP):** ক্লায়েন্টকে এমন ইন্টারফেস ব্যবহারে বাধ্য করা যাবে না যা সে ব্যবহার করে না (ইন্টারফেস ছোট ও নির্দিষ্ট রাখা)।
* **D - Dependency Inversion Principle (DIP):** হাই-লেভেল মডিউল সরাসরি লো-লেভেল মডিউলের ওপর নির্ভর করবে না; উভয়েই Abstraction (Interface)-এর ওপর নির্ভর করবে।

---

### Q13: Singleton Design Pattern কি?
**উত্তরাংশ:**
* **Singleton Pattern:** এমন একটি ডিজাইন প্যাটার্ন যা নিশ্চিত করে একটি ক্লাসের পুরো অ্যাপ্লিকেশন লাইফসাইকেলে **একটিমাত্র ইন্সট্যান্স (Single Instance)** থাকবে।
* **কখন ব্যবহৃত হয়:** ডাটাবেজ কানেকশন, লগার (Logger), কনফিগারেশন ম্যানেজার ইত্যাদি শেয়ার্ড রিসোর্সের ক্ষেত্রে।
* **গঠন:** Private constructor, Private clone, Private wakeup, এবং একটি Static `getInstance()` মেথড।

---

### Q14: PHP 8 Object Reference Code Quiz
**প্রশ্ন:**
```php
class A {
    public function __construct(public int $value) { }
}
$objA = new A(10);
$objB = $objA;
$objB->value = 20;
var_dump($objA->value === $objB->value);
```
**আউটপুট:** `bool(true)`
**কারণ:** PHP-তে অবজেক্ট ভেরিয়েবল পাস করলে মেমোরি আইডেন্টিফায়ারের রেফারেন্স বাই-ভ্যালু পাস হয়। তাই `$objA` ও `$objB` একই অবজেক্টকে পয়েন্ট করে।

---

### Q15: PHP 8 এর নতুন ফিচারসমূহ কি কি?
**উত্তরাংশ:**
1. **JIT Compiler (Just-In-Time Compilation):** CPU-intensive কাজের দ্রুত প্রসেসিং।
2. **Named Arguments:** `greet(name: 'Rokon', age: 25)`.
3. **Attributes (Native Annotations):** `#[Route("/home")]`.
4. **Constructor Property Promotion:** `public function __construct(public string $name) {}`.
5. **Union Types:** `int|string`.
6. **Nullsafe Operator:** `$user?->profile?->username`.
7. **Match Expression:** Switch-এর টাইপ-সেফ অল্টারনেটিভ।
8. **New String Functions:** `str_contains()`, `str_starts_with()`, `str_ends_with()`.

---

### Q16: Namespace কেন ব্যবহার হয়?
**উত্তরাংশ:**
* **Name Conflict সমাধান:** একাধিক থার্ড-পার্টি লাইব্রেরিতে একই নামের ক্লাস থাকলে সংঘাত না হওয়া।
* **কোড অর্গানাইজেশন:** ক্লাসের লজিক্যাল ফোল্ডার স্ট্রাকচার রক্ষা করা।
* **PSR-4 Autoloading:** অটোমেটিক ফাইল লোডিং নিশ্চিত করা।

---

### Q17: Inheritance এর চেয়ে Composition এর সুবিধাগুলো কি কি?
**উত্তরাংশ:**
* **Has-a vs Is-a:** Inheritance হলো "Is-a" সম্পর্ক, যা টাইট কাপলিং তৈরি করে। Composition হলো "Has-a" সম্পর্ক, যা লুজ কাপলিং (Loose coupling) তৈরি করে।
* **নমনীয়তা:** রানটাইমে বিহেভিয়ার পরিবর্তন করা যায়।
* **Fragile Base Class সমস্যা দূর:** প্যারেন্ট ক্লাসের কোড চেঞ্জে চাইল্ড ক্লাস ভেঙে পড়ার ঝুঁকি থাকে না।

---

### Q18: PHP-FPM ও PHP-CLI এর মধ্যে পার্থক্য কি?
**উত্তরাংশ:**
* **PHP-FPM (FastCGI Process Manager):** Nginx/Apache ওয়েব সার্ভারের সাথে HTTP Request দ্রুত প্রসেস ও প্রসেস পুল ম্যানেজ করতে ব্যবহৃত হয়।
* **PHP-CLI (Command Line Interface):** টার্মিনাল থেকে স্ক্রিপ্ট, Artisan কমান্ড, Cron Jobs চালাতে ব্যবহৃত হয়।

---

## ২. লারাভেল আর্কিটেকচার ও কোর কনসেপ্ট (Laravel Architecture & Core Concepts)

### Q19: Laravel Contracts কি?
**উত্তরাংশ:**
Laravel Contracts হলো ফ্রেমওয়ার্কের কোর সার্ভিসগুলোর জন্য সংজ্ঞায়িত কিছু **Interfaces**-এর সেট। 
যেমন: `Illuminate\Contracts\Mail\Mailer` ডিফাইন করে মেইল পাঠানোর জন্য কি কি মেথড লাগবে।

---

### Q20: Service Provider কি?
**উত্তরাংশ:**
Service Provider হলো লারাভেল অ্যাপ্লিকেশন বুটস্ট্র্যাপিংয়ের কেন্দ্রীয় স্থান।
* **কাজ:** Service Container-এ সার্ভিস বা ক্লাসের Binding রেজিস্টার করা, Event Listener, Middleware রেজিস্টার করা।
* **মেথড:** `register()` (কন্টেইনারে বাইন্ড করার জন্য) এবং `boot()` (সব সার্ভিস লোড হওয়ার পর চালানোর জন্য)।

---

### Q21: Facade Pattern কি এবং লারাভেলে Facades কীভাবে কাজ করে?
**উত্তরাংশ:**
* **Facade Pattern:** জটিল কোনো সাবসিস্টেমের মেথডগুলোকে একটি সহজ ও সংক্ষিপ্ত স্ট্যাটিক ইন্টারফেসের মাধ্যমে কল করার প্যাটার্ন।
* **লারাভেলে Facades:** `Cache::get()`, `DB::table()` ইত্যাদি লারাভেল ফাসাদ ব্যবহার করে। ব্যাকএন্ডে PHP magic method `__callStatic()` এর মাধ্যমে Service Container থেকে আসল অবজেক্ট ইন্স্ট্যান্স ডাইনামিকালি সংগৃহীত হয়।

---

### Q22: Service Container ও IoC Principle কি?
**উত্তরাংশ:**
* **Service Container:** লারাভেলের এমন একটি ক্লাস যা ডিপেনডেন্সি ইনজেকশন এবং ক্লাসের অবজেক্ট ইনস্টিট্যানশিয়েশন ও লাইফসাইকেল পরিচালনা করে।
* **IoC (Inversion of Control) Principle:** ডিপেনডেন্সি অবজেক্ট ম্যানুয়ালি না বানিয়ে, ফ্রেমওয়ার্ক বা কন্টেইনারকে অবজেক্ট তৈরির দায়িত্ব অর্পণ করা।

---

### Q23: Dependency Injection (DI) কি?
**উত্তরাংশ:**
কোনো ক্লাসের প্রয়োজনীয় নির্ভরতা (Dependencies) ক্লাসের ভেতরে `new` কিওয়ার্ড দিয়ে তৈরি না করে, বাইরে থেকে (Constructor বা Method এর মাধ্যমে) ইনজেক্ট করাই হলো Dependency Injection।

---

### Q24: Service Container কীভাবে Dependency Resolve করে?
**উত্তরাংশ:**
Service Container ব্যাকএন্ডে **PHP Reflection API** ব্যবহার করে মেথড বা কনস্ট্রাক্টরের টাইপ-হিন্টেড ক্লাসগুলো রিড করে এবং `make()` বা `resolve()` মেথডের মাধ্যমে উপযুক্ত ইন্স্ট্যান্স তৈরি করে ইনজেক্ট করে।

---

### Q25: Laravel এ Service Layer নিয়ে কীভাবে কাজ করতে হয়?
**উত্তরাংশ:**
বিজনেস লজিক কন্ট্রোলার থেকে আলাদা করতে `app/Services` ডিরেক্টরিতে Custom Service Class তৈরি করা হয়। সার্ভিস ক্লাসটিকে `AppServiceProvider`-এ bind করে বা টাইপ-হিন্ট করে কন্ট্রোলারে Inject করে ব্যবহার করা হয়।

---

### Q26: Laravel Middleware কি?
**উত্তরাংশ:**
Middleware হলো HTTP Request ও Controller Action-এর মাঝে অবস্থানকারী একটি ফিল্টার বা ব্রিজ। এটি রিকোয়েস্ট ফিল্টার (যেমন: Authenticated কিনা, CSRF চেক) করে বা রেসপন্স মডিফাই করে।

---

### Q27: Laravel Request Lifecycle (Laravel 11 সহ)
**উত্তরাংশ:**
```mermaid
graph TD
    Request([Browser Request]) --> Entry[public/index.php]
    Entry --> Bootstrap[bootstrap/app.php Minimal Bootstrap]
    Bootstrap --> ServiceProviders[Load Service Providers & Config]
    ServiceProviders --> Routing[Route Matching & Middleware Pipeline]
    Routing --> Controller[Controller Action / Closure]
    Controller --> Response[Generate & Send HTTP Response]
```
* **Laravel 11 বৈশিষ্ট্য:** `app/Http/Kernel.php` বাদ দেওয়া হয়েছে; মিডলওয়্যার ও রাউটিং সেটআপ সরাসরি `bootstrap/app.php`-এ কনফিগার করা থাকে।

---

### Q28: Laravel Context Switching কি?
**উত্তরাংশ:**
কোড এক্সিকিউশনের সময় এক এভায়রনমেন্ট/স্কোপ থেকে অন্য স্কোপে সুইচ করা। যেমন:
1. HTTP Lifecycle থেকে Queue Worker-এ Context Switch.
2. Synchronous execution থেকে Laravel Octane / Swoole Coroutine Async Context Switch.

---

### Q29: Micro-frameworks কি?
**উত্তরাংশ:**
মাইক্রো-ফ্রেমওয়ার্ক (যেমন: Lumen, Slim) হলো ফুল-স্ট্যাক ফ্রেমওয়ার্কের হালকা সংস্করণ, যাতে কেবল মৌলিক রাউটিং ও ডিকপলিং ফিচার থাকে। এটি হাই-পারফরম্যান্স API বা মাইক্রোসার্ভিসের জন্য উপযুক্ত।

---

### Q30: Reverse Routing কি?
**উত্তরাংশ:**
URL-এর ওপর ভিত্তি করে রাউট না ডেকে, রাউটের দেওয়া **Name** ব্যবহার করে ডাইনামিকালি URL তৈরি করার প্রক্রিয়াকে Reverse Routing বলে। 
```php
// Route Definition
Route::get('/user/profile', [ProfileController::class, 'show'])->name('profile');

// Reverse Routing Helper
$url = route('profile');
```

---

### Q31: Custom Artisan Command কীভাবে বানাতে হয়?
**উত্তরাংশ:**
1. `php artisan make:command SendMonthlyReport`
2. `app/Console/Commands/SendMonthlyReport.php` ফাইলে `$signature` ও `handle()` মেথড কাস্টমাইজ করে লেখা হয়।

---

### Q32: CSRF Token এর কাজ কি?
**উত্তরাংশ:**
* **CSRF (Cross-Site Request Forgery):** অননুমোদিত ওয়েবসাইট থেকে ব্যবহারকারীর অজান্তে ফর্ম সাবমিশন রোধ করা।
* **POST Request-এ CSRF না দিলে:** 419 Page Expired Error আসবে।
* **API-তে Handling:** `routes/api.php` বা Bearer Token (Sanctum/Passport) ব্যবহার করলে CSRF চেক প্রযোজ্য হয় না।

---

### Q33: Laravel 11 এর নতুন ফিচারসমূহ কি কি?
**উত্তরাংশ:**
1. **Simplified Skeleton:** `app/Http/Kernel.php` এবং `app/Http/Middleware/` ফোল্ডার রিমুভড।
2. **Laravel Reverb:** হাই-স্পিড নেটিভ ওয়েবসকেট সার্ভিস।
3. **`bootstrap/app.php` Config:** মিডলওয়্যার ও এক্সেপশন কনফিগারেশন এক ফাইলেই।
4. **Model Casts Method:** `$casts` প্রপার্টির বদলে `casts()` মেথড।
5. **`once()` Memoization Helper:** ফাংশন যাতে মাত্র একবার কল হয় তা নিশ্চিত করে।
6. **`/up` Health Check Route:** অ্যাপ্লিকেশন আপ টাইম মনিটরিংয়ের জন্য বিল্ট-ইন রাউট।

---

### Q34: Laravel 12 এর উল্লেখযোগ্য ফিচারসমূহ
**উত্তরাংশ:**
1. **Asynchronous Caching & Query Optimization:** ব্যাকগ্রাউন্ড ক্যাশ অপারেশন।
2. **New Starter Kits:** Shadcn UI ও WorkOS (SSO/Passkeys) ইন্টিগ্রেশন সহ React/Vue কিটস।
3. **`nestedWhere()` & `withFiltered()`:** Eloquent ORM-এ ফিল্টারিং সহজ করার মেথড।
4. **Carbon 3.x Support:** কার্বন ভার্সন আপডেট।

---

### Q35: Repository Pattern কীভাবে লারাভেলে ব্যবহার করা হয়?
**উত্তরাংশ:**
Data Access Logic (Eloquent Query) কে Controller থেকে বিচ্ছিন্ন করতে:
1. `UserRepositoryInterface` ইন্টারফেস তৈরি।
2. `UserRepository` ক্লাসে ইন্টারফেস ইমপ্লিমেন্ট করা।
3. `RepositoryServiceProvider`-এ `$this->app->bind(UserRepositoryInterface::class, UserRepository::class)` রেজিস্টার করা।
4. Controller-এর Constructor-এ Interface টাইপ-হিন্ট করা।

---

## ৩. ইলোকুয়েন্ট, ডাটাবেজ ও পারফরম্যান্স (Eloquent, Database & Query Optimization)

### Q36: Eloquent ORM কি?
**উত্তরাংশ:**
Eloquent হলো Laravel-এর বিল্ট-ইন Object-Relational Mapper (ORM) যা **Active Record Pattern** অনুসরণ করে। এটি ডাটাবেজ টেবিলকে PHP Model Class-এ রূপান্তর করে অবজেক্ট আকারে কোয়েরি চালাতে সাহায্য করে।

---

### Q37: Eloquent Polymorphic Relationships কি?
**উত্তরাংশ:**
একটি মডেল একটি মাত্র রিলেশনশিপ ইন্টারফেস ব্যবহার করে একাধিক অন্যান্য মডেলের সাথে সম্পর্কিত হতে পারা। 
* **উদাহরণ:** `Comment` মডেল একই সাথে `Post` এবং `Video` উভয় মডেলের কমেন্ট ধারণ করতে পারে।
* **পাইভট কলাম:** `commentable_id` এবং `commentable_type`.

---

### Q38: Accessors & Mutators কি?
**উত্তরাংশ:**
* **Accessor:** ডাটাবেজ থেকে ডাটা নিয়ে আসার সময় ডাইনামিকালি ফরম্যাট বা চেঞ্জ করা। (`Attribute::make(get: fn ($value) => ucfirst($value))`)
* **Mutator:** ডাটাবেজে সেভ করার পূর্বে ডাটা মডিফাই করা (যেমন: পাসওয়ার্ড হ্যাশ করা)। (`Attribute::make(set: fn ($value) => bcrypt($value))`)

---

### Q39: Custom Query Builder কীভাবে তৈরি করা যায়?
**উত্তরাংশ:**
`Illuminate\Database\Eloquent\Builder`-কে এক্সটেন্ড করে কাস্টম মেথডসহ Builder Class তৈরি করতে হয় এবং মডেলে `newEloquentBuilder($query)` মেথডটি ওভাররাইড করে রিটার্ন করতে হয়।

---

### Q40: Lazy Loading বনাম Eager Loading (N+1 Problem)
**উত্তরাংশ:**
* **Lazy Loading:** প্রয়োজন হওয়ার মুহূর্তে আলাদা অতিরিক্ত SQL Query চালিয়ে রিলেশন ডাটা নিয়ে আসা। এতে N+1 সমস্যা তৈরি হয় (১টি মূল কুয়েরি + N টি রিলেটেড কুয়েরি)।
* **Eager Loading:** `Post::with('comments')->get()` এর মাধ্যমে আগেই `IN (...)` কুয়েরি চালিয়ে মাত্র ২টি কুয়েরিতে ডাটা নিয়ে আসা।

---

### Q41: Pivot Table Indexing কীভাবে করতে হয়?
**উত্তরাংশ:**
Many-to-Many রিলেশনে duplicate entry ব্লক করতে এবং সার্চ পারফরম্যান্স বাড়াতে Pivot Table-এ **Composite Unique Index** ব্যবহার করতে হয়:
```php
$table->unique(['student_id', 'course_id']);
```

---

### Q42: SQL Injection কি এবং কীভাবে প্রতিরোধ করা যায়?
**উত্তরাংশ:**
* **SQL Injection:** হ্যাকার কর্তৃক ইনপুট ফিল্ডে ক্ষতিকর SQL কোড ইনজেক্ট করে ডাটাবেজ বাইপাস বা ধ্বংস করা।
* **প্রতিরোধ:** PDO Parameter Binding / Prepared Statements ব্যবহার করা (Laravel Eloquent এবং Query Builder এটি ডিফল্টভাবে সুরক্ষিত রাখে)।

---

### Q43: Database Indexing এবং এর Data Structures কি কি?
**উত্তরাংশ:**
* **Indexing:** ডাটাবেজ টেবিল থেকে তথ্য খোঁজার গতি বাড়াতে তৈরি করা বিশেষ ডাটা স্ট্রাকচার (বইয়ের সূচিপত্রর মতো)।
* **Data Structures:**
  1. **B-Tree (Balanced Tree):** Default, Range Query & Sorting-এর জন্য সেরা ($O(\log n)$)।
  2. **Hash Table:** Exact Match ($=$) এর জন্য দ্রুততম ($O(1)$)। Range query কাজ করে না।
  3. **Bitmap Index:** Low cardinality (যেমন: Male/Female) ফিল্ডের জন্য সেরা।
  4. **R-Tree (Rectangle Tree):** Spatial / Location (Coordinates) ডাটার জন্য ব্যবহৃত হয়।

---

### Q44: Column-এ কি কি ধরনের Index apply করা যায়?
**উত্তরাংশ:**
1. **PRIMARY KEY:** Unique + NOT NULL.
2. **UNIQUE INDEX:** Unique values, NULL allowed.
3. **INDEX (B-Tree):** Non-unique default index.
4. **FULLTEXT INDEX:** Text search (`MATCH...AGAINST`).
5. **SPATIAL INDEX (R-Tree):** GIS / Coordinates Data.

---

### Q45: SPATIAL INDEX (R-Tree) কীভাবে কাজ করে?
**উত্তরাংশ:**
Spatial Data Types (`POINT`, `POLYGON`) এর ওপর Minimum Bounding Rectangle (MBR) গঠন করে R-Tree ইন্ডেক্স কাজ করে। এটি নির্দিষ্ট লোকেশন বা ভৌগোলিক সীমানার ভেতরের পয়েন্টগুলো দ্রুত খুঁজতে ব্যবহৃত হয় (`MBRContains()`).

---

### Q46: Primary Key এবং Unique Index-এর পার্থক্য কি?
**উত্তরাংশ:**
Primary Key টেবিলে একটিই হতে পারে এবং এতে কোনো `NULL` ভ্যালু গ্রহণ করে না। Unique Index টেবিলে একাধিক কলামে থাকতে পারে এবং এটি `NULL` মান এলাউ করতে পারে।

---

### Q47: LEFT JOIN বনাম LEFT OUTER JOIN এবং JOIN বনাম INNER JOIN
**উত্তরাংশ:**
* `LEFT JOIN` এবং `LEFT OUTER JOIN`-এর মধ্যে কাজের দিক থেকে **কোনো পার্থক্য নেই** (উভয়ই সমান)।
* `JOIN` এবং `INNER JOIN`-এর মধ্যেও পার্থক্য নেই, কারণ টাইপ না লিখলে SQL ডিফল্টভাবে `INNER JOIN` করে।

---

### Q48: MySQL বনাম PostgreSQL
**উত্তরাংশ:**
| বিষয় | MySQL | PostgreSQL |
| :--- | :--- | :--- |
| **পারফরম্যান্স** | Read-Heavy ওয়েবের জন্য দ্রুত। | Write-Heavy & Complex Analytical Queries. |
| **JSON Support** | সাধারণ JSON সাপোর্ট। | শক্তিশালী JSONB (Binary Indexed) সাপোর্ট। |
| **ACID & MVCC** | InnoDB ইঞ্জিনে সাপোর্টেড। | ডিফল্টভাবে অত্যন্ত কড়া ACID & Advanced MVCC। |

---

### Q49: MySQL-এ দ্বিতীয় সর্বোচ্চ (2nd Highest) মান নির্বাচন করার কুয়েরি
**উত্তরাংশ:**
```sql
SELECT DISTINCT score 
FROM scores 
ORDER BY score DESC 
LIMIT 1 OFFSET 1;
```

---

### Q50: UNION বনাম UNION ALL
**উত্তরাংশ:**
* **UNION:** একাধিক SELECT রেজাল্ট মার্জ করে এবং Duplicate সারি রিমুভ করে (তুলনামূলক স্লো)।
* **UNION ALL:** Duplicate সহ সব সারি দ্রুত মার্জ করে দেয়।

---

### Q51: WHERE বনাম HAVING
**উত্তরাংশ:**
* **WHERE:** `GROUP BY` করার পূর্বে সরাসরি টেবিল রোর ওপর ফিল্টার করে।
* **HAVING:** `GROUP BY` করার পর Aggregated রেজাল্টের ওপর (যেমন: `COUNT()`, `SUM()`) ফিল্টার করে।

---

### Q52: ACID Compliance এবং Concurrency Handling (টিকিট বুকিং সমাধান)
**উত্তরাংশ:**
* **ACID:** **Atomicity** (সব হবে নয়তো কিছুই না), **Consistency** (নিয়ম ঠিক থাকবে), **Isolation** (একে অপরের ওপর প্রভাব ফেলবে না), **Durability** (সেভ হওয়া ডাটা হারাবে না)।
* **১০,০০০ জন একসাথে টিকিট বুক করতে চাইলে সমাধান:**
  1. **Database Constraint:** `UNIQUE(seat_id, show_id)` ইন্ডেক্স ডিফাইন করা।
  2. **DB Transaction + Row Locking (`lockForUpdate()`):**
     ```php
     DB::transaction(function () use ($seatId) {
         $seat = Seat::where('id', $seatId)->lockForUpdate()->first();
         if ($seat->is_booked) throw new Exception('Booked!');
         $seat->update(['is_booked' => true]);
     });
     ```
  3. **Queue / Redis Locks:** ব্যাকগ্রাউন্ড জব বা রেনলক দিয়ে ক্রমানুসারে (Sequential) প্রসেস করা।

---

### Q53: Flight Reservation System Database Schema
**উত্তরাংশ:**
* `customers` (id, name, email, phone)
* `routes` (id, from_city, to_city)
* `flights` (id, flight_number, route_id, total_seats)
* `fares` (id, flight_id, price, coupon_code)
* `seats` (id, flight_id, seat_number, seat_class)
* `bookings` (id, customer_id, flight_id, seat_id, booking_time)

---

## ৪. ক্যাশিং, কিউ, মেইল ও ব্যাকগ্রাউন্ড প্রসেসিং (Cache, Queue, Mail & Workers)

### Q54: লারাভেলে ব্যাকগ্রাউন্ড প্রসেস চালানোর উপায়সমূহ
**উত্তরাংশ:**
1. **Queues & Jobs:** `php artisan queue:work` দিয়ে ভারী বা বিলম্বিত কাজ চালানো।
2. **Event & Listeners (Queued):** Listener ক্লাসে `ShouldQueue` যুক্ত করা।
3. **Task Scheduler:** `php artisan schedule:run` (Cron Job-এর মাধ্যমে)।
4. **CLI Background Execution:** `php artisan my:command &` (Shell execution).

---

### Q55: লারাভেলে প্রতি মিনিটে ২০,০০০ কিউ (Jobs) হ্যান্ডেল করার আর্কিটেকচার
**উত্তরাংশ:**
* **Capacity Calculation:** ২০,০০০ কিউ/মিনিট $\approx$ ৩ ৩৩ জব/সেকেন্ড।
* **আর্কিটেকচারাল সমাধান:**
  1. **Broker:** Redis Cluster বা AWS SQS ব্যবহার করা।
  2. **Laravel Horizon:** Multi-supervisor auto-scaling মোড অন করা।
  3. **Worker Farm:** একাধিক কন্টেইনার/ভিএম-এ OPcache CLI সহ সমান্তরাল 워কার প্রসেস চালনা।
  4. **Database Pooling:** PgBouncer বা MySQL Proxy দিয়ে কানেকশন লিমিট হ্যান্ডেল করা।
  5. **Bulk Processing / Batching:** `Bus::batch()` ব্যবহার করা।

---

### Q56: ফাইল আপলোড প্রসেসিং (Event & Queue)
**উত্তরাংশ:**
ইউজার বড় ফাইল (যেমন: 500MB Video) আপলোড করলে তাৎক্ষণিক রেসপন্স দিতে ফাইল স্টোর করে একটি `FileUploaded` Event ফায়ার করতে হয় এবং ব্যাকগ্রাউন্ডে `ProcessUploadedFile` Queued Listener-এর মাধ্যমে প্রসেসিং নিশ্চিত করতে হয়।

---

### Q57: Mail भेजने জন্য .env কনফিগারেশন
**উত্তরাংশ:**
```ini
MAIL_MAILER=smtp
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

---

## ৫. ওয়েব সিকিউরিটি, এপিআই, ডিভঅপ্স ও আর্কিটেকচার (Security, APIs, DevOps & Architecture)

### Q58: HTTP Request, Response & Status Codes
**উত্তরাংশ:**
* **200 OK:** রিকোয়েস্ট সফল।
* **400 Bad Request:** ক্লায়েন্টের ইনপুট/রিকোয়েস্ট ভুল।
* **401 Unauthorized:** অপশন অ্যাক্সেস করতে প্রমাণীকরণ (Authentication) প্রয়োজন।
* **403 Forbidden:** প্রমাণীকরণ হলেও অ্যাক্সেসের অনুমতি (Authorization) নেই।
* **503 Service Unavailable:** সার্ভার ডাউন বা মেইনটেইন্যান্স চলছে।

---

### Q59: ব্রাউজারে URL লিখে এন্টার দিলে ব্যাকএন্ডে কি ঘটে?
**উত্তরাংশ:**
1. **DNS Resolution:** ডোমেন (example.com) থেকে IP ঠিকানা বের করা।
2. **TCP/TLS Handshake:** সার্ভারের সাথে সুরক্ষিত সংযোগ স্থাপন।
3. **HTTP Request Send:** ব্রাউজার কর্তৃক GET রিকোয়েস্ট প্রেরণ।
4. **Server Processing:** Nginx/Apache রিকোয়েস্ট গ্রহণ করে Laravel Index.php বা কন্ট্রোলারে পাঠায়।
5. **HTTP Response & Rendering:** 200 OK HTML/JSON ব্যাক এসে ব্রাউজার DOM রেন্ডার করে।

---

### Q60: REST API বনাম RESTful API
**উত্তরাংশ:**
* **REST API:** REST Architectural Principles মোটামুটি মেনে তৈরি করা সাধারণ API।
* **RESTful API:** REST-এর সমস্ত কড়া নিয়মাবলি (Statelessness, Uniform Interface, HTTP Verbs correct mapping, Cacheability, Layered System) শতভাগ মেনে নির্মিত API।

---

### Q61: Authentication: Sanctum vs Passport vs OAuth2
**উত্তরাংশ:**
* **Sanctum:** SPA, Mobile App এবং সাধারণ API Token তৈরি করার হালকা ও সহজ প্যাকেজ (OAuth2 নয়)।
* **Passport:** লারাভেলের জন্য পূর্ণাঙ্গ **OAuth2 Server** বাস্তবায়ন (Third-party integration ও complex auth flows-এর জন্য)।

---

### Q62: SDLC এবং Senior Dev SOP Hidden Tasks
**উত্তরাংশ:**
* **SDLC Stages:** Planning $\rightarrow$ Requirements $\rightarrow$ Design $\rightarrow$ Implementation $\rightarrow$ Testing $\rightarrow$ Deployment $\rightarrow$ Maintenance.
* **Senior Dev Hidden Tasks:** 
  1. Security Audits & Rate Limiting.
  2. Backup & Disaster Recovery Strategies.
  3. Database Indexing & Slow Query Monitoring.
  4. CI/CD Pipelines & Automated Testing.
  5. Logging, APM Tools (Sentry/Datadog) & Infrastructure Scalability.

---

### Q63: Docker Containers Management Commands
**উত্তরাংশ:**
* বন্ধ কন্টেইনার দেখা: `docker ps -a`
* নির্দিষ্ট বন্ধ কন্টেইনার চালু করা: `docker start container_id`
* বন্ধ থাকা সব কন্টেইনার একসাথে চালু করা: `docker start $(docker ps -a -q -f "status=exited")`

---

### Q64: WebRTC (Web Real-Time Communication) কি?
**উত্তরাংশ:**
WebRTC হলো কোনো এক্সটার্নাল প্লাগইন ছাড়াই ব্রাউজার টু ব্রাউজার (Peer-to-Peer) সরাসরি রিয়েল-টাইম অডিও, ভিডিও এবং ডাটা শেয়ার করার একটি ওপেন-সোর্স প্রযুক্তি। 
* **মূল উপাদান:** Signaling (via WebSockets), STUN/TURN Servers (NAT Traversal), SDP Exchange & RTCDataChannel.

---

## ৬. ফ্রন্টএন্ড ও ভিউ-জেএস (Frontend & Vue.js)

### Q65: Laravel Lifecycle বনাম Vue.js Lifecycle
**উত্তরাংশ:**
* **Laravel Lifecycle:** সার্ভার সাইডে HTTP Request গ্রহণ থেকে Response তৈরি পর্যন্ত চলা ধাপসমূহ।
* **Vue.js Lifecycle:** ক্লায়েন্ট সাইডে ব্রাউজারে একটি Component এর জন্ম থেকে মৃত্যু পর্যন্ত চলা ধাপসমূহ (`beforeCreate`, `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`)।

---

### Q66: Vue.js-এ এক পেজ থেকে অন্য পেজে ডাটা পাস করার উপায়সমূহ
**উত্তরাংশ:**
1. **Props & Events** (Parent-Child Component-এর ক্ষেত্রে)।
2. **Vue Router Params / Query Parameters:** (`router.push({ name: 'user', params: { id: 1 } })`)
3. **State Management:** Pinia বা Vuex Store ব্যবহার করে।

---

### Q67: Vue.js দিয়ে কীভাবে SEO করা যায়?
**উত্তরাংশ:**
1. **Server-Side Rendering (SSR):** Nuxt.js ব্যবহার করে।
2. **Static Site Generation (SSG):** বিল্ড টাইমে HTML প্রি-রেন্ডার করে।
3. **Dynamic Meta Tags:** `@unhead/vue` বা Vue Meta দিয়ে হেড ট্যাগ টিউন করে।

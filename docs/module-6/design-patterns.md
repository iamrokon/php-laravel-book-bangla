# Module 6: Software Design Patterns

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সফটওয়্যার ডিজাইন প্যাটার্ন (Design Patterns) কি এবং বিভিন্ন প্রকার ডিজাইন প্যাটার্ন উদাহরণসহ ব্যাখ্যা কর

সফটওয়্যার ইঞ্জিনিয়ারিংয়ে কমন কিছু সমস্যার প্রমাণিত সমাধানকে বলা হয় **Design Pattern**। এটি কোনো রেডিমেড কোড নয়, বরং একটি আইডিয়া বা গাইডলাইন যা ব্যবহার করে আমরা কোড স্ট্রাকচার উন্নত করতে পারি।

ডিজাইন প্যাটার্নকে মূলত ৩টি ভাগে ভাগ করা যায়:
১. **Creational Pattern:** অবজেক্ট কিভাবে তৈরি হবে তা নিয়ে কাজ করে।
২. **Structural Pattern:** ভিন্ন ভিন্ন অবজেক্ট নিয়ে কিভাবে বড় বা কমপ্লেক্স অবজেক্ট তৈরি করা যায় তা নিয়ে আলোচনা করে।
৩. **Behavioral Pattern:** অবজেক্টগুলো কিভাবে একে অপরের সাথে কমিউনিকেট করবে তা নিয়ে কাজ করে।

---

## ১. Creational Patterns

### Singleton Pattern
এক্ষেত্রে কোনো ক্লাসের মাল্টিপল অবজেক্ট বা ইন্সট্যান্স তৈরি করতে দেওয়া হয় না। পুরো অ্যাপ্লিকেশনে ঐ ক্লাসের একটি মাত্র অবজেক্টই থাকে। যেমন: ডাটাবেজ কানেকশন।

```php
class Database {
    private static $instance = null;

    // কনস্ট্রাক্টর প্রাইভেট করে দিলে বাইরে থেকে new Database() করা যাবে না
    private function __construct() {}

    public static function getInstance() {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
}

$db = Database::getInstance();
$db2 = Database::getInstance(); // আগের অবজেক্টটাই রিটার্ন করবে
```

### Factory Patterns
ফ্যাক্টরি প্যাটার্ন অবজেক্ট তৈরির জটিল লজিকগুলোকে ক্লায়েন্ট কোড থেকে আলাদা করে ফেলে।

#### Simple Factory:
জটিল ইফ-এলস (if-else) কন্ডিশন ব্যবহার করে অবজেক্ট তৈরির কাজকে অন্য একটি ক্লাসে নিয়ে যাওয়া।
```php
class UserFactory {
    public static function create($type) {
        switch ($type) {
            case 'user': return new User();
            case 'admin': return new Admin();
            default: throw new Exception("Wrong user type");
        }
    }
}
```

#### Factory Method & Abstract Factory:
যখন রিলেটেড অনেকগুলো প্রোডাক্টের ফ্যামিলি (Family of related products) নিয়ে কাজ করতে হয়, তখন **Abstract Factory** ব্যবহৃত হয়। যেমন: ফার্নিচার ফ্যাক্টরি যা ভিক্টোরিয়ান বা মডার্ন স্টাইলের চেয়ার, সোফা এবং কফিটেবিল তৈরি করে।

### Builder Pattern
একটি ক্লাসে অনেকগুলো প্রোপার্টি থাকলে এবং কিছু প্রোপার্টি অপশনাল হলে কন্সট্রাক্টরের মাধ্যমে সব ডেটা পাঠানো কঠিন হয়ে যায়। এই সমস্যা সমাধানে **Builder Pattern** এবং **Method Chaining** ব্যবহৃত হয়।

```php
class Product {
    private $id;
    private $name;
    private $price;

    public function setId($id) { $this->id = $id; return $this; }
    public function setName($name) { $this->name = $name; return $this; }
    public function setPrice($price) { $this->price = $price; return $this; }
    public function save() { /* Save logic */ }
}

// ব্যবহার:
$product = new Product();
$product->setId(1)
        ->setName('iPhone 15')
        ->setPrice(999)
        ->save();
```
লারাভেলের কুয়েরি বিল্ডার (Query Builder) এভাবেই কাজ করে।

---

## ২. Structural Patterns

### Proxy Pattern
সরাসরি কোনো অবজেক্টের ওপর কাজ না করে মাঝখানে একটি **Middleman** বা প্রক্সি অবজেক্ট ব্যবহার করা। এর ফলে আমরা মূল অবজেক্টের কাজ শুরুর আগে বা পরে এক্সট্রা লজিক (যেমন: লগিং, সিকিউরিটি চেক) যোগ করতে পারি।

### Facade Pattern
অনেকগুলো জটিল মেথড বা সাব-সিস্টেমকে একটি সিম্পল ইন্টারফেসের আন্ডারে নিয়ে আসা। লারাভেলে `Route`, `DB`, `Cache` ইত্যাদি Facade হিসেবে কাজ করে।

### Adapter Pattern
দুটি ভিন্ন ইন্টারফেসের মধ্যে সামঞ্জস্য তৈরি করা। যেমন: আপনার অ্যাপ্লিকেশন JSON ডেটা এক্সপেক্ট করে কিন্তু একটি থার্ড পার্টি এপিআই XML ডেটা পাঠাচ্ছে। মাঝখানে একটি অ্যাডাপ্টার ব্যবহার করে আপনি XML কে JSON এ কনভার্ট করে নিতে পারেন।

---

**মনে রাখবেন:** ডিজাইন প্যাটার্ন কোনো কনক্রিট সলিউশন নয়, বরং এটি একটি আইডিয়া। কোড করার সময় প্রয়োজন ছাড়া ওভার-ইঞ্জিনিয়ারিং (Simple জিনিসকে কমপ্লেক্স করা) করা যাবে না।

# Episode 1: Autoloading in PHP

> [!IMPORTANT]

> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** PHP-তে Autoloading কী এবং এটি কেন ও কীভাবে কাজ করে উদাহরণসহ লিখ।

প্রোজেক্ট বড় হওয়ার সাথে সাথে অনেকগুলো Class File আলাদাভাবে `require_once` বা `include` করা ঝামেলাপূর্ণ হয়ে পড়ে। এই সমস্যা সমাধানের জন্য PHP-তে **Autoloading** ব্যবহার করা হয়।

**Autoloading** হলো এমন একটি ব্যবস্থা, যার মাধ্যমে কোনো Class ব্যবহার করার সময় প্রয়োজনীয় Class File-টি **স্বয়ংক্রিয়ভাবে Load** করা যায়। ফলে প্রতিটি Class-এর জন্য আলাদাভাবে `require_once` লিখতে হয় না।

PHP-তে Custom Autoloader তৈরি করার জন্য `spl_autoload_register()` ব্যবহার করা যায়।

```php id="f2k7xq"
spl_autoload_register(function($className) {

    $baseDir = "app/classes/";

    require_once $baseDir . $className . ".php";

});

$car = new Car();   // Car.php অটোমেটিক Load হবে

$bike = new Bike(); // Bike.php অটোমেটিক Load হবে
```

এখানে `Car` Class ব্যবহার করার সময় Autoloader স্বয়ংক্রিয়ভাবে `app/classes/Car.php` File-টি Load করবে। একইভাবে `Bike` Class ব্যবহার করলে `Bike.php` File-টি Load হবে।

আমরা চাইলে Autoloader-এর কোডটুকু আলাদা একটি File (যেমন `autoload.php`) এ রাখতে পারি। এরপর প্রোজেক্টে শুধুমাত্র সেই File-টি একবার `require_once` করলেই প্রয়োজন অনুযায়ী Class File-গুলো স্বয়ংক্রিয়ভাবে Load হবে।

> **💡 Interview Tip:** Autoloading-এর মূল উদ্দেশ্য হলো Class File ম্যানুয়ালি বারবার Include/Require করার প্রয়োজনীয়তা দূর করা এবং বড় প্রোজেক্টের Code Organization ও Maintainability সহজ করা।

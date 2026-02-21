# Episode 1: Autoloading in PHP

প্রোজেক্ট বড় হওয়ার সাথে সাথে অনেকগুলো ক্লাস ফাইল ইনক্লুড করা কঠিন হয়ে পড়ে। `require_once` বারবার না লিখে আমরা **Autoload** ব্যবহার করতে পারি।

```php
spl_autoload_register(function($className) {
    $baseDir = "app/classes/";
    require_once $baseDir . $className . ".php";
});

$car = new Car(); // অটোমেটিক লোড হবে
$bike = new Bike();
```

আমরা চাইলে অটোলোডার কোডটুকু আলাদা একটি ফাইল (যেমন `autoload.php`) এ রেখে দিতে পারি এবং শুধুমাত্র সেই ফাইলটি ইনক্লুড করতে পারি।

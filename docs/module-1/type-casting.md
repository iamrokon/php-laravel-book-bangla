# Episode 3: Type Casting

এক টাইপের ডাটাকে অন্য টাইপে কনভার্ট করতে Type Casting ব্যবহৃত হয়।

```php
$userAge = "25";         // User input as a string
$minimumAge = 18;        // Minimum age requirement as an integer
if ((int) $userAge >= $minimumAge) {   // Type cast করা হয়েছে
    echo "Vote accepted!";
} else {
    echo "Sorry you are too young to vote";
}
```

### Boolean Casting
```php
$str = "Nahian";
var_dump((bool)$str); // bool(true)

$str1 = "0";
var_dump((bool)$str1); // bool(false)
```
ইন্টিজার `0`, `0.0`, `-0.0`, `" "`, `[]`, `null` এদেরকে টাইপ কাস্ট করে boolean এ কনভার্ট করলে `bool(false)` রিটার্ন করবে।

### Integer Casting
```php
$cart = "200 tesla cars";
var_dump((int) $cart); // int(200)

$isAdmin = false;
var_dump((int) $isAdmin); // int(0)

$floatNum = 135.70;
var_dump((int) $floatNum); // int(135)
```
`NAN` (Not a Number) এবং `Infinity` কে টাইপ কাস্ট করলে মান সব সময় `0` হবে।

কোন একটি স্ট্রিং-এর শুরুতে সংখ্যা থাকলে টাইপ কাস্ট করলে সেই সংখ্যাটিই আসবে। অন্যান্য ক্ষেত্রে তা হবে `0`।
```php
$normalString = "Hello world";
var_dump((int) $normalString); // int(0)

$stringWithNumber = "50 shades of PHP";
var_dump((int) $stringWithNumber); // int(50)
```

### Float Casting
```php
$price = 100;
var_dump((float) $price); // float(100)
```
`float`-এর পরিবর্তে `double` বা `real` ব্যবহার করা যায়। এছাড়া `floatval()`, `intval()`, `boolval()` ফাংশনগুলোও ব্যবহার করা যায়।

### String Casting
```php
$stock = 200;
var_dump((string) $stock); // string(3) "200"

$stock = true;
var_dump((string) $stock); // string(1) "1"

$stock = false;
var_dump((string) $stock); // string(0) ""
```

### Array/Object Casting
```php
$fruit = "apple";
var_dump((array) $fruit); // array(1) { [0]=> string(5) "apple" }

// Converting Array to Object
$arr = (object) ["fruit" => "apple", "vegetable" => "potato"];
var_dump($arr->fruit); // string(5) "apple"
```

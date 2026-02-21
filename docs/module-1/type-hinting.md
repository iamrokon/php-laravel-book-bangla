# Episode 2: Type Hinting

পিএইচপিতে অটোমেটিক টাইপ কনভার্সন বা Type Juggling এর সুবিধা রয়েছে।

```php
$age = "19";
echo var_dump($age + 10); // Output: int(29)
```
যদিও `$age` একটি string, পিএইচপি অপারেশনটি করার সময় একে int-এ কনভার্ট করে নেবে।

### Function Type Hinting
আমরা চাইলে ফাংশনের আর্গুমেন্টে টাইপ বলে দিতে পারি।

```php
function calcAge(int $birthYear, string $name) {
    echo "Hey, $name, you are " . (2025 - $birthYear) . " years old";
}

calcAge("1990", "Alan");
// Output: Hey Alan, you are 35 years old
```

### Strict Types
যদি আমরা চাই যে ফাংশনটিতে অবশ্যই সঠিক টাইপের ভ্যালু পাঠাতে হবে, তবে ফাইলের শুরুতে `declare(strict_types=1);` ডিক্লেয়ার করব।

```php
declare(strict_types=1);

function calcAge(int $birthYear, string $name) {
    echo "Hey $name, you are " . (2025 - $birthYear) . " years old";
}

calcAge("1990", "Alan"); 
// Fatal error: Uncaught TypeError: calcAge(): Argument #1 must be of type int, string given
```

এই এরর দূর করতে ফাংশনটি এভাবে কল করতে হবে:
```php
calcAge(1990, "Alan");
```

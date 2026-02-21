# Episode 1: Data Types

পিএইচপি একটি ডাইনামিক্যালি টাইপড ল্যাঙ্গুয়েজ। অর্থাৎ কোন ভেরিয়েবলে ডাটা স্টোর করতে গেলে আমাদের বলে দিতে হবে না সেটি কোন টাইপের। পিএইচপি নিজেই তা ডিটারমাইন করবে। পিএইচপিতে কয়েক ধরনের ডাটাটাইপ রয়েছে। যেমনঃ

- Integer
- Float
- String
- Boolean
- Array
- Null
- Object

### Integer (পূর্ণসংখ্যা)
যেমন: 10, 2, -30, 0
```php
echo gettype(10); // Output: integer
echo var_dump(10); // int(10)
echo 10 + 20; // 30
```

### Float (ভগ্নাংশ)
যেমন: 2.50, -10.40, -0.50
```php
echo 2.50 + 3.50; // 6
echo var_dump(2.50 + 3.50); // float(6)
```

### String (অক্ষরের সারি/ধারা)
প্রোগ্রামিংয়ের ভাষায় সিঙ্গেল কোট (`''`) বা ডাবল কোটের (`""`) মধ্যে যা আবদ্ধ থাকে তাই String।
```php
echo "Hello World"; // Hello world
echo "10+10"; // 10+10 (২০ হবে না)
```

### Boolean (এটি true/false কে রিপ্রেজেন্ট করে)
```php
echo gettype(false); // boolean
```

### Array (একসাথে অনেকগুলো ডাটা স্টোর করে)
অ্যারের মধ্যে একই সাথে বিভিন্ন টাইপের ডাটা রাখা যায়। যেমন: `array(10, "Hello", false);`
অ্যারে স্টোর করার দুটো সিনট্যাক্স রয়েছে: `array()` এবং `[]`।
```php
var_dump([10, "Hello", false]);
```
অ্যারেকে সরাসরি `echo` করা যায় না। এজন্য `var_dump()` বা `print_r()` ব্যবহৃত হয়।

### Null (ফাঁকা বা Blank)
```php
var_dump(null); // NULL
var_dump(""); // string(0) "" (এটি NULL নয়)
```

### Object
ক্লাসের instance কে অবজেক্ট বলে। ক্লাস হলো অবজেক্ট তৈরির মৌলিক কাঠামো বা blueprint।
```php
class Animal {
    //
}
echo var_dump(new Animal()); // object(Animal)#1 (0) {}
```

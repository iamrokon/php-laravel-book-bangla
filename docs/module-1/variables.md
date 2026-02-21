# Episode 4: Intro to Variables

পিএইচপিতে ডাটা স্টোর করা বা ম্যানিপুলেট করতে ভেরিয়েবল ব্যবহৃত হয়। ভেরিয়েবল অনেকটা কন্টেইনারের মতো।

```php
$name = "Alan";
echo $name;

$name = true; // Output: 1
echo $name;
```

### ভেরিয়েবল নামিয়ে রাখার নিয়ম:
1. ভেরিয়েবল নাম সংখ্যা দিয়ে শুরু হবে না (যেমন: `$123` ভুল)।
2. লেটার বা আন্ডারস্কোর (`_`) দিয়ে শুরু হবে।
3. রিজার্ভ কিওয়ার্ডগুলো (যেমন: `$echo`, `$print_r`) ব্যবহার করা যাবে না।
4. মিনিংফুল নাম ব্যবহার করা উচিত।

### Variable Scope
ভেরিয়েবল স্কোপ তিন প্রকার: `local`, `global` ও `static`।

```php
$username = "alnahian2003"; // Global variable

function sayHi() {
    global $username; // Use global keyword inside function
    echo $username;
}

sayHi(); // alnahian2003
```

লোকাল ভেরিয়েবলকে শুধুমাত্র ওই ফাংশনের ভেতর থেকেই কল করা যায়।
```php
function testScope() {
    $name = "Alan"; // local variable
    echo $name;
}
```

### ভেরিয়েবল ইন্টারপোলেশন (Variable Interpolation)
ডাবল কোটেশনের মধ্যে সরাসরি ভেরিয়েবল ব্যবহার করা যায়।

```php
$username = "alnahian2003";
echo "Hello, my name is Alan, and here's my username: {$username}";
```

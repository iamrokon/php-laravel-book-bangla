# Episode 7: Intro to Functions

ফাংশন ব্যবহার করলে কোডের **Encapsulation** নিশ্চিত হয় এবং কোড রিইউজেবল হয়। Encapsulation হলো ইমপ্লিমেন্টেশন ডিটেইল হাইড করে রাখা।

```php
function shout() {
    return "Hello World";
}

echo shout();
```

### Parameters & Arguments
ফাংশনে বাইরে থেকে ডাটা পাঠাতে পারি প্যারামিটার হিসেবে।
```php
function greet($message) { // Parameter
    echo $message;
}

greet("Hey everyone"); // Argument
```

### Default Values
আমরা চাইলে প্যারামিটারে ডিফল্ট ভ্যালু সেট করতে পারি।
```php
function shout($message, $times = 3) {
    echo str_repeat("$message<br/>", $times);
}

shout("Hey everyone!"); // ৩ বার প্রিন্ট হবে
shout("Hey everyone", 20); // ২০ বার প্রিন্ট হবে
```

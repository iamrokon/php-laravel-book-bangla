# Episode 12: Intro to Loops

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** পিএইচপি তে লুপ (Loop) কি এবং বিভিন্ন প্রকার লুপের ব্যবহার উদাহরণসহ লিখ

পিএইচপিতে চার ধরনের লুপ রয়েছে:
1. `for()`
2. `foreach()`
3. `while()`
4. `do...while()`

### for loop

`for` Loop ব্যবহার করা হয় যখন আগে থেকেই জানা থাকে লুপটি **কতবার চলবে**। এতে সাধারণত **Initialization, Condition এবং Increment/Decrement** একসাথে লেখা হয়।

```php
for ($i = 1; $i <= 5; $i++) {
    echo "Iteration: $i <br>";
}
```

### foreach loop

`foreach` Loop মূলত **Array** এবং **Traversable Object**-এর প্রতিটি এলিমেন্টের উপর একবার করে লুপ চালানোর জন্য ব্যবহৃত হয়। অ্যারের প্রতিটি ভ্যালু বা **Key-Value Pair** সহজে অ্যাকসেস করার জন্য এটি সবচেয়ে সুবিধাজনক এবং বেশি ব্যবহৃত Loop।

```php
$names = ['Laravel', 'PHP', 'Symfony'];
foreach ($names as $key => $name) {
    echo "$key - $name <br>";
}
```

### while loop
কন্ডিশন যতক্ষন সত্য থাকে ততক্ষণ লুপ চলতে থাকে।
```php
while ($userInput != $validPassword) {
    $userInput = readline("Enter password: ");
}
```

### do...while loop
প্রথমবার কাজ করার পর কন্ডিশন চেক করে। অর্থাৎ অন্তত একবার রান হবেই।
```php
do {
    $email = readline("Enter email: ");
    echo "Sent to $email \n";
    $confirmation = readline("Received? (yes/no): ");
} while ($confirmation != 'yes');
```

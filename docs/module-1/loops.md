# Episode 12: Intro to Loops

পিএইচপিতে চার ধরনের লুপ রয়েছে:
1. `for()`
2. `foreach()`
3. `while()`
4. `do...while()`

### for loop
নির্দিষ্ট সংখ্যা পর্যন্ত লুপ চালাতে ব্যবহৃত হয়।
```php
for ($i = 1; $i <= 5; $i++) {
    echo "Iteration: $i <br>";
}
```

### foreach loop
অ্যারের এলিমেন্টগুলো নিয়ে কাজ করতে এটি সবচেয়ে সুবিধাজনক।
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

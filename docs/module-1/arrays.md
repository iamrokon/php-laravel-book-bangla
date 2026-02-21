# Episode 5: Intro to Arrays

যদি আমাদের অনেকগুলো ডাটা (যেমন ২০ জন বন্ধুর নাম) স্টোর করতে হয়, তবে আলাদা আলাদা ভেরিয়েবল না লিখে আমরা অ্যারে ব্যবহার করতে পারি।

```php
$bestfriends = ["Alan", "Bruce", "Alfred"];
print_r($bestfriends);
```

পিএইচপি অ্যারেতে যেকোনো ডাটাটাইপ থাকতে পারে। অ্যারে ডিক্লেয়ার করার দুটি উপায়:
1. `$bestfriends = array();`
2. `$bestfriends = [];`

অ্যারের ইনডেক্স শুরু হয় `0` থেকে।
```php
echo $bestfriends[1]; // Bruce
```

### Associative Array
যখন অ্যারের ইনডেক্সগুলো আমরা নিজেরা সেট করে দেই বা কোনো স্ট্রিং হয়, তখন তাকে অ্যাসোসিয়েটিভ অ্যারে বলে।

```php
$person = [
    "name" => "Bruce Wayne",
    "company" => "Wayne Enterprise",
    "isHero" => true,
    "age" => null
];

echo $person["name"]; // Bruce Wayne
```

### Multi-dimensional Array
অ্যারের ভেতর অ্যারে ডিক্লেয়ার করাকে মাল্টিডাইমেনশনাল অ্যারে বলে।

```php
$person = [
    "name" => "Bruce Wayne",
    "favorites" => [
        "animal" => "Owl",
        "color" => "Black",
        "enemy" => "Joker"
    ]
];

echo $person["favorites"]["animal"]; // Owl
```

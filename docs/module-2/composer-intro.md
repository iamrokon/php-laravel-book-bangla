# Episode 2: Introduction to Composer

> [!IMPORTANT]

> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** Composer কী এবং PHP Project-এ এটি কীভাবে ব্যবহার করা হয় উদাহরণসহ লিখ।

**Composer** হলো PHP-এর একটি **Dependency Manager**। এটি PHP Project-এর প্রয়োজনীয় বিভিন্ন **Package বা Library** ইনস্টল, আপডেট এবং Manage করতে সাহায্য করে।

অন্য কোনো Developer বা Organization-এর তৈরি Package বা Library—যেমন **Faker, PHPMailer, Guzzle** ইত্যাদি—নিজে আলাদাভাবে Download ও Manage না করে Composer-এর মাধ্যমে সহজেই Project-এ ব্যবহার করা যায়।

### `composer.json`

Project-এ কোন কোন Package বা Dependency প্রয়োজন এবং সেগুলোর Version Constraint কী হবে, তা সাধারণত `composer.json` ফাইলে উল্লেখ করা হয়।

```json
{
    "require": {
        "fakerphp/faker": "^1.0"
    }
}
```

এখানে `fakerphp/faker` হলো Package-এর নাম এবং `^1.0` হলো এর Version Constraint।

### Package Install

`composer.json`-এ Dependency নির্ধারণ করার পর Terminal থেকে—

```bash
composer install
```

কমান্ডটি রান করলে Composer প্রয়োজনীয় Package-গুলো Download করে Project-এর `vendor` Directory-তে রাখে।

Composer একইসাথে `vendor/autoload.php` নামে একটি **Autoloader File** তৈরি করে, যার মাধ্যমে Installed Package-এর Class-গুলো সহজেই ব্যবহার করা যায়।

### Package ব্যবহার

Package ব্যবহার করার আগে `vendor/autoload.php` একবার Load করতে হয়।

```php
require_once "vendor/autoload.php";

$faker = Faker\Factory::create();

echo $faker->name;
```

এখানে `vendor/autoload.php` Load করার পর `Faker` Package-এর Class ব্যবহার করা যাচ্ছে। আলাদাভাবে Faker-এর প্রতিটি Class File `require` করার প্রয়োজন হচ্ছে না।

> **💡 Interview Tip:** Composer-এর প্রধান কাজ হলো PHP Project-এর **Dependencies Manage করা**। `composer.json`-এ Dependency-এর তথ্য থাকে, `composer install` সেগুলো Install করে এবং `vendor/autoload.php` Installed Package-গুলোর **Autoloading** সহজ করে।

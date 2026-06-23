# Episode 2: Introduction to Composer

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** কম্পোজার (Composer) কি এবং পিএইচপি প্রজেক্টে এটি কীভাবে ব্যবহার করা হয় উদাহরণসহ লিখ

**Composer** হলো পিএইচপির একটি ডিপেন্ডেন্সি ম্যানেজার। অন্যের বানানো কোনো প্যাকেজ বা লাইব্রেরি (যেমন Faker, PHPMailer) আমাদের প্রোজেক্টে ব্যবহার করতে কম্পোজার ব্যবহৃত হয়।

### composer.json
প্রোজেক্টে কী কী প্যাকেজ লাগবে তা `composer.json` ফাইলে থাকে।

```json
{
    "require": {
        "fakerphp/faker": "^1.0"
    }
}
```

টার্মিনালে `composer install` কমান্ড রান করলে প্যাকেজগুলো ডাউনলোড হয়ে `vendor` ডিরেক্টরিতে জমা হবে।

```php
require_once "vendor/autoload.php";
$faker = Faker\Factory::create();
echo $faker->name;
```

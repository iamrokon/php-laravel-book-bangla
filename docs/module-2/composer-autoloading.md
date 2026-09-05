# Episode 3 & 4: Autoloading with Composer

> [!IMPORTANT]

> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** Composer Autoloading কী এবং এটি কীভাবে ব্যবহার করা হয় উদাহরণসহ লিখ।

Composer-এর মাধ্যমে আমরা Project-এর **Class এবং প্রয়োজনীয় File স্বয়ংক্রিয়ভাবে Load** করতে পারি। ফলে প্রতিটি Class বা File-এর জন্য আলাদাভাবে `require` বা `require_once` লেখার প্রয়োজন হয় না।

Composer-এর Class Autoloading-এর ক্ষেত্রে **PSR-4** একটি বহুল ব্যবহৃত Standard। এর মাধ্যমে Namespace-কে নির্দিষ্ট Directory-এর সাথে Map করে দেওয়া হয়।

### PSR-4 Autoloading

`composer.json` ফাইলে আমাদের **Namespace** এবং সংশ্লিষ্ট **Directory**-র মধ্যে Mapping নির্ধারণ করতে হয়।

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
```

এখানে `App\\` Namespace-কে `app/` Directory-এর সাথে Map করা হয়েছে। অর্থাৎ `App` Namespace-এর কোনো Class ব্যবহার করলে Composer তার Namespace ও Class Name অনুসারে সংশ্লিষ্ট File খুঁজে Load করবে।

এরপর নতুন Autoload Configuration কার্যকর করার জন্য Terminal-এ নিচের Command চালাতে হয়:

```bash
composer dump-autoload
```

এরপর Project-এর মূল File-এ Composer-এর Autoloader একবার Load করলেই Class-গুলো প্রয়োজন অনুযায়ী Automatically Load হবে।

```php
require_once "vendor/autoload.php";

use App\Models\User;

$user = new User();
```

### Loading Files

শুধু Class নয়, কোনো নির্দিষ্ট PHP File—যেমন **Helper Function File**—অটোমেটিক Load করতেও Composer ব্যবহার করা যায়।

এর জন্য `composer.json`-এর `autoload`-এর মধ্যে `files` ব্যবহার করতে হয়।

```json
{
    "autoload": {
        "files": [
            "helpers/helper.php"
        ]
    }
}
```

এভাবে `helpers/helper.php` File-টি Composer Autoloader-এর মাধ্যমে Automatically Load হবে। ফলে Helper Function ব্যবহার করার আগে আলাদাভাবে `require_once` করার প্রয়োজন হবে না।

যেকোনো Autoload Configuration-এ পরিবর্তন করার পর অবশ্যই—

```bash
composer dump-autoload
```

Command চালিয়ে Autoloader নতুন করে Generate করতে হবে।

> **💡 Interview Tip:** Composer Autoloading-এর মূল উদ্দেশ্য হলো Project-এর Class ও প্রয়োজনীয় File-গুলোকে **ম্যানুয়ালি Include/Require না করে Automatically Load** করা। Class-এর জন্য **PSR-4** এবং নির্দিষ্ট PHP File-এর জন্য `autoload.files` ব্যবহার করা যায়।

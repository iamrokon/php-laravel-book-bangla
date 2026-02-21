# Episode 3 & 4: Autoloading with Composer

কম্পোজার দিয়ে আমরা খুব সহজেই ক্লাস এবং ফাইল অটোলোড করতে পারি। এটি **PSR-4** স্ট্যান্ডার্ড অনুসরণ করে।

### PSR-4 Autoloading
`composer.json` ফাইলে আমাদের নেমস্পেস এবং ডিরেক্টরি ম্যাপ করে দিতে হয়।

```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}
```

এরপর টার্মিনালে `composer dump-autoload` কমান্ড চালাতে হয়।

### Loading Files
যদি কোনো নির্দিষ্ট ফাইল (যেমন হেল্পার ফাংশন) অটোলোড করতে হয়:

```json
{
    "autoload": {
        "files": ["helpers/helper.php"]
    }
}
```
যেকোনো পরিবর্তনের পর `composer dump-autoload` করতে ভুলবেন না।

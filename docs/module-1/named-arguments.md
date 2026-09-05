# Episode 10: Function Named Arguments

> [!IMPORTANT]

> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** PHP-তে Named Arguments কী এবং এর সুবিধাগুলো উদাহরণসহ লিখ।

**Named Arguments** হলো PHP 8-এ যুক্ত হওয়া একটি গুরুত্বপূর্ণ ফিচার, যার মাধ্যমে Function Call করার সময় **Parameter-এর নাম উল্লেখ করে** Argument পাস করা যায়।

সাধারণভাবে Function-এ Argument পাঠানোর সময় Parameter-এর **Position/Order** অনুসরণ করতে হয়। কিন্তু Named Arguments ব্যবহার করলে Parameter-এর Position মনে রাখার প্রয়োজন হয় না; বরং Argument-এর নামের মাধ্যমে সঠিক Parameter-এর সাথে Value যুক্ত হয়।

এর ফলে কোড আরও **Readable, Flexible এবং Maintainable** হয়। বিশেষ করে যখন কোনো Function-এ একাধিক Parameter বা Optional Parameter থাকে, তখন Named Arguments ব্যবহার করলে কোন Value কোন Parameter-এর জন্য দেওয়া হয়েছে তা সহজেই বোঝা যায়।

```php
function calculateTotalCost(
    float $price,
    int $quantity,
    float $discount = 0
): float {

    $total = $price * $quantity;

    $total -= $discount;

    return $total;
}

// Named Arguments ব্যবহার করে কল করা
echo calculateTotalCost(
    price: 10.5,
    discount: 2.5,
    quantity: 3
);
```

এখানে `price:`, `discount:` এবং `quantity:` হলো **Named Arguments**। লক্ষ্য করলে দেখা যায়, Function-এর Parameter-এর মূল Order (`price`, `quantity`, `discount`) অনুসরণ না করেও Argument পাঠানো হয়েছে। তবুও PHP Parameter-এর নাম দেখে সঠিক Value নির্ধারণ করে।

**Named Arguments-এর প্রধান সুবিধা:**

* Parameter-এর **Position মনে রাখার প্রয়োজন হয় না**।
* কোড আরও **Readable** হয়।
* একাধিক **Optional Parameter** থাকলে নির্দিষ্ট Parameter-এ সহজেই Value পাঠানো যায়।
* Function Call-এর ক্ষেত্রে কোডের **Clarity ও Maintainability** বৃদ্ধি পায়।

> **Note:** Named Arguments ব্যবহার করলে Argument-এর **নাম (Name)** অবশ্যই Function-এর Parameter-এর নামের সাথে মিলতে হবে। এখানে Value Position অনুযায়ী নয়, **Parameter Name অনুযায়ী** ম্যাপ করা হয়।

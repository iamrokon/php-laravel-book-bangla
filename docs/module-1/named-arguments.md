# Episode 10: Function Named Arguments

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** পিএইচপি তে নেমড আর্গুমেন্ট (Named Arguments) কি এবং এর সুবিধা উদাহরণসহ লিখ

**Named Arguments** হলো PHP 8-এ যুক্ত হওয়া একটি ফিচার, যার মাধ্যমে **Parameter-এর নাম উল্লেখ করে** Argument পাস করা যায়। ফলে Parameter-এর অবস্থান (Position) মনে রাখার প্রয়োজন হয় না এবং কোড আরও **Readable** ও **Maintainable** হয়।

Named Arguments ব্যবহার করলে শুধুমাত্র প্রয়োজনীয় Parameter-এ ভ্যালু পাঠানো যায় এবং একাধিক Optional Parameter থাকলে কোড বুঝতে আরও সহজ হয়।

```php
function calculateTotalCost(float $price, int $quantity, float $discount = 0): float {
    $total = $price * $quantity;
    $total -= $discount;
    return $total;
}

// Named Arguments ব্যবহার করে কল করা
echo calculateTotalCost(price: 10.5, discount: 2.5, quantity: 3);
```
> **Note:** Named Arguments ব্যবহার করলে Parameter-এর Position পরিবর্তন হলেও কোনো সমস্যা হয় না, কারণ এখানে Parameter-এর **নাম (Name)** অনুসারে Argument ম্যাপ করা হয়, Position অনুসারে নয়।

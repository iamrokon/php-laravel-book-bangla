# Episode 10: Function Named Arguments

Named Arguments ফিচারটি পিএইচপি ৮ থেকে চালু হয়েছে। এর মাধ্যমে আমরা প্যারামিটারের পজিশন চিন্তা না করে নাম ধরে ভ্যালু পাস করতে পারি।

```php
function calculateTotalCost(float $price, int $quantity, float $discount = 0): float {
    $total = $price * $quantity;
    $total -= $discount;
    return $total;
}

// Named Arguments ব্যবহার করে কল করা
echo calculateTotalCost(price: 10.5, discount: 2.5, quantity: 3);
```
নামড আর্গুমেন্টের ক্ষেত্রে প্যারামিটারের পজিশন চেঞ্জ হলেও কোনো সমস্যা হয় না।

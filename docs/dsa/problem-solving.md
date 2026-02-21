# PHP Problem Solving and DSA

প্রবলেম সলভিং-এ সবসময় **Edge Case** চিন্তা করতে হবে। যেমন: নেগেটিভ ভ্যালু, এম্পটি অ্যারে বা জিরো।

### প্রবলেম ১: ম্যাক্সিমাম ভ্যালু বের করা
```php
function maxValue($arr) {
    if (count($arr) == 0) return "Empty array";
    $max = $arr[0];
    for ($i = 1; $i < count($arr); $i++) {
        if ($max < $arr[$i]) {
            $max = $arr[$i];
        }
    }
    return $max;
}
```

### প্রবলেম ২: সংখ্যা রিভার্স করা (Reverse Integer)
```php
function reverseInt($value) {
    $reverse = 0;
    while ($value > 0) {
        $lastDigit = $value % 10;
        $value = (int)($value / 10);
        $reverse = ($reverse * 10) + $lastDigit;
    }
    return $reverse;
}
```

### Data Structures in PHP
পিএইচপিতে অ্যারে ব্যবহার করেই অনেকগুলো অ্যাবস্ট্রাক্ট ডাটা স্ট্রাকচার ইমplement করা যায়:
- **Set:** ডুপ্লিকেট ছাড়া লিস্ট।
- **Stack:** LIFO (Last In First Out)।
- **Queue:** FIFO (First In First Out)।
- **Map:** Associative Array।

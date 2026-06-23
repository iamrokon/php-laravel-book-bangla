# CSS Position

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস পজিশন (Position) কি এবং বিভিন্ন পজিশন ভ্যালুর (যেমন Absolute, Relative, Fixed) পার্থক্য উদাহরণসহ লিখ

এলিমেন্টকে নির্দিষ্ট জায়গায় বসানোর জন্য `position` প্রোপার্টি ব্যবহৃত হয়। এর সাথে `top`, `bottom`, `left`, `right` মডিফায়ার ব্যবহার করা হয়।

### ১. Static
এটি ডিফল্ট পজিশন। এখানে কোনো `top` বা `left` কাজ করে না।

### ২. Relative
এটি তার বর্তমান পজিশনের উপর ভিত্তি করে সরে যায়।
```css
.box {
    position: relative;
    top: 20px;
    left: 50px;
}
```

### ৩. Absolute
এটি তার নিকটবর্তী **Positioned Parent** (যার পজিশন static নয়) এর উপর ভিত্তি করে সরে যায়। যদি কোনো প্যারেন্ট পজিশন করা না থাকে তবে এটি বডিকে ধরবে।
```css
.parent {
    position: relative;
}
.child {
    position: absolute;
    bottom: 0;
    right: 0;
}
```

### ৪. Fixed
এটি ব্রাউজার উইন্ডোর উপর ভিত্তি করে ফিক্সড থাকে। স্ক্রল করলেও এটি নড়ে না।
```css
.popup {
    position: fixed;
    bottom: 10px;
    right: 10px;
}
```

### ৫. Sticky
এটি রিলেটিভ পজিশનની মত আচরণ করে যতক্ষণ না ইউজার স্ক্রল করে একটি নির্দিষ্ট জায়গায় পৌঁছায়, এরপর সেটি ফিক্সড হয়ে যায়।
```css
.navbar {
    position: sticky;
    top: 0;
}
```

### ৬. সেকশন সেন্টারে নেওয়া (Absolute Centering)
```css
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* একদম মাঝখানে রাখার জন্য উত্তম পদ্ধতি */
}
```
*(ইউজারের দেওয়া টেক্সটে মার্জিন দিয়ে সেন্টারিং দেখানো হয়েছিল, কিন্তু বর্তমানে `transform` পদ্ধতি বেশি ব্যবহার হয়)*

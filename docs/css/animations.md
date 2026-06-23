# CSS Animations

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস এনিমেশন (Animations) কি এবং কীভাবে কি-ফ্রেম (@keyframes) ব্যবহার করতে হয় উদাহরণসহ লিখ

এনিমেশন ব্রাউজারে স্বয়ংক্রিয়ভাবে বা লুপ আকারে কোনো পরিবর্তন দেখানোর জন্য ব্যবহৃত হয়। এটি `transition` এর চেয়েও শক্তিশালী কারণ এতে অনেকগুলো ধাপ (Keyframes) থাকে।

### ১. এনিমেশন তৈরির নিয়ম (Keyframes)
প্রথমে একটি এনিমেশন নাম দিয়ে তার বিভিন্ন ধাপ ঠিক করতে হয়।
```css
@keyframes learning {
    0% {
        background: blue;
        transform: rotate(0deg);
    }
    50% {
        background: red;
        width: 400px;
    }
    100% {
        background: green;
        transform: rotate(360deg);
    }
}
```

### ২. এনিমেশন ব্যবহার করা
```css
.box {
    width: 100px;
    height: 100px;
    background: blue;
    animation-name: learning;
    animation-duration: 4s;
    animation-iteration-count: infinite; /* অনির্দিষ্টকাল চলবে */
    animation-delay: 2s; /* শুরু হতে দেরি হবে */
    animation-timing-function: ease-in-out;
}
```

### ৩. বিস্তারিত প্রোপার্টিসমূহ
- `animation-name`: কি ফ্রেমের নাম।
- `animation-duration`: কতক্ষণ ধরে চলবে।
- `animation-iteration-count`: কতবার হবে (সংখ্যা বা infinite)।
- `animation-direction`: কোন দিকে চলবে (normal, reverse, alternate)।

### ৪. Shorthand
```css
.box {
    /* name duration timing delay iteration-count direction */
    animation: learning 4s ease-in-out 1s infinite alternate;
}
```

### ৫. একটি বল ঘোরার উদাহরণ
```css
@keyframes rounds {
    0% { left: 0; top: 0; }
    25% { left: 300px; top: 0; }
    50% { left: 300px; top: 300px; }
    75% { left: 0; top: 300px; }
    100% { left: 0; top: 0; }
}

.ball {
    position: relative;
    animation: rounds 5s infinite;
}
```

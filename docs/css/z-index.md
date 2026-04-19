# CSS Z-index

যখন একটি এলিমেন্ট অন্য এলিমেন্টের উপর উঠে যায় (Overlapping), তখন কোনটি উপরে এবং কোনটি নিচে থাকবে তা নির্ধারণ করা হয় `z-index` দিয়ে।

### প্রয়োজনীয় শর্ত
`z-index` শুধুমাত্র পজিশন করা এলিমেন্টে (position: relative, absolute, fixed, বা sticky) কাজ করে। `position: static`-এ এটি কাজ করবে না।

### কোড উদাহরণ
```css
.box1 {
    position: absolute;
    z-index: 10;
    background: red;
}

.box2 {
    position: absolute;
    z-index: 5;
    background: blue;
}
```
এখানে `.box1` উপরে থাকবে কারণ তার `z-index` ভ্যালু বেশি।

### বিন্দুর বা ডিফল্ট তথ্য
- ডিফল্ট জ্যাপ ইনডেক্স ভ্যালু হলো `0` (zero)।
- ভ্যালু নেগেটিভও (যেমন: `-1`) হতে পারে, যা সেটিকে সবকিছুর নিচে পাঠিয়ে দেয়।

### Hero Area Overlay-র উদাহরণ
অনেক সময় ইমেজের উপর লেখাকে স্পষ্ট করার জন্য আমরা একটি কালো ট্রান্সপারেন্ট লেয়ার বা ওভারলে ব্যবহার করি:
```css
#hero_area {
    position: relative;
    z-index: 9;
}

.overlay_bg {
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%; 
    height: 100%;
    background: #000;
    opacity: 0.4;
    z-index: -1; /* মূল কনটেন্টের নিচে পাঠিয়ে দিবে */
}
```

# CSS Dropdown Menu

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস দিয়ে ড্রপডাউন মেনু (Dropdown Menu) তৈরির পদ্ধতি উদাহরণসহ আলোচনা কর

ড্রপডাউন মেনু তৈরির জন্য আমরা লিস্টের ভিতরে আরেকটি লিস্ট ব্যবহার করি।

### HTML স্ট্রাকচার
```html
<li>
    <a href="#">Service</a>
    <ul>
        <li><a href="#">Web Design</a></li>
        <li><a href="#">App Development</a></li>
    </ul>
</li>
```

### CSS পজিশনিং ও স্টাইল
ড্রপডাউন তৈরির মূল ট্রিক হলো ভিতরের `<ul>` কে প্রথমে `display: none` করে রাখা এবং হোভার করলে সেটিকে `display: block` করা।

```css
/* প্যারেন্ট আইটেমকে রিলেটিভ করতে হবে */
#main_menu ul li {
    position: relative;
    float: left;
}

/* ড্রপডাউন লিস্টের স্টাইল */
#main_menu ul ul {
    position: absolute;
    left: 0;
    top: 48px; /* প্যারেন্টের হাইট অনুযায়ী */
    background: #5758bb;
    width: 200px;
    display: none; /* প্রথমে লুকিয়ে রাখা */
    z-index: 999;
}

#main_menu ul ul li {
    width: 100%; /* এক লাইনে একটি আইটেম */
    float: none;
}

/* হোভার করলে ড্রপডাউন দেখাবে */
#main_menu ul li:hover ul {
    display: block;
}

#main_menu ul ul li a:hover {
    background: #192a56;
}
```

### কেন position: absolute?
যদি আমরা ড্রপডাউনকে `absolute` না করি, তবে ড্রপডাউন খোলার সময় নিচের অন্য সব কনটেন্ট বা সেকশন নিচের দিকে সরে যাবে। `absolute` ব্যবহারের ফলে এটি অন্য কনটেন্টের উপর ভেসে থাকে।

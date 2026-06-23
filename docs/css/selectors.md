# CSS Selectors

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস সিলেক্টর (Selectors) কি এবং বিভিন্ন প্রকার সিলেক্টরের কাজ উদাহরণসহ লিখ

যদি আমরা দুটি আলাদা `<div>` বা দুটি `<p>` ট্যাগকে ভিন্ন ভিন্ন রূপে স্টাইল করতে চাই, তবে আমাদের **Selector** ব্যবহার করতে হবে। সিলেক্টর মূলত তিন ধরনের হতে পারে: ট্যাগ সিলেক্টর, ক্লাস সিলেক্টর এবং আইডি সিলেক্টর।

### ১. Tag Selector
সরাসরি HTML ট্যাগের নাম ধরে স্টাইল করা।
```css
div {
    width: 200px;
    height: 200px;
    background: aqua;
    margin-bottom: 20px;
}

div p {
    color: black;
}
```

### ২. Class Selector
অ্যাট্রিবিউট ব্যবহার করে আমরা ট্যাগে বিভিন্ন ফিচার অ্যাড করি। ক্লাসের জন্য ডট `.` ব্যবহার করা হয়। একটি পেজে একই নামের একাধিক **class** থাকতে পারে।
```html
<div class="first-div text-bk">
    <p>Lorem ipsum dolor sit amet.</p>
</div>
```
```css
.text-bk {
    color: red;
    text-align: right;
}

.first-div {
    background: blue;
}
```

### ৩. ID Selector
আইডির জন্য হ্যাশ `#` ব্যবহার করা হয়। মনে রাখবেন, একটি পেজে একই নামের একটির বেশি **id** থাকতে পারবে না।
```html
<div id="big-div">
    <p>Lorem ipsum dolor sit amet</p>
</div>
```
```css
#big-div {
    width: 400px;
    color: white;
}
```

### ৪. Universal Selector
পুরো পেজের সব কিছুর জন্য ডিফল্ট প্রোপার্টি অ্যাড করতে **Universal Selector** `*` ব্যবহৃত হয়।
```css
* {
    margin: 0;
    padding: 0;
    color: wheat;
}
```

### ৫. Grouping Selector
একাধিক সিলেক্টরকে কমা দিয়ে একসাথে স্টাইল করাকে গ্রুপিং বলে।
```css
#big-div, #big-div-2 {
    color: white;
}
```

### সিলেক্টরের প্রায়োরিটি (Specificity)
CSS-এ লাইন বাই লাইন কোড এক্সিকিউট হয়। তবে প্রায়োরিটির ক্ষেত্রে:
1.  **ID Selector** (সবচেয়ে বেশি প্রায়োরিটি)
2.  **Class Selector**
3.  **Tag Selector** (সবচেয়ে কম প্রায়োরিটি)

একই ধরনের সিলেক্টরের মধ্যে যেটি নিচে থাকবে সেটি প্রায়োরিটি পাবে।

### ক্লাসের নামের কনভেনশন
ক্লাসের নাম লেখার সময় স্পেস ব্যবহার করা যাবে না। আপনি চাইলে `first-div` বা `first_div` এভাবে লিখতে পারেন। এতে সুবিধা হলো মাউসের এক ক্লিকেই পুরো ক্লাস নেম সিলেক্ট করা যায়।

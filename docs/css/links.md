# CSS Links

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস লিঙ্ক (Links) স্টাইলিংয়ের বিভিন্ন স্টেট (যেমন hover, active) উদাহরণসহ লিখ

লিঙ্কের স্টাইল করার সময় মূলত ৪টি স্টেট বা অবস্থাকে মাথায় রাখতে হয়:
1.  `a:link` - সাধারণ লিঙ্কের অবস্থা।
2.  `a:visited` - ইউজার কোনো লিঙ্কে ক্লিক করার পরের অবস্থা।
3.  `a:hover` - মাউস লিঙ্কের উপরে নিলে যেমন দেখাবে।
4.  `a:active` - মাউসে ক্লিক করার মুহূর্তের অবস্থা।

### সাধারণ স্টাইল
```css
a {
    color: black;
    text-decoration: none; /* আন্ডারলাইন মুছতে */
}

a:visited {
    color: brown;
}

a:hover {
    color: aquamarine;
    text-decoration: underline;
}
```

### লিঙ্ক দিয়ে বাটন তৈরি (Link as Button)
আমরা আমাদের লিঙ্ককে সুন্দর বাটনের রূপ দিতে পারি:
```css
.btn {
    text-decoration: none;
    background: red;
    border: 2px solid red;
    color: #fff;
    padding: 10px 25px;
    display: inline-block;
    font-family: sans-serif;
    border-radius: 35px;
    transition: 0.3s;
}

.btn:hover {
    background: transparent;
    color: red;
}
```
```html
<a href="#" class="btn">Subscribe</a>
```
> [!TIP]
> `display: inline-block` ব্যবহার করা জরুরি যাতে প্যাডিং এবং মার্জিন ঠিকভাবে কাজ করে।

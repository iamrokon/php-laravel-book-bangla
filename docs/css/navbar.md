# CSS Navigation Bar

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস দিয়ে হরিজন্টাল ও ভার্টিকাল নেভিগেশন বার (Navigation Bar) তৈরির পদ্ধতি উদাহরণসহ লিখ

একটি সুন্দর নেভিগেশন বার তৈরির জন্য আমরা `<ul>` এবং `<li>` ট্যাগ ব্যবহার করি।

### ডেকোরেশন ছাড়া লিস্ট
```css
#main_menu ul {
    list-style: none; /* ডট মুছতে */
    margin: 0;
    padding: 0;
    background: #1b1464;
    overflow: hidden;
}

#main_menu ul li {
    float: left; /* বামে সরানোর জন্য */
}

#main_menu ul li a {
    display: inline-block;
    padding: 15px 25px;
    color: #fff;
    text-decoration: none;
    font-family: 'Poppins', sans-serif;
}

#main_menu ul li a:hover {
    background: #0652dd;
}
```

### কেন display: inline-block ব্যবহার করবেন?
লিঙ্কগুলো মূলত `inline` এলিমেন্ট। এগুলোতে হাইট বা প্যাডিং ঠিকমতো কাজ করানোর জন্য `display: inline-block` ব্যবহার করা জরুরি।

### ফিক্সড নেভিগেশন বার
উপরে ফিক্সড রাখতে চাইলে:
```css
#main_menu {
    position: sticky;
    top: 0;
    z-index: 9999;
}
```
*(পরবর্তীতে ড্রপডাউন মেনু বিভাগে আমরা জানবো কীভাবে ড্রপডাউন তৈরি করতে হয়)*

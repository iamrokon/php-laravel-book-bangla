# CSS Float

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস ফ্লোট (Float) কি এবং এর ব্যবহার ও ক্লিয়ারিং পদ্ধতি উদাহরণসহ লিখ

এলিমেন্টকে বামের বা ডানের পাশে সরিয়ে ফেলার জন্য `float` ব্যবহৃত হয়। আগে লেআউট তৈরির জন্য এটি খুব বেশি ব্যবহৃত হতো।

### ব্যবহারের উদাহরণ
```css
img {
    float: left; /* ইমেজটি বামে থাকবে এবং টেক্সট তার চারপাশ দিয়ে থাকবে */
    margin-right: 15px;
}
```

### সমস্যা ও সমাধান (Clearfix)
যখনই কোনো এলিমেন্টে `float` ব্যবহার করা হয়, তার প্যারেন্ট ডিভ কনটেন্টটি আর ধরতে পারে না (ডিজাইন ভেঙে যায় বা বর্ডার পায় না)। এটি সমাধানের সহজ উপায় হলো প্যারেন্ট ডিভে `overflow: hidden` ব্যবহার করা।

```css
.parent {
    border: 5px solid red;
    overflow: hidden; /* Clearfix হিসেবে কাজ করবে */
}

.child {
    float: left;
    width: 33%;
}
```

### ফ্লোট দিয়ে নেভিগেশন মেনু (আগের পদ্ধতি)
```css
#nav {
    list-style: none;
    overflow: hidden; /* Clearfix */
    background: #192056;
}

#nav li {
    float: left;
}

#nav li a {
    display: inline-block;
    padding: 12px 15px;
    color: #fff;
    text-decoration: none;
}
```

> [!CAUTION]
> বর্তমানে লেআউট বা মেনু তৈরির জন্য `float` ব্যবহারের পরামর্শ দেওয়া হয় না। এর পরিবর্তে **Flexbox** অথবা **Grid** ব্যবহার করা হয়।

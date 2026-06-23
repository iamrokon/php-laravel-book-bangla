# Project: Prothom Alo Clone (Layout)

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস দিয়ে প্রথম আলো পত্রিকার লেআউট ক্লোন করার পদ্ধতি আলোচনা কর

এই প্রজেক্টে আমরা শিখবো কীভাবে একটি নিউজপেপার ওয়েবসাইট (যেমন: প্রথম আলো) এর প্রাথমিক লেআউট তৈরি করা যায়।

### ১. Header Area (লোগো এবং টপ বার)
```html
<header id="header_area">
    <a href="#"> <img src="img/logo.png" alt="Prothom Alo"> </a>
</header>
```
```css
#header_area {
    padding: 15px 0;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
```

### ২. Navigation Menu
```html
<nav id="main_menu">
    <ul>
        <li><a href="#">সর্বশেষ</a></li>
        <li><a href="#">বিশেষ সংবাদ</a></li>
        <li><a href="#">রাজনীতি</a></li>
        <li><a href="#">জীবনযাপন</a></li>
    </ul>
</nav>
```
```css
#main_menu {
    padding: 10px 0;
    border-bottom: 2px solid #ddd;
    text-align: center;
}
#main_menu ul li {
    display: inline-block;
    margin: 0 8px;
}
#main_menu ul li a {
    color: #000;
    font-weight: bold;
    text-decoration: none;
}
```

### ৩. Content Section (Main & Sidebar)
আমরা `float` ব্যবহার করে কন্টেন্ট এবং সাইডবার সাজাবো।
```html
<section id="content">
    <div id="main-content">
        <!-- নিউজ কার্ডগুলো এখানে থাকবে -->
        <div class="child-content">
            <img src="img/news1.webp" alt="">
            <h2><a href="#">মেধাবী প্রিগোশিন মারাত্মক ভুল করেছিলেন</a></h2>
            <p>প্রিগোশিনের প্রতি শ্রদ্ধা জানিয়ে পুতিন বলেন...</p>
        </div>
    </div>

    <aside id="main_sidebar">
        <div class="child_sidebar">
            <img src="img/ad.webp" alt="">
            <h3><a href="#">সালমানের সিনেমা বাংলাদেশে আনতে কত খরচ হলো?</a></h3>
        </div>
    </aside>
</section>
```

### ৪. Layout Styling
```css
#content {
    width: 1140px;
    margin: 10px auto;
    overflow: hidden;
}

#main-content {
    width: 70%;
    float: left;
    padding-right: 2%;
    border-right: 1px solid #ddd;
}

#main_sidebar {
    width: 25%;
    float: right;
}

.child-content {
    width: 31%;
    float: left;
    margin-right: 2%;
    margin-bottom: 20px;
}

.child_content img, .child_sidebar img {
    max-width: 100%;
}
```

### ৫. প্রথম নিউজটি স্পেশাল করার জন্য (Nth-child)
মাঝেমধ্যে প্রথম নিউজটি বড় করে দেখাতে হয়:
```css
.child_content:first-child {
    width: 63%; /* এটি দুটো কলাম দখল করবে */
}
.child_content:first-child img {
    float: right;
    width: 50%;
    margin-left: 15px;
}
```

### ৬. Footer
```css
#footer_area {
    padding: 20px 0;
    text-align: center;
    border-top: 1px solid #ddd;
}
```

> [!NOTE]
> ইমেজের জন্য আপনি **images.google.com** বা সরাসরি **Prothom Alo** এর ওয়েবসাইট থেকে সেম্পল ইমেজ ব্যবহার করতে পারেন।

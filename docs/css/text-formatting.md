# CSS Text Formatting

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস টেক্সট ফরম্যাটিং (Text Formatting) প্রোপার্টিসমূহ উদাহরণসহ লিখ

টেক্সট বা লেখাকে সাজানোর জন্য CSS-এ অনেকগুলো প্রোপার্টি রয়েছে।

### ১. Alignment
লেখাকে ডানে, বামে বা মাঝখানে নেওয়ার জন্য `text-align` ব্যবহৃত হয়।
```css
h1 {
    text-align: center; /* লেখা মাঝখানে আসবে */
    text-align: left;   /* বামে (ডিফল্ট) */
    text-align: right;  /* ডানে */
    text-align: justify; /* দুই পাশ সমান হবে */
}

/* শেষ লাইনের এলাইনমেন্ট ঠিক করতে */
h1 {
    text-align-last: center;
}
```

### ২. Text Decoration
লিঙ্কের নিচে থাকা আন্ডারলাইন মুছতে বা লেখায় বিভিন্ন লাইন যোগ করতে এটি ব্যবহৃত হয়।
```css
a {
    text-decoration: none; /* আন্ডারলাইন থাকবে না */
}

h2 {
    text-decoration: overline;     /* লেখার উপরে লাইন */
    text-decoration: underline;    /* লেখার নিচে লাইন */
    text-decoration: line-through; /* লেখার মাঝখান দিয়ে কাটা দাগ */
}
```

### ৩. Vertical Alignment
সাধারণত ইমেজের সাথে টেক্সটের পজিশন ঠিক করতে ব্যবহৃত হয়।
```css
img {
    vertical-align: baseline; /* ডিফল্ট */
    vertical-align: text-top;
    vertical-align: text-bottom;
    vertical-align: sub;   /* সাবস্ক্রিপ্ট */
    vertical-align: super; /* সুপারস্ক্রিপ্ট */
}
```

### ৪. Text Shadow
লেখায় শ্যাডো বা ছায়া যোগ করতে:
```css
h2 {
    /* horizontal-offset vertical-offset blur-radius color */
    text-shadow: 0px 5px 5px #ddd;
}
```

### ৫. Spacing & Breaking
```css
p {
    word-spacing: 10px;    /* প্রতিটি শব্দের মাঝে গ্যাপ */
    white-space: nowrap;   /* লেখা এক লাইনে থাকবে, ভাঙবে না */
    white-space: break-spaces; /* যেখানে দরকার সেখানে লাইন ভাঙবে */
}
```

### ৬. Direction (উল্টো লেখা)
লেখাকে উল্টো দিক থেকে দেখাতে:
```css
.reverse {
    direction: rtl;
    unicode-bidi: bidi-override;
}
/* আউটপুট: "Hello" হবে "olleH" */
```

# CSS Backgrounds

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস ব্যাকগ্রাউন্ড (Backgrounds) প্রোপার্টিসমূহ এবং তাদের ব্যবহার উদাহরণসহ লিখ

ওয়েবসাইটে ব্যাকগ্রাউন্ড স্টাইল করার জন্য বিভিন্ন প্রোপার্টি ব্যবহৃত হয়।

### ব্যাকগ্রাউন্ড প্রোপার্টিসমূহ
```css
div {
    background-color: rgba(240, 128, 128, 0.7);
    background-image: url("css.png");
    background-size: 150px 150px; /* Width Height */
    background-repeat: no-repeat; /* values: repeat-x, repeat-y, no-repeat */
    background-position: center center; /* values: top, bottom, left, right, center */
}
```

### Background Position এর বিভিন্ন ভ্যালু
আপনি নির্দিষ্ট পিক্সেল দিয়েও পজিশন ঠিক করতে পারেন:
- `left 25px`
- `50px 25px` (X-axis, Y-axis)

### Background Attachment
ব্যাকগ্রাউন্ড ইমেজকে স্ক্রলিংয়ের সময় ফিক্সড রাখতে চাইলে:
```css
body {
    background: url("bg.jpg");
    background-attachment: fixed;
}
```

### Shorthand Background
একই লাইনে সব ব্যাকগ্রাউন্ড প্রোপার্টি ব্যবহার করা যায়:
```css
div {
    /* Color Image Repeat Position */
    background: #f78fb3 url("css.png") no-repeat center;
}
```

> [!NOTE]
> কপিরাইট ফ্রি ইমেজের জন্য আপনি **pexels.com** বা **unsplash.com** ব্যবহার করতে পারেন।

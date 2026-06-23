# CSS Fonts

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস ফন্ট (Fonts) প্রোপার্টিসমূহ এবং ফন্ট ফ্যামিলি ও গুগল ফন্ট ব্যবহারের পদ্ধতি উদাহরণসহ লিখ

ওয়েবসাইটে বিভিন্ন ধরণের ফন্ট ব্যবহার করার জন্য ফন্ট প্রোপার্টিগুলো ব্যবহৃত হয়।

### ১. Font Family
CSS-এ ৫টি প্রধান জেনেটিক ফন্ট ফ্যামিলি আছে:
- `serif`: Times New Roman, Georgia
- `sans-serif`: Arial, Helvetica, Verdana, Roboto
- `monospace`: Courier New, Lucida Console
- `cursive`: Brush Script MT
- `fantasy`: Papyrus

```css
h1 {
    font-family: Arial, Helvetica, sans-serif;
}
```
> [!NOTE]
> ফন্ট ফ্যামিলির নাম যদি একাধিক ওয়ার্ডের হয় (যেমন: 'Times New Roman'), তবে অবশ্যই কোটেশন মার্ক ব্যবহার করতে হবে।

### ২. Font Size
```css
h2 {
    font-size: 40px;
    font-size: 2.5em; /* ১em = ১৬px */
    font-size: 100%;
}
```

### ৩. Font Style & Weight
```css
h3 {
    font-style: italic;  /* বাঁকানো লেখা */
    font-style: normal;  /* সাধারণ */
    font-weight: bold;   /* মোটা লেখা */
    font-weight: normal;
    font-weight: 500;    /* নির্দিষ্ট নম্বর (১০০-৯০০) */
}
```

### ৪. Text Transform (কেস পরিবর্তন)
```css
h4 {
    text-transform: uppercase;  /* সব বড় হাতের অক্ষর */
    text-transform: lowercase;  /* সব ছোট হাতের অক্ষর */
    text-transform: capitalize; /* শব্দের প্রথম অক্ষর বড় হাতের */
}
```

### ৫. Google Fonts (Custom Fonts)
ব্যান্ডিং বা সুন্দর ডিজাইনের জন্য আমরা বাইরের ফন্ট ব্যবহার করি।
১. **fonts.google.com** এ গিয়ে পছন্দমত ফন্ট (যেমন: Poppins) সিলেক্ট করুন।
২. `<link>` অথবা `@import` কোডটি কপি করে আপনার ফাইলে বসান।
৩. এরপর `font-family` ব্যবহার করুন।

```css
/* Google Font Usage */
h2 {
    font-family: 'Poppins', sans-serif;
    font-weight: 200; /* খুব চিকন */
}
```

### ৬. Font Variant
```css
h4 {
    font-variant: small-caps; /* ছোট হাতের অক্ষরগুলোও বড় হাতের আকারের মত দেখাবে */
}
```

# CSS Grid

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস গ্রিড (Grid) কি এবং ফ্লেক্সবক্সের সাথে এর পার্থক্য ও ব্যবহার উদাহরণসহ লিখ

CSS গ্রিড হলো একটি শক্তিশালী দ্বি-মাত্রিক (Two-dimensional) লেআউট সিস্টেম। এটি দিয়ে একই সাথে রো (Row) এবং কলাম (Column) নিয়ন্ত্রণ করা যায়। এটি জটিল লেআউট তৈরির জন্য ফ্লেক্সবক্সের চেয়েও কার্যকর।

### ১. গ্রিড শুরু করা
```css
.main {
    display: grid;
    /* ৩টি কলাম করা হলো যাদের উইডথ যথাক্রমে ২০০px, ৪০০px এবং বাকি অংশ */
    grid-template-columns: 200px 400px 1fr; 
    gap: 15px; /* রো এবং কলামের মাঝে গ্যাপ */
}
```

### ২. গুরুত্বপূর্ণ ইউনিট (fr)
`fr` মানে হলো "Fractional unit"। এটি এভেইল্যাবল জায়গাকে ভাগ করে দেয়।
- `grid-template-columns: 2fr 1fr`: প্রথম কলামটি দ্বিতীয়টির দ্বিগুণ বড় হবে।
- `repeat(4, 1fr)`: ৪টি সমান সাইজের কলাম তৈরি করবে।

### ৩. গ্রিড রো (Grid Rows)
- `grid-template-rows: 100px 200px`: প্রথম রো ১০০px এবং দ্বিতীয়টি ২০০px করে হবে।
- `grid-auto-rows: minmax(80px, auto)`: রো-এর সর্বনিম্ন হাইট ৮০px হবে, কিন্তু কন্টেন্ট বেশি হলে অটোমেটিক বড় হবে।

### ৪. গ্রিন আইটেম স্প্যান (Span)
কোনো আইটেমকে একাধিক কলাম বা রো জুড়ে বিস্তৃত করতে:
```css
/* ১ নম্বর চাইল্ডটি ১ থেকে ৩ নম্বর কলাম লাইন পর্যন্ত (মানে ২ কলাম) বিস্তৃত থাকবে */
.item:first-child {
    grid-column: 1 / 3; 
    /* অথবা grid-column: span 2; */
}

.item:nth-child(2) {
    grid-row: span 2; /* এটি ২টা রো হাইট নিবে */
}
```

### ৫. Grid Template Areas
লেআউট ডিজাইন করার জন্য এটি সবচেয়ে সহজ পদ্ধতি।
```css
.main {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar content content"
        "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer { grid-area: footer; }
```

> [!TIP]
> এক-মাত্রিক সরল লেআউটের জন্য **Flexbox** এবং বড় আকারের দ্বি-মাত্রিক জটিল ডিজাইনের জন্য **Grid** ব্যবহার করা উত্তম।

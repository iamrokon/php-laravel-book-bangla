# CSS Lists

HTML লিস্টকে (Unordered বা Ordered) ডিজাইন করার জন্য এই প্রোপার্টিগুলো ব্যবহৃত হয়।

### ১. List Style Type
লিস্টের পাশের চিহ্ন বা নম্বর পরিবর্তন করতে:
```css
ul {
    list-style-type: disc;    /* ডিফল্ট কাল বৃত্ত */
    list-style-type: square;  /* চারকোনা */
    list-style-type: circle;  /* গোল রিং */
    list-style-type: none;    /* কোনো চিহ্ন থাকবে না */
}

ol {
    list-style-type: upper-roman; /* I, II, III... */
    list-style-type: lower-alpha; /* a, b, c... */
}
```

### ২. List Style Image
আপনি চাইলে কোনো ছোট ইমেজকেও লিস্টের চিহ্ন হিসেবে ব্যবহার করতে পারেন:
```css
ul {
    list-style-image: url("hand-icon.png");
}
```

### ৩. List Style Position
চিহ্নটি লেখার ভিতরে না বাইরে থাকবে তা নির্ধারণ করা যায়:
- `inside`: চিহ্নটি প্যারাগ্রাফের টেক্সটের ভিতরে থাকবে।
- `outside`: চিহ্নটি লিস্ট আইটেমের বক্সের বাইরে থাকবে (ডিফল্ট)।

### ৪. সম্পূর্ণ লিস্ট স্টাইল (Full Styling)
```css
ul {
    background: tomato;
    padding: 25px;
}

li {
    background: violet;
    padding: 10px;
    margin-bottom: 5px;
    border-bottom: 1px solid white;
}
```

# CSS Pseudo Classes & Elements

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস সিউডো ক্লাস ও এলিমেন্ট (Pseudo Classes & Elements) কি এবং এদের ব্যবহার উদাহরণসহ লিখ

কোনো এলিমেন্টের বিশেষ অবস্থা বা বিশেষ কোনো অংশকে স্টাইল করার জন্য এগুলো ব্যবহৃত হয়।

### ১. Pseudo Classes (:)
এগুলো এলিমেন্টের অবস্থার (state) উপর ভিত্তি করে কাজ করে।
```css
a:hover { color: red; }      /* মাউস নিলে */
li:first-child { color: red; } /* প্রথম চাইল্ড */
li:last-child { color: red; }  /* শেষ চাইল্ড */

/* নির্দিষ্ট সংখ্যা অনুযায়ী সিলেক্ট */
li:nth-child(2) { color: blue; }    /* ২ নম্বরটি */
li:nth-child(odd) { color: blue; }  /* সব বিজোড় সংখ্যা (১, ৩, ৫...) */
li:nth-child(even) { color: blue; } /* সব জোড় সংখ্যা (২, ৪, ৬...) */
```

### ২. Pseudo Elements (::)
এগুলো এলিমেন্টের নির্দিষ্ট অংশকে স্টাইল করতে বা নতুন কিছু যোগ করতে ব্যবহৃত হয়।

**::before এবং ::after**
এর মাধ্যমে আমরা কোনো কনটেন্টের আগে বা পরে নতুন কিছু যোগ করতে পারি (অবশ্যই `content` প্রোপার্টি ব্যবহার করতে হবে)।
```css
h1::before {
    content: "★";
    color: gold;
}
```

**::first-line এবং ::first-letter**
```css
p::first-line {
    font-weight: bold; /* প্রথম লাইন মোটা হবে */
}

p::first-letter {
    font-size: 50px; /* প্রথম অক্ষর বড় হবে */
}
```

**::selection**
ইউজার যখন মাউস দিয়ে কোনো লেখা সিলেক্ট করবে তখন কেমন দেখাবে:
```css
p::selection {
    background: #ce5a24;
    color: #fff;
}
```

> [!NOTE]
> আধুনিক নিয়মে Pseudo Class-এর ক্ষেত্রে একটি কোলন (`:`) এবং Pseudo Element-এর ক্ষেত্রে ডাবল কোলন (`::`) ব্যবহৃত হয়।

# CSS Tables

টেবিলকে আরও পরিষ্কার এবং প্রফেশনাল দেখাতে CSS ব্যবহার করা হয়।

### ১. বর্ডার ও কোলাপস (Border & Collapse)
ডিফল্টভাবে টেবিলের বর্ডারগুলো আলাদা আলাদা থাকে। সেগুলো একসাথে মিলিয়ে ফেলার জন্য `border-collapse` ব্যবহৃত হয়।
```css
table, th, td {
    border: 1px solid #ddd;
    border-collapse: collapse; /* বর্ডারগুলো এক হয়ে যাবে */
    padding: 10px;
}
```

### ২. টেবিল সাইজ ও এলাইনমেন্ট
```css
table {
    width: 100%;
}

th {
    height: 50px;
    text-align: left; /* লেখা বামে সরাতে */
    background: #c0392b;
    color: #fff;
}

td {
    height: 35px;
    vertical-align: center; /* উপরে-নিচের মাঝখানে */
}
```

### ৩. হোভার ইফেক্ট (Table Hover)
মাউস নিলে কোনো রো হাইলাইট করতে:
```css
tr:hover {
    background-color: #f5f5f5;
}
```

### ৪. রেসপনসিভ টেবিল
টেবিল অনেক বড় হয়ে গেলে ছোট স্ক্রিনে স্ক্রলবার আনার জন্য টেবিলটিকে একটি `<div>` এর মধ্যে রেখে স্টাইল দিতে হয়:
```html
<div class="table-wrapper">
    <table>...</table>
</div>
```
```css
.table-wrapper {
    overflow-x: auto; /* হরাইজন্টাল স্ক্রলবার আসবে */
}
```

> [!TIP]
> আরও সুন্দর টেবিল ডিজাইনের আইডিয়ার জন্য আপনি **Behance** বা **Dribbble** ওয়েবসাইটগুলো ভিজিট করতে পারেন।

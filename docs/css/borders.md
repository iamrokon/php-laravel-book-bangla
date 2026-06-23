# CSS Borders

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস বর্ডার (Borders) স্টাইল ও প্রোপার্টিসমূহ উদাহরণসহ লিখ

বর্ডার হলো কোনো এলিমেন্টের চারপাশের সীমানা।

### বর্ডারের ধরণ (Border Styles)
CSS-এ অনেক ধরণের বর্ডার স্টাইল আছে:
- `dotted`
- `solid`
- `dashed`
- `double`
- `groove`
- `ridge`
- `inset`
- `outset`
- `none`
- `hidden`

### বর্ডার প্রোপার্টিসমূহ
সরাসরি বা আলাদা আলাদা ভাবে বর্ডার দেওয়া যায়:
```css
h1 {
    border-style: solid;
    border-width: 10px;
    border-color: aquamarine;
}

/* Shorthand */
h1 {
    border: 10px solid red;
}
```

### নির্দিষ্ট দিকে বর্ডার
```css
h1 {
    border-left: 5px solid green;
    border-right: 5px dashed yellow;
}
```

### বর্ডার রেডিয়াস (Border Radius)
যেকোনো শার্প কর্নারকে রাউন্ড বা গোল করার জন্য ব্যবহৃত হয়:
```css
h1 {
    border-radius: 5px; /* চারপাশ ৪px রাউন্ড হবে */
}
```

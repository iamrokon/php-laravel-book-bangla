# CSS Box Model

CSS-এ প্রতিটি এলিমেন্টকে একটি "বক্স" হিসেবে কল্পনা করা হয়। এই বক্সের আকার নির্ধারিত হয় ৪টি জিনিসের সমন্বয়ে:
1.  **Content**
2.  **Padding**
3.  **Border**
4.  **Margin**

### মোট পরিমাপের হিসাব
যদি কোনো এলিমেন্টের উইডথ ৩টি আলাদা অংশে থাকে:
- `width: 300px;`
- `padding: 20px;` (চারপাশে)
- `border: 10px solid tomato;`

তবে এর **মোট উইডথ** হবে:
`300px (width) + 20px+20px (padding left & right) + 10px+10px (border left & right) = 360px`

```css
.parent {
    width: 300px;
    padding: 20px;
    margin: 10px;
    border: 10px solid tomato;
}
```

### Fluid Box Model (পারসেন্টেজ ব্যবহার)
ফ্লুইড উইডথ ব্যবহারের সময় মার্জিন ও প্যাডিং ব্যবহারের ক্ষেত্রে সাবধান থাকতে হয় যাতে মোট হিসাব ১০০% পার না হয়ে যায়।
```css
.parent {
    width: 30%;
    margin: 1%;
    padding: 2%;
    border: 2px solid tomato;
    float: left;
}
```
*দ্রষ্টব্য: পরবর্তীতে আমরা `box-sizing: border-box` সম্পর্কে শিখবো, যা এই হিসাবকে অনেক সহজ করে দেয়।*

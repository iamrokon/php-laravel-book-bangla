# CSS Colors

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস এ কালার (Colors) ব্যবহারের বিভিন্ন পদ্ধতি (যেমন Name, HEX, RGB, HSL) উদাহরণসহ লিখ

সব কালারের নাম মনে রাখা সম্ভব নয়, তাই CSS-এ কালার ব্যবহারের বিভিন্ন পদ্ধতি রয়েছে।

### ১. কালারের নাম (Color Names)
```css
h1 {
    color: aqua;
}
```

### ২. Hex কালার কোড (Hex Color Code)
এটি মূলত ৬ ডিজিটের হয়। যেমন:
- `#000000` => Black
- `#0000ff` => Blue
- `#00ff00` => Green
- `#ff0000` => Red
- `#ffffff` => White

```css
h1 {
    color: #e15f41;
}
```

### ৩. RGB এবং RGBA
RGB মানে Red, Green, Blue। আর RGBA-এর 'A' মানে Opacity (স্বচ্ছতা)।
```css
h1 {
    color: rgb(255, 255, 255); /* White */
    color: rgb(0, 0, 0);       /* Black */
    color: rgba(255, 255, 0, 0.3); /* Yellow with 0.3 opacity */
}
```

### ৪. Hex Opacity
Hex কালারের ৬ ডিজিটের জায়গায় ৮ ডিজিট ব্যবহার করলে শেষের ২ ডিজিট দিয়ে Opacity পরিবর্তন হয়।
```css
h1 {
    color: #fae54b44;
}
```

> [!TIP]
> **flatuicolors.com** এই ওয়েবসাইটে কিছু রেডিমেড ওয়েবসাইট ফ্রেন্ডলি কালার পাওয়া যায় যা ব্যবহার করলে ওয়েবসাইট সুন্দর দেখায়।

# CSS Flexbox

ফ্লেক্সবক্স হলো এক-মাত্রিক (One-dimensional) লেআউট সিস্টেম, যা এলিমেন্টগুলোকে খুব সহজেই হরাইজন্টালি বা ভার্টিক্যালি সাজাতে এবং এলাইন করতে সাহায্য করে।

### ১. Flex Container (প্যারেন্ট)
ফ্লেক্সবক্স শুরু করতে হলে প্যারেন্ট ডিভে `display: flex` দিতে হয়।

```css
.main {
    display: flex;
    justify-content: center; /* হরাইজন্টাল এলাইনমেন্ট */
    align-items: center;     /* ভার্টিক্যাল এলাইনমেন্ট */
    flex-wrap: wrap;         /* জায়গা না থাকলে নিচে নামবে */
}
```

### ২. Container প্রোপার্টিসমূহ
- **justify-content:** (X-অক্ষ বরাবর)
    - `flex-start`, `flex-end`, `center`, `space-between` (দুই পাশে জায়গা থাকবে), `space-around`, `space-evenly` (সমান গ্যাপ)।
- **align-items:** (Y-অক্ষ বরাবর)
    - `flex-start`, `flex-end`, `center`, `baseline`, `stretch` (ডিফল্ট)।
- **flex-direction:**
    - `row` (Default), `column` (একটার নিচে একটা), `row-reverse`, `column-reverse` (উল্টা দিক থেকে)।
- **flex-wrap:**
    - `nowrap` (Default, সব এক লাইনে জোর করে থাকবে), `wrap` (জায়গা না থাকলে পরের লাইনে যাবে)।

### ৩. Flex Items (চাইল্ড) প্রোপার্টিসমূহ
- **flex-basis:** এলিমেন্টের প্রাথমিক সাইজ নির্ধারণ করে।
- **flex-grow:** কোনো এলিমেন্ট অন্যটির তুলনায় কতগুণ বড় হবে (১, ২, ৪ ইত্যাদি ভ্যালু হয়)।
- **order:** এলিমেন্টগুলো আগে বা পরে আসার ক্রম নির্ধারণ করে।

```css
.item:nth-child(1) { order: 2; flex-grow: 1; }
.item:nth-child(2) { order: 1; flex-grow: 2; } /* এটি দ্বিগুণ বড় হবে এবং আগে আসবে */
```

### ৪. ফ্লেক্সবক্স দিয়ে ইমেজ গ্যালারি (Simple Gallery)
```css
.parent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.child {
    flex-basis: 32%; /* প্রতি সারিতে ৩টি করে ইমেজ */
}
.child img {
    width: 100%;
}
```

> [!TIP]
> যেকোনো ডিভকে একদম সেন্টারে নেওয়ার সবচেয়ে সেরা উপায় হলো:
> ```css
> .container {
>     display: flex;
>     justify-content: center;
>     align-items: center;
>     height: 100vh;
> }
> ```

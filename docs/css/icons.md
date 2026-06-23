# CSS Icons

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস এ আইকন (Icons) ব্যবহারের বিভিন্ন জনপ্রিয় রিসোর্সসমূহ (যেমন Font Awesome) আলোচনা কর

ওয়েবসাইটে আইকন ব্যবহারের জন্য মূলত ৩টি জনপ্রিয় রিসোর্স রয়েছে:
1.  **Font Awesome**
2.  **Bootstrap Icons**
3.  **Google Material Icons**

### ১. Font Awesome
এটি ব্যবহারের জন্য প্রথমে তাদের CDN লিঙ্কটি আপনার HTML-এর `<head>` ট্যাগ-এ বসাতে হবে। এরপর আইকনের ক্লাস ব্যবহার করলেই কাজ করবে।

```html
<!-- CDN example -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

<!-- Usage -->
<i class="fa-brands fa-facebook"></i>
<i class="fa-brands fa-twitter"></i>
<i class="fa-solid fa-laptop"></i>
```

### ২. Bootstrap Icons
```html
<!-- CDN usage -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

<!-- Usage -->
<h1><i class="bi bi-award"></i></h1>
```

### ৩. Google Material Icons
```html
<span class="material-symbols-outlined">delete</span>
```

### আইকনের স্টাইল করা
আইকনগুলো মূলত ফন্ট হিসেবে কাজ করে, তাই আপনি `color`, `font-size`, `background` ইত্যাদি প্রোপার্টি দিয়ে এগুলোকে ডিজাইন করতে পারেন।
```css
i {
    color: white;
    background: tomato;
    padding: 15px;
    font-size: 20px;
    border-radius: 50%;
}
```

### কেন CDN ব্যবহার করবেন?
CDN ব্যবহার করলে আইকন দ্রুত লোড হয়, কারণ অনেক ক্ষেত্রে ইউজারের ব্রাউজারে এটি আগে থেকেই ক্যাশে করা থাকে। তবে আপনি চাইলে আইকনগুলো ডাউনলোড করেও আপনার প্রজেক্টে ব্যবহার করতে পারেন।

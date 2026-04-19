# Responsive Web Design

রেসপনসিভ ওয়েবসাইটের অর্থ হলো আপনার ওয়েবসাইটটি কম্পিউটার, ট্যাবলেট এবং ছোট মোবাইল স্ক্রিনেও যেন দেখতে সুন্দর এবং ব্যবহারযোগ্য হয়।

### ১. Viewport Meta Tag
ওয়েবসাইট রেসপনসিভ করার প্রথম শর্ত হলো HTML-এর `<head>` ট্যাগ-এ এই মেটা ট্যাগটি যোগ করা:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### ২. Media Queries
মিডিয়া কুয়েরি ব্যবহার করে আমরা বিভিন্ন স্ক্রিন সাইজের জন্য আলাদা আলাদা CSS কোড লিখতে পারি। সাধারণত এটি স্টাইলশিটের একদম নিচে লিখতে হয়।

```css
/* মোবাইল স্ক্রিনের জন্য (৫০০px এর নিচে) */
@media screen and (max-width: 500px) {
    body {
        background-color: lightgrey;
    }
    .sidebar {
        display: none; /* মোবাইলে সাইডবার লুকিয়ে ফেলা */
    }
}
```

### ৩. কমন ব্রেক পয়েন্ট (Common Breakpoints)
- ছোট ফোন: `320px` - `480px`
- ট্যাবলেট: `481px` - `768px`
- ল্যাপটপ/ডেস্কটপ: `769px` - `above`

### ৪. ওরিয়েন্টেশন (Orientation)
মোবাইল যদি ল্যান্ডস্কেপ (শুয়ানো) বা পোর্ট্রেট (খাড়া) অবস্থায় থাকে তাও ডিটেক্ট করা যায়:
```css
@media (orientation: landscape) {
    .box { width: 300px; }
}
```

### ৫. প্রজেক্ট প্রথম আলো (রেসপনসিভ পার্ট)
আগের লেআউটটিকে মোবাইলে নিচের মত পরিবর্তন করা হলো:
```css
@media screen and (max-width: 600px) {
    /* কন্টেন্ট এবং সাইডবার দুইটাই ১০০% হয়ে নিচে নিচে আসবে */
    #main-content, #main_sidebar {
        width: 100%;
        float: none;
        border: none;
    }
    
    .child-content {
        width: 96%;
        margin: 0 auto 15px;
    }
    
    /* প্রথম বড় নিউজটি সাধারণ নিউজের মত হয়ে যাবে */
    .child_content:first-child {
        width: 96%;
    }
    .child_content:first-child img {
        float: none;
        width: 100%;
        margin: 0 0 10px;
    }
}
```

### ৬. প্রফেশনাল টিপস
- রেসপনসিভ ডিজাইনে সবসময় রিলেটিভ ইউনিট (`%`, `vw`, `vh`, `rem`, `em`) ব্যবহার করার চেষ্টা করুন।
- ইমেজে সবসময় `max-width: 100%` এবং `height: auto` দিয়ে রাখুন যাতে ইমেজ স্ক্রিনের বাইরে চলে না যায়।

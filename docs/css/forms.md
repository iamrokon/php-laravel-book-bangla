# CSS Forms

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস দিয়ে এইচটিএমএল ফর্ম (Forms) ডিজাইন ও স্টাইলিং করার পদ্ধতি উদাহরণসহ আলোচনা কর

HTML ফরমকে সুন্দর করার জন্য ইনপুট ফিল্ড এবং বাটনগুলোকে স্টাইল দিতে হয়।

### ১. ফিল্ড গ্রুপ স্টাইল
সাধারণত প্রতিটি ইনপুটকে একটি ডিভ (যেমন: `.child-form`) এর মধ্যে রাখা হয়।
```css
.child-form {
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
}

.child-form label {
    display: block;
    margin-bottom: 5px;
}
```

### ২. ইনপুট ও টেক্সট এরিয়া স্টাইল
```css
.child-form input, 
.child-form textarea, 
.child-form select {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 3%;
    width: 94%; /* প্যাডিংয়ের কারণে উইডথ কমিয়ে রাখা হয়েছে */
    font-family: 'Poppins', sans-serif;
}
```

### ৩. বাটন স্টাইল
ইনপুট বাটনের জন্য নির্দিষ্ট টাইপ ধরে স্টাইল করা যায়।
```css
.child-form input[type='button'] {
    width: 200px;
    background: blueviolet;
    border: 1px solid blueviolet;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;
}

.child-form input[type='button']:hover {
    background: black;
    border-color: black;
}
```

### ৪. ইনভ্যালু বা ফোকাস স্টাইল
যখন কোনো ইনপুটে ক্লিক করা হবে তখন আউটলাইন পরিবর্তন করা:
```css
input:focus {
    outline: 2px solid blueviolet;
    background: #f9f9f9;
}
```

### ৫. একটি ইন্টারেস্টিং ট্রিক
ইউজার যতক্ষণ ইনপুট ফিল্ডে কিছু না লিখবে ততক্ষণ সার্চ বাটন লুকিয়ে রাখা:
```css
/* বাটনটি ডিফল্টভাবে লুকিয়ে থাকবে */
input[type="button"] {
    display: none;
}

/* প্লেসহোল্ডার যদি শো না করে (মানে ইউজার কিছু লিখেছে), তবে বাটন দেখাবে */
input:not(:placeholder-shown) + input[type="button"] {
    display: block;
}
```
*(এটি কাজ করার জন্য একটি লজিক্যাল HTML স্ট্রাকচার প্রয়োজন)*

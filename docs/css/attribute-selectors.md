# CSS Attribute Selectors

কোনো HTML এলিমেন্টের অ্যাট্রিবিউট (যেমন: value, title, target, class) ধরে স্টাইল করাকে অ্যাট্রিবিউট সিলেক্টর বলে।

### ১. নির্দিষ্ট অ্যাট্রিবিউট সিলেক্ট করা
```css
/* যেসব লিঙ্কে target অ্যাট্রিবিউট আছে */
a[target] {
    color: red;
}

/* যেসব লিঙ্কে target="_blank" আছে */
a[target="_blank"] {
    background-color: yellow;
}
```

### ২. অ্যাডভান্সড ম্যাচিং Rules
- `[title~="Pro"]`: যদি টাইটেলের মধ্যে স্পেস দিয়ে আলাদা করা কোনো শব্দ থাকে যার মধ্যে "Pro" আছে।
- `[class|="child"]`: যদি ক্লাসের নাম "child" দিয়ে শুরু হয় এবং এরপর হাইফেন থাকে (যেমন: `child-form`)।
- `[class^="child"]`: যদি ক্লাসের নাম "child" দিয়ে শুরু হয় (হাইফেন বা আন্ডারস্কোর যাই থাকুক)।
- `[class$="ial"]`: যদি ক্লাসের নাম "ial" দিয়ে শেষ হয় (যেমন: `testimonial`)।
- `[class*="erv"]`: যদি ক্লাসের নাম বা অ্যাট্রিবিউটের যেকোনো স্থানে "erv" থাকে (যেমন: `service`)।

### ব্যবহারিক উদাহরণ (সবাইকে একসাথে সিলেক্ট)
```css
div[class^='child'] {
    width: 300px;
    height: 200px;
    background: #e1b12c;
    margin-bottom: 5px;
}
```
এর ফলে `child-service`, `child-testimonial`, `child_form` - সবই একসাথে সিলেক্ট হবে।

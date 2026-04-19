# CSS Transitions

কোনো এলিমেন্টের স্টাইল হঠাৎ করে পরিবর্তন না হয়ে ধীরে ধীরে বা স্মুথলি পরিবর্তন হওয়াকে ট্রানজিশন বলে।

### ব্যবহারের নিয়ম
```css
.box {
    width: 100px;
    height: 100px;
    background: #8c7ae6;
    transition: 0.5s; /* সময়কাল (০.৫ সেকেন্ড) */
}

.box:hover {
    width: 400px;
}
```

### বিস্তারিত প্রোপার্টিসমূহ
১. `transition-property`: কোন জিনিসটি পরিবর্তন হবে (যেমন: width, color, all)।
২. `transition-duration`: কতক্ষণ ধরে চলবে (যেমন: 0.5s, 1s)।
৩. `transition-timing-function`: পরিবর্তনের গতি কেমন হবে।
   - `linear`: সমান গতিতে।
   - `ease`: শুরুতে ধীরে, মাঝখানে দ্রুত, শেষে ধীরে।
   - `ease-in`: শুরুতে ধীরে।
   - `ease-out`: শেষে ধীরে।
   - `ease-in-out`: শুরু ও শেষে ধীরে।
৪. `transition-delay`: এনিমেশন শুরু হতে কতটা দেরি হবে।

### Shorthand
```css
.box {
    /* property duration timing-function delay */
    transition: width 0.5s ease-in 1s;
}
```

### একাধিক ট্রানজিশন
```css
.box {
    transition: width 0.5s, height 0.3s, background 1s;
}
```
> [!TIP]
> স্মুথ ডিজাইনের জন্য সবসময় একটি নির্দিষ্ট সময় (যেমন 0.3s বা 0.5s) ট্রানজিশন হিসেবে ব্যবহার করুন।

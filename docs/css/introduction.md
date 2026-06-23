# CSS Syntax

> [!IMPORTANT]
> **★ ইন্টারভিউয়ের জন্য গুরুত্বপূর্ণ প্রশ্ন:** সিএসএস সিনট্যাক্স (CSS Syntax) কি এবং সিএসএস লেখার নিয়ম উদাহরণসহ লিখ

CSS কোন প্রোগ্রামিং ল্যাঙ্গুয়েজ নয়। এর পূর্ণরূপ **Cascading Style Sheet**। HTML ট্যাগগুলোকে স্টাইলিং করতে CSS ব্যবহৃত হয়।

### ব্র্যাকেট পরিচিতি
প্রোগ্রামিংয়ের ভাষায়:
- দ্বিতীয় বন্ধনীকে `{}` বলে **Curly Braces**।
- প্রথম বন্ধনীকে `()` বলে **Parenthesis**।
- তৃতীয় বন্ধনীকে `[]` বলে **Square Brackets**।

### CSS এর গঠন (Syntax)
```css
h1 {
    color: red; 
    font-size: 60px;
}
```

এখানে:
- `h1` হলো **Selector**।
- `color` হলো **Property**।
- `red` হলো **Value**।
- `color: red;` এই পুরো লাইনটাকে বলা হয় **Declaration**।

### CSS Comment
CSS-এ কমেন্ট করার নিয়ম:
```css
/*
h1 Selector
color > Property
*/
```
দুইটা ডিক্লেয়ারেশনের মাঝে অবশ্যই **সেমিকোলন (;)** দিতে হবে। নইলে এরর আসবে।

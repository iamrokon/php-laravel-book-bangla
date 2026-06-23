# JSX ও এলিমেন্ট রেন্ডারিং (React JSX & Rendering Elements)

রিঅ্যাক্ট অ্যাপ্লিকেশনের মূল ভিত্তি হলো এর এলিমেন্টসমূহ। এই চ্যাপ্টারে আমরা জানবো কীভাবে রিঅ্যাক্ট এলিমেন্ট তৈরি করতে হয়, JSX কী এবং এটি কীভাবে ব্যাকগ্রাউন্ডে কাজ করে।

---

## ১. রিঅ্যাক্ট এলিমেন্ট বনাম ডম এলিমেন্ট

সাধারণ HTML ফাইলে কাজ করার সময় আমরা ভ্যানিলা জাভাস্ক্রিপ্ট দিয়ে ডমে নতুন কোনো উপাদান যোগ করতে নিচের মতো কোড লিখি:

```javascript
var para = document.createElement("p");
para.innerText = "This is a paragraph";
document.body.appendChild(para);
```

যদি আমরা কনসোলে `console.dir(para)` লিখে এলিমেন্টটিকে ইনস্পেক্ট করি, তবে দেখবো ব্রাউজারের এই আসল ডম এলিমেন্টের সাথে শত শত প্রোপার্টি ও মেথড যুক্ত থাকে, যা অত্যন্ত মেমরি-হাংরি (heavyweight)। 

রিঅ্যাক্ট স্ক্রিনে কিছু দেখানোর জন্য নিজস্ব এলিমেন্ট তৈরি করে, যাকে বলা হয় **React Element**। এটি তৈরি করার জন্য রিঅ্যাক্ট আমাদের `React.createElement()` নামক একটি মেথড প্রদান করে:

```javascript
import React from 'react';

const element = React.createElement('h1', null, 'Hello, World!');
console.log(element);
```

আমরা যদি এই `element` টিকে কনসোলে প্রিন্ট করি, তবে দেখবো এটি আসলে সাধারণ একটি লাইটওয়েট জাভাস্ক্রিপ্ট অবজেক্ট (JavaScript Object):

```javascript
{
  type: 'h1',
  props: {
    children: 'Hello, World!'
  }
}
```

যেহেতু রিঅ্যাক্ট এলিমেন্টগুলো মেমরিতে থাকা খুব সাধারণ অবজেক্ট, তাই এদের তৈরি ও ট্র্যাক করা ব্রাউজারের আসল ডম এলিমেন্টের চেয়ে অনেক সহজ এবং অত্যন্ত দ্রুতগতির হয়ে থাকে।

---

## ২. JSX (JavaScript XML) কী?

প্রতিবার `React.createElement` কল করে জটিল ডম স্ট্রাকচার লেখা বেশ কঠিন। এই কাজটিকে সহজ ও দৃষ্টিনন্দন করার জন্য রিঅ্যাক্ট নিয়ে এসেছে **JSX**।

JSX এর উদাহরণ:
```javascript
const element = <h1 className="heading">Hello World</h1>;
```

এটি বাবেল (Babel) ট্রান্সপাইলারের মাধ্যমে কনভার্ট হয়ে নিচের সমতুল্য (equivalent) জাভাস্ক্রিপ্ট কোডে রূপান্তরিত হয়:
```javascript
const element = React.createElement('h1', { className: 'heading' }, 'Hello World');
```

### JSX ব্যবহারের কিছু গুরুত্বপূর্ণ নিয়ম:

1. **জাভাস্ক্রিপ্ট এক্সপ্রেশন:** JSX-এর ভেতরে কার্লি ব্র্যাকেট বা বন্ধনী `{ }` ব্যবহার করে যেকোনো জাভাস্ক্রিপ্ট এক্সপ্রেশন লেখা যায়:
   ```javascript
   const element = <h1>Hello {firstName + ' ' + lastName}</h1>;
   ```
2. **ফাংশনাল রিটার্ন:** আমরা চাইলে ফাংশন থেকে কন্ডিশন অনুযায়ী JSX রিটার্ন করতে পারি:
   ```javascript
   function getGreeting(user) {
     if (user) {
       return <h1>Hello, {user}!</h1>;
     }
     return <h1>Hello, Stranger.</h1>;
   }
   ```
3. **ক্যামেলকেস (camelCase) প্রপস:** JSX-এ ডম প্রোপার্টিগুলোর নাম জাভাস্ক্রিপ্ট কনভেনশন মেনে camelCase-এ লিখতে হয়। যেমন: HTML-এর `class` এখানে হয়ে যায় `className` এবং `tabindex` হয়ে যায় `tabIndex`।
4. **মাল্টিলাইন JSX:** একাধিক লাইনের JSX লেখার জন্য সেটিকে প্রথম বন্ধনী `( )` দিয়ে ঘিরে রাখতে হবে:
   ```javascript
   const index = 0;
   const element = (
     <h1 className="heading" tabIndex={index}>
       Hello World
     </h1>
   );
   ```

---

## ৩. নেস্টেড রিঅ্যাক্ট এলিমেন্ট (Nested Elements)

একটি রিঅ্যাক্ট এলিমেন্টের ভেতরে চিলড্রেন হিসেবে একাধিক এলিমেন্টও থাকতে পারে:

```javascript
const element = (
  <h1 className="heading" tabIndex={index}>
    <span className="text">Hello World</span>
    <img src="logo.png" alt="logo" />
  </h1>
);
```

এটি ব্যাকগ্রাউন্ডে নিচের মতো অবজেক্টে রূপান্তরিত হয়:

```javascript
const element = {
  type: 'h1',
  props: {
    className: "heading",
    tabIndex: 0,
    children: [
      {
        type: 'span',
        props: {
          className: 'text',
          children: 'Hello World'
        }
      },
      {
        type: 'img',
        props: {
          src: 'logo.png',
          alt: 'logo'
        }
      }
    ]
  }
};
```

---

## ৪. ক্রস-সাইট স্ক্রিপ্টিং (XSS) প্রতিরোধ

রিঅ্যাক্ট অত্যন্ত সুরক্ষিত। যখনই কোনো ডাইনামিক ভ্যালু JSX-এর ভেতরে রেন্ডার করা হয়, রিঅ্যাক্ট সেটিকে স্ক্রিনে রেন্ডার করার আগে স্বয়ংক্রিয়ভাবে স্ট্রিং-এ রূপান্তর বা এস্কেপ (escape) করে নেয়। 

```javascript
const apiResponse = "<script>alert('hack')</script>";
const element = <span>{apiResponse}</span>;
```
এখানে রিঅ্যাক্ট স্ক্রিপ্ট ট্যাগটি রান করবে না, বরং এটিকে প্লেন টেক্সট হিসেবে নিরাপদ উপায়ে এস্কেপ করে দেখাবে। ফলে আমাদের অ্যাপ্লিকেশন হ্যাকিং বা ক্রস-সাইট স্ক্রিপ্টিং (XSS) আক্রমণ থেকে নিরাপদ থাকে।

---

## ৫. রিঅ্যাক্ট এলিমেন্টসমূহ ইমিউটেবল (Immutable)

রিঅ্যাক্ট এলিমেন্টগুলো তৈরি হওয়ার পর আর পরিবর্তন করা যায় না (Immutable)। অর্থাৎ আপনি একবার এলিমেন্ট ডিক্লেয়ার করার পর তার প্রোপার্টি বা চিলড্রেন ম্যানুয়ালি চেঞ্জ করতে পারবেন না। 

ইউজার ইন্টারফেসে নতুন কিছু দেখাতে হলে প্রতিবার আমাদের একটি নতুন এলিমেন্ট তৈরি করতে হবে। 

চলুন একটি রানিং ঘড়ির উদাহরণ দেখা যাক:

```javascript
import ReactDOM from 'react-dom';

setInterval(() => {
  const element = (
    <h1 className="heading">
      <span className="text">Hello! The time is {new Date().toLocaleTimeString()}</span>
    </h1>
  );
  ReactDOM.render(element, document.getElementById('root'));
}, 1000);
```

এখানে প্রতি ১ সেকেন্ড পর পর `setInterval` কল হয়ে একটি করে নতুন রিঅ্যাক্ট এলিমেন্ট অবজেক্ট তৈরি করছে এবং `ReactDOM` পূর্ববর্তী ডমের সাথে তুলনা করে শুধুমাত্র পরিবর্তিত টেক্সট অংশটুকু ব্রাউজারের বাস্তব ডমে আপডেট করছে। যেহেতু মেমরিতে এই অবজেক্টগুলো তৈরি করা খুবই সস্তা এবং দ্রুত প্রসেস, তাই ব্রাউজারে কোনো পারফরম্যান্স ঘাটতি ছাড়াই ইউজার একটি মসৃণ লাইভ ঘড়ি দেখতে পান।

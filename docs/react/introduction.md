# রিঅ্যাক্ট কী এবং এটি কীভাবে কাজ করে? (What is React & How It Works)

ইউজার ইন্টারফেস (UI) তৈরির জন্য রিঅ্যাক্ট (React) বর্তমান সময়ের অন্যতম জনপ্রিয় এবং বহুল ব্যবহৃত একটি জাভাস্ক্রিপ্ট লাইব্রেরি। এই চ্যাপ্টারে আমরা জানবো রিঅ্যাক্ট কী, কেন এটি ব্যবহার করা হয় এবং এর মৌলিক বিষয়গুলো কীভাবে কাজ করে।

---

## ১. রিঅ্যাক্ট (React) কী?

রিঅ্যাক্ট হলো ইউজার ইন্টারফেস তৈরির একটি জাভাস্ক্রিপ্ট লাইব্রেরি। 
লাইব্রেরি (Library) এর মানে হলো কোডের এমন একটি সংগ্রহ (collection of codes), যা অন্য ডেভেলপাররা আগে থেকে লিখে রেখেছেন এবং যা আমরা আমাদের প্রজেক্টে পুনরায় ব্যবহার (reuse) করতে পারি। 

আমরা সাধারণ জাভাস্ক্রিপ্ট (Vanilla JS) কোডের একটি আধুনিক বিকল্প হিসেবে রিঅ্যাক্ট ব্যবহার করি। এটি দিয়ে আমরা খুব সহজেই:
- ওয়েব অ্যাপ্লিকেশন (Web Apps)
- মোবাইল অ্যাপ্লিকেশন (Mobile Apps) - *React Native এর সাহায্যে*
- ডেস্কটপ অ্যাপ্লিকেশন (Desktop Apps) - *Electron এর সাহায্যে* তৈরি করতে পারি।

### ফ্রন্টএন্ড বনাম ব্যাকএন্ড (Frontend vs Backend)
একটি আধুনিক অ্যাপ্লিকেশনে সাধারণত দুটি প্রধান অংশ থাকে:
১. **Frontend / User Interface (UI):** যা ইউজারের সামনে প্রদর্শিত হয়। যেমন—বাটন, ইনপুট ফর্ম, ইমেজ ইত্যাদি। ইউজার এখানে বাটন ক্লিক করে বা ফর্ম সাবমিট করে ইন্টারঅ্যাক্ট করে থাকে।
২. **Backend:** যেখানে অ্যাপ্লিকেশনের ভেতরের লজিক থাকে। যেমন—ইউজার অথেন্টিকেশন (Authentication), ডাটাবেজ অপারেশন এবং বিভিন্ন জটিল ক্যালকুলেশন।

**রিঅ্যাক্ট শুধুমাত্র ফ্রন্টএন্ড (Frontend) নিয়ে কাজ করে।** ইউজারের বিভিন্ন ইন্টারঅ্যাকশনের রেসপন্স করা এবং স্ক্রিনে প্রয়োজনীয় তথ্য (Information) রেন্ডার বা ডিসপ্লে করাই এর মূল কাজ।

> [!NOTE]
> জাভাস্ক্রিপ্ট (JavaScript) হলো ওয়েবের একটি অন্যতম প্রোগ্রামিং ল্যাঙ্গুয়েজ। কিন্তু রিঅ্যাক্ট কোনো প্রোগ্রামিং ল্যাঙ্গুয়েজ নয়; এটি কেবল একটি লাইব্রেরি, যা জাভাস্ক্রিপ্ট দিয়েই লেখা হয়েছে। এছাড়াও এটি একটি ওপেন সোর্স (Open Source) প্রজেক্ট, যা ফেসবুক (বর্তমানে Meta) রক্ষণাবেক্ষণ করে।

---

## ২. রিঅ্যাক্ট কেন ব্যবহার করবেন? (Extra Benefit of React)

React আসে ২০১৩ সালে। এর আগে ইন্টারঅ্যাক্টিভ ওয়েবসাইট বানানোর জন্য মূলত **jQuery** এবং **Vanilla JS** ব্যবহার করা হতো। তাহলে রিঅ্যাক্ট ব্যবহার করার সুবিধা কী? চলুন একটি বাস্তব উদাহরণের মাধ্যমে এটি বোঝা যাক।

ধরা যাক, আমরা একটি সাধারণ কাউন্টার অ্যাপ্লিকেশন বানাবো। এখানে একটি বাটন থাকবে এবং প্রতিবার বাটনে ক্লিক করলে স্ক্রিনে দেখানো সংখ্যাটি ১ করে বৃদ্ধি পাবে।

### ভ্যানিলা জাভাস্ক্রিপ্ট দিয়ে তৈরি কাউন্টার:

**index.html**
```html
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>React Tutorial</title>
    <link rel="stylesheet" href="style.css"/>
</head>
<body>
    <div class="container">
        <div>
            <h1 id="display">0</h1>
        </div>
        <div>
            <button id="button">Increment</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

**script.js**
```javascript
let number = 0;
const button = document.querySelector("#button");
const display = document.querySelector("#display");

// বাটনটিতে ক্লিক ইভেন্ট লিসেনার যুক্ত করা হলো
button.addEventListener("click", () => {
  number++;
  display.textContent = number;
});
```

এখানে আমরা বাটনের ক্লিক ইভেন্ট ট্র্যাক করার জন্য `addEventListener` ব্যবহার করেছি এবং ক্লিক করা হলে `number` এর মান ১ বাড়িয়ে দিয়ে সেটি `#display` আইডি যুক্ত ট্যাগের ভেতরের টেক্সট হিসেবে আপডেট করে দিয়েছি।

### এই পদ্ধতিতে সমস্যা কী?

ছোট অ্যাপ্লিকেশনের ক্ষেত্রে এই পদ্ধতি চমৎকার কাজ করে। কিন্তু অ্যাপ্লিকেশন যখন বড় হবে, তখন এটি মেইনটেইন করা কঠিন হয়ে যায়।

ধরা যাক, আমাদের একই পেজে আরেকটি কাউন্টার প্রয়োজন। তখন আমাদের HTML কোডে আরেকটি বাটন ও ডিসপ্লে যোগ করতে হবে এবং সেগুলোর জন্য আলাদা আইডি নির্ধারণ করতে হবে:

**index.html**
```html
<div class="container">
  <h1 id="display1">0</h1>
  <div>
    <button id="button1">Increment</button>
  </div>
  
  <h1 id="display2">0</h1>
  <div>
    <button id="button2">Increment</button>
  </div>
</div>
```

এবং আমাদের জাভাস্ক্রিপ্ট ফাইলে আলাদা করে দুটি ভেরিয়েবল এবং দুটি আলাদা `addEventListener` লিখতে হবে:

**script.js**
```javascript
let number1 = 0;
let number2 = 0;

const display1 = document.querySelector("#display1");
const display2 = document.querySelector("#display2");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");

button1.addEventListener("click", () => {
  number1++;
  display1.textContent = number1;
});

button2.addEventListener("click", () => {
  number2++;
  display2.textContent = number2;
});
```

আমরা হয়তো একটি কমন ফাংশন বানিয়ে কোড কিছুটা অপ্টিমাইজ করতে পারি, কিন্তু তাও প্রতিটি HTML উপাদানকে আমাদের আলাদা আলাদা আইডি দিয়ে ম্যানুয়ালি ধরতে হবে। বড় অ্যাপ্লিকেশনে শত শত উপাদান এভাবে ম্যানুয়ালি হ্যান্ডেল করতে গেলে কোড অগোছালো হয়ে পড়ে এবং বাগ (bugs) দেখা দেওয়ার সম্ভাবনা অনেক বেড়ে যায়।

---

## ৩. রিঅ্যাক্টের ইতিহাস ও আগমন

এই ডম (DOM) হ্যান্ডেল করার সমস্যা সমাধানের জন্য ফেসবুকের সফটওয়্যার ইঞ্জিনিয়ার **Jordan Walke** ২০১১ সালে রিঅ্যাক্টের একটি প্রোটোটাইপ তৈরি করেন। Jordan মূলত পিএইচপি-র একটি কম্পোনেন্ট ফ্রেমওয়ার্ক **XHP-JS** থেকে অনুপ্রাণিত হয়ে এটি তৈরি করেছিলেন।

- **২০১১ সাল:** প্রথম ফেসবুকের নিউজফিডে (News Feed) এটি ব্যবহার করা হয়।
- **২০১২ সাল:** ইনস্টাগ্রামে (Instagram) এটি যুক্ত করা হয়।
- **২০১৩ সাল:** অফিশিয়ালি এর নাম দেওয়া হয় **React JS** এবং এটি সকলের জন্য **Open Source** হিসেবে উন্মুক্ত করা হয়।

বর্তমানে নেটফ্লিক্স (Netflix), ইনস্টাগ্রাম, ফেসবুকসহ বিশ্বজুড়ে প্রায় ২ মিলিয়নেরও বেশি ওয়েবসাইটে রিঅ্যাক্ট ব্যবহার করা হচ্ছে।

---

## ৪. ব্রাউজারে রিঅ্যাক্ট কীভাবে সেটআপ করবেন?

আমরা সরাসরি CDN লিঙ্কের সাহায্য নিয়ে আমাদের সাধারণ HTML ফাইলে রিঅ্যাক্ট যুক্ত করতে পারি।

**index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add React to a Website</title>
</head>
<body>
    <!-- রিঅ্যাক্ট এই root ডিভের ভেতরেই সব রেন্ডার করবে -->
    <div id="root"></div>

    <!-- Load React and ReactDOM CDN -->
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    
    <!-- আমাদের নিজস্ব স্ক্রিপ্ট ফাইল -->
    <script src="increment.js"></script>
</body>
</html>
```

এখানে আমরা দুটি লাইব্রেরি লোড করেছি:
1. **React:** যা রিঅ্যাক্টের মূল লজিক ও স্টেট ডিক্লেয়ারেশন হ্যান্ডেল করে।
2. **ReactDOM:** যা রিঅ্যাক্ট এলিমেন্টগুলোকে ব্রাউজারের বাস্তব ডম (Real DOM)-এ প্রিন্ট বা রেন্ডার করে।

### React এবং ReactDOM আলাদা কেন?
রিঅ্যাক্ট একটি **Platform Agnostic** লাইব্রেরি। এর অর্থ হলো রিঅ্যাক্টের নিজস্ব কোনো প্ল্যাটফর্ম নেই। আমরা যদি এটি ব্রাউজারে ব্যবহার করি, তবে এর সাথে `ReactDOM` ব্যবহার করতে হয়। কিন্তু আমরা যদি এটি দিয়ে মোবাইল অ্যাপ তৈরি করতে চাই, তবে `ReactDOM`-এর পরিবর্তে `React Native` ব্যবহার করতে পারবো। এতে মূল কোড লজিকের প্রায় ৯০% একই থাকবে, শুধু রেন্ডারিং এর জায়গাটি পরিবর্তিত হবে।

**increment.js**
```javascript
console.log(React);    // এটি একটি জাভাস্ক্রিপ্ট অবজেক্ট
console.log(ReactDOM); // এটিও একটি অবজেক্ট যা ব্রাউজার ডমে রেন্ডার করতে সাহায্য করে

// root ডিভকে সিলেক্ট করা
const domContainer = document.querySelector("#root");

// ReactDOM.render মেথড দুটি প্যারামিটার নেয়: 
// ১. কী রেন্ডার করতে হবে (যেমন- 'Hello World')
// ২. কোথায় রেন্ডার করতে হবে (আমাদের ডম কন্টেইনার)
ReactDOM.render('Hello World', domContainer);
```

---

## ৫. React.createElement এবং ভার্চুয়াল ডম (Virtual DOM)

রিঅ্যাক্ট আমাদের ডাইনামিক এলিমেন্ট বানানোর জন্য `createElement` নামক একটি বিল্ট-ইন ফাংশন দেয়:

```javascript
const myElement = React.createElement("div", null, "Hello World");
ReactDOM.render(myElement, domContainer);
```

আমরা চাইলে নেস্টেড এলিমেন্টও তৈরি করতে পারি:
```javascript
const myElement = React.createElement(
  "div",
  null,
  React.createElement("p", null, "Hello World")
);
```

রিঅ্যাক্ট মেমরিতে এই এলিমেন্টগুলোর জোড়াতালি দিয়ে একটি ভার্চুয়াল ডম (Virtual DOM) তৈরি করে। কিন্তু এভাবে জাভাস্ক্রিপ্ট ফাংশন দিয়ে ডম স্ট্রাকচার লেখা বেশ কষ্টসাধ্য।

---

## ৬. JSX এবং বাবেল (Babel)

এই জটিলতা দূর করার জন্য রিঅ্যাক্ট নিয়ে এসেছে **JSX (JavaScript + XML)**। এটি দেখতে প্রায় সাধারণ HTML-এর মতোই, কিন্তু এটি আসলে জাভাস্ক্রিপ্ট এক্সপ্রেশন।

### JSX-এর একটি উদাহরণ:
```javascript
const myElement = (
  <div>
    <h1 id="display">0</h1>
    <button id="button">Increment +</button>
  </div>
);
```

এটি বাবেল (Babel) ট্রান্সপাইলারের মাধ্যমে কম্পাইল হয়ে নিচের কোডটিতে রূপান্তরিত হয়:
```javascript
React.createElement(
  "div",
  null,
  React.createElement("h1", { id: "display" }, "0"),
  React.createElement("button", { id: "button" }, "Increment +")
);
```

যেহেতু ব্রাউজার সরাসরি JSX বোঝে না, তাই আমাদের HTML ফাইলে **Babel** যুক্ত করতে হয় এবং স্ক্রিপ্ট ট্যাগের টাইপ দিতে হয় `text/babel`:

**index.html**
```html
<body>
    <div id="root"></div>

    <!-- React, ReactDOM & Babel Standalone CDN -->
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    
    <!-- type="text/babel" দিতে হবে -->
    <script type="text/babel" src="increment.js"></script>
</body>
```

---

## ৭. স্টেট (State) এবং useState Hook

রিঅ্যাক্ট অ্যাপ্লিকেশনে ডেটা ডাইনামিক করার জন্য আমরা **State** ব্যবহার করি। যখনই কোনো স্টেট পরিবর্তিত হয়, রিঅ্যাক্ট নিজে থেকেই সেই অনুযায়ী স্ক্রিনে তথ্য আপডেট করে দেয়।

স্টেট তৈরি করার জন্য রিঅ্যাক্টে `useState()` নামক হুক ব্যবহার করা হয়। এটি একটি ইনিশিয়াল ভ্যালু নিয়ে একটি অ্যারে রিটার্ন করে যার দুটি উপাদান থাকে:
1. বর্তমান স্টেট ভ্যালু (যেমন- `counter`)
2. স্টেট আপডেট করার ফাংশন (যেমন- `setCounter`)

**increment.js**
```javascript
const Increment = () => {
  // useState(0) দিয়ে ইনিশিয়াল ভ্যালু ০ সেট করা হলো
  const [counter, setCounter] = React.useState(0);

  return (
    <div>
      <h1 id="display">{counter}</h1>
      <div>
        <!-- onClick এর ভেতর অ্যারো ফাংশন ব্যবহার করে সেট কাউন্টার কল করা হয়েছে -->
        <button id="button" onClick={() => setCounter(counter + 1)}>
          Increment
        </button>
      </div>
    </div>
  );
};

// ReactDOM এ রেন্ডার করা
ReactDOM.render(<Increment />, domContainer);
```

> [!WARNING]
> যেহেতু এটি JSX, তাই এখানে `onclick` এর বদলে ক্যামেলকেস (camelCase) ফরম্যাটে `onClick` লিখতে হয়। এছাড়া এখানে সরাসরি `onClick={setCounter(counter + 1)}` লেখা যাবে না, কারণ এটি রেন্ডার হওয়ার সাথে সাথেই রান হয়ে যাবে। ইভেন্ট ট্রিগার করার জন্য সবসময় একটি ফাংশন রেফারেন্স (যেমন—`onClick={() => setCounter(counter + 1)}`) প্রদান করতে হবে।

---

## ৮. রিইউজেবল কম্পোনেন্ট (Reusable Component)

রিঅ্যাক্টের প্রধান সুবিধা হলো এর কম্পোনেন্টগুলো সম্পূর্ণ স্বাধীন এবং এদেরকে খুব সহজেই একাধিকবার ব্যবহার বা রিইউজ করা যায়। প্রতিটি কম্পোনেন্ট নিজের স্টেট আলাদাভাবে পরিচালনা করে।

```javascript
ReactDOM.render(
  <div className="container">
    <Increment />
    <Increment />
    <Increment />
  </div>,
  domContainer
);
```

এখানে ৩টি কাউন্টার তৈরি হবে এবং তাদের প্রত্যেকের মান সম্পূর্ণ আলাদাভাবে বৃদ্ধি পাবে। আমাদের কোনো আইডি পরিবর্তন করা বা ডম ম্যানিপুলেট করার প্রয়োজন হবে না। রিঅ্যাক্ট ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সবকিছু হ্যান্ডেল করবে।

# React.js Interview Questions & Answers (রিঅ্যাক্ট ইন্টারভিউ প্রস্তুতি)

> [!TIP]
> সফটওয়্যার ইঞ্জিনিয়ার এবং ফ্রন্টএন্ড ডেভেলপার (React.js) ইন্টারভিউয়ের জন্য সর্বাধিক জিজ্ঞাসিত প্রশ্নাবলী (FAQ), কোড উদাহরণ এবং বিস্তারিত সমাধান। এখানে বেসিক, ইন্টারমিডিয়েট, অ্যাডভান্সড এবং এপিআই হ্যান্ডলিং সংক্রান্ত বিষয়সমূহ সহজ বাংলায় সাজানো হয়েছে।

---

## সূচিপত্র (Table of Contents)

1. [মৌলিক প্রশ্নাবলী (Basic React Questions)](#১-মৌলিক-প্রশ্নাবলী-basic-react-questions)
2. [মধ্যবর্তী প্রশ্নাবলী (Intermediate React Questions)](#২-মধ্যবর্তী-প্রশ্নাবলী-intermediate-react-questions)
3. [অ্যাডভান্সড প্রশ্নাবলী (Advanced React Questions)](#৩-অ্যাডভান্সড-প্রশ্নাবলী-advanced-react-questions)
4. [এপিআই হ্যান্ডলিং কৌশল (API Handling Methods in React)](#৪-এপিআই-হ্যান্ডলিং-কৌশল-api-handling-methods-in-react)

---

## ১. মৌলিক প্রশ্নাবলী (Basic React Questions)

### Q1: React কী? এর মূল বৈশিষ্ট্যগুলো কী কী?
**উত্তর:**
React হলো একটি জনপ্রিয় **JavaScript Library** যা ইউজার ইন্টারফেস (UI) তৈরি করতে ব্যবহৃত হয়, বিশেষ করে Single-Page Applications (SPA)-এর জন্য। এটি ফেসবুক (Meta) তৈরি করেছে এবং পরিচালনা করে।

* **মূল বৈশিষ্ট্যসমূহ:**
  1. **Component-based Architecture:** UI-কে ছোট ছোট স্বাধীন কম্পোনেন্টে ভাগ করে কাজ করা।
  2. **Virtual DOM:** দ্রুত রেন্ডারিং ও পারফরম্যান্সের জন্য মেমোরিতে ডম কপি রাখা।
  3. **One-way Data Binding:** ডাটা ওপর থেকে নিচে (Parent to Child) একমুখী প্রবাহিত হয়।
  4. **JSX Syntax:** JavaScript-এর ভেতরে HTML-এর মতো কোড লেখার সুবিধা।
  5. **Declarative UI:** স্টেট পরিবর্তনের ওপর ভিত্তি করে ইউজার ইন্টারফেস স্বয়ংক্রিয়ভাবে আপডেট হয়।

---

### Q2: JSX কী এবং এটি কেন ব্যবহার করা হয়?
**উত্তর:**
JSX (JavaScript XML) হলো JavaScript-এর একটি Syntax Extension যা JS ফাইলের ভেতরে HTML-এর মতো লেআউট লেখার সুযোগ দেয়।
```jsx
const element = <h1>Hello, World!</h1>;
```
* **কেন ব্যবহার করব:**
  - কোড অনেক বেশি Readable এবং Clean হয়।
  - UI-কে সরাসরি Component লজিকের সাথে যুক্ত রাখা যায়।
  - ব্যাকএন্ডে **Babel** এই JSX-কে `React.createElement()` ফাংশনে ট্রান্সপাইল করে।

---

### Q3: React Component কয় প্রকার ও কী কী?
**উত্তর:**
React-এ মূলত ২ ধরনের কম্পোনেন্ট আছে:
1. **Functional Component:** সহজ পিওর JavaScript ফাংশন।
   ```jsx
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }
   ```
2. **Class Component:** ES6 Class ব্যবহার করে তৈরি করা কম্পোনেন্ট।
   ```jsx
   class Welcome extends React.Component {
     render() {
       return <h1>Hello, {this.props.name}</h1>;
     }
   }
   ```

---

### Q4: Functional Component ও Class Component এর মধ্যে পার্থক্য কী?
**উত্তর:**

| বিষয় | Functional Component | Class Component |
| :--- | :--- | :--- |
| **State Management** | `useState()` Hook দিয়ে হ্যান্ডেল হয়। | `this.state` এবং `this.setState()` দিয়ে হয়। |
| **Lifecycle** | `useEffect()` Hook দিয়ে হ্যান্ডেল হয়। | Lifecycle Methods (`componentDidMount` ইত্যাদি)। |
| **Syntax** | সাধারণ ফাংশন (Simple & Clean)। | ES6 Class। |
| **Performance** | লাইটওয়েট ও দ্রুত। | তুলনামূলক ভারী। |

---

### Q5: State ও Props এর মধ্যে পার্থক্য কী?
**উত্তর:**

| বিষয় | Props | State |
| :--- | :--- | :--- |
| **পরিবর্তনযোগ্যতা** | Read-only (পরিবর্তন করা যায় না)। | Mutable (পরিবর্তন করা যায়)। |
| **উৎস** | Parent component থেকে পাস করা হয়। | Component-এর নিজের ভেতরে ডিফাইন করা হয়। |
| **উদ্দেশ্য** | ডেটা পাস করার জন্য। | অভ্যন্তরীণ ডাটা স্টোর ও ম্যানেজ করতে। |

```jsx
// Props Example
function Greet(props) {
  return <h1>Hello, {props.name}</h1>;
}

// State Example
const [count, setCount] = useState(0);
```

---

### Q6: React এ কীভাবে State ম্যানেজ করা হয়?
**উত্তর:**
Functional Component-এ `useState()` Hook দিয়ে state ম্যানেজ করা হয়।
```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

---

### Q7: React Lifecycle Methods কী কী? (Class Component)
**উত্তর:**
* `componentDidMount()`: কম্পোনেন্ট ডমে মাউন্ট (Mount) হওয়ার পর একবার কল হয় (API Call-এর জন্য সেরা)।
* `componentDidUpdate()`: Props বা State আপডেট হওয়ার পর কল হয়।
* `componentWillUnmount()`: কম্পোনেন্ট ডম থেকে মুছে যাওয়ার (Unmount) ঠিক আগে কল হয় (Cleanup-এর জন্য)।

---

### Q8: React এ Event Handling কীভাবে কাজ করে?
**উত্তর:**
React-এ ইভেন্ট হ্যান্ডলিং সাধারণ HTML-এর মতোই, কিন্তু এতে **camelCase** ফরম্যাট (যেমন: `onClick`) ব্যবহৃত হয় এবং ইভেন্টের ডিফল্ট বিহেভিয়ার থামাতে ম্যানুয়ালি `e.preventDefault()` কল করতে হয়।
```jsx
function HandleClick() {
  const handleClick = (e) => {
    e.preventDefault();
    alert('Button clicked!');
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

---

### Q9: Keys in React কী এবং এটি কেন গুরুত্বপূর্ণ?
**উত্তর:**
React যখন কোনো লিস্ট রেন্ডার করে, তখন প্রতিটি আইটেমকে আলাদাভাবে চিহ্নিত করতে একটি ইউনিক **Key** প্রয়োজন হয়। 
* **গুরুত্ব:** Key থাকার ফলে React সহজেই বুঝতে পারে লিস্টের কোন আইটেমটি পরিবর্তিত, যোগ বা বাদ হয়েছে। এতে **Virtual DOM Diffing** দ্রুত হয় এবং পারফরম্যান্স ভালো থাকে।
```jsx
const items = ['React', 'Vue', 'Angular'];
items.map((item, index) => <li key={index}>{item}</li>);
```

---

### Q10: React এ List Render করার সঠিক উপায় কী?
**উত্তর:**
`Array.prototype.map()` ব্যবহার করে লিস্টের প্রতিটি ইলিমেন্টকে ইউনিক key সহ JSX ডমে রিটার্ন করতে হয়।
```jsx
const names = ['Rokon', 'Nayeem', 'Shakib'];

function NameList() {
  return (
    <ul>
      {names.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
    </ul>
  );
}
```

---

## ২. মধ্যবর্তী প্রশ্নাবলী (Intermediate React Questions)

### Q11: React Hook কী?
**উত্তর:**
Hooks হলো JavaScript ফাংশন যা Class Component না লিখেও Functional Component-এ State এবং অন্যান্য React ফিচার (যেমন: Lifecycle, Context) ব্যবহার করার সুবিধা দেয়।

* **প্রধান Hooks:**
  - `useState()`: State ব্যবস্থাপনার জন্য।
  - `useEffect()`: Side-effects (API call, Event listener) হ্যান্ডেল করতে।
  - `useContext()`: Context API ডাটা পড়ার জন্য।
  - `useRef()`: DOM Element সরাসরি রেফার করতে।
  - `useReducer()`: জটিল স্টেট লজিক ম্যানেজ করার জন্য।

---

### Q12: `useState` ও `useEffect` এর ব্যবহার ব্যাখ্যা কর।
**উত্তর:**
* **`useState` (State Management):**
  ```jsx
  const [count, setCount] = useState(0);
  ```
* **`useEffect` (Side Effects & Cleanup):**
  ```jsx
  import { useEffect, useState } from 'react';

  function Timer() {
    const [time, setTime] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => setTime(t => t + 1), 1000);
      return () => clearInterval(interval); // Cleanup on Unmount
    }, []); // Empty Dependency Array = Mount-এ একবার চলবে

    return <p>Time: {time}s</p>;
  }
  ```

---

### Q13: Controlled vs Uncontrolled Components-এর পার্থক্য কি?
**উত্তর:**

| বিষয় | Controlled Component | Uncontrolled Component |
| :--- | :--- | :--- |
| **Data Control** | React State দ্বারা সম্পূর্ণ নিয়ন্ত্রিত। | ডম (DOM) নিজে নিয়ন্ত্রণ করে। |
| **Data Access** | `value={state}` + `onChange` | `ref` বা `defaultValue` দিয়ে। |

```jsx
// Controlled Input
<input value={name} onChange={e => setName(e.target.value)} />

// Uncontrolled Input
<input defaultValue="Rokon" ref={inputRef} />
```

---

### Q14: React Context API কী এবং এটি কখন ব্যবহার করব?
**উত্তর:**
Context API হলো এমন একটি গ্লোবাল স্টেট সিস্টেম যা দিয়ে **Prop Drilling** (প্রতিটি লেভেলে ম্যানুয়ালি প্রপস পাস করা) ছাড়াই সরাসরি যেকোনো চাইল্ড কম্পোনেন্টে ডাটা পাস করা যায়।
* **কখন ব্যবহার করব:** থিম পরিবর্তন (Light/Dark Mode), ইউজার অথেন্টিকেশন তথ্য, ভাষা পছন্দ (Localization) ইত্যাদিতে।

```jsx
const ThemeContext = React.createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Button Theme: {theme}</button>;
}
```

---

### Q15: Lifting State Up কি?
**উত্তর:**
যখন একাধিক চাইল্ড কম্পোনেন্টের মধ্যে একই ডাটা শেয়ার করার প্রয়োজন হয়, তখন স্টেটটিকে চাইল্ড কম্পোনেন্ট থেকে সরিয়ে তাদের কমন প্যারেন্ট (Common Parent Component)-এ নিয়ে যাওয়াকেই **Lifting State Up** বলা হয়।

---

### Q16: Custom Hook কী এবং কখন বানানো উচিত?
**উত্তর:**
Custom Hook হলো একটি রিইউজেবল JavaScript ফাংশন যা নিজের ভেতরে অন্যান্য React Hooks ব্যবহার করে কোনো একটি নির্দিষ্ট লজিক আলাদা করে রাখে এবং কোড রিপিটেশন কমায়।

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// Component-এ ব্যবহার
const width = useWindowWidth();
```

---

### Q17: React Router কীভাবে কাজ করে?
**উত্তর:**
React Router হলো SPA-এর জন্য নেভিগেশন লাইব্রেরি, যা পুরো পেজ রিলোড না করেই ডাইনামিকালি কম্পোনেন্ট রেন্ডার করে ইউআরএল (URL) চেঞ্জ করতে সাহায্য করে।

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Q18: Redux কী এবং এটি কীভাবে কাজ করে?
**উত্তর:**
Redux হলো বড় অ্যাপ্লিকেশনের গ্লোবাল স্টেট পরিচালনার একটি Predictable State Container।

* **Redux Flow:**
  $$\text{Component} \xrightarrow{\text{Dispatch}} \text{Action} \rightarrow \text{Reducer} \rightarrow \text{New State Store} \rightarrow \text{UI Update}$$

---

### Q19: HOC (Higher Order Component) কী?
**উত্তর:**
HOC হলো এমন একটি ফাংশন যা একটি Component-কে ইনপুট হিসেবে গ্রহণ করে এবং নতুন অতিরিক্ত ফিচারযুক্ত অন্য একটি Component রিটার্ন করে।
```jsx
function withLogger(WrappedComponent) {
  return function(props) {
    console.log('Rendering component:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}
```

---

### Q20: React এ Memoization কী এবং কীভাবে করা যায়?
**উত্তর:**
Memoization হলো ইনপুট অপরিবর্তিত থাকলে আগের হিসাব করা ফলাফল ক্যাশ (Cache) থেকে ফিরিয়ে আনা।

* **উপায়সমূহ:**
  1. `React.memo()`: Component-এর Unnecessary Re-render বন্ধ করতে।
  2. `useMemo()`: ভারী বা ব্যয়বহুল ক্যালকুলেশনের ভ্যালু ক্যাশ করতে।
  3. `useCallback()`: ফাংশন রেফারেন্স ক্যাশ করতে।

---

## ৩. অ্যাডভান্সড প্রশ্নাবলী (Advanced React Questions)

### Q21: Virtual DOM কীভাবে কাজ করে?
**উত্তর:**
Virtual DOM হলো আসল DOM-এর একটি মেমোরি কপি। 
1. কোনো স্টেট চেঞ্জ হলে React প্রথমে নতুন একটি Virtual DOM Tree তৈরি করে।
2. **Diffing Algorithm** ব্যবহার করে আগের Virtual DOM-এর সাথে নতুন ভার্সনের তুলনা করে।
3. কেবল পরিবর্তিত অংশটুকু হিসাব করে রিয়েল DOM-এ অত্যন্ত দ্রুত আপডেট (Reconciliation) করে।

---

### Q22: React Fiber কী?
**উত্তর:**
React Fiber হলো React 16 থেকে প্রবর্তিত নতুন **Core Rendering Engine**। এটি Asynchronous Rendering, Priority-based Rendering এবং ইন্টারাপশন এলাউ করে যাতে এনিমেশন বা ইউজার ইনপুট চলাকালীন অ্যাপ স্লো না হয়।

---

### Q23: Concurrent Mode কী?
**উত্তর:**
Concurrent Mode হলো React-এর একটি সেট সুবিধা যা React-কে রেন্ডারিং এর কাজ প্রয়োজনবোধে পজ (Pause), অ্যাবর্ট (Abort) বা রিস্টার্ট করার ক্ষমতা দেয়। (React 18+ এ `createRoot` এর মাধ্যমে এটি ডিফল্টভাবে যুক্ত থাকে)।

---

### Q24: Reconciliation Process কীভাবে কাজ করে?
**উত্তর:**
Reconciliation হলো React-এর Virtual DOM Diffing প্রক্রিয়া। এটি Shallow Comparison এবং Keys-এর ওপর ভিত্তি করে নিশ্চিত করে যে সম্পূর্ণ ডম রি-রেন্ডার না করে কেবল পরিবর্তিত নোডটুকু রিয়েল ডমে আপডেট হবে।

---

### Q25: `useEffect()` এবং `useLayoutEffect()` এর মধ্যে পার্থক্য কি?
**উত্তর:**

| বিষয় | `useEffect()` | `useLayoutEffect()` |
| :--- | :--- | :--- |
| **Timing** | ব্রাউজার স্ক্রিন Paint করার পর চলে। | ব্রাউজার স্ক্রিন Paint করার ঠিক আগে চলে। |
| **Execution** | Non-blocking (Asynchronous). | Blocking (Synchronous, Render block করে)। |
| **Use Case** | API Calls, Event Subscriptions. | DOM measurement, Animations, Layout measurement. |

---

### Q26: SSR বনাম CSR (Server-side Rendering vs Client-side Rendering)
**উত্তর:**

| বিষয় | SSR (Server-side Rendering) | CSR (Client-side Rendering) |
| :--- | :--- | :--- |
| **HTML Generation** | সার্ভারে সম্পূর্ণ HTML তৈরি হয়ে ব্রাউজারে আসে। | ব্রাউজারে ফাঁকা HTML আসে, JS চালিয়ে রেন্ডার হয়। |
| **SEO** | অত্যন্ত চমৎকার। | সার্চ ইঞ্জিনের জন্য তুলনামূলক দুর্বল। |
| **Initial Load Speed** | ফাস্ট ফার্স্ট কন্টেন্টফুল পেইন্ট। | বড় JS বান্ডেল ডাউনলোড হওয়া পর্যন্ত স্লো। |
| **Framework Examples** | Next.js | React SPA (Vite / CRA) |

---

### Q27: React Suspense ও Lazy Loading কী?
**উত্তর:**
* **`React.lazy()`**: প্রয়োজন ছাড়া কোনো কম্পোনেন্ট ডাউনলোড না করে অন-ডিমান্ড বা Lazy-load করার উপায়।
* **`Suspense`**: Lazy component ডাউনলোডের সময় Fallback Loader দেখানোর জন্য ব্যবহৃত হয়।

```jsx
import React, { Suspense, lazy } from 'react';

const About = lazy(() => import('./About'));

function App() {
  return (
    <Suspense fallback={<p>Loading component...</p>}>
      <About />
    </Suspense>
  );
}
```

---

### Q28: React Portals কী?
**উত্তর:**
React Portals এমন একটি সুবিধা যা প্যারেন্ট ডম ট্রির মূল হাইরার্কির বাইরে গিয়ে অন্য যেকোনো DOM Node (যেমন: `modal-root`)-এ চাইল্ড কম্পোনেন্ট রেন্ডার করতে দেয়। এটি Modals, Tooltips, Popovers তৈরির জন্য ব্যবহৃত হয়।
```jsx
ReactDOM.createPortal(
  <ModalContent />,
  document.getElementById('modal-root')
);
```

---

### Q29: Error Boundaries in React কী?
**উত্তর:**
Error Boundary হলো এমন কম্পোনেন্ট যা চাইল্ড কম্পোনেন্ট ট্রিতে যেকোনো জায়গায় রানটাইম JavaScript ভুল (Error) ধরা পড়লে পুরো অ্যাপ ক্র্যাশ না করিয়ে একটি সুন্দর Fallback UI দেখায়। 
*(এটি তৈরি করতে Class Component-এর `static getDerivedStateFromError()` এবং `componentDidCatch()` ব্যবহার করতে হয়)।*

---

### Q30: React Application Performance Optimize করার উপায় কি কি?
**উত্তর:**
1. **`React.memo()`**, **`useMemo()`**, **`useCallback()`** ব্যবহার করা।
2. Code Splitting ও Lazy Loading (`React.lazy`, `Suspense`) করা।
3. বড় লিস্টের জন্য Windowing/Virtualization (`react-window`) ব্যবহার করা।
4. Image Optimization এবং Asset Optimization।
5. SEO এবং ফাস্ট পারফরম্যান্সের জন্য SSR (Next.js) গ্রহণ করা।

---

## ৪. এপিআই হ্যান্ডলিং কৌশল (API Handling Methods in React)

### Q31: React-এ কি কি পদ্ধতিতে API Handle করা হয়?
**উত্তর:**
React-এ এপিআই হ্যান্ডেল করার ৭টি জনপ্রিয় পদ্ধতি নিচে সংক্ষেপে ও উদাহরণসহ দেওয়া হলো:

#### ১. Fetch API (Built-in)
কোনো থার্ড-পার্টি প্যাকেজ ছাড়াই JavaScript-এর নিজস্ব `fetch()` দিয়ে।
```jsx
useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error(err));
}, []);
```

#### ২. Axios (Popular HTTP Client)
JSON অটো-পার্সিং, ইন্টারসেপ্টর এবং শক্তিশালী এরর হ্যান্ডলিং সুবিধা দেয়।
```jsx
import axios from 'axios';

useEffect(() => {
  axios.get('https://api.example.com/data')
    .then(res => setData(res.data))
    .catch(err => console.error(err));
}, []);
```

#### ৩. Async/Await Syntax
`.then().catch()` এর চেয়ে পরিষ্কার ও পড়া সহজ।
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch('https://api.example.com/data');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchData();
}, []);
```

#### ৪. React Query (TanStack Query - State & Cache Management)
অটোমেটিক ক্যাশিং, ব্যাকগ্রাউন্ড ফেচিং, রিট্রাই ও পেজিনেশনের জন্য আধুনিক মানদণ্ড।
```jsx
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('https://api.example.com/users').then(res => res.json()),
});
```

#### ৫. Redux Toolkit + RTK Query
Redux ভিত্তিক গ্লোবাল স্টেট প্রজেক্টে এপিআই স্ল্যেইস তৈরির সবচেয়ে শক্তিশালী সমাধান।

#### ৬. SWR (by Vercel)
লাইটওয়েট রিয়েল-টাইম ক্যাশিং ও অটোরেভিডেশন লাইব্রেরি।
```jsx
import useSWR from 'swr';
const fetcher = url => fetch(url).then(res => res.json());

const { data, error } = useSWR('https://api.example.com/data', fetcher);
```

#### ৭. Custom Hooks for API
ফাংশনালিটি বিভিন্ন কম্পোনেন্টে বারবার রিইউজ করার জন্য।

---

### 📊 API Handling Methods Comparison Table

| পদ্ধতি | ক্যাশিং সুবিধা | অটো JSON পার্স | জটিলতা | উপযুক্ত ব্যবহারের ক্ষেত্র |
| :--- | :--- | :--- | :--- | :--- |
| **Fetch API** | ❌ নেই | ❌ না (ম্যানুয়াল) | খুব সহজ | ছোট ও প্রাথমিক প্রজেক্ট |
| **Axios** | ❌ নেই | ✅ হ্যাঁ | সহজ | মধ্যম মানের প্রজেক্ট |
| **React Query** | ✅ অত্যন্ত শক্তিশালী | ✅ হ্যাঁ | মাঝারি | বড় ও জটিল ওয়েব অ্যাপ |
| **RTK Query** | ✅ অত্যন্ত শক্তিশালী | ✅ হ্যাঁ | কড়া (Redux) | বড় Redux প্রজেক্ট |
| **SWR** | ✅ ভালো | ❌ না | সহজ | লাইটওয়েট ডাইনামিক অ্যাপ |

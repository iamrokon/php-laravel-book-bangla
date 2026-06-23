# রিঅ্যাক্ট হুকস (React Hooks)

২০১৩ সালে যখন রিঅ্যাক্ট প্রথম রিলিজ হয়, তখন রিঅ্যাক্টে স্টেট ও লাইফসাইকেল মেথড ব্যবহারের জন্য `React.createClass()` মেথড ব্যবহার করা হতো। ২০১৫ সালে ES6 ক্লাসের পরিচিতির পর রিঅ্যাক্ট ক্লাস কম্পোনেন্ট (`class MyComponent extends React.Component`) নিয়ে আসে। কিন্তু ক্লাস কম্পোনেন্ট ব্যবহারের কিছু বড় অসুবিধা বা সীমাবদ্ধতা ছিল।

এই সীমাবদ্ধতাগুলো দূর করার জন্য ২০১৯ সালে রিঅ্যাক্ট সংস্করণ **১৬.৮**-এ **React Hooks** নিয়ে আসে। রিঅ্যাক্ট হুকস হলো সাধারণ জাভাস্ক্রিপ্ট ফাংশন (Simple JavaScript Functions), যা ক্লাস কম্পোনেন্ট না লিখেই স্টেট এবং অন্যান্য রিঅ্যাক্ট ফিচার ব্যবহারের সুযোগ করে দেয়।

---

## ১. ক্লাস কম্পোনেন্টের সীমাবদ্ধতা (Why Hooks?)

ক্লাস কম্পোনেন্ট দীর্ঘদিন ব্যবহৃত হলেও এর মধ্যে কিছু বড় সমস্যা লক্ষ্য করা যায়:

1. **কনস্ট্রাক্টর ও বয়লারপ্লেট কোড (Constructor & Boilerplate):** প্রতিটি ক্লাস কম্পোনেন্টে `constructor` ও `super(props)` লিখতে হয়। মেথডগুলো ব্যবহার করতে হলে `this.updateTodos = this.updateTodos.bind(this)` এর মতো ম্যানুয়ালি বাইন্ড করতে হয় (যদিও পরবর্তীতে ক্লাস ফিল্ড সিনট্যাক্স এটি সহজ করেছে)।
2. **লাইফসাইকেল মেথডের বিক্ষিপ্ততা (Split Lifecycle Logic):** একই লজিক বা সাইড ইফেক্টের কাজ (যেমন: ডেটা ফেচ করা বা টাইমার চালানো) ৩টি আলাদা মেথডে (`componentDidMount`, `componentDidUpdate`, এবং `componentWillUnmount`) ভাগ করে লিখতে হতো। ফলে একই ধরনের কোড বারবার ডুপ্লিকেট করতে হতো।
3. **কমন লজিক শেয়ার করার জটিলতা (Wrapper Hell):** একাধিক কম্পোনেন্টের মধ্যে কমন লজিক শেয়ার করার জন্য আমরা হায়ার অর্ডার কম্পোনেন্ট (HOC) বা রেন্ডার প্রপস ব্যবহার করতাম। এর ফলে কম্পোনেন্ট ট্রিতে অতিরিক্ত র‍্যাপার বা নেস্টিং তৈরি হতো (যাকে **Wrapper Hell** বলা হয়)।

```javascript
// রেন্ডার প্রপস ব্যবহারের ফলে তৈরি হওয়া নেস্টিং বা র‍্যাপার হেল:
function Counter() {
  return (
    <ComponentA>
      {(dataA) => (
        <ComponentB>
          {(dataB) => (
            <ComponentC>
              {(dataC) => (
                <div>{dataA} {dataB} {dataC}</div>
              )}
            </ComponentC>
          )}
        </ComponentB>
      )}
    </ComponentA>
  );
}
```

রিঅ্যাক্ট হুকস এই সমস্ত সমস্যা সমাধান করে সাধারণ ফাংশনাল কম্পোনেন্টেই ডাইনামিক স্টেট ও সাইড ইফেক্ট ব্যবহারের সুবিধা এনে দিয়েছে।

---

## ২. useState হুক

স্টেট ডিফাইন এবং পরিবর্তন করার জন্য ফাংশনাল কম্পোনেন্টে `useState` হুক ব্যবহার করা হয়। এটি একটি অ্যারে রিটার্ন করে, যা আমরা **Array Destructuring** এর মাধ্যমে ডিক্লেয়ার করি।

```javascript
const [state, setState] = useState(initialValue);
```
- `state`: বর্তমান স্টেটের ভ্যালু।
- `setState`: স্টেট পরিবর্তন করার ফাংশন।
- `initialValue`: স্টেটের প্রাথমিক মান।

### ক্লাস কম্পোনেন্ট বনাম ফাংশনাল কম্পোনেন্ট (useState রূপান্তর)

চলুন একটি ইনপুট ফিল্ড ও ওয়ার্নিং টেক্সটযুক্ত ক্লাস কম্পোনেন্টকে ফাংশনাল কম্পোনেন্টে রূপান্তর করে দেখি:

**ক্লাস কম্পোনেন্ট (`TodoClass.js`):**
```javascript
import React from 'react';

export default class TodoClass extends React.Component {
  state = {
    todo: '',
    warning: null
  };

  handleInput = (e) => {
    const inputValue = e.target.value;
    const warning = inputValue.includes('.js')
      ? 'You need JavaScript skill to complete this task.' 
      : null;

    this.setState({
      todo: inputValue,
      warning
    });
  };

  render() {
    const { todo, warning } = this.state;
    return (
      <div>
        <p>{todo}</p>
        <textarea name="todo" value={todo} onChange={this.handleInput} />
        <h2>{warning || 'Good choice'}</h2>
      </div>
    );
  }
}
```

**ফাংশনাল কম্পোনেন্ট (`Todo.js`):**
```javascript
import React, { useState } from 'react';

export default function Todo() {
  const [todo, setTodo] = useState('');
  const [warning, setWarning] = useState(null);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    const updatedWarning = inputValue.includes('.js')
      ? 'You need JavaScript skill to complete this task.'
      : null;

    setTodo(inputValue);
    setWarning(updatedWarning);
  };

  return (
    <div>
      <p>{todo}</p>
      <textarea name="todo" value={todo} onChange={handleInput} />
      <h2>{warning || 'Good choice!'}</h2>
    </div>
  );
}
```

---

## ৩. রিভার্স ইঞ্জিনিয়ারিং: কীভাবে `useState` কাজ করে?

রিঅ্যাক্ট কীভাবে ইন্টারনালি একাধিক হুক বা স্টেট ট্র‍্যাক করে তা বোঝার জন্য আমরা নিজেরা একটি ছোট `useState` ফাংশন ইমপ্লিমেন্ট করব। রিঅ্যাক্ট মূলত প্রতিটি স্টেটের ভ্যালু এবং সেটার (setter) ফাংশন একটি অ্যারে ও ইনডেক্স ট্র্যাকিংয়ের মাধ্যমে মনে রাখে।

**src/index.js**
```javascript
let states = []; // স্টেটগুলোর মান ও সেটার স্টোর করার অ্যারে
let stateIndex = -1; // বর্তমান স্টেটের ইনডেক্স ট্র্যাকার

function useState(defaultValue) {
  const index = ++stateIndex;
  
  // যদি এই ইনডেক্সে আগে থেকেই স্টেট স্টোর করা থাকে, তবে সেটিই রিটার্ন করব
  if (states[index]) return states[index];

  // নতুন স্টেট সেট করার জন্য setValue ফাংশন
  const setValue = (newValue) => {
    states[index][0] = newValue;
    renderApp(); // স্টেট পরিবর্তনের পর পুনরায় অ্যাপ রেন্ডার করা হবে
  };

  const returnArray = [defaultValue, setValue];
  states[index] = returnArray;
  return returnArray;
}

function App() {
  const [todo, setTodo] = useState("");
  const [warning, setWarning] = useState(null);

  const handleInput = (e) => {
    const inputValue = e.target.value;
    const updatedWarning = inputValue.includes('.js')
      ? 'You need JavaScript skill.'
      : null;
    setTodo(inputValue);
    setWarning(updatedWarning);
  };

  return (
    <div>
      <p>{todo}</p>
      <textarea value={todo} onChange={handleInput} />
      <h2>{warning || 'Good choice!'}</h2>
    </div>
  );
}

function renderApp() {
  stateIndex = -1; // রেন্ডার করার পূর্বে ইনডেক্স রিসেট করা আবশ্যক
  ReactDOM.render(<App />, document.getElementById('root'));
}
```

> [!IMPORTANT]
> **হুকস ব্যবহারের নিয়মাবলী (Rules of Hooks):**
> উপরের ইমপ্লিমেন্টেশন থেকে স্পষ্ট যে রিঅ্যাক্ট সম্পূর্ণ ইনডেক্স ও সিকোয়েন্সের (১ম হুক, ২য় হুক...) ওপর ভিত্তি করে ডেটা মনে রাখে। এ কারণে:
> 1. **Top-Level এ কল করতে হবে:** হুকস কখনো কোনো কন্ডিশনাল ব্লক (`if`), লুপ বা নেস্টেড ফাংশনের ভেতরে কল করা যাবে না। হুকসের অর্ডার পরিবর্তন হলে স্টেট ট্র্যাকিং ও ডেটা ওলটপালট হয়ে যাবে।
> 2. **কেবল রিঅ্যাক্ট ফাংশনে ব্যবহারযোগ্য:** হুকস সাধারণ জাভাস্ক্রিপ্ট ফাংশনে বা ক্লাস কম্পোনেন্টের ভেতরে কাজ করবে না। এটি কেবল রিঅ্যাক্ট ফাংশনাল কম্পোনেন্ট বা কাস্টম হুকের ভেতরে ব্যবহার করতে হবে।

---

## ৪. useState ব্যবহারের গুরুত্বপূর্ণ গাইডলাইন

### ক. স্টেট মার্জ বনাম রিপ্লেস (Merge vs Replace)
ক্লাস কম্পোনেন্টে `setState` ব্যবহারের সময় রিঅ্যাক্ট স্বয়ংক্রিয়ভাবে অবজেক্টের বাকি প্রপার্টিগুলো মার্জ (merge) করে রাখত। কিন্তু `useState` এর সেটার ফাংশন স্বয়ংক্রিয় মার্জ করে না, বরং পুরো ভ্যালুকে প্রতিস্থাপন বা রিপ্লেস করে ফেলে।

তাই স্টেটের কোনো অবজেক্ট আপডেট করার সময় পূর্বের ভ্যালু ধরে রাখতে আমাদের স্প্রেড অপারেটর (`...`) ব্যবহার করতে হবে:

```javascript
import React, { useState } from 'react';

function Todo() {
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  });

  const { title, description } = todo;

  return (
    <div>
      <p>{title}</p>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTodo({ ...todo, title: e.target.value })} 
      />
      <p>{description}</p>
      <textarea 
        value={description} 
        onChange={(e) => setTodo({ ...todo, description: e.target.value })} 
      />
    </div>
  );
}
```

### খ. prevState ব্যবহার করা
স্টেট যদি পূর্ববর্তী স্টেটের ওপর নির্ভর করে আপডেট করতে হয় (যেমন: লুপ বা ব্যাচ আপডেটের সময়), তখন সরাসরি সেটার ফাংশনের ভেতর কলব্যাক ব্যবহার করে `prevState` দিয়ে আপডেট করতে হবে। অন্যথায় রিঅ্যাক্ট ব্যাচিং প্রসেসের কারণে ভুল ডেটা রেন্ডার হতে পারে।

**src/components/Counter.js**
```javascript
import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const addFive = () => {
    let i = 0;
    while (i < 5) {
      // সঠিক পদ্ধতি: prevState ব্যবহার করে স্টেট আপডেট
      setCount((prevState) => prevState + 1);
      i++;
    }
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Add 1</button>
      <button onClick={addFive}>Add 5</button>
    </div>
  );
}
```

---

## ৫. useEffect হুক

রিঅ্যাক্টের প্রধান কাজ হলো ইউজার ইন্টারফেস (UI) রেন্ডার করা এবং ব্যবহারকারীর ইনপুট গ্রহণ করা। এর বাইরে যেকোনো কাজ—যেমন এপিআই থেকে ডেটা আনা (Data fetching), ডম ম্যানিপুলেশন (DOM update), কিংবা টাইমার সেট করা—এদেরকে বলা হয় **সাইড ইফেক্ট (Side Effects)**। ফাংশনাল কম্পোনেন্টে এই সাইড ইফেক্ট হ্যান্ডেল করার জন্য `useEffect` হুক ব্যবহার করা হয়।

`useEffect` ক্লাস কম্পোনেন্টের `componentDidMount`, `componentDidUpdate`, এবং `componentWillUnmount` এই ৩টি লাইফসাইকেল মেথডকে একটি একক হুকের মাধ্যমে প্রতিস্থাপন করে।

### ক. Dependency Array ও রেন্ডার কন্ট্রোল
`useEffect` হুক প্যারামিটার হিসেবে একটি কলব্যাক ফাংশন এবং ২য় প্যারামিটার হিসেবে একটি ডিপেন্ডেন্সি অ্যারে (`dependency array`) গ্রহণ করে।

```javascript
import React, { useState, useEffect } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // এই সাইড ইফেক্টটি কেবল তখনই রান করবে যখন count পরিবর্তিত হবে
  useEffect(() => {
    console.log('updating document title');
    document.title = `Clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}
```

### খ. componentDidMount এর মতো একবার রান করা
ডিপেন্ডেন্সি হিসেবে যদি একটি খালি অ্যারে `[]` দেওয়া হয়, তবে ভেতরের লজিকটি কেবল প্রথমবার কম্পোনেন্ট মাউন্ট হওয়ার সময় একবারই রান করবে।

```javascript
useEffect(() => {
  console.log('starting timer');
  const interval = setInterval(tick, 1000);
}, []); // খালি অ্যারে দেওয়ার কারণে টাইমার কেবল একবারই সেট হবে
```

### গ. সাইড ইফেক্ট ক্লিনআপ (WillUnmount)
টাইমার বা কোনো সাবস্ক্রিপশন চালু রাখলে কম্পোনেন্ট আনমাউন্ট হয়ে গেলেও ব্যাকগ্রাউন্ডে সেটি চলতে থাকে, যা **Memory Leak** তৈরি করে। এটি এড়াতে `useEffect`-এর রিটার্ন কলব্যাক ফাংশন ব্যবহার করতে হবে, যা ক্লাস কম্পোনেন্টের `componentWillUnmount`-এর মতো সাইড ইফেক্টগুলো ক্লিন করে দেয়।

```javascript
import React, { useState, useEffect } from 'react';

export default function MyComponent() {
  const [date, setDate] = useState(new Date());

  const tick = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const interval = setInterval(tick, 1000);

    // cleanup function: কম্পোনেন্ট আনমাউন্ট হওয়ার সময় টাইমার বন্ধ করবে
    return () => {
      console.log('timer cleared');
      clearInterval(interval);
    };
  }, []);

  return <p>Time: {date.toLocaleTimeString()}</p>;
}
```

---

## ৬. useCallback ও useMemo হুক (Performance Optimization)

রিঅ্যাক্ট ফাংশনাল কম্পোনেন্ট প্রতিবার রেন্ডার হওয়ার সময় এর ভেতরের সমস্ত ভেরিয়েবল এবং ফাংশন পুনরায় নতুন রেফারেন্স হিসেবে তৈরি হয়। এর ফলে চাইল্ড কম্পোনেন্টগুলোতে যদি কোনো ফাংশন বা অবজেক্ট প্রপস হিসেবে পাঠানো হয়, তবে চাইল্ড কম্পোনেন্টগুলো অপ্রয়োজনীয়ভাবে পুনরায় রেন্ডার হতে বাধ্য হয়।

এই সমস্যা সমাধানের জন্য রিঅ্যাক্ট ৩টি অপটিমাইজেশন টুল দেয়:
1. **`React.memo`:** এটি একটি Higher-Order Component যা চাইল্ড কম্পোনেন্টের প্রপস পরিবর্তন না হলে রি-রেন্ডার হওয়া ঠেকায়।
2. **`useCallback`:** এটি কোনো ফাংশনের রেফারেন্সকে মেমোরাইজ বা ক্যাশ করে রাখে, যাতে প্রতি রেন্ডারে নতুন রেফারেন্স তৈরি না হয়।
3. **`useMemo`:** এটি কোনো হেভি বা এক্সপেনসিভ ক্যালকুলেশনের ভ্যালুকে ক্যাশ করে রাখে।

### সমস্যা পরিচিতি: রেফারেন্সিয়াল ইকুয়ালিটি (Referential Equality)

**src/App.js**
```javascript
import React, { useState, useCallback } from 'react';
import Title from './components/Title';
import ShowCount from './components/ShowCount';
import Button from './components/Button';

export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // useCallback ছাড়া প্রতি রেন্ডারে এই ফাংশনগুলোর নতুন রেফারেন্স তৈরি হয়
  const incrementByOne = useCallback(() => {
    setCount1((prevCount) => prevCount + 1);
  }, []);

  const incrementByFive = useCallback(() => {
    setCount2((prevCount) => prevCount + 5);
  }, []);

  return (
    <div>
      <Title />
      <ShowCount count={count1} title="Counter 1" />
      <Button handleClick={incrementByOne}>Increment By One</Button>
      <hr />
      <ShowCount count={count2} title="Counter 2" />
      <Button handleClick={incrementByFive}>Increment By Five</Button>
    </div>
  );
}
```

### কেন `React.memo` একা যথেষ্ট নয়?
আমরা যদি `Title`, `ShowCount` এবং `Button` কম্পোনেন্টগুলোকে `React.memo` দিয়ে এক্সপোর্ট করি (যেমন: `export default React.memo(Button)`), তবুও বাটন ক্লিক করলে অন্যান্য বাটনগুলো রি-রেন্ডার হবে। 

এর কারণ জাভাস্ক্রিপ্টে দুটি ফাংশন দেখতে এক হলেও রেফারেন্সিয়াল তুলনা করলে তারা সমান নয় (`function() {} !== function() {}`)। প্রতি রেন্ডারে `incrementByOne` এবং `incrementByFive` এর নতুন মেমোরি রেফারেন্স তৈরি হয়। ফলে `React.memo` মনে করে প্রপস পরিবর্তিত হয়েছে এবং চাইল্ড বাটন পুনরায় রেন্ডার করে।

**সমাধান:** ফাংশনগুলোকে `useCallback` দিয়ে মুড়ে দিলে রিঅ্যাক্ট প্রথম রেন্ডারের পর থেকে ফাংশনের রেফারেন্সটি ক্যাশ করে রাখবে এবং দ্বিতীয় বাটন ক্লিক করলে কেবল দ্বিতীয় বাটনের লজিকটুকুই রেন্ডার হবে, বাকি সমস্ত কম্পোনেন্ট অপরিবর্তিত থাকবে।

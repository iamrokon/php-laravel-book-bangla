# রিঅ্যাক্ট কনটেক্সট এপিআই (React Context API)

রিঅ্যাক্ট অ্যাপ্লিকেশনে ডেটা বা স্টেট সাধারণত প্রপসের (Props) মাধ্যমে প্যারেন্ট কম্পোনেন্ট থেকে চাইল্ড কম্পোনেন্টে পাঠানো হয়। কিন্তু অ্যাপ্লিকেশন যখন বড় হতে থাকে, তখন কোনো কোনো ডেটা (যেমন: ইউজার থিম, লগইন ইনফরমেশন, ল্যাঙ্গুয়েজ ইত্যাদি) একদম নিচের স্তরের কম্পোনেন্টে পাঠানোর প্রয়োজন হতে পারে। এই ডেটাগুলো মাঝখানের সমস্ত কম্পোনেন্টের মধ্য দিয়ে জোড়পূর্বক পাস করার প্রক্রিয়াকে বলা হয় **প্রপস ড্রিলিং (Props Drilling)**। 

এই প্রপস ড্রিলিং সমস্যার একটি চমৎকার এবং ক্লিন সমাধান হলো **React Context API**। এর মাধ্যমে আমরা যেকোনো ডেটা গ্লোবালি স্টোর করে রাখতে পারি এবং প্রজেক্টের যেকোনো চাইল্ড কম্পোনেন্ট থেকে সরাসরি সেটি কনজিউম বা ব্যবহার করতে পারি।

---

## ১. সমস্যা পরিচিতি: প্রপস ড্রিলিং (Props Drilling)

ধরা যাক, আমাদের অ্যাপ্লিকেশনে একটি থিম চেঞ্জার ফিচার রয়েছে এবং আমাদের কম্পোনেন্ট হায়ারার্কি নিচে দেওয়া রূপ ধারণ করেছে:
```
[App] ──> [Section] ──> [Content] ──> [HoverCounter]
```
এখানে `App` কম্পোনেন্টে থিমের স্টেট আছে, যা আমাদের শেষ চাইল্ড `HoverCounter`-এ রিড করতে হবে।

চলুন ট্র্যাডিশনাল কোড স্ট্রাকচারটি দেখে নিই:

**src/components/HoverCounter.js**
```javascript
export default function HoverCounter({ count, incrementCount, theme }) {
  const style = theme === 'dark' 
    ? { backgroundColor: '#000000', color: '#ffffff' } 
    : null;

  return (
    <div onMouseOver={incrementCount} style={style}>
      <h1>Hovered {count} times</h1>
    </div>
  );
}
```

**src/components/Content.js**
```javascript
import Counter from './Counter';
import HoverCounter from './HoverCounter';

export default function Content({ theme }) {
  return (
    <div>
      <h1>This is content</h1>
      <Counter>
        {(counter, incrementCount) => (
          <HoverCounter 
            count={counter} 
            incrementCount={incrementCount} 
            theme={theme} 
          />
        )}
      </Counter>
    </div>
  );
}
```

**src/components/Section.js**
```javascript
import Content from './Content';

export default function Section({ theme }) {
  return (
    <div>
      <h1>This is section</h1>
      <Content theme={theme} />
    </div>
  );
}
```

**src/App.js**
```javascript
import React from 'react';
import Section from './components/Section';

export default class App extends React.Component {
  state = {
    theme: 'dark',
  };

  render() {
    const { theme } = this.state;
    return (
      <div className="app">
        <Section theme={theme} />
      </div>
    );
  }
}
```

### সমস্যাটি কোথায়?
এখানে `Section` এবং `Content` কম্পোনেন্ট দুটির কিন্তু নিজস্ব কোনো থিম ডেটার প্রয়োজন নেই। কিন্তু `HoverCounter`-এ থিমটি পাঠানোর জন্য বাধ্য হয়ে তাদেরকে মাঝখান থেকে প্রপসটি রিসিভ করে আবার পাঠিয়ে দিতে হচ্ছে। এটিই হলো **Props Drilling**। অ্যাপ্লিকেশন অনেক বড় হয়ে গেলে এভাবে শত শত প্রপস পাস করা কোডকে অত্যন্ত জটিল এবং মেইনটেইন করা অসম্ভব করে তোলে।

---

## ২. কাস্টম কনটেক্সট এপিআই তৈরি করা (DIY Context API)

কনটেক্সট এপিআই কীভাবে কাজ করে তা বোঝার জন্য আমরা নিজেরা জাভাস্ক্রিপ্ট ক্লাস ব্যবহার করে একটি ছোট কাস্টম কনটেক্সট এপিআই বানিয়ে ফেলবো। 

**src/lib/context.js**
```javascript
class Context {
  constructor(value = null) {
    this.value = value;
  }

  // Provider Component
  Provider = ({ children, value }) => {
    this.value = value;
    return children;
  };

  // Consumer Component
  Consumer = ({ children }) => {
    return children(this.value);
  };
}

function createContext(value = null) {
  const context = new Context(value);
  return {
    Provider: context.Provider,
    Consumer: context.Consumer,
  };
}

export default createContext;
```

> [!NOTE]
> - **Provider:** এটি একটি বিশেষ কম্পোনেন্ট যা ডেটা ধারণ (store) করে এবং এর `children`-কে রিটার্ন করে।
> - **Consumer:** এটি **Render Prop Pattern** ফলো করে তার ভেতরের চাইল্ড ফাংশনটিকে `this.value` দিয়ে কল করে। এর ফলে যেকোনো চাইল্ড কম্পোনেন্ট সরাসরি ভ্যালুটি রিড করতে পারে।

---

## ৩. রিঅ্যাক্টের বিল্ট-ইন Context API ব্যবহার

এবার চলুন রিঅ্যাক্টের নিজস্ব বিল্ট-ইন Context API ব্যবহার করে আমাদের প্রপস ড্রিলিং সমস্যার সমাধান করি।

**src/contexts/ThemeContext.js**
```javascript
import React from 'react';

// থিমের ডিফল্ট ভ্যালুসহ কনটেক্সট তৈরি করা হলো
const ThemeContext = React.createContext({
  theme: 'light'
});

export default ThemeContext;
```

### ক. Provider যুক্ত করা (App.js)
`App` কম্পোনেন্টে `ThemeContext.Provider` দিয়ে চাইল্ড কম্পোনেন্টকে র‍্যাপ করে দিতে হবে এবং `value` প্রপের মাধ্যমে ডেটা পাঠাতে হবে।

```javascript
import React from 'react';
import Section from './components/Section';
import ThemeContext from './contexts/ThemeContext';

export default class App extends React.Component {
  state = {
    theme: 'dark',
  };

  render() {
    const { theme } = this.state;
    return (
      <div className="app">
        {/* Provider দিয়ে থিম ভ্যালু পাস করা হচ্ছে */}
        <ThemeContext.Provider value={{ theme: theme }}>
          <Section />
        </ThemeContext.Provider>
      </div>
    );
  }
}
```

### খ. মাঝখানের কম্পোনেন্ট পরিবর্তন (Section.js)
এখন `Section` কম্পোনেন্টকে আর জোড়পূর্বক `theme` প্রপ রিসিভ বা পাস করতে হবে না:
```javascript
import Content from './Content';

export default function Section() {
  return (
    <div>
      <h1>This is section</h1>
      <Content />
    </div>
  );
}
```

### গ. Consumer ব্যবহার করে কনজিউম করা (Content.js)
আমরা `Content` কম্পোনেন্টে `ThemeContext.Consumer` ব্যবহার করে থিমের ভ্যালু সরাসরি রিড করবো। 

```javascript
import Counter from './Counter';
import HoverCounter from './HoverCounter';
import ThemeContext from '../contexts/ThemeContext';

export default function Content() {
  return (
    <div>
      <h1>This is content</h1>
      <Counter>
        {(counter, incrementCount) => (
          <ThemeContext.Consumer>
            {({ theme }) => (
              <HoverCounter 
                count={counter} 
                incrementCount={incrementCount} 
                theme={theme} 
              />
            )}
          </ThemeContext.Consumer>
        )}
      </Counter>
    </div>
  );
}
```
**ব্যস!** এর ফলে আমাদের আর মাঝখান থেকে কোনো প্রপস পাস করতে হলো না এবং `Section` বা `Content` কম্পোনেন্টগুলো এখন সম্পূর্ণ ক্লিন।

---

## ৪. ডাইনামিক কনটেক্সট পরিবর্তন (Dynamic Context/Theme Switcher)

কনটেক্সটের ভ্যালু কেবল রিড করাই নয়, চাইল্ড কম্পোনেন্ট থেকে গ্লোবাল স্টেট পরিবর্তন করতে চাইলে আমরা কনটেক্সটের ভেতর দিয়ে ফাংশনও পাস করতে পারি।

### ক. App.js এ switchTheme মেথড যুক্ত করা
```javascript
import React from 'react';
import Section from './components/Section';
import ThemeContext from './contexts/ThemeContext';

export default class App extends React.Component {
  state = {
    theme: 'light',
  };

  switchTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'dark' ? 'light' : 'dark',
    }));
  };

  render() {
    const { theme } = this.state;
    return (
      <ThemeContext.Provider value={{ theme, switchTheme: this.switchTheme }}>
        <Section />
      </ThemeContext.Provider>
    );
  }
}
```

### খ. Content.js এ Consumer আপডেট
```javascript
<ThemeContext.Consumer>
  {({ theme, switchTheme }) => (
    <HoverCounter 
      count={counter} 
      incrementCount={incrementCount} 
      theme={theme} 
      switchTheme={switchTheme}
    />
  )}
</ThemeContext.Consumer>
```

### গ. HoverCounter.js এ বাটন যোগ করা
```javascript
export default function HoverCounter({ count, incrementCount, theme, switchTheme }) {
  const style = theme === 'dark' 
    ? { backgroundColor: '#000000', color: '#ffffff' } 
    : null;

  return (
    <div style={style}>
      <h1 onMouseOver={incrementCount}>{count} times</h1>
      <button type="button" onClick={switchTheme}>
        Change Theme
      </button>
    </div>
  );
}
```

---

## ৫. Class Component-এ কনটেক্সট ব্যবহার করা (contextType)

যদি আমাদের কোনো ক্লাস কম্পোনেন্টে রিঅ্যাক্ট কনটেক্সট ব্যবহার করতে হয় এবং সেটি `render()` মেথডের বাইরেও (যেমন: `componentDidMount()` লাইফসাইকেল মেথডে) অ্যাক্সেস করার দরকার পড়ে, তবে আমরা `contextType` প্রপার্টি ব্যবহার করতে পারি।

```javascript
import React from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Counter from './Counter';
import HoverCounter from './HoverCounter';

export default class Content extends React.Component {
  componentDidMount() {
    // componentDidMount এর ভেতরে কনটেক্সট ভ্যালু প্রিন্ট হবে
    console.log(this.context);
  }

  render() {
    const { theme, switchTheme } = this.context;
    return (
      <div>
        <Counter>
          {(counter, incrementCount) => (
            <HoverCounter
              count={counter}
              incrementCount={incrementCount}
              theme={theme}
              switchTheme={switchTheme}
            />
          )}
        </Counter>
      </div>
    );
  }
}

// contextType ডিফাইন করে দেওয়া হলো
Content.contextType = ThemeContext;
```

---

## ৬. Functional Component-এ useContext Hook ব্যবহার

ফাংশনাল কম্পোনেন্টে Consumer ব্যবহারের ক্ষেত্রে কোডের গঠন জটিল হয়ে যেতে পারে (Render Prop এর কারণে)। রিঅ্যাক্ট আমাদের এর জন্য একটি চমৎকার হুক দেয়, যার নাম `useContext`। এর ফলে আমাদের আর চাইল্ড এলিমেন্টগুলোকে Consumer দিয়ে র‍্যাপ করতে হয় না।

```javascript
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import Counter from './Counter';
import HoverCounter from './HoverCounter';

export default function Content() {
  // useContext হুকের মাধ্যমে সরাসরি কনটেক্সট রিড করা হলো
  const context = useContext(ThemeContext);
  const { theme, switchTheme } = context;

  return (
    <div>
      <Counter>
        {(counter, incrementCount) => (
          <HoverCounter
            count={counter}
            incrementCount={incrementCount}
            theme={theme}
            switchTheme={switchTheme}
          />
        )}
      </Counter>
    </div>
  );
}
```

---

## ৭. কনটেক্সট পারফরম্যান্স অপটিমাইজেশন (Context Performance Optimization)

### সমস্যা: অপ্রয়োজনীয় রি-রেন্ডারিং (Unintentional Re-renders)
যখন আমরা `Provider` এর `value` হিসেবে কোনো অবজেক্ট সরাসরি পাঠাই (যেমন: `value={{ theme, switchTheme }}`), তখন প্রতিবার `App` কম্পোনেন্ট রেন্ডার হওয়ার সময় একটি নতুন অবজেক্ট রেফারেন্স তৈরি হয়। এর ফলে `Section` কম্পোনেন্টটি `shouldComponentUpdate: false` বা `React.memo` দ্বারা অপটিমাইজড থাকলেও, থিমের ভ্যালু পরিবর্তন না হলেও কনটেক্সটের সব কনজিউমার অবজেক্টের রেফারেন্স বদলে যাওয়ার কারণে পুনরায় রেন্ডার হতে বাধ্য হয়।

### সমাধান: স্টেট অবজেক্ট সরাসরি পাস করা
এই সমস্যা সমাধানের জন্য আমরা কনটেক্সটের ডেটা এবং আপডেট করার মেথড সম্পূর্ণ স্টেট অবজেক্টের ভেতরেই রেখে দেব এবং সরাসরি `this.state` অবজেক্টটিকে প্রোভাইডারের ভ্যালু হিসেবে পাঠাবো।

```javascript
import React from 'react';
import Section from './components/Section';
import ThemeContext from './contexts/ThemeContext';

export default class App extends React.Component {
  state = {
    theme: 'light',
    switchTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === 'dark' ? 'light' : 'dark',
      }));
    },
  };

  render() {
    return (
      /* প্রতিবার নতুন অবজেক্ট না তৈরি করে সরাসরি state অবজেক্ট পাস করা হচ্ছে */
      <ThemeContext.Provider value={this.state}>
        <Section />
      </ThemeContext.Provider>
    );
  }
}
```
এর ফলে ডাইনামিক ভ্যালু হিসেবে প্রতি রেন্ডারে নতুন রেফারেন্স তৈরি হয় না এবং আমাদের কনটেক্সটের কারণে ঘটা অপ্রয়োজনীয় আনইনটেনশনাল রি-রেন্ডার সম্পূর্ণ বন্ধ হয়ে যায়।

# হায়ার অর্ডার কম্পোনেন্ট (React Higher Order Components - HOC)

রিঅ্যাক্ট অ্যাপ্লিকেশনে কোডের পুনঃব্যবহারযোগ্যতা (Reusability) নিশ্চিত করার জন্য অন্যতম একটি শক্তিশালী ডিজাইন প্যাটার্ন হলো **Higher-Order Component (HOC)** বা হায়ার অর্ডার কম্পোনেন্ট। এই চ্যাপ্টারে আমরা শিখবো হায়ার অর্ডার কম্পোনেন্ট কী, কেন এটি ব্যবহার করা হয় এবং কীভাবে এটি কোডের পুনরাবৃত্তি কমায়।

---

## ১. সমস্যা পরিচিতি (Code Duplication)

ধরা যাক, আমাদের অ্যাপ্লিকেশনে দুটি কম্পোনেন্ট প্রয়োজন:
১. **ClickCounter:** একটি বাটন যা ক্লিক করলে কাউন্টার মান ১ করে বৃদ্ধি পাবে।
২. **HoverCounter:** একটি হেডিং যার ওপর মাউস হভার (Mouse Over) করলে কাউন্টার মান ১ করে বৃদ্ধি পাবে।

চলুন এদের ট্র্যাডিশনাল কোড স্ট্রাকচার দেখা যাক:

**src/components/ClickCounter.js**
```javascript
import React from 'react';

class ClickCounter extends React.Component {
  state = {
    count: 0,
  };

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <button type="button" onClick={this.incrementCount}>
          Click {count} times
        </button>
      </div>
    );
  }
}

export default ClickCounter;
```

**src/components/HoverCounter.js**
```javascript
import React from 'react';

class HoverCounter extends React.Component {
  state = {
    count: 0
  };

  incrementCount = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    const { count } = this.state;
    return (
      <div>
        <h1 onMouseOver={this.incrementCount}>
          Hovered {count} times
        </h1>
      </div>
    );
  }
}

export default HoverCounter;
```

### সমস্যা কোথায়?
আমরা যদি দুটি কম্পোনেন্টের দিকে তাকাই, তবে দেখবো তাদের ভেতরের প্রধান কাউন্টার লজিক—স্টেট ডিক্লেয়ারেশন (`state = { count: 0 }`) এবং ইনক্রিমেন্ট হ্যান্ডলার মেথড (`incrementCount`) একদম হুবহু এক। 

ভবিষ্যতে যদি আমাদের আরেকটি `KeypressCounter` বানাতে বলা হয়, তবে আমাদের আবার একই স্টেট ও মেথড কপি-পেস্ট করতে হবে। এটি সফটওয়্যার ডেভেলপমেন্টের **DRY (Don't Repeat Yourself)** নীতি লংঘন করে।

---

## ২. কেন স্টেট লিফটিং (Lifting State Up) এখানে আদর্শ সমাধান নয়?

আমরা যদি এই স্টেটকে `App.js`-এ তুলে নিয়ে যাই, তবে আমাদের `App` কম্পোনেন্টেই দুটি আলাদা স্টেট (`clickCount` ও `hoverCount`) এবং দুটি আলাদা ইনক্রিমেন্ট ফাংশন লিখতে হবে এবং চাইল্ডগুলোতে পাস করতে হবে। 

যদি আমাদের প্রজেক্টে এই কাউন্টারগুলো অনেক দূরবর্তী বা ট্রির বিভিন্ন শাখা-প্রশাখায় (Scattered) ছড়িয়ে থাকে, তবে মাঝখানের অপ্রয়োজনীয় কম্পোনেন্টগুলোর ভেতর দিয়ে জোড়পূর্বক প্রপস পাস করতে হয় (যাকে **Props Drilling** বলা হয়)। তাই এ ধরনের কমন লজিক শেয়ার করার জন্য স্টেট লিফটিং সঠিক পদ্ধতি নয়।

---

## ৩. হায়ার অর্ডার কম্পোনেন্ট (HOC) সমাধান

হায়ার অর্ডার কম্পোনেন্ট মূলত কোনো রিঅ্যাক্ট কম্পোনেন্ট নয়, এটি হলো একটি বিশেষ **জাভাস্ক্রিপ্ট ফাংশন**।
- এটি ইনপুট হিসেবে একটি সাধারণ কম্পোনেন্ট গ্রহণ করে।
- আউটপুট হিসেবে একটি নতুন ও উন্নত (Enhanced) কম্পোনেন্ট রিটার্ন করে।

সহজ অ্যানালজি হিসেবে চিন্তা করা যায়:
```javascript
const SpiderMan = withCostume(PeterParker);
```
এখানে সাধারণ মানুষ `PeterParker` কে `withCostume` ফাংশনের ভেতর পাস করায় সে স্পেশাল সুপারপাওয়ার পেয়ে `SpiderMan`-এ রূপান্তরিত হয়ে রিটার্ন হয়েছে।

### HOC তৈরির নেমিং কনভেনশন:
হায়ার অর্ডার কম্পোনেন্টের নাম সবসময় ইংরেজি **`with`** দিয়ে শুরু করা নিয়ম (যেমন: `withCounter`, `withAuth` ইত্যাদি)।

---

## ৪. চূড়ান্ত ইমপ্লিমেন্টেশন

কাউন্টারের কমন স্টেট ও লজিক নিয়ে আমরা একটি হায়ার অর্ডার কম্পোনেন্ট তৈরি করবো:

**src/components/HOC/withCounter.js**
```javascript
import React from 'react';

const withCounter = (OriginalComponent) => {
  class NewComponent extends React.Component {
    // কমন স্টেট ডিক্লেয়ারেশন
    state = {
      count: 0,
    };

    // কমন স্টেট আপডেট মেথড
    incrementCount = () => {
      this.setState((prevState) => ({ count: prevState.count + 1 }));
    };

    render() {
      const { count } = this.state;
      return (
        <OriginalComponent 
          count={count} 
          incrementCount={this.incrementCount} 
          {...this.props} // প্যারেন্ট কম্পোনেন্ট থেকে পাঠানো অন্যান্য প্রপস অক্ষুণ্ণ রাখার জন্য
        />
      );
    }
  }
  
  return NewComponent;
};

export default withCounter;
```

> [!TIP]
> হায়ার অর্ডার কম্পোনেন্টে রিটার্ন করার সময় মূল এলিমেন্টে `{...this.props}` পাস করা অত্যন্ত জরুরী। এর ফলে যদি প্যারেন্ট কম্পোনেন্ট থেকে মূল কম্পোনেন্টে কোনো নিজস্ব প্রপস পাঠানো হয়ে থাকে, তবে সেটি হারিয়ে যাবে না।

### ক. ClickCounter.js কম্পোনেন্ট সংশোধন:
এখন `ClickCounter` নিজের স্টেট মুছে দিয়ে HOC থেকে প্রপস আকারে ডেটা গ্রহণ করবে:
```javascript
import React from 'react';
import withCounter from './HOC/withCounter';

class ClickCounter extends React.Component {
  render() {
    const { count, incrementCount } = this.props;
    return (
      <button type="button" onClick={incrementCount}>
        Click {count} times
      </button>
    );
  }
}

// withCounter HOC দিয়ে র্যাপ করে এক্সপোর্ট করা হলো
export default withCounter(ClickCounter);
```

### খ. HoverCounter.js কম্পোনেন্ট সংশোধন:
```javascript
import React from 'react';
import withCounter from './HOC/withCounter';

class HoverCounter extends React.Component {
  render() {
    const { count, incrementCount } = this.props;
    return (
      <h1 onMouseOver={incrementCount}>
        Hovered {count} times
      </h1>
    );
  }
}

export default withCounter(HoverCounter);
```

### গ. App.js এ ব্যবহার:
```javascript
import ClickCounter from './components/ClickCounter';
import HoverCounter from './components/HoverCounter';

function App() {
  return (
    <div className="App">
      {/* HOC ব্যবহারের ফলে প্রতিটি কম্পোনেন্ট নিজের স্টেট আলাদাভাবে মেইনটেইন করবে */}
      <ClickCounter />
      <HoverCounter />
    </div>
  );
}
```

### হায়ার অর্ডার কম্পোনেন্টের সুবিধাসমূহ:
1. **DRY নীতি অনুসরণ:** ডুপ্লিকেট কাউন্ট লজিক একবার লিখে আমরা হাজারটি কম্পোনেন্টে রিইউজ করতে পারছি।
2. **কম্পোনেন্ট রিইউজেবিলিটি:** চাইল্ড কম্পোনেন্টগুলো লাইটওয়েট থাকে এবং শুধু তাদের ডিজাইন বা রেন্ডারিংয়ে ফোকাস করতে পারে।

# স্টেট লিফটিং (React Lifting State Up)

রিঅ্যাক্ট অ্যাপ্লিকেশনে ডেটা বা স্টেট সবসময় একমুখী (Unidirectional) উপায়ে ওপর থেকে নিচে প্রবাহিত হয়। অনেক সময় আমাদের অ্যাপের একাধিক কম্পোনেন্টকে একই ডেটা শেয়ার বা সিঙ্ক করতে হয়। এই চ্যাপ্টারে আমরা শিখবো কীভাবে চাইল্ড কম্পোনেন্ট থেকে স্টেটকে প্যারেন্ট কম্পোনেন্টে তুলে নিয়ে (Lifting State Up) সেই সমস্যার সমাধান করা যায়।

---

## ১. সমস্যা পরিচিতি

ধরা যাক, আমরা একটি তাপমাত্রা পরিমাপের ক্যালকুলেটর তৈরি করবো। এখানে ইউজার যদি সেলসিয়াসে তাপমাত্রা ইনপুট দেয়, তবে সেটি ১০০° সেলসিয়াসের বেশি হলে পানি ফুটবে (Water would boil) অন্যথায় ফুটবে না—এই তথ্যটি স্ক্রিনে দেখাবে।

এর জন্য প্রথমে আমরা একটি প্রেজেন্টেশন কম্পোনেন্ট তৈরি করে নেব:

**src/components/BoilingVerdict.js**
```javascript
export default function BoilingVerdict({ celsius = 0 }) {
  if (celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>Water would not boil.</p>;
}
```

এরপর ইনপুট নেওয়ার জন্য আমাদের মূল ক্যালকুলেটর কম্পোনেন্ট:

**src/components/Calculator.js**
```javascript
import React from 'react';
import BoilingVerdict from './BoilingVerdict';

export default class Calculator extends React.Component {
  state = {
    temperature: ''
  };

  onTemperatureChange = (e) => {
    this.setState({
      temperature: e.target.value
    });
  };

  render() {
    const { temperature } = this.state;
    return (
      <div>
        <fieldset>
          <legend>Enter temperature in Celsius:</legend>
          <input 
            type="text" 
            value={temperature} 
            onChange={this.onTemperatureChange} 
          />
        </fieldset>
        {/* BoilingVerdict কে তাপমাত্রা পাস করা হচ্ছে */}
        <BoilingVerdict celsius={parseFloat(temperature) || 0} />
      </div>
    );
  }
}
```

এটি আমরা `App.js` ফাইল থেকে কল করবো:
```javascript
import Calculator from './components/Calculator';

function App() {
  return <Calculator />;
}

export default App;
```

### একাধিক ইনপুটের ক্ষেত্রে সমস্যা:
এখন আমাদের ক্লায়েন্ট এসে নতুন রিকোয়ারমেন্ট দিল: সেলসিয়াসের পাশাপাশি ব্যবহারকারী যেন **ফারেনহাইট (Fahrenheit)** স্কেলেও ইনপুট দিতে পারেন এবং একটি ইনপুট চেঞ্জ করলে অপরটি যেন স্বয়ংক্রিয়ভাবে পরিবর্তিত ও আপডেট হয়ে যায়।

এই কাজের জন্য আমরা যদি ইনপুট ফিল্ডের জন্য `TemperatureInput` নামে একটি আলাদা রিইউজেবল কম্পোনেন্ট বানাই:

```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

export default class TemperatureInput extends React.Component {
  state = {
    temperature: ''
  };

  onTemperatureChange = (e) => {
    this.setState({
      temperature: e.target.value
    });
  }

  render() {
    const { temperature } = this.state;
    const { scale } = this.props;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input 
          type="text" 
          value={temperature} 
          onChange={this.onTemperatureChange} 
        />
      </fieldset>
    );
  }
}
```

যদি আমরা এটি `Calculator` থেকে দুইবার কল করি:
```javascript
// Calculator render
<div>
  <TemperatureInput scale="c" />
  <TemperatureInput scale="f" />
</div>
```
এখানে সমস্যাটি হলো, প্রতিটি `TemperatureInput` নিজের স্টেট নিজে লোকালি ম্যানেজ করছে। ফলে সেলসিয়াস ইনপুট বক্সের মানটি ফারেনহাইট বক্স অ্যাক্সেস করতে পারছে না এবং `BoilingVerdict`-ও তাপমাত্রা পাচ্ছে না। 

---

## ২. সমাধান: স্টেট উপরে তোলা (Lifting State Up)

রিঅ্যাক্টে এই সমস্যার একমাত্র সমাধান হলো প্রতিটি চাইল্ডের লোকাল স্টেট ডিলিট করে দেওয়া এবং সেই স্টেটটিকে তাদের কমন প্যারেন্ট কম্পোনেন্ট `Calculator`-এ তুলে নিয়ে যাওয়া (Lifting State Up)।

প্যারেন্ট কম্পোনেন্ট তখন একমুখী ডেটা প্রবাহ (Unidirectional Data Flow) বা **Top-Down Approach** ব্যবহার করে প্রপসের (Props) মাধ্যমে ডেটা এবং স্টেট পরিবর্তন করার হ্যান্ডলার ফাংশন নিচে চাইল্ড কম্পোনেন্টগুলোতে পাঠিয়ে দেবে।

```
    [Calculator (Parent State)]
         /                 \
  celsius props      fahrenheit props
       /                     \
[TempInput (c)]         [TempInput (f)]
```

---

## ৩. চূড়ান্ত ইমপ্লিমেন্টেশন

আমরা আমাদের প্রজেক্টে ডেটা রূপান্তর করার জন্য প্রথমে একটি কনভার্টার ফাইল বা লাইব্রেরি ফাংশন তৈরি করে নেব:

**src/lib/converter.js**
```javascript
export function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export function convert(temperature, convertFn) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convertFn(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

### ক. চাইল্ড কম্পোনেন্ট (TemperatureInput.js)
এখন `TemperatureInput`-এর নিজস্ব কোনো স্টেট লাগবে না, এটি সম্পূর্ণ প্রপসের ওপর নির্ভর করবে:

```javascript
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

export default function TemperatureInput({ temperature, scale, onTemperatureChange }) {
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input 
        type="text" 
        value={temperature} 
        onChange={(e) => onTemperatureChange(e, scale)} 
      />
    </fieldset>
  );
}
```

### খ. প্যারেন্ট কম্পোনেন্ট (Calculator.js)
প্যারেন্ট কম্পোনেন্টটি এখন সম্পূর্ণ স্টেট ও ডেটা ম্যানিপুলেশন সিঙ্ক করবে:

```javascript
import React from 'react';
import BoilingVerdict from './BoilingVerdict';
import TemperatureInput from './TemperatureInput';
import { convert, toCelsius, toFahrenheit } from '../lib/converter';

export default class Calculator extends React.Component {
  state = {
    temperature: '',
    scale: 'c'
  };

  handleChange = (e, scale) => {
    this.setState({
      temperature: e.target.value,
      scale
    });
  };

  render() {
    const { temperature, scale } = this.state;
    
    // কনভার্ট লজিক
    const celsius = scale === 'f' ? convert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? convert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius) || 0} />
      </div>
    );
  }
}
```

---

## ৪. গুরুত্বপূর্ণ সারসংক্ষেপ

- **Single Source of Truth:** রিঅ্যাক্ট অ্যাপ্লিকেশনে যেকোনো ডাইনামিক ডেটার জন্য একটি মাত্র প্রধান উৎস থাকা উচিত। দুই পাশে আলাদা স্টেট সিঙ্ক না করে নিকটবর্তী প্যারেন্ট এলিমেন্টে স্টেট তুলে নিয়ে ওয়ান-ওয়ে ডাটা ফ্লো মেনটেন করতে হবে।
- **Two-way Data Binding বনাম One-way:** Angular বা Vue-তে ডেটা স্বয়ংক্রিয়ভাবে টু-ওয়ে পদ্ধতিতে সিঙ্ক হতে পারে, কিন্তু রিঅ্যাক্ট সবসময় ওয়ান-ওয়ে ডাটা বাইন্ডিং কঠোরভাবে প্রমোট করে।
- ** loosely Coupled State:** অ্যাপে কোনো স্টেট যদি অন্য কোনো প্রপস বা স্টেট থেকে হিসাব করে বের করা যায় (যেমন: ফারেনহাইট ও সেলসিয়াসের পারস্পরিক মান), তবে সেটিকে আলাদাভাবে স্টেটে রাখা বোকামি। সবসময় যত কম স্টেট ব্যবহার করে কোড ডিজাইন করা যায়, কোড তত বেশি বাগ-মুক্ত থাকে।

# কম্পোজিশন বনাম ইনহেরিটেন্স (React Composition vs Inheritance)

অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিংয়ের (OOP) ক্ষেত্রে **ইনহেরিটেন্স (Inheritance)** একটি অত্যন্ত পরিচিত ধারণা। কিন্তু রিঅ্যাক্ট টিম তাদের মূল আর্কিটেকচারে ইনহেরিটেন্সের বদলে **কম্পোজিশন (Composition)** ব্যবহার করার জন্য কঠোর তাগিদ দেয়। এই চ্যাপ্টারে আমরা জানবো কেন ইনহেরিটেন্স এড়িয়ে চলা উচিত এবং কীভাবে আমরা কম্পোজিশন ইমপ্লিমেন্ট করতে পারি।

---

## ১. ইনহেরিটেন্স (Inheritance) কী?

ইনহেরিটেন্সের মানে হলো কোনো একটি চাইল্ড ক্লাস তার প্যারেন্ট ক্লাসের সমস্ত প্রোপার্টি ও মেথড উত্তরাধিকার সূত্রে লাভ করে এবং সেগুলোকে এক্সটেন্ড করে নিজের ক্লাসে ব্যবহার করে।

রিঅ্যাক্ট প্রজেক্টে ক্লাস কম্পোনেন্ট তৈরি করার সময় আমরা সবসময় `React.Component`-কে এক্সটেন্ড করে ইনহেরিটেন্স ব্যবহার করে থাকি:
```javascript
export default class Calculator extends React.Component {
  state = { temperature: '', scale: 'c' };
  
  render() {
    // এই state এবং setState() ফাংশনগুলো আমরা ইনহেরিটেন্সের মাধ্যমে React.Component থেকে পেয়ে থাকি।
    // এছাড়া constructor এ super(props) মেথডও পাই।
  }
}
```
লারাভেলের কন্ট্রোলার বা মডেলেও আমরা ক্লাস এক্সটেন্ড করে ইনহেরিটেন্স ব্যবহার করি। কিন্তু রিঅ্যাক্টে নিজস্ব কাস্টম কম্পোনেন্ট বানানোর সময় ইনহেরিটেন্স ব্যবহার করলে কিছু বড় পারফরম্যান্স ও আর্কিটেকচারাল জটিলতা তৈরি হয়।

---

## ২. ইনহেরিটেন্সের সমস্যা (Tightly Coupled Components)

চলুন ক্লাস ইনহেরিটেন্স ব্যবহার করে তৈরি একটি জটিল কাউন্টার ও টেক্সট ডেকোরেটর কম্পোনেন্টের উদাহরণ দেখা যাক।

ধরা যাক, আমাদের একটি `Emoji` কম্পোনেন্ট আছে যা সাধারণ টেক্সটের দুই পাশে ইমোজি যোগ করতে পারে:

**components/Emoji.js**
```javascript
import React from 'react';

export default class Emoji extends React.Component {
  addEmoji = (text, emoji) => `${emoji} ${text} ${emoji}`;

  render(override) {
    let text = 'I am the Emoji Component';
    if (override) text = override;
    return <div>{text}</div>;
  }
}
```

এখন আমরা এই `Emoji` ক্লাসটিকে এক্সটেন্ড করে একটি চাইল্ড `Text` কম্পোনেন্ট তৈরি করতে চাই:

**components/Text.js**
```javascript
import Emoji from './Emoji';

export default class Text extends Emoji {
  constructor(props) {
    super(props);
  }

  render() {
    // প্যারেন্ট ক্লাসের addEmoji মেথড ব্যবহার করা হচ্ছে
    const decoratedText = this.addEmoji('I am JavaScript Language', '😊');
    
    // প্যারেন্ট ক্লাসের render() মেথডকে কল করে টেক্সট রিটার্ন করা হচ্ছে
    return super.render(decoratedText);
  }
}
```
এটি আমরা `App.js` থেকে রেন্ডার করলে দেখতে পাবো: `😊 I am JavaScript Language 😊`।

### ক্লাস ইনহেরিটেন্সের বড় সমস্যাসমূহ:
1. **Tightly Coupled (শক্তভাবে সংযুক্ত):** `Text` কম্পোনেন্টটি সম্পূর্ণভাবে `Emoji` কম্পোনেন্টের ওপর নির্ভরশীল। যদি ভবিষ্যতে আমরা `Emoji` কম্পোনেন্ট ডিলিট করি বা তার মেথডের নাম পরিবর্তন করি, তবে `Text` কম্পোনেন্টটি ভেঙে যাবে।
2. **অস্পষ্ট কার্যকারিতা (Lack of Clarity):** চাইল্ড ক্লাসের কোড দেখে বাইরে থেকে বুঝার উপায় নেই যে প্যারেন্ট কম্পোনেন্টটি আসলে ব্যাকগ্রাউন্ডে কী কাজ সম্পন্ন করছে।
3. **মাল্টিপল ইনহেরিটেন্সের অভাব:** জাভাস্ক্রিপ্ট ক্লাসে একই সাথে একের বেশি প্যারেন্ট ক্লাসকে এক্সটেন্ড (multiple inheritance) করা সম্ভব নয়। ফলে আমরা যদি ইমোজির পাশাপাশি টেক্সটে ব্র্যাকেটও `[ ]` যোগ করতে চাই, তবে ক্লাস ইনহেরিটেন্স দিয়ে সেটি করা অসম্ভব হয়ে পড়বে।

---

## ৩. সমাধান: কম্পোজিশন (Composition Technique)

কম্পোজিশন মানে হলো এক কম্পোনেন্টের ভেতরে অন্য কম্পোনেন্ট রেখে তাদের মধ্যে প্রপস আদান-প্রদান করা। এখানে কোনো ক্লাস এক্সটেন্ড করতে হয় না, ফলে আমরা পিওর ফাংশনাল কম্পোনেন্ট ব্যবহার করতে পারি।

আমরা রিঅ্যাক্টের **Render Props** বা `props.children` ফিচারটি ব্যবহার করে চাইল্ড কম্পোনেন্টকে র্যাপ করতে পারি।

### ক. ফাংশনাল চাইল্ড কম্পোনেন্ট (Text.js)
```javascript
export default function Text({ addEmoji, addBracket }) {
  let text = 'I am JavaScript Programming Language';

  if (addEmoji) {
    text = addEmoji(text, '❤️');
  }
  
  if (addBracket) {
    text = addBracket(text);
  }

  return <div>{text}</div>;
}
```

### খ. প্যারেন্ট কম্পোনেন্ট (Emoji.js)
প্যারেন্ট কম্পোনেন্টটি তার `render()` মেথডে চিলড্রেনকে একটি ফাংশন হিসেবে এক্সিকিউট করবে এবং তার ভেতর `addEmoji` মেথডটি রিটার্ন করবে:
```javascript
import React from 'react';

export default class Emoji extends React.Component {
  addEmoji = (text, emoji) => `${emoji} ${text} ${emoji}`;

  render() {
    // children-কে ফাংশন হিসেবে কল করে addEmoji মেথডটি অবজেক্ট আকারে পাস করা হচ্ছে
    return this.props.children({ addEmoji: this.addEmoji });
  }
}
```

### গ. ব্র্যাকেট কম্পোনেন্ট (Bracket.js)
একইভাবে আমরা আরেকটি ব্র্যাকেট ডেকোরেটর কম্পোনেন্ট তৈরি করতে পারি:
```javascript
import React from 'react';

export default class Bracket extends React.Component {
  addBracket = (text) => `[ ${text} ]`;

  render() {
    return this.props.children({ addBracket: this.addBracket });
  }
}
```

---

## ৪. নেস্টেড র্যাপিং (Nested Wrapping inside App.js)

এখন আমরা `App.js` ফাইলে কম্পোজিশন মেথড ব্যবহার করে খুব সহজেই দুটি ডেকোরেটর কম্পোনেন্টকে নেস্টেড উপায়ে র্যাপ করে চাইল্ড কম্পোনেন্টে ফাংশনগুলো পাস করতে পারবো:

**App.js**
```javascript
import React from 'react';
import Emoji from './components/Emoji';
import Bracket from './components/Bracket';
import Text from './components/Text';

function App() {
  return (
    <Emoji>
      {({ addEmoji }) => (
        <Bracket>
          {({ addBracket }) => (
            <Text addEmoji={addEmoji} addBracket={addBracket} />
          )}
        </Bracket>
      )}
    </Emoji>
  );
}

export default App;
```

### রেন্ডার করা আউটপুট:
```
[ ❤️ I am JavaScript Programming Language ❤️ ]
```

### কম্পোজিশনের মূল সুবিধা:
- **Loosely Coupled:** `Text`, `Emoji`, এবং `Bracket` কম্পোনেন্টগুলো একে অপরের থেকে সম্পূর্ণ স্বাধীন। আমরা চাইলে যেকোনো ডেকোরেটর সরিয়ে দিতে পারি অথবা শুধু `Text` রেন্ডার করতে পারি, এতে অন্য কোড ভেঙে যাবে না।
- **স্পষ্টতা (Readability):** `App.js` ফাইল দেখেই চাইল্ড ও প্যারেন্ট কম্পোনেন্টের সম্পর্ক এবং ডাটা ফ্লো খুব সহজে বোঝা যাচ্ছে।

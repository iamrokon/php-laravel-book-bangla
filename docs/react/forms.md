# রিঅ্যাক্ট ফর্ম হ্যান্ডলিং (React Forms & Controlled Components)

একটি অ্যাপ্লিকেশন ব্যবহার করার সময় ইউজারের কাছ থেকে বিভিন্ন ডেটা বা ইনপুট নেওয়ার প্রধান মাধ্যম হলো ফর্ম (Forms)। এই চ্যাপ্টারে আমরা শিখবো কীভাবে রিঅ্যাক্ট অ্যাপ্লিকেশনে ফর্ম হ্যান্ডেল করতে হয় এবং কন্ট্রোলড (Controlled) বনাম আনকন্ট্রোলড (Uncontrolled) ইনপুটের ধারণা।

---

## ১. সিঙ্গেল সোর্স অব ট্রুথ (Single Source of Truth)

এইচটিএমএল ফর্মে সাধারণত প্রতিটি ইনপুট ফিল্ড নিজে থেকেই তার ভেতরে টাইপ করা মান মনে রাখে। কিন্তু রিঅ্যাক্টে আমরা চাই পুরো অ্যাপ্লিকেশনের সমস্ত ডেটা বা স্টেট যেন এক জায়গা থেকে পরিচালিত হয়। একেই বলা হয় **Single Source of Truth**।

এর ফলে আমরা যেকোনো ইনপুট ফিল্ডের মান সরাসরি রিঅ্যাক্টের স্টেটে পাঠিয়ে দিই এবং স্টেট পরিবর্তনের মাধ্যমেই ইনপুট ফিল্ডের মান আপডেট করি।

### ক. একটি সাধারণ টেক্সট ইনপুট উদাহরণ:
```javascript
render() {
  const { title } = this.state;
  return (
    <div>
      <form>
        <input 
          type="text" 
          placeholder="Enter title" 
          value={title} 
          onChange={this.handleChange} 
        />
        <p>{title}</p>
      </form>
    </div>
  );
}
```
এখানে ইনপুট ফিল্ডের `value` প্রপসে সরাসরি স্টেটের `title` দেওয়া হয়েছে। তাই ইউজার সরাসরি ইনপুটে কিছু লিখতে পারবেন না যতক্ষণ না `onChange` ইভেন্ট ফায়ার হয়ে স্টেটের `title` আপডেট করছে।

### খ. টেক্সট এরিয়া (Textarea) উদাহরণ:
ভ্যানিলা এইচটিএমএল-এ টেক্সট এরিয়ার মান তার চিলড্রেন হিসেবে লেখা হলেও রিঅ্যাক্টে এটি সাধারণ ইনপুটের মতোই কাজ করে:
```javascript
render() {
  const { text } = this.state;
  return (
    <div>
      <textarea 
        name="text" 
        value={text} 
        onChange={this.handleChange} 
      />
    </div>
  );
}
```

---

## ২. Controlled বনাম Uncontrolled Input

রিঅ্যাক্টে ফর্মের ইনপুট ফিল্ডগুলোকে প্রধানত দুটি ভাগে ভাগ করা যায়:

1. **Controlled Input:** যখন কোনো ইনপুট ফিল্ডের মান সম্পূর্ণভাবে রিঅ্যাক্ট স্টেট (`value={state}`) দ্বারা পরিচালিত হয় এবং কোনো পরিবর্তন ঘটলে স্টেট আপডেট ফাংশন (`onChange`) কল করা হয়, তখন তাকে Controlled Input বলা হয়।
2. **Uncontrolled Input:** যখন ইনপুটের ভেতরের মানটি সরাসরি ব্রাউজারের ডম (DOM)-এর নিজের নিয়ন্ত্রণে থাকে এবং রিঅ্যাক্ট স্টেট দিয়ে সেটি ম্যানেজ করা হয় না, তখন তাকে Uncontrolled Input বলা হয়।

### সিলেক্ট (Dropdown) এবং চেকবক্স হ্যান্ডেল করার নিয়ম:

ড্রপডাউন বা `<select>` ট্যাগ হ্যান্ডেল করার ক্ষেত্রে প্রতিটি অপশনে `<option selected>` লেখার প্রয়োজন হয় না। সরাসরি `<select>` ট্যাগের `value` প্রপসে কাঙ্ক্ষিত মানটি বসিয়ে দিলেই চলে। 
চেকবক্সের ক্ষেত্রে আমরা `e.target.value`-এর পরিবর্তে `e.target.checked` ব্যবহার করে স্ট্যাটাস চেক করি।

```javascript
import React from 'react';

export default class Form extends React.Component {
  state = {
    library: 'React',
    isAwesome: true
  };

  handleChange = (e) => {
    if (e.target.type === 'select-one') {
      this.setState({
        library: e.target.value
      });
    } else if (e.target.type === 'checkbox') {
      this.setState({
        isAwesome: e.target.checked
      });
    }
  };

  submitHandler = (e) => {
    e.preventDefault(); // ফর্ম সাবমিটের কারণে পেজ রিলোড হওয়া বন্ধ করবে
    const { library, isAwesome } = this.state;
    console.log("Library:", library, "| Awesome:", isAwesome);
  };

  render() {
    const { library, isAwesome } = this.state;
    return (
      <form onSubmit={this.submitHandler}>
        <br />
        <select value={library} onChange={this.handleChange}>
          <option value="React">React</option>
          <option value="Angular">Angular</option>
        </select>
        <br /><br />
        <input 
          type="checkbox" 
          checked={isAwesome} 
          onChange={this.handleChange} 
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

---

## ৩. ফাইল ইনপুট (File Input)

এইচটিএমএল ফর্মের `<input type="file" />` ফিল্ডটি সবসময় একটি **Uncontrolled Input** হিসেবে কাজ করে। কারণ সিকিউরিটিজনিত কারণে এর ভেতরের ডেটা বা ফাইলকে রিঅ্যাক্ট নিজে থেকে ডাইনামিকালি এডিট বা আপডেট করতে পারে না। 

এই ধরনের ডম এলিমেন্ট হ্যান্ডেল করার জন্য রিঅ্যাক্ট আমাদের **`ref`** নামক একটি বিশেষ ফিচার সরবরাহ করে, যার মাধ্যমে সরাসরি ব্রাউজার ডমের উপাদান অ্যাক্সেস করা যায়।

---

## ৪. ডাইনামিক নেম বাইন্ডিং (Dynamic Input Handling)

আমাদের ফর্মে যদি অনেকগুলো ইনপুট ফিল্ড থাকে, তবে সবার জন্য আলাদা আলাদা `handleChange` ফাংশন লেখা বেশ ঝামেলার। এই সমস্যা এড়াতে আমরা প্রতিটি ইনপুট ট্যাগের একটি করে ইউনিক `name` দিতে পারি এবং রানটাইমে ব্রাউজারের ইভেন্ট টার্গেটের নাম অনুযায়ী স্টেট আপডেট করতে পারি:

```javascript
handleChange = (e) => {
  this.setState({
    // ইভেন্ট টার্গেটের name অনুযায়ী স্টেটের নির্দিষ্ট ফিল্ড আপডেট হবে
    [e.target.name]: e.target.value
  });
};
```
এবং এইচটিএমএল-এ:
```html
<form>
  <input name="title" value={title} onChange={this.handleChange} />
  <textarea name="text" value={text} onChange={this.handleChange} />
</form>
```

---

## ৫. গুরুত্বপূর্ণ বিষয় ও সতর্কতা

- **Read-Only Field:** যদি আপনি কোনো ইনপুট ফিল্ডে `value` প্রপস ডিক্লেয়ার করেন কিন্তু কোনো `onChange` ইভেন্ট হ্যান্ডলার না দেন, তবে ব্যবহারকারী সেই ইনপুটে কিছু টাইপ করতে পারবেন না; ফিল্ডটি পুরোপুরি Read-Only হয়ে যাবে।
- **Null বা Undefined এর প্রভাব:** যদি আপনি স্টেটের ইনিশিয়াল ভ্যালু `null` বা `undefined` সেট করেন, তবে রিঅ্যাক্ট সেই ফিল্ডটির ওপর থেকে তার নিয়ন্ত্রণ হারিয়ে ফেলে এবং সেটি তাৎক্ষণিকভাবে আনকন্ট্রোলড (Uncontrolled) হয়ে যায়। তাই স্টেটের ইনিশিয়াল ভ্যালু সবসময় খালি স্ট্রিং `""` রাখা উচিত।
- **Formik ও React Hook Form:** রিঅ্যাক্ট প্রজেক্টে বড় এবং জটিল ফর্মগুলো খুব সহজে ও কম কোড লিখে মেইনটেইন করার জন্য **Formik** বা **React Hook Form** নামক থার্ড-পার্টি লাইব্রেরিগুলো ব্যবহার করা হয়।

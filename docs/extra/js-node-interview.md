# JavaScript, Node.js & NestJS Interview Questions & Answers

> [!TIP]
> জাভাস্ক্রিপ্ট (JavaScript ES2025), নোড-জেএস (Node.js), নেস্ট-জেএস (NestJS/TypeORM) এবং আসিনক্রোনাস প্রোগ্রামিং সম্পর্কিত ইন্টারভিউ প্রশ্ন ও সমাধান সহজ বাংলায় উপস্থাপন করা হলো।

---

## ১. জাভাস্ক্রিপ্ট কোর ও ES2025 (JavaScript Core & ES2025 Features)

### Q1: JavaScript ES2025 (ECMAScript 2025)-এর নতুন ফিচারসমূহ কি কি?
**উত্তরাংশ:**
1. **Global Iterator Object (Lazy Functional Methods):**
   ```javascript
   const nums = Iterator.from([1, 2, 3, 4])
       .map(x => x * 2)
       .filter(x => x > 4);
   console.log([...nums]); // [6, 8]
   ```
2. **Set Methods Enhancement:**
   ```javascript
   const a = new Set([1, 2, 3]);
   const b = new Set([3, 4]);
   console.log(a.union(b)); // Set {1, 2, 3, 4}
   console.log(a.intersection(b)); // Set {3}
   ```
3. **Regular Expression Improvements:** `RegExp.escape("hello?*")` $\rightarrow$ `"hello\?\*"`.
4. **Import Attributes & JSON Module Support:** `import config from "./config.json" with { type: "json" };`.
5. **Promise.try():** Synchronous এবং Asynchronous উভয় কোডকে একভাবে ট্রাই-ক্যাচ হ্যান্ডেল করার মেথড।
6. **Float16Array:** Memory saving half-precision float typed array.

---

### Q2: JavaScript Array Prototype-এ Custom Method (`sum()`) তৈরি
**উত্তরাংশ:**
```javascript
Array.prototype.sum = function() {
  let total = 0;
  this.forEach(function(num) {
    total += num;
  });
  return total;
};

let arr = [1, 2, 3, 4, 5];
console.log(arr.sum()); // Output: 15
```

---

### Q3: IIFE (Immediately Invoked Function Expression) কি এবং কেন ব্যবহার করা হয়?
**উত্তরাংশ:**
```javascript
(function () {
    let privateVar = "Secret";
    console.log("IIFE Running...");
})();
```
* **ব্যবহারের সুবিধা:** 
  1. **Global Scope Pollution মুক্ত রাখা:** ভ্যারিয়েনল স্কোপ সীমাবদ্ধ রাখা।
  2. **Private Variables তৈরি:** বাইরে থেকে পরিবর্তন রোধ করা।
  3. **One-time Initialization:** প্রজেক্ট স্টার্টআপ লজিক নিশ্চিত করা।

---

### Q4: JavaScript Hoisting & Scope Code Quiz Answers
**উত্তরাংশ:**
* `var myName = "Rokon"; myName = "Rakib"; console.log(myName);` $\rightarrow$ `"Rakib"`
* `console.log(myName); var myName = "Rakib";` $\rightarrow$ `undefined` (Hoisted with `undefined`).
* `console.log(myName); let myName = "Rakib";` $\rightarrow$ `ReferenceError: Cannot access 'myName' before initialization` (Temporal Dead Zone).
* `function name(){ var myName = "Rakib"; } name(); console.log(myName);` $\rightarrow$ `ReferenceError: myName is not defined` (Function scoped).
* `{ var myName = "Rakib"; } console.log(myName);` $\rightarrow$ `"Rakib"` (`var` is not block-scoped).

---

### Q5: JavaScript কি Synchronous নাকি Asynchronous?
**উত্তরাংশ:**
* **Core JavaScript Engine:** **Synchronous** এবং **Single-threaded** (এক সময়ে একটি মাত্র কাজ সম্পন্ন করে)।
* **Asynchronous Capabilities:** Browser বা Node.js এনভায়রনমেন্ট (Web APIs, libuv, Event Loop) আসিনক্রোনাস কাজ (যেমন: `setTimeout`, `fetch`, Promises) পরিচালনা করে।

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
// Output: 1, 3, 2
```

---

## ২. নোড-জেএস ও আসিনক্রোনাস আর্কিটেকচার (Node.js & Async Architecture)

### Q6: Node.js Module কি এবং Module System কীভাবে কাজ করে?
**উত্তরাংশ:**
* **মডিউলের ধরন:**
  1. **Built-in Modules:** Node.js-এর সাথে থাকা ডিফল্ট মডিউল (`fs`, `http`, `path`, `os`)।
  2. **Local Modules:** কাস্টম মডিউল।
  3. **Third-party Modules:** `npm install` দিয়ে ইনস্টল করা মডিউল (`lodash`, `express`)।
* **Module Systems:**
  - **CommonJS:** `const fs = require('fs');` এবং `module.exports = add;`
  - **ES Modules:** `import fs from 'fs';` এবং `export default add;`

---

### Q7: Node.js Event Loop কি এবং এর বিভিন্ন Phase কীভাবে কাজ করে?
**উত্তরাংশ:**
Node.js হলো Single-threaded, কিন্তু **libuv** লাইব্রেরি ও **Event Loop** মেকানিজমের সাহায্যে এটি Non-blocking Asynchronous I/O অপারেশন পরিচালনা করে।

* **Phases:** Timers $\rightarrow$ Pending Callbacks $\rightarrow$ Idle/Prepare $\rightarrow$ Poll $\rightarrow$ Check (`setImmediate`) $\rightarrow$ Close Callbacks.

---

### Q8: Callback Hell কি এবং কীভাবে সমাধান করা যায়?
**উত্তরাংশ:**
* **Callback Hell (Pyramid of Doom):** একের ভেতর আরেক নেস্টেড কলব্যাক ফাংশন বারবার লেখার ফলে তৈরি হওয়া অগোছালো অবস্থা।
* **সমাধান:** Named Functions, Promises (`.then().catch()`), এবং `Async / Await`.

---

### Q9: Promise কি এবং এর বিভিন্ন State কি কি?
**উত্তরাংশ:**
* **৩টি State:** Pending, Fulfilled (Resolved), Rejected.
* **মেথড:** `.then()`, `.catch()`, `.finally()`, `async/await`.

---

### Q10: Promise Static Methods তুলনা
**উত্তরাংশ:**
| Method | Resolves When | Rejects When |
| :--- | :--- | :--- |
| **`Promise.all()`** | সবগুলো প্রমিজ সফল হলে। | যেকোনো একটি প্রমিজ ব্যর্থ (Reject) হলে। |
| **`Promise.any()`** | প্রথম যেকোনো একটি প্রমিজ সফল (Resolve) হলে। | সবগুলো প্রমিজ ব্যর্থ হলে (`AggregateError`)। |
| **`Promise.race()`** | সবার আগে যেই প্রমিজটি শেষ হবে (Resolve/Reject)। | সবার আগে শেষ হওয়া প্রমিজটি Reject হলে। |
| **`Promise.allSettled()`** | সবগুলো প্রমিজ সম্পন্ন হলে (সফল বা ব্যর্থ)। | কখনই Auto-reject করে না। |

---

### Q11: Thread, Thread Pool এবং Call Stack কি?
**উত্তরাংশ:**
* **Thread:** Execution Unit.
* **Thread Pool (libuv):** I/O Heavy কাজের জন্য ৪টি (ডিফল্ট) থ্রেডের একটি পুল (`UV_THREADPOOL_SIZE=8`).
* **Call Stack:** V8 Engine-এর LIFO (Last In First Out) ডাটা স্ট্রাকচার। Recursive অসীম কল হলে **"Maximum call stack size exceeded"** (Stack Overflow) ঘটে।

---

## ৩. নেস্ট-জেএস ও টাইপ-ওআরএম (NestJS & TypeORM)

### Q12: NestJS + PostgreSQL (TypeORM) দিয়ে Relationships ইমপ্লিমেন্টেশন
**উত্তরাংশ:**
1. **One-to-One (`User` $\leftrightarrow$ `Profile`):**
   ```typescript
   @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
   @JoinColumn()
   profile: Profile;
   ```
2. **One-to-Many (`User` $\leftrightarrow$ `Post`):**
   ```typescript
   // user.entity.ts
   @OneToMany(() => Post, (post) => post.user)
   posts: Post[];

   // post.entity.ts
   @ManyToOne(() => User, (user) => user.posts)
   user: User;
   ```
3. **Many-to-Many (`Student` $\leftrightarrow$ `Course`):**
   ```typescript
   @ManyToMany(() => Course, (course) => course.students, { cascade: true })
   @JoinTable()
   courses: Course[];
   ```

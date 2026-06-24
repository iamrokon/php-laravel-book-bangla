# Next.js ক্র্যাশ কোর্স (NextJS 14 Crash Course)

## NextJS কেন দরকার?

**NextJS** হলো React-এর framework। React হলো একটি লাইব্রেরি।

React শুধুমাত্র UI-এর কাজ করে। কিন্তু একটি application তৈরিতে আরও অনেক কিছু লাগে, যেমন:
- ডেটা fetch করা
- Routing
- Caching
- Font & Image Optimization
- Client & Server Side Rendering
- SEO

---

## Client Side Rendering-এর সমস্যা

আমাদের একটা app management system আছে। আমরা `npm run build` দিলে একটা bundle তৈরি করে দেবে `dist` নামক ফোল্ডারে:

```
dist/
  index.html
    <body>
      <div id="root"></div>
    </body>
  assets/
    index.js
```

পুরো ডেটাগুলো ব্রাউজারে জেনারেট হয়ে যায়। `ReactDOM.render` করে React-এর `root` দিয়ে inject করে। পুরো application হয়ে যায় **Client Side Rendering**।

### CSR-এর সমস্যা

ব্রাউজার সার্ভারে request করলে সার্ভার HTML, CSS ও JS দিয়ে response দেয়। Client Side Rendering-এ HTML ও CSS মিলে একটি blank পেজ তৈরি করে। এরপর JS জেনারেট হয় এবং একটি করে কম্পোনেন্ট লোড হয়।

এক্ষেত্রে সমস্যাগুলো হলো:
1. Search engine bot (Google, Bing) শূন্য page দেখে — **SEO সমস্যা**
2. পুরো site dynamic না হওয়া পর্যন্ত ইউজার কিছুই দেখতে পাবে না — **Performance সমস্যা**

```
FCP (First Content Paint)  → অনেক সময় লাগে React-এ
TTI (Time To Interactive)  → হতেও সময় লাগে
```

---

## Server Side Rendering (SSR) — সমাধান

**SSR**-এ সার্ভার একটি machine-এ ব্রাউজার simulate করে পুরো application রান করে। Generated HTML, CSS পাঠিয়ে দেয়।

**SSR-এর সুবিধা:**
- User পুরো JS লোড হওয়ার আগেই সমস্ত HTML দেখতে পাবে
- Application-এর চেহারা দেখতে পাবে
- তারপর JS আসলে application interactive (clickable) হয়

**SSR-এর সমস্যা:**
- TTI slow — কারণ দুইবার রেন্ডার হয়। সার্ভার থেকে পেজ রেন্ডার হয়, ব্রাউজারে আসার পর CSR-ও হয়

---

## React Server Component — চূড়ান্ত সমাধান

উভয় পদ্ধতির সমস্যার সমাধান হলো **React Server Component**। এটি React-এর নতুন ধারণা। Next.js এটাকে খুব সহজে ব্যবহার করার জন্য ফোল্ডার স্ট্রাকচারের মাধ্যমে বলে দেয় কোনটা server component, কোনটা client component।

**React Server Component-এ:**
- Interactive প্রয়োজন নেই এমন section গুলো server-এ রেন্ডার হয়
- এগুলোকে HTML, CSS সহ ব্রাউজার সাইডে দেয়
- ফলে client সাইড ব্রাউজারে খুব কম JS আসে

```
<Navigation />   → Server Component (শুধু ডেটা দেখায়)
<BlogTitle />    → Server Component
<BlogDetails />  → Server Component
<RelatedBlogs /> → Server Component
<Comments />     → Client Component (interactive — user input নেয়)
<Footer />       → Server Component
```

React Server Component-এর কারণে Navigation, Footer বাদে বাকি অংশ দ্রুত চলে আসবে। এই ছোট ছোট interactive অংশ hydrate হতে একটু সময় লাগবে। ফলে user experience খুব ভালো হবে।

---

## Next.js ইনস্টলেশন ও সেটআপ

একটি `next-crash` ফোল্ডারে Next.js ইনস্টল করার জন্য:

```bash
npx create-next-app@latest
```

প্রজেক্ট নাম জিজ্ঞেস করলে `.` দিন (current folder-এ ইনস্টল):

| Option | পছন্দ |
| :--- | :--- |
| TypeScript | No |
| ESLint | Yes |
| Tailwind CSS | Yes |
| `src/` directory | No |
| **App Router** | **Yes** (must) |
| Import alias | No |

```bash
npm run dev   # application running পাব
```

### ফোল্ডার স্ট্রাকচার

**`app/layout.js`** — এখানে কিছু meta information আছে এবং সমস্ত page-এ shared layout থাকে।

Next.js-এ একটা পেজকে কম্পোনেন্ট হতে হলে ২টি জিনিস লাগে:
- **`layout.js`** — কাঠামো (shared across pages)
- **`page.js`** — ভেতরের কন্টেন্ট

---

## Form Handling: Controlled vs Uncontrolled Component

### Controlled Component

`useState` ব্যবহার করে form-এর প্রতিটি input-এর state track করা হয়:

```javascript
const [name, setName] = useState('');

// onChange event-এ state update
onChange={(e) => setName(e.target.value)}
```

### Uncontrolled Component

`input` field যদি `file` type হয় তখন সেটি stateless। তখন আমাদের DOM-কে read করতে হয় `ref()` দিয়ে:

```javascript
import React, { useRef } from 'react';

export default function FileForm() {
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fileRef.current.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileRef} />
      <button type="submit">Upload</button>
    </form>
  );
}
```

Dynamic name ব্যবহারের কৌশল:

```javascript
// Computed property name দিয়ে dynamic state update
const handleChange = (e) => {
  setState((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};
```

---

## React Lifting State Up (সংক্ষেপ)

যখন একাধিক component-এ একই state দরকার, তখন সেই state-কে তাদের সবচেয়ে কাছের parent component-এ নিয়ে যাওয়া হয়। এই process-কে **Lifting State Up** বলে।

```javascript
// Parent Component
function Parent() {
  const [sharedState, setSharedState] = useState('');

  return (
    <>
      <ChildA value={sharedState} onChange={setSharedState} />
      <ChildB value={sharedState} />
    </>
  );
}
```

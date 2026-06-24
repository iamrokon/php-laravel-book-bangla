# Next.js ক্যাশিং ও রেন্ডারিং (Caching & Rendering)

রেসপন্স আগে যে আসবে তাকে আবার সার্ভ করতে হবে। কিছু কিছু সময় লাগবে কারণ খাবার রেডি করতে হবে। আর পরে যারা আসবে তাদেরকে খাবার সার্ভ করতে আর সময় লাগবে না কারণ খাবার আগে থেকেই সংরক্ষণ করা আছে। এটাই **Caching**। ওয়েব ডেভেলপমেন্টেও একই ব্যাপার। প্রতিবার নতুন পেজ তৈরির বদলে আগে তৈরি করা পেজ সার্ভ করে রাখা হয়। যাতে ইউজার সাথে সাথে দেখতে পায়।

---

## Next.js Rendering Methods

- **Static Site Generation (SSG)**
- **Server Side Rendering (SSR)**
- **Incremental Static Regeneration (ISR)**
- **Client Side Rendering (CSR)**

ডেটা রিকোয়েস্ট অনুযায়ী ডেটা ফেচ করা হবে — শেষ কখন জেনারেট হবে, যেই পেজ বা ডেটা কখন থাকবে এবং আচরণ কী হয়।

---

## ১. Static Site Generation (SSG)

**SSG** হলো এমন একটি প্রসেস যেখানে আমাদের ওয়েবসাইটের পেজগুলো আগেই তৈরি করে রাখা হয় — যখন আমরা `npm run build` কমান্ড চালাই।

**সুবিধা ও সীমাবদ্ধতা:**
- ✅ Better performance
- ✅ Faster page load
- ❌ Dynamic content-এর জন্য উপযুক্ত নয়

যদি কোনো পেজের ডেটা দ্রুত বদলায় — যেমন user-রিলেটেড ডেটা, live ডেটা বা real-time update — তাহলে SSG কাজ করবে না।

---

## ২. Server Side Rendering (SSR)

এরকম ক্ষেত্রে দরকার হয় **SSR** বা Server Side Rendering। এর ক্ষেত্রে প্রতিবার রিকোয়েস্টের পর server তখনই পেজটা তৈরি করে পাঠায়। SSR-এর ক্ষেত্রে loading time বেশি।

---

## ৩. Incremental Static Regeneration (ISR)

SSG এবং SSR-এর সুবিধা ও সীমাবদ্ধতা মাথায় রেখে Next.js একটা চমৎকার সমাধান দিয়েছে। যেখানে SSG-এর Build Time Generation এবং SSR-এর Updated Content পাওয়ার সুবিধা combine করে **Incremental Static Regeneration** বা **ISR** নামক একটা Hybrid Rendering strategy Next.js নিয়ে এসেছে।

রেন্ডারিং একটি অত্যন্ত গুরুত্বপূর্ণ বিষয়। একটা রেখে দিলে বাসি হয়ে যাবে। তাই একটি নির্দিষ্ট সময় পর পর অটোমেটিক সেই পেজটি আবার রান্না হবে যেন পরবর্তী অর্ডারে সেটি আবার ফ্রেশ থাকে। ওই নির্দিষ্ট সময় পর্যন্ত কাস্টমারকে waiting-এ রাখা হয়। ঠিক তেমনি ISR-এর ধারণাটি।

Next.js আমাদের পেজ বানিয়ে রাখতে দেয়। কিন্তু নতুন করেও জেনারেট হবে। এতে করে SSR-এর updated content ও SSG-এর performance — দুটোই পাব।

---

## ৪. Client Side Rendering (CSR)

**CSR** (Client Side Rendering) এ পুরো অ্যাপ্লিকেশনের JavaScript bundle লোড করে আনা হয়। আর যখন ইউজার কোনো পেজে যায় তখন নতুন HTML বা layout থেকে আসে না। শুধু ডেটা fetch হয় এবং JavaScript bundle দিয়ে ব্রাউজার নিজেই পেজটি বানিয়ে ফেলে।

CSR কাজ করে highly interactive application বা dashboard-এ যেখানে user action-এ পরিবর্তন হয়। তবে initial load time slow হয়। CSR-এ SEO-তেও কিছু সীমাবদ্ধতা থাকতে পারে — কারণ সার্চ ইঞ্জিন অনেক সময় JavaScript দিয়ে তৈরি করা পেজ ঠিকমতো পড়তে পারে না।

---

## Next.js Rendering Patterns

- **React Server Component**
- **React Server Component Payload (RSC Payload)**

আমরা যখন ব্রাউজার থেকে কোনো URL হিট করি তখন সার্ভার সেই রিকোয়েস্টের বিপরীতে একটি রেসপন্স পাঠায়। সার্ভারে যেকোনো ল্যাঙ্গুয়েজ যেমন PHP, Python, Java থাকতে পারে। সার্ভার কোনো external API-তে রিকোয়েস্ট পাঠিয়ে একটি ওয়েবসাইট তৈরি করে।

এই প্রক্রিয়াকে **Hydration** বলে।

React বা Next.js-এর ক্ষেত্রে Node.js যখন একটি পেজ সার্ভার থেকে পাঠায় তখন তা পুরোপুরি তৈরি থাকে।

---

## React Server Component

React কম্পোনেন্টের tree তৈরি হয় নিম্নলিখিতভাবে:

```
Root
  └── Layout.jsx
        ├── Header.jsx       (Client Component)
        └── Main.jsx
              ├── Slider.jsx  (Client Component)
              ├── Button.jsx  (Client Component)
              └── Card.jsx    (Server Component)
```

কিছু কম্পোনেন্ট interactive থাকতে পারে — যেমন বাটনে ক্লিক করা বা slider-এ slide করা। এই interactive কম্পোনেন্টগুলোকে **Client Component** বলে। কারণ এগুলো ব্রাউজারেই কাজ করে।

যেসব কম্পোনেন্টে কোনো interaction নেই — যেমন শুধু ডেটা দেখানো, HTML/CSS তৈরি করা — সেগুলোকে **Server Component** বলে। এগুলোকে সার্ভারেই রেন্ডার করা সম্ভব।

```
<Navigation />       → Server Component
<BlogTitle />        → Server Component
<BlogDetails />      → Server Component
<RelatedBlogs />     → Server Component
<Comments />         → Client Component
<Footer />           → Server Component
```

React Server Component করা একটু কঠিন। তাই Next.js ফোল্ডার স্ট্রাকচারের মাধ্যমে বলে দেয় কোনটা server component, কোনটা client component।

---

## React Server Component Payload (RSC Payload)

Next.js যখন সার্ভারে React tree রেন্ডার করে তখন সে দেখে কোনটি server component। সে শুধু সেগুলোকেই রেন্ডার করে। যখন সে দেখে কোনো client component আছে তখন সে ওই জায়গায় রেন্ডার না করে একটি ফাঁকা placeholder রেখে দেয়।

যখন কোনো ওয়েবপেজ রিকোয়েস্ট করা হয় রেসপন্স হিসেবে আসে:
- ✓ HTML
- ✓ CSS
- ✓ JavaScript
- ✓ React/Next.js লাইব্রেরি

React এবং Next.js পুরো JavaScript প্যাকেজগুলো বেশ বড়। Next.js এর optimization হলো সার্ভার component-গুলো HTML জেনারেট করে রেন্ডার করে এবং পুরো React tree-কে একটি ছোট ফাইলে পাঠায়।

এই ছোট অংশকে **React Server Component Payload** বা **RSC Payload** বলে। যখন সার্ভার রেন্ডার করা হয় এবং HTML তৈরি করার সময় এই RSC Payload তৈরি হয়। এটি তৈরি করার সময়:
- কোনো কম্পোনেন্ট তার child কম্পোনেন্ট
- তাদের মধ্যে internal connection
- এই জিনিসগুলো একটি ছোট format-এ লিখে রাখা হয়

যাতে client React ও Next.js-এর সাহায্য ছাড়াই এই ফাইল দেখে tree জেনারেট করা যায়। এছাড়াও যদি কোনো server component তার child component-কে কোনো props পাস করে তবে সেই props-গুলোও এই format-এ লিখে রাখা হয়।

এটি দেখতে JSON-এর মতো হলেও JSON নয় — এটি একটি **serializable format**।

### সামারি

| ক্রম | বিষয় |
| :--- | :--- |
| 1 | Server Components renders HTML |
| 2 | Client component placeholder থাকে |
| 3 | RSC Payload (log book) তৈরি হয় |
| 4 | React client JS পাঠানো হয় |
| 5 | Next.js client JS পাঠানো হয় |
| 6 | Hydration-এর জন্য JS পাঠানো হয় |

---

## Next.js Caching Strategy

```
/some-route → Router Cache → Full Route Cache → Request Memoization → Data Cache
                (Client)        (Server)            (Server)             (Server)
```

### ৩W ও ৩H Framework

| প্রশ্ন | বিবরণ |
| :--- | :--- |
| **What** — কী strategy? | Caching-এর ধরন |
| **Where** — কোথায় store? | Local, In-memory, Redis, CDN, Browser |
| **Why** — কী সুবিধা? | Performance বাড়ে, resource optimization, server load কম |
| **How long** — কতক্ষণ valid? | সেকেন্ড, মিনিট, ঘণ্টা |
| **How to refresh** — কীভাবে revalidate? | Caching ডেটা কীভাবে refresh হবে |
| **How to opt-out** — কীভাবে বন্ধ করব? | Caching strategy থেকে বের হওয়ার পদ্ধতি |

### ১. Router Cache

Client সাইডে router-এর in-memory-তে এই cache store করা থাকে। একদম শুরুতে router থেকে কোনো route-এ hit করলে Next.js প্রথমে Router Cache চেক করে যে তা server-এ যাওয়ার প্রয়োজন আছে কিনা। যদি Router Cache-এ থাকে তবে আর server-এ যাওয়ার প্রয়োজন নেই।

### ২. Full Route Cache

যদি পেজটা Router Cache-এ না থাকে, তখন Full Route Cache চেক করা হয়। যদি অলরেডি রেন্ডার করা থাকে তবে সেখান থেকেই response পাঠিয়ে দেবে।

### ৩. Request Memoization

রেন্ডার করা না থাকলে Request Memoization-কে জিজ্ঞেস করবে যে এটা fetch করতে হবে কিনা। এটি একই request-এর মধ্যে duplicate API call এড়াতে সাহায্য করে।

### ৪. Data Cache

এরপর Data Cache চেক করবে যে এই ডেটা cache-এ আছে কিনা। যদি থাকে তবে সেটা থেকে fetch করবে।

---

## Practical উদাহরণ

### JSON Server সেটআপ

```bash
npm install json-server
```

**`db.json`**

```json
{
  "products": [
    { "id": "1", "title": "Apple iPhone", "price": 799 },
    { "id": "2", "title": "Apple iPhone 16 Plus", "price": 899 },
    { "id": "3", "title": "Samsung Galaxy", "price": 499 }
  ]
}
```

```bash
npx json-server db.json -p 8000
```

এরপর `localhost:8000/products`-এ প্রোডাক্টের লিস্ট দেখতে পাব।

### Request Memoization উদাহরণ

**`app/utils/api-helpers.js`**

```javascript
export const getData = async (apiURL, caller, options = {}) => {
  const url = new URL(apiURL);
  console.log(`[${caller}]: fetching ${url.pathname} started`);
  const startTime = performance.now();

  const response = await fetch(apiURL, options);
  // এখানে থেকে যে Promise পায় সেটাকে React মনে রাখে (memoize করে)

  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);

  if (!response.ok) {
    console.log(`[${caller}]: fetching ${url.pathname} failed`);
    throw new Error(`[${caller}]: failed to fetch ${url.pathname}`);
  }

  const data = await response.json();
  console.log(`[${caller}]: fetching ${url.pathname} completed in ${duration}ms`);
  return data;
};
```

**`app/request-memoization/page.js`**

```javascript
import { getData } from '@/app/utils/api-helpers';
import ProductCount from './ProductCount';

export async function generateMetadata() {
  // আমরা একই ডেটা বারবার fetch করব।
  const data = await getData('http://localhost:8000/products', 'generateMetadata');
  return {
    title: `Products (${data.length})`,
  };
}

export default async function Page() {
  const products = await getData('http://localhost:8000/products', 'page');
  return (
    <div>
      <ProductCount products={products} />
      {/* এই কম্পোনেন্টেও আমরা ডেটা দেখাব */}
    </div>
  );
}
```

`npm run build` কমান্ড দিলে console-এ লগ গুলো দেখতে পাব:

```
[generateMetadata]: fetching /products completed in 23.51ms
[page]: fetching /products completed in 12.59ms
[ProductCount]: fetching /products completed in 0.58ms
[TotalPrice]: fetching /products completed in 0.47ms
```

> [!NOTE]
> `{ cache: "no-store" }` দিলে এটি dynamic SSR পেজে পরিণত হবে — SSG নয়। Default হলো `force-cache`।
> Request Memoization-এ একই request-এর মধ্যে duplicate API call হয় না — React মনে রাখে।

---

## Next.js ইনস্টলেশন

```bash
npx create-next-app@latest
```

ইনস্টলের সময় যে options দেবেন:

| Option | পছন্দ |
| :--- | :--- |
| TypeScript | No |
| ESLint | Yes |
| Tailwind CSS | Yes |
| `src/` directory | No |
| App Router | **Yes** (must) |
| Import alias | No |

```bash
npm run dev
```

Next.js-এ একটা পেজকে কম্পোনেন্ট হতে হলে ২টি জিনিস লাগে:
- **Layout** — কাঠামো
- **Page** — ভেতরের কন্টেন্ট

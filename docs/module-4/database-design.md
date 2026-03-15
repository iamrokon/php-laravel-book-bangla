# Database Design & Architecture (Live Class 1 & 2)

## Why Do We Need a Database?
**Code vs Data:** কোড হলো ইনস্ট্রাকশন সেট, যা এক্সিকিউট করতে যে ইনফরমেশন লাগে সেটাই হলো ডাটা (Data)। কোড বা অ্যাপ্লিকেশন সাধারণত **Application Server**-এ রান হয়, আর ডেটা স্টোর করা হয় **Database Server**-এ। 
অ্যাপ্লিকেশন সার্ভার হতে হবে স্টেটলেস (Stateless)। ইউজারের সেশন লজিক বা কারেন্ট স্টেট সংরক্ষণের জন্য ডেটাবেজ দরকার। অ্যাপ সার্ভার ও ডেটাবেজ সার্ভার আলাদা হলে মাঝখানে নেটওয়ার্ক কমিউনিকেশন হয়, তাই কিছুটা Network Delay বা ল্যাটেন্সি থাকে।

## How Database Store Data?
সিস্টেম ডেটা সাধারণত RAM (মেমোরি) বা HDD/SSD (ডিস্ক)-এ রাখে। 
- **MySQL, PostgreSQL:** ডেটা সাধারণত ডিস্কে রাখে এবং ফার্স্ট রেসপন্সের জন্য কিছু ইনডেক্স মেমোরিতে রাখে।
- **Redis, Memcached:** পুরো ডেটা RAM-এ রাখে, যা অতি দ্রুত ফলাফল দেয়।

## Types of Databases
1. **Relational:** `PostgreSQL`, `MySQL`, `MariaDB`, `Oracle` - এরা টেবিল, রো (Row) এবং কলাম আকারে ডেটা রাখে।
2. **Key-Value:** `Redis`, `DynamoDB` - এরা `key: value` পেয়ারে বা ডিকশনারি আকারে ডেটা রাখে।
3. **Columnar:** `HBase`, `Cassandra` - বিগ ডেটা প্রোসেসিংয়ে কলাম ওরিয়েন্টেড স্টোরেজ।
4. **Document:** `MongoDB`, `CouchDB`, `ElasticSearch` - এরা JSON বা BSON ডকুমেন্ট আকারে ডেটা রাখে।
5. **Graph:** `Neo4j` - বিভিন্ন নোডের মধ্যে গ্রাফ বা সম্পর্কের মাধ্যমে কানেক্ট করে।
6. **Embedded:** `SQLite` - সি (C) ল্যাঙ্গুয়েজ দিয়ে তৈরি এবং অ্যাপ্লিকেশনের ভেতরে ফাইলের মধ্যে ডেটা রাখে।
7. **Time series & Vector DB:** লগসের জন্য টাইম-সিরিজ, এবং এআই (AI) মডেলের জন্য ভেক্টর ডেটাবেজ ব্যবহৃত হয়।

## Database vs Schema vs Table
- **Database:** ডেটাবেজ হলো একটা বিল্ডিং (পুরো সিস্টেম)। 
- **Schema:** স্কিমা হলো একটি ফ্লোর (MySQL-এ DB ও স্কিমা একই, কিন্তু PostgreSQL-এ একটি ডেটাবেজের ভেতর মাল্টিপল স্কিমা থাকে)। বিশেষ করে SaaS মাল্টি-টেন্যান্ট (Multi-tenant) অ্যাপ্লিকেশনে ভিন্ন ভিন্ন কাস্টমারের জন্য ভিন্ন স্কিমা থাকতে পারে। 
- **Table:** টেবিল হলো একেকটি রুম বা সবচেয়ে ছোট ইউনিট। 

Production Database-এ সব প্রিভিলেজ (All Privileges/Drop) না দিয়ে শুধুমাত্র `Read Only` বা স্পেসিফিক অ্যাক্সেস দেওয়াই হলো বেস্ট প্র্যাকটিস।

---

## Database Schema Design (LMS Example)

সিস্টেমের ডেটাবেজ ডিজাইন করার সাধারণ ধাপসমূহ:
1. **Understand Business Needs:** রিকয়ারমেন্ট বোঝা।
2. **Identify Entities/Tables:** কী কী অবজেক্ট থাকবে (Customer, Product, Order, Employee)।
3. **Define Properties:** তাদের ফিল্ড ও টাইপ (INT, VARCHAR, DATE) নির্ধারণ করা।
4. **Define Relationships:** টেবিলগুলোর মধ্যকার সম্পর্ক তৈরি করা।

### Primary Key vs Foreign Key
- **Primary Key:** টেবিলের প্রতিটি রো-কে ইউনিকলি ഐഡেন্ify করে (যেমন- `employee_id`)।
- **Foreign Key:** একটি টেবিলের প্রাইমারি কি যখন রেফারেন্স হিসেবে অন্য টেবিলে রাখা হয়, তখন তাকে ফরেন কি বলে (যেমন- অর্ডারে থাকা `customer_id`)।

### Relationship Types
- **One-to-One:** নির্দিষ্ট ইনটেল ডেটা আলাদা রাখতে (যেমন- User এবং UserDetails)।
- **One-to-Many:** একজন ইউজারের মাল্টিপল অর্ডার থাকতে পারে, তাই Order টেবিলে `user_id` রাখা।
- **Many-to-Many:** একাধিক কোর্সে একাধিক ট্যাগ থাকতে পারে, তাই একটি পিভট (Pivot) ইন্টারমিডিয়েট টেবিল `course_tags(course_id, tag_id)` তৈরি করতে হয়।

### E-Learning (LMS) System Table Analysis (Live Class)
একটি LMS (Learning Management System) বা EdTech সিস্টেমের জন্য ডেটাবেস টেবিলসমূহ কেমন হতে পারে:

- **users:** `id`, `first_name`, `last_name`, `email`, `password`, `role` (Admin/Instructor/Student)। 
- **courses:** `id`, `title`, `description`, `price`, `discount`, `featured_image`, `total_enrolled` (Normalization রুল ব্রেক হলেও পারফর্ম্যান্সের জন্য)। 
  *(এখানে কোয়ারির জন্য ইনডেক্সিং এবং `slug` করা জরুরি।)*
- **enrollments:** স্টুডেন্টদের কোর্স এনরোলমেন্টের অবস্থা (`status` ENUM না রেখে VARCHAR রাখা ভালো)। 
- **invoices & invoice_items:** একটি ইনভয়েসে অনেকগুলো কোর্স থাকতে পারে। কোর্সের প্রাইস পরে বদলে যেতে পারে তাই ইনভয়েস টেবিলে হিস্টোরিকাল ডাটা রাখা হয়।
- **chapters, lessons, completed_lessons:** স্টুডেন্টের প্রোগ্রেস ট্র্যাকিং। 
- **coupons, reviews:** কোর্স এবং ইউজারের অ্যাসাইনকৃত ডেটা।

### Database Migration & Optimization
**Low / No Downtime Migration:** যদি আমরা `completed_lessons` থেকে মার্কসের ঘরগুলো নিয়ে একটি নতুন `assessments` টেবিল বানাতে চাই, তবে মাইগ্রেশনের ধাপগুলো হবে:
1. নতুন `assessments` স্কিমা তৈরি করা।
2. পুরানো ডেটা নতুন টেবিলে সিঙ্ক বা ট্রান্সফার করা।
3. **Double Write Policy:** একইসাথে অ্যাপ্লিকেশনে উভয় টেবিলেই লিখা, যেন ডেটা মিসম্যাচ না হয়।
4. নতুন লজিক অনুযায়ী অ্যাপ্লিকেশন আপডেট করে শুধুমাত্র নতুন টেবিল থেকে রিড করা।
5. পুরানো টেবিলের কলামগুলো রিমুভ (Cleanup) করা।

**Soft Delete vs Hard Delete:**
- **Soft Delete:** `deleted_at` কলামে টাইমস্ট্যাম্প রাখি, কিন্তু ডেটা ফিজিক্যালি ডিলিট হয় গঠন। 
- **Hard Delete:** ডেটা চিরকালের জন্য মুছে ফেলা (`ON DELETE CASCADE` বা `ON DELETE NULL`)। ইউরোপীয়ান GDPR রুলসে ইউজার বললে অবশ্যই হার্ড ডিলিট করতে হয়।
- **Pruning / Analytics DB:** সফট ডিলিট করা ডেটা ২/৩ মাস পর প্রুনিং (হার্ড ডিলিট) করে দেওয়া যায়, অথবা অ্যানালিটিক্সের জন্য অন্য কোনো ডেটাবেজে ব্যাকআপ করে রাখা হয়।

# Database, SQL & Query Optimization Interview Questions & Answers

> [!TIP]
> ডাটাবেজ ডিজাইন, SQL, ইলোকুয়েন্ট ORM, পোস্টগ্রেসকিউএল, ইনডেক্সিং, নরমালাইজেশন এবং কনকারেন্সি হ্যান্ডলিং সম্পর্কিত ইন্টারভিউ প্রশ্ন ও সমাধান সহজ বাংলায় উপস্থাপন করা হলো।

---

## ১. Eloquent ORM ও ডাটাবেজ সম্পর্ক (Eloquent & Database Relations)

### Q1: Eloquent ORM কি?
**উত্তরাংশ:**
Eloquent হলো Laravel-এর বিল্ট-ইন Object-Relational Mapper (ORM) যা **Active Record Pattern** অনুসরণ করে। এটি ডাটাবেজ টেবিলকে PHP Model Class-এ রূপান্তর করে অবজেক্ট আকারে কোয়েরি চালাতে সাহায্য করে।

---

### Q2: Eloquent Polymorphic Relationships কি?
**উত্তরাংশ:**
একটি মডেল একটি মাত্র রিলেশনশিপ ইন্টারফেস ব্যবহার করে একাধিক অন্যান্য মডেলের সাথে সম্পর্কিত হতে পারা। 
* **উদাহরণ:** `Comment` মডেল একই সাথে `Post` এবং `Video` উভয় মডেলের কমেন্ট ধারণ করতে পারে।
* **পাইভট কলাম:** `commentable_id` এবং `commentable_type`.

---

### Q3: Accessors & Mutators কি?
**উত্তরাংশ:**
* **Accessor:** ডাটাবেজ থেকে ডাটা নিয়ে আসার সময় ডাইনামিকালি ফরম্যাট বা চেঞ্জ করা। (`Attribute::make(get: fn ($value) => ucfirst($value))`)
* **Mutator:** ডাটাবেজে সেভ করার পূর্বে ডাটা মডিফাই করা (যেমন: পাসওয়ার্ড হ্যাশ করা)। (`Attribute::make(set: fn ($value) => bcrypt($value))`)

---

### Q4: Custom Query Builder কীভাবে তৈরি করা যায়?
**উত্তরাংশ:**
`Illuminate\Database\Eloquent\Builder`-কে এক্সটেন্ড করে কাস্টম মেথডসহ Builder Class তৈরি করতে হয় এবং মডেলে `newEloquentBuilder($query)` মেথডটি ওভাররাইড করে রিটার্ন করতে হয়।

---

### Q5: Lazy Loading বনাম Eager Loading (N+1 Problem)
**উত্তরাংশ:**
* **Lazy Loading:** প্রয়োজন হওয়ার মুহূর্তে আলাদা অতিরিক্ত SQL Query চালিয়ে রিলেশন ডাটা নিয়ে আসা। এতে N+1 সমস্যা তৈরি হয় (১টি মূল কুয়েরি + N টি রিলেটেড কুয়েরি)।
* **Eager Loading:** `Post::with('comments')->get()` এর মাধ্যমে আগেই `IN (...)` কুয়েরি চালিয়ে মাত্র ২টি কুয়েরিতে ডাটা নিয়ে আসা।

---

### Q6: Pivot Table Indexing কীভাবে করতে হয়?
**উত্তরাংশ:**
Many-to-Many রিলেশনে duplicate entry ব্লক করতে এবং সার্চ পারফরম্যান্স বাড়াতে Pivot Table-এ **Composite Unique Index** ব্যবহার করতে হয়:
```php
$table->unique(['student_id', 'course_id']);
```

---

## ২. SQL, PostgreSQL & Indexing

### Q7: SQL Injection কি এবং কীভাবে প্রতিরোধ করা যায়?
**উত্তরাংশ:**
* **SQL Injection:** হ্যাকার কর্তৃক ইনপুট ফিল্ডে ক্ষতিকর SQL কোড ইনজেক্ট করে ডাটাবেজ বাইপাস বা ধ্বংস করা।
* **প্রতিরোধ:** PDO Parameter Binding / Prepared Statements ব্যবহার করা।

---

### Q8: Database Indexing এবং এর Data Structures কি কি?
**উত্তরাংশ:**
* **Indexing:** ডাটাবেজ টেবিল থেকে তথ্য খোঁজার গতি বাড়াতে তৈরি করা বিশেষ ডাটা স্ট্রাকচার।
* **Data Structures:**
  1. **B-Tree (Balanced Tree):** Default, Range Query & Sorting-এর জন্য সেরা ($O(\log n)$)।
  2. **Hash Table:** Exact Match ($=$) এর জন্য দ্রুততম ($O(1)$)।
  3. **Bitmap Index:** Low cardinality (যেমন: Male/Female) ফিল্ডের জন্য সেরা।
  4. **R-Tree (Rectangle Tree):** Spatial / Location (Coordinates) ডাটার জন্য ব্যবহৃত হয়।

---

### Q9: Column-এ কি কি ধরনের Index apply করা যায়?
**উত্তরাংশ:**
1. **PRIMARY KEY:** Unique + NOT NULL.
2. **UNIQUE INDEX:** Unique values, NULL allowed.
3. **INDEX (B-Tree):** Non-unique default index.
4. **FULLTEXT INDEX:** Text search (`MATCH...AGAINST`).
5. **SPATIAL INDEX (R-Tree):** GIS / Coordinates Data.

---

### Q10: SPATIAL INDEX (R-Tree) কীভাবে কাজ করে?
**উত্তরাংশ:**
Spatial Data Types (`POINT`, `POLYGON`) এর ওপর Minimum Bounding Rectangle (MBR) গঠন করে R-Tree ইন্ডেক্স কাজ করে। এটি নির্দিষ্ট লোকেশন বা ভৌগোলিক সীমানার ভেতরের পয়েন্টগুলো দ্রুত খুঁজতে ব্যবহৃত হয় (`MBRContains()`).

---

### Q11: Primary Key এবং Unique Index-এর পার্থক্য কি?
**উত্তরাংশ:**
Primary Key টেবিলে একটিই হতে পারে এবং এতে কোনো `NULL` ভ্যালু গ্রহণ করে না। Unique Index টেবিলে একাধিক কলামে থাকতে পারে এবং এটি `NULL` মান এলাউ করতে পারে।

---

### Q12: LEFT JOIN বনাম LEFT OUTER JOIN এবং JOIN বনাম INNER JOIN
**উত্তরাংশ:**
* `LEFT JOIN` এবং `LEFT OUTER JOIN`-এর মধ্যে কাজের দিক থেকে **কোনো পার্থক্য নেই** (উভয়ই সমান)।
* `JOIN` এবং `INNER JOIN`-এর মধ্যেও পার্থক্য নেই, কারণ টাইপ না লিখলে SQL ডিফল্টভাবে `INNER JOIN` করে।

---

### Q13: MySQL বনাম PostgreSQL
**উত্তরাংশ:**
| বিষয় | MySQL | PostgreSQL |
| :--- | :--- | :--- |
| **পারফরম্যান্স** | Read-Heavy ওয়েবের জন্য দ্রুত। | Write-Heavy & Complex Analytical Queries. |
| **JSON Support** | সাধারণ JSON সাপোর্ট। | শক্তিশালী JSONB (Binary Indexed) সাপোর্ট। |
| **ACID & MVCC** | InnoDB ইঞ্জিনে সাপোর্টেড। | ডিফল্টভাবে অত্যন্ত কড়া ACID & Advanced MVCC। |

---

### Q14: MySQL-এ দ্বিতীয় সর্বোচ্চ (2nd Highest) মান নির্বাচন করার কুয়েরি
**উত্তরাংশ:**
```sql
SELECT DISTINCT score 
FROM scores 
ORDER BY score DESC 
LIMIT 1 OFFSET 1;
```

---

### Q15: UNION বনাম UNION ALL
**উত্তরাংশ:**
* **UNION:** একাধিক SELECT রেজাল্ট মার্জ করে এবং Duplicate সারি রিমুভ করে (তুলনামূলক স্লো)।
* **UNION ALL:** Duplicate সহ সব সারি দ্রুত মার্জ করে দেয়।

---

### Q16: WHERE বনাম HAVING
**উত্তরাংশ:**
* **WHERE:** `GROUP BY` করার পূর্বে সরাসরি টেবিল রোর ওপর ফিল্টার করে।
* **HAVING:** `GROUP BY` করার পর Aggregated রেজাল্টের ওপর (যেমন: `COUNT()`, `SUM()`) ফিল্টার করে।

---

### Q17: PostgreSQL COALESCE Function কি এবং এটি কীভাবে কাজ করে?
**উত্তরাংশ:**
`COALESCE` হলো PostgreSQL (এবং ANSI SQL) একটি ফাংশন যা এক্সপ্রেশন লিস্ট থেকে প্রথম **Non-NULL** ভ্যালুটি রিটার্ন করে।

**Syntax:** `COALESCE(value1, value2, value3, ...)`

```sql
SELECT name, COALESCE(phone, 'No Phone Provided') AS contact_phone 
FROM users;
```

---

### Q18: PostgreSQL-এ একটি কলামের ডাটা ভেঙে দুইটা কলামে ইনসার্ট/আপডেট করার কুয়েরি
**উত্তরাংশ:**
```sql
DO $$
BEGIN
    ALTER TABLE users 
        ADD COLUMN first_name TEXT,
        ADD COLUMN last_name TEXT;

    UPDATE users
    SET 
        first_name = SPLIT_PART(full_name, ' ', 1),
        last_name  = SPLIT_PART(full_name, ' ', 2);
END$$;
```

---

### Q19: Composite Index কখন ব্যবহার করা উচিত এবং কখন উচিত নয়?
**উত্তরাংশ:**
* **কখন ব্যবহার করা উচিত:** Multiple WHERE/ORDER BY conditions, High Selectivity, Covering index.
* **কখন ব্যবহার করা উচিত নয়:** Leftmost prefix rule ভাঙলে, Low selectivity column প্রথমে থাকলে, ঘনঘন UPDATE হওয়া টেবিলে।

---

### Q20: ১০ মিলিয়ন রেকর্ডে Date of Birth (DOB) থেকে জানুয়ারি মাসের রেকর্ড দ্রুততম সার্চ করার ইনডেক্সিং স্ট্র্যাটেজি
**উত্তরাংশ:**
* **MySQL:** Generated Column (`birth_month`) + Index.
* **PostgreSQL:** Expression Index (`EXTRACT(MONTH FROM dob)`).
* **Without Column Change:** Range Query `dob >= '2025-01-01' AND dob < '2025-02-01'` (B-Tree Index Scan).

---

### Q21: Database Normalization (1NF, 2NF, 3NF)
**উত্তরাংশ:**
1. **1NF:** Atomic values, no repeating groups.
2. **2NF:** 1NF + No Partial Dependency.
3. **3NF:** 2NF + No Transitive Dependency.

---

### Q22: Indexing Algorithms (Merge Sort, Quick Sort, Bulk Loading)
**উত্তরাংশ:**
1. **External Merge Sort ($O(n \log n)$):** ডিস্কে বড় ডাটা সাজিয়ে B+Tree গঠন করার জন্য ব্যবহৃত অ্যালগরিদম।
2. **Quick Sort:** ইন-মেমোরি প্রসেসিংয়ের জন্য।
3. **Bulk Loading:** সর্টেড নোড দিয়ে B+Tree তৈরি করার জন্য।

---

### Q23: ACID Compliance এবং Concurrency Handling (টিকিট বুকিং ও স্টক লকিং)
**উত্তরাংশ:**
* **ACID:** Atomicity, Consistency, Isolation, Durability.
* **১০,০০০ জন একসাথে টিকিট বুক বা স্টক অর্ডার করতে চাইলে সমাধান:**
  1. Unique constraints `UNIQUE(seat_id, show_id)`.
  2. Transaction + Row Locking (`lockForUpdate()`).
  3. Redis Distributed Locks / Queue.

---

### Q24: ডাটাবেজ রো (Row) লক হয়ে থাকলে সমাধান
**উত্তরাংশ:**
1. `information_schema.innodb_trx` থেকে locked process খুঁজে বের করা।
2. `KILL <process_id>;` চালানো।
3. Queue/Horizon locks থাকলে `php artisan queue:restart` চালানো।

---

### Q25: একটি সারির (Row) কতোবার এবং কখন আপডেট হয়েছে তা ট্র্যাকিং রাখার কৌশল
**উত্তরাংশ:**
1. JSON Field (`history` column) এ Observer দিয়ে চেঞ্জ পুশ করা।
2. Dedicated `user_audits` টেবিল অথবা `spatie/laravel-activitylog` ব্যবহার করা।

---

### Q26: Flight Reservation System Database Schema
**উত্তরাংশ:**
* `customers`, `routes`, `flights`, `fares`, `seats`, `bookings`.

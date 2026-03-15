# Object Oriented Programming (OOP) in PHP

## Programming Paradigm
প্রোগ্রামিং করার বিভিন্ন ধরন বা পদ্ধতিকে (Way) প্রোগ্রামিং প্যারাডাইম বলে। 
1. **Procedural:** ফাংশন (Function) ব্যবহার করে প্রোগ্রাম লেখা। ফাংশন হলো Set of instructions যা কোনো স্পেসিফিক কাজ (task) করে।
2. **Object Oriented (OOP):** এখানে ফাংশনে শুধুমাত্র কাজকে আইসোলেট করার বদলৈ একটি বস্তুর (Object) বৈশিষ্ট্য এবং কাজ উভয়কে আইসোলেট করে কাজ করা হয়।

## Class and Object
**Class:** একটি ক্লাস হলো অবজেক্টের ব্লু-প্রিন্ট (Blueprint) বা কাঠামো। ক্লাস মূলত কিছু প্রোপার্টি (বৈশিষ্ট্য) এবং মেথডকে (কাজ) একত্রে আইসোলেট করে।
**Object:** কোনো ক্লাসের একটি বাস্তব দৃষ্টান্ত। একটি অবজেক্টে ৩টি জিনিস থাকে:
1. `Property`: ডেটা বা আইডেন্টিটি। 
2. `Method`: অ্যাকশন বা ফাংশন।
3. `Identity`: মেমোরি লোকেশন। (একই ভ্যালু হলেও দুটি অবজেক্টের মেমোরি পয়েন্টার ভিন্ন হয়, তাই `$person1 !== $person2`)

**Message Passing Communication:** অবজেক্টগুলোর মধ্যে ডেটা পাসিং বা এক্সচেঞ্জ করা।

## 4 Pillars of OOP

### 1. Encapsulation
অনেকগুলো ডাটা বা মেথডকে একটি ক্লাসের ভেতরে আবদ্ধ করার প্রক্রিয়া। বাইরের অবান্তর বিষয় হাইড করে শুধুমাত্র ডাটার সিকিউরিটি ও আইসোলেশন নিশ্চিত করাই এর মূল কাজ।
- সিঙ্গল রেস্পন্সিবিলিটি প্রিন্সিপাল (Single Responsibility Principle) অনুসারে একটি ক্লাসকে খুব ছোট স্কোপে রাখা বা একটি নির্দিষ্ট কাজের জন্য তৈরি করা উচিত। অনেক বড় অবজেক্টকে ভেঙে ছোট করা বা Object Breakdown।

### 2. Abstraction
কোনো জটিল সিস্টেমের ইমপ্লিমেন্টেশন ডিটেইল বা আজেবাজে জিনিস হাইড করে শুধুমাত্র প্রয়োজনীয় ইন্টারফেস বা বৈশিষ্ট্যগুলো শো করার কাজই হলো Abstraction।
- যেমন- `$person1->walk();` কল করলে ভেতরে ১০ লাইনের কোড থাকলেও ইউজার শুধু জানবে যে এটি হাঁটবে।
- ব্যবহারকারীর সিনারিও অনুযায়ী ক্লাসের প্রপার্টি ভিন্ন হতে পারে, যেমন বাস (Bus) এর টিকেট বুকিং সিস্টেমের ক্লাস আর বাসের ম্যানুফ্যাকচারিং ক্লাস সম্পূর্ণ ভিন্ন।

### 3. Inheritance vs Interface vs Trait
কোডের ডুপ্লিকেশন কমানোর জন্য ইনহেরিটেন্স (Inheritance) ব্যবহার করা হয়। 

**Abstract Class vs Interface:**
- **Abstract Method:** যদি কোনো মেথড সবগুলো চাইল্ড ক্লাসে রাখতেই হবে এমন কনট্রাক্ট তৈরি করতে হয়, তখন তা Abstract মেথড হিসেবে ডিক্লেয়ার করা হয়। Abstract ক্লাসের কোনো অবজেক্ট তৈরি করা যায় না।
- **Interface:** ইনহেরিটেন্সের বাইরে গিয়ে (unrelated class-এর ক্ষেত্রে) কোনো মেথডকে ফোর্স (enforce) করতে চাইলে Interface ব্যবহার করা হয়। (যেমন `interface Notifiable`)
- **Trait:** যদি কোনো মেথডের ইমপ্লিমেন্টেশন বা কোড সব জায়গায় একইরকম হয় এবং ইনহেরিটেন্সের কোনো রিলেশন না থাকে, তখন কোড ডুপ্লিকেশন এড়াতে Trait ব্যবহার হয়।

*Summary:*
> - Impose a behaviour in Inheritance chain -> **Abstract method**
> - Impose a behaviour in any kind of unrelated class chain -> **Interface**
> - Reduce code duplication (no inheritance, same implementation) -> **Trait**

### 4. Polymorphism
একই নামের মেথড বা অবজেক্ট বিভিন্ন ধরনের ক্লাসে ভিন্ন ভিন্ন আচরণ (Behaviour) প্রদর্শন করাকে পলিমরফিজম বলে। ইন্টারফেস মূলত এটি অর্জনে সাহায্য করে।

---

## Dependency Inversion Principle (DIP) 
একটি ক্লাসের পাবলিক মেথডগুলোকে ওই ক্লাসের **Public API / Contract** বলে। পাবলিক মেথডগুলো এমনভাবে তৈরি করা উচিত যাতে বাইরে থেকে পরিবর্তন করার প্রয়োজন না পড়ে। যদি কিছু চেঞ্জ করতে হয়, তা `private` মেথডে করা ভালো।

```php
// Program to an Interface, not to an implementation
class CMS {
    // Tight Coupling
    public function sendNotification(User $user) {
        $user->notify();
    }
}
```
এখানে যদি `User` ক্লাসের বদলে অন্য কোনো ক্লাস পাঠানো হয়, তবে কোড ব্রেক করবে। কারণ `CMS` (High level module) সরাসরি `User` (Low level module)-এর উপর ডিপেন্ডেন্ট। এটি একটি **Tightly Coupled** সিস্টেম। 

এটিকে **Loosely Coupled** করতে `Dependency Inversion Principle` প্রয়োগ করতে হবে:
```php
class CMS {
    // Loose Coupling
    public function sendNotification(Notifiable $notifiable) {
        $notifiable->notify();
    }
}
```
এখানে `CMS` ক্লাসটি কোনো নির্দিষ্ট ক্লাসের উপর ডিপেন্ড না করে, একটি `Notifiable` ইন্টারফেসের (Behaviour) উপর ডিপেন্ড করছে। যে কেউ এই ইন্টারফেস ইমপ্লিমেন্ট করলে তাকে এখানে ইনজেক্ট করা যাবে।

> "Change is the only constant thing in software development."
> Software Architecture এর `Event Driven System` একটি টোটাল Loosely Coupled সিস্টেম।

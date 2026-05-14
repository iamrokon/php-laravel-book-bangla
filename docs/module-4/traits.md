# Module 4: Traits

Composition এবং Inheritance এর মতো Traits ও কোড রি-ইউজ (Code reuse) এর ক্ষেত্রে ব্যবহৃত হয়। Trait এর স্ট্রাকচার ক্লাসের মতোই অর্থাৎ প্রোপার্টি এবং মেথড নিয়ে তৈরি হয়। শুধু `class` এর জায়গায় `trait` কি-ওয়ার্ড ব্যবহার করতে হয়।

ধরা যাক, আমাদের `Post` এবং `Comment` নামে দুটি ক্লাস আছে। আমরা এই ক্লাস দুটিতে একটি ফিচার অ্যাড করতে চাই যার মাধ্যমে পোস্ট এবং কমেন্ট সোশ্যাল মিডিয়ায় শেয়ার করা যাবে। এর জন্য আমরা একটি Trait তৈরি করতে পারি।

```php
trait Shareable {
    public function share() {
        printf("Shared to social media\n");
    }
}

trait Likeable {
    public function like() {
        printf("Liked!\n");
    }
}

class Post {
    use Shareable, Likeable;
}

class Comment {
    use Shareable;
}

// ব্যবহার:
$post = new Post();
$post->share(); // Trait এর মেথড কল হচ্ছে
$post->like();

$comment = new Comment();
$comment->share();
```

কোনো ক্লাসের মধ্যে কোনো Trait কে ব্যবহার করলে Trait এর মেথডগুলো উক্ত ক্লাসে অ্যাভেইলঅ্যাবল (Available) হয়ে যায়। ভিন্ন ভিন্ন ফাংশনালিটি একটা ক্লাসে ব্যবহার করার জন্য Trait ব্যবহৃত হয়।

### রিলেশনশিপের পার্থক্য:
- **Composition (has-a):** দুটি ক্লাসের মধ্যে **has-a** রিলেশনশিপ থাকলে Composition ব্যবহৃত হয়।
- **Inheritance (is-a):** দুটি ক্লাসের মধ্যে **is-a** রিলেশনশিপ থাকলে Inheritance ব্যবহৃত হয়।
- **Trait:** যখন **is-a** বা **has-a** রিলেশনশিপ থাকে না, কিন্তু কোনো বিশেষ বিহেভিয়ার (Behavior) শেয়ার করতে হয়, তখন Trait ব্যবহৃত হয়।

### মনে রাখা জরুরি:
Trait জাস্ট কোনো বিহেভিয়ারকে ধারণ করার জন্য ব্যবহৃত হয়। একে সরাসরি অবজেক্ট হিসেবে ব্যবহার করা যায় না (অর্থাৎ `new TraitName()` করা যায় না)। এক্সট্রা ফাংশনালিটি দেওয়ার জন্য এটি ব্যবহৃত হয়।

**ইন্টারফেস (Interface) বনাম ট্রেইট (Trait):**
ইন্টারফেসে শুধু মেথডের ডেফিনিশন (Definition) থাকে, কোনো ইমপ্লিমেন্টেশন (Implementation) থাকে না। কিন্তু ট্রেইটে মেথডের ইমপ্লিমেন্টেশন সরাসরি লিখে দেওয়া যায়, যা একাধিক ক্লাস শেয়ার করতে পারে।

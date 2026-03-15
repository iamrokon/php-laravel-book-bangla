# Constants and Enums in PHP

ডেটাবেজ স্ট্যাটাস বা অ্যাপ্লিকেশনের ভ্যালুগুলো স্ট্রিং হিসেবে চেক করতে গেলে স্পেলিং মিস্টেক (Spelling mistake), বা কেস সেন্সিটিভ (Upper Case, Lower Case) সমস্যার কারণে এরর হতে পারে। এটি প্রতিরোধ করতে Constant ও Enum ব্যবহৃত হয়।

## 1. Using Constants
পিএইচপি-তে `final class` এবং কনস্ট্যান্ট তৈরি করার নিয়ম হলো:
```php
final class Status {
    public const DRAFT = 'draft';
    public const PUBLISHED = 'published';
    public const UNDER_REVIEW = 'under-review';
}
```

**Bad Practice:**
```php
if ($post->getStatus() === 'published') {
    // Magic string - chance of typo
}
```

**Good Practice:**
```php
if ($post->getStatus() === Status::PUBLISHED) {
    // Safe option
}
```

## 2. Using Enums (PHP 8.1+)
পিএইচপি ৮.১ থেকে কনস্ট্যান্টের চেয়ে উন্নত এবং টাইপ সেইফ অপশন হিসেবে **Enum** (Enumeration) এসেছে। Enum নিজে একটি "Type" হিসেবে কাজ করে। 

**Backed Enum Example:** 
যেখানে আমরা Enums-এর কেসগুলো স্পেসিফিক ভ্যালু (যেমন `int` বা `string`) ধারণ করে।

```php
enum Status: int {
    case DRAFT = 1;
    case PUBLISHED = 2;
    case UNDER_REVIEW = 3;
}
```

**Enum Type Hinting in Class:**
ক্লাসে Enum টাইপ হিটিং হিসেবে ব্যবহার করলে ভ্যালু মিসম্যাচ বা অমান্য ভ্যালু দেওয়ার সুযোগ থাকে না। 

```php
class BlogPost {
    private Status $status;

    public function getStatus(): Status {
        return $this->status;
    }

    public function setStatus(Status $status): void {
        $this->status = $status;
    }
}

$post = new BlogPost();

// $post->setStatus('aaa');  // Fatal Error: Argument must be of type Status, string given.

$post->setStatus(Status::DRAFT); // OK. 
```
এতে করে ভ্যারিয়েবলের টাইপ সেফটি এবং ডিপেন্ডেন্সি ইনজেকশন সহজ হয়ে যায়।

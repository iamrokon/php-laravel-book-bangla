# Namespaces in PHP

যখন আমরা বড় প্রজেক্ট তৈরি করি, তখন একই নামের একাধিক ক্লাস ফাইলের প্রয়োজন হতে পারে। একই ফোল্ডারে একই নামের দুটি ফাইল তৈরি করা যায় না, কিন্তু ভিন্ন ফোল্ডারে তৈরি করা যায়। 
আগে যখন ফ্রেমওয়ার্কগুলো ডেভলপ হচ্ছিল, তখন ক্লাসের নামের সংঘর্ষ (Class Name Collision) এড়াতে ফোল্ডারের নামসহ ক্লাসের নাম দেওয়া হতো।

**Bad Practice (Before Namespace):**
```php
// Fodler: PaymentGateway/Paypal/Transaction.php
class PaymentGateway_Paypal_Transaction {
    // ...
}

// Folder: PaymentGateway/Stripe/Transaction.php
class PaymentGateway_Stripe_Transaction {
    // ...
}

// Usage
class PaymentService {
    public function createTransaction($method) {
        if ($method == 'paypal') {
            $transaction = new PaymentGateway_Paypal_Transaction();
        } elseif ($method == 'stripe') {
            $transaction = new PaymentGateway_Stripe_Transaction();
        }
    }
}
```
এভাবে ফোল্ডার হায়ারারকি (Hierarchy) বড় হলে ক্লাসের নাম অনেক বড় ও জটিল হয়ে যায়।

## Introduction to Namespaces
এই সমস্যার সমাধানের জন্যই PHP-তে জেনুইন **Namespace** সাপোর্ট নিয়ে আসা হয়। নেমস্পেস হলো একটা ভার্চুয়াল ফোল্ডার বা ডিরেক্টরির মতো, যা ভার্চুয়াল হায়ারারকি মেইনটেইন করে। এর মাধ্যমে একই প্রজেক্টে একই ক্লাসের নাম একাধিকবার ব্যবহার করা যায় এবং কোনো কনফ্লিক্ট হয় না।

**Using Namespaces:**

`PaymentGateway/Paypal/Transaction.php`:
```php
namespace PaymentGateway\Paypal;

class Transaction {
    // ...
}
```

`PaymentGateway/Stripe/Transaction.php`:
```php
namespace PaymentGateway\Stripe;

class Transaction {
    // ...
}
```

`PaymentGateway/PaymentService.php`:
```php
namespace PaymentGateway;

use PaymentGateway\Paypal\Transaction as PaypalTransaction;
use PaymentGateway\Stripe\Transaction as StripeTransaction;

class PaymentService {
    public function createTransaction($method) {
        if ($method == 'paypal') {
            $transaction = new PaypalTransaction(); // Using Alias
        } elseif ($method == 'stripe') {
            $transaction = new StripeTransaction(); // Using Alias
        }
    }
}
```

### Namespace Best Practices
পিএইচপিতে নেমস্পেস ডিফাইন করার সময় ফোল্ডার হায়ারারকি মেইনটেইন করা বাধ্যতামূলক (mandatory) নয়, কিন্তু এটি **বজায় রাখা Best Practice**।
- যেমন, `Paypal` ফোল্ডারের জন্য শুধু `namespace Paypal;` দেওয়া উচিত নয়।
- বরং প্রজেক্টের রুট থেকে `namespace PaymentGateway\Paypal;` দেওয়া উচিত। 

প্যাকেজের ক্লাস ফাইল ব্যবহারের সময়ও এই নেমস্পেস বা অ্যালায়াসিংয়ের (aliasing) ফলেই একাধিক একই নামের ক্লাস যুক্ত করার সমস্যা থেকে মুক্তি পাওয়া যায়।

# Module 19: Live Class 1: Web Developer Essentials
Regular request response   
Async job / Background job processing 
Consuming API of third-party services  
Webhook   
Real time communication (WebSocket) $\rightarrow$ Broadcasting   
Task scheduling   
Caching  
Performance optimization   
Scaling technique

Guzzle দিয়ে 3rd party service থেকে ডাটা আনা হয় curl এর বদলে।   
```PHP
$client = new GuzzleHttp\Client();
```[cite: 13]

**home.blade.php**
```html
<body>
    {{ \Illuminate\Support\Facade\Http::client()->get('')->getBody() }}
```

এই কোডটা ব্রাউজারের কোনো কাজ নয়। অর্থাৎ এই কোডটা এক্সিকিউট হয় আর রেজাল্ট টা ব্রাউজারের কাছে যায়



ভিউতে কোড বা blade ফাইলে রাখলে অ্যাপ্লিকেশন টাইম বেশি লাগবে (blade রেন্ডার করার সময়)। তাই vvi! blade ফাইলে রাখা যাবে না। বরং কন্ট্রোলার বা সার্ভিস ক্লাসে রাখতে হবে।   লারাভেলে Guzzle ঠিক ব্যবহৃত হয় HTTP ক্লায়েন্ট এর জন্য।   যেমন:PHPHttp::get('http://example.com/users/1/name');
```

```php
$response->ok() // bool;
```
$\rightarrow$ কোনো কারণে fail করলে আবার retry করতে পারি: `retry(3, 100)`

```php
Http::retry(3, 100)->withQueryParameters([
    'name' => 'Taylor',
])->get('http://example.com/users');
```

```php
])->get('http://example.com/users');
```

`DB::transaction` এর মাধ্যমে সবগুলো কুয়েরি একটি ট্রানজ্যাকশন এর মধ্যে ফেললে ইনসার্টকে একটি অটোমেটিক রোলব্যাক করতে হবে। এটি একটি চমৎকার ব্যাপার।

Guzzle এর চেয়ে Saloon বেটার।



Webhook ও RESTful API এর পার্থক্য কি?   
Webhook  
  Webhook Server  
   Webhook Client   
console.cloud.google.com $\rightarrow$ Social লগইন করতে গেলে Social Credential ঠিক করতে হয়। আমাদেরকে ঠিকই Webhook Client-এ Credential সেটআপ করতে হয়। তাই webhook server, client হ্যান্ডেল করে। এটার ভেতর Social এবং Webhook-এর কনসেপ্ট রয়েছে।  


Laravel Socialite $\rightarrow$ এটার মধ্যেও Social ও Webhook-এর কনসেপ্ট রয়েছে।  
 Webhook Client 
   Register
     API route and handler   
Webhook Servers $\rightarrow$ আমরা bKash-এর মতো API ঠিক করে দেই। 
  Store registration data in DB 
    Store registration data, search webhook registers data 
    Event occurs, search webhook registers data 
    Call matched client's webhook url   Zapier $\rightarrow$ Third party integration


    

Google ফর্মে সাবমিটকৃত ডাটাকে Zapier দিয়ে আমাদের অ্যাপ্লিকেশনে নিয়ে আসব। অন্য যে কোনো সার্ভিস থেকে আসা ডাটাকেই আমরা Zapier দিয়ে আমাদের অ্যাপ্লিকেশনে নিয়ে আসতে পারি।   

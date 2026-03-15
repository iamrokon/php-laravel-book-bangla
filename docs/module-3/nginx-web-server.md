# Web Server & Nginx Concepts

## Web Server and its types
যেকোনো ইন্টারনেট কানেক্টেড ডিভাইসে যদি কোনো প্রোগ্রাম রান করে এবং সেটিকে রিকোয়েস্ট পাঠালে রেসপন্স ব্যাক করে, তাকেই সার্ভার বলে।
- **Web Server:** যে সার্ভার HTTP প্রটোকল (রিকোয়েস্ট ও রেসপন্স) নিয়ে কাজ করে। 
- **Mail Server:** যে সার্ভার ইমেইল আদান-প্রদান (SMTP Protocol) হ্যান্ডেল করে।
- **DNS Server:** ডোমেইন নেম (www.google.com) এ রিকোয়েস্ট করলে সেটিকে IP অ্যাড্রেস (192.168.x.x) এ কনভার্ট করে।
- **Proxy Server:** ক্লায়েন্ট এবং মেইন সার্ভারের মাঝে ফিল্টারিং, সিকিউরিটি এবং রাউটিং এর কাজ করে।

## Proxy Server 
প্রক্সি সার্ভার (Proxy Server) মূলত ক্লায়েন্ট এবং সার্ভারের মাঝখানে একটি লেয়ার (Middle layer) হিসেবে কাজ করে। প্রক্সি সার্ভার সাধারণত দুই প্রকার:

1. **Forward Proxy:** 
   যখন ক্লায়েন্ট অন্য কোনো সার্ভারে বা ওয়েবসাইটে সরাসরি অ্যাক্সেস করতে না পারে (যেমন: ব্লক করা সাইট), তখন সে একটি VPN বা প্রক্সির মাধ্যমে রিকোয়েস্ট করে। এটি Forward proxy। এখানে ক্লায়েন্ট কোন সাইটে ভিজিট করতে চায় তা ওই ওয়েবসাইট বা ফাইনাল ডেস্টিনেশনের কাছে ক্লিয়ার থাকে না। উল্টো, ওয়েবসাইটের সার্ভার ভাবে যে ওই VPN এর প্রক্সি সার্ভার থেকেই রিকোয়েস্টটি এসেছে।

2. **Reverse Proxy:**
   যখন কোনো সার্ভারের সামনে একটি প্রক্সি সার্ভার রাখা হয়, যেখানে ক্লায়েন্ট রিকোয়েস্ট পাঠায় প্রক্সি সার্ভারের কাছে কিন্তু সে রেসপন্স পায় মেইন সার্ভার থেকে। অর্থাৎ এখানে ফাইনাল ডেস্টিনেশন বা মেইন সার্ভারের পরিচয় ক্লায়েন্টের কাছে ক্লিয়ার থাকে না, ক্লায়েন্ট শুধু রিভার্স প্রক্সির আইপি বা ডোমেইন চেনে। (যেমন: Nginx, Cloudflare CDN)।
   বড় কোনো সিস্টেম বা অ্যাপ্লিকেশনে ক্লায়েন্ট যখন রিকোয়েস্ট পাঠায়, তখন লোড ব্যাল্যান্সার (Load Balancer) ডিসাইড করে কোন সার্ভার থেকে রেসপন্স আসবে। এটি রিভার্স প্রক্সির একটি উদাহরণ।

## Concurrency vs Parallelism vs Process vs Thread
- **Process (প্রসেস):** কোনো প্রোগ্রাম রান করলে সেটি একটি Process। প্রতিটি প্রসেসের মেমোরি আইসোলেটেড (Isolated) থাকে, এক প্রসেস অন্য প্রসেসের ডাটা মেমোরি অ্যাক্সেস করতে পারে না। যদি কমিউনিকেট করতে হয় তবে IPC (Inter Process Communication) ব্যবহার করতে হয়।
- **Thread (থ্রেড):** প্রসেসের মধ্যে থ্রেড হলো কাজের সবচেয়ে ছোট ইউনিট। একটি প্রসেসে একাধিক থ্রেড রান করতে পারে এবং তারা মেমোরি শেয়ার করে কাজ করে।
- **Concurrency (কনকারেন্সি):** একটি সিঙ্গেল পয়েন্ট অফ টাইমে একাধিক প্রসেস রান করা কিন্তু প্যারালাল না হওয়া। (One core CPU-তে একসাথে অনেক কাজ দ্রুত সুইচ করে করা)।
- **Parallelism (প্যারালালিজন):** যখন মাল্টিপল কোর CPU-তে একসাথে একই সময়ে অনেকগুলো প্রসেস রান করা হয়। 

## Apache vs Nginx
Apache সার্ভার রিকোয়েস্ট প্রসেস করতে প্রতিটির জন্য একটি করে নতুন প্রসেস তৈরি করত ফলে ১০ হাজার রিকোয়েস্ট (C10k problem) একসাথে হ্যান্ডেল করতে পারত না। 
অন্যদিকে **Nginx** ইভেন্ট ড্রাইভেন (Event Driven) আর্কিটেকচার ফলো করে রিকোয়েস্ট হ্যান্ডেল করে (অনেকটা Node.js এর Event loop এর মতো)। এটি একটি ওয়ার্কার প্রসেস দিয়ে টাইম কনজিউমিং (Time consuming) কাজগুলো ইভেন্ট লুপে ফেলে দেয় এবং অন্য রিকোয়েস্টগুলোর রেসপন্স ফাস্ট করে। এতে একই হার্ডওয়্যারে Apache এর চেয়ে Nginx বেশি রিকোয়েস্ট হ্যান্ডেল করতে পারে।

> Apache এবং Nginx হলো ওয়েব সার্ভার (Web server)। আর RoadRunner, FrankenPHP, gUnicorn হলো অ্যাপ্লিকেশন সার্ভার (Application Server)। অ্যাপ্লিকেশন সার্ভারের ক্ষেত্রে SAPI প্রয়োজন হয় না।

**Keep-Alive:** ক্লায়েন্ট থেকে সার্ভারে রিকোয়েস্ট যাওয়ার পর "Keep-alive" মেকানিজম ব্যবহার করে ক্লায়েন্ট ও সার্ভারের (Network / Router to Router) কানেক্টিভিটি ঠিকঠাক আছে কিনা তা চেক করা হয়।

## Nginx Configuration Basics
Nginx কনফিগারেশন থাকে `/etc/nginx/` ফোল্ডারে। `nginx.conf` হলো এর প্রধান ফাইল। কমান্ড লাইনে ডিফল্ট কনফিগারেশন দেখতে:
`cat /etc/nginx/nginx.conf.default`

Nginx কনফিগারেশনে দুটো জিনিস থাকে: ১. Directive ২. Context ব্লক।

1. **Simple Directive:** `listen 8080;` এর মতো কি-ওয়ার্ড এবং ভ্যালু।
2. **Block Directive:** কোনো ডিরেক্টিভের ভ্যালু যখন একটি ব্লক `{ ... }` এর ভেতরে থাকে।
3. **Context:** কিছু ব্লক, যার ভেতরে আরো অনেকগুলো ডিরেক্টিভ থাকে (যেমন: `http {}`, `server {}`, `events {}`)।

```nginx
events {}
http {
    # Include default mime types
    include /etc/nginx/mime.types;

    server {
        listen 8080;
        server_name localhost;
        
        # Static file serve
        root /path/to/project;
        index index.html;
        
        # Response with string directly
        # return 200 "Hello viewers!";
        
        # Route specific block
        location /about {
            root /path/to/about/project;
        }
    }
}
```
**Nginx Commands:**
- `nginx -t`: কনফিগারেশন ঠিক আছে কিনা চেক করতে।
- `nginx -s reload`: সার্ভার রিলোড দিতে।

### Nginx as Reverse Proxy
`proxy_pass` ব্যবহার করে আমরা Nginx কে Reverse Proxy হিসেবে কাজ করাতে পারি। তখন রিকোয়েস্ট আসলে সেটি অন্য কোনো সার্ভারে বা অ্যাপ্লিকেশনে (যেমন- Node.js বা PHP-FPM) ফরওয়ার্ড করে দেয়।
```nginx
http {
    server {
        listen 80;
        location /about {
            proxy_pass http://google.com; 
        }
        
        location ~ \.php$ {
            # Forward PHP files to PHP-FPM
            fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
            include fastcgi_params;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        }
    }
}
```

### Nginx as Load Balancer
একাধিক অ্যাপ্লিকেশন সার্ভারের মাঝে লোড ব্যাল্যান্সিং করতে:
```nginx
http {
    upstream backend {
        server backend1.example.com weight=5; # Priority
        server backend2.example.com;
        server 192.168.0.1 backup; # Backup server
    }

    server {
        listen 80;
        location / {
            proxy_pass http://backend;
        }
    }
}
```
এখানে রিকোয়েস্টগুলো Nginx রাউন্ড সুপার রবিন (Round Robin) মেথডে বিভিন্ন ব্যাকএন্ড সার্ভারে ডিস্ট্রিবিউট করে।

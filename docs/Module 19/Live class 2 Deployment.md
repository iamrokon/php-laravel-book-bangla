# Module 19: Live Class 2: Deployment

Local environment
  Production environment (test?)  
  Staging environment   
  Dev environment   
 Git flow 
   main   dev 
     feature

.env ফাইল:লোকাল বা dev এ: APP_DEBUG = true  
  প্রোডাকশনে: APP_DEBUG = false  
  APP_ENV = production  
GOOGLE, FACEBOOK $\rightarrow$ actual credential প্রোডাকশন বা অন্য কোথাও থাকবে না। Git-এও থাকবে না।   Local-Test project  




Git Guardianএটি Paid ফিচার ব্যবহার করে।  
 প্রজেক্টে কোনো সিকিউরিটি ইস্যু আছে কিনা তা চেক করার কাজে ব্যবহার করা হয়।   
 একটাই হোস্ট (Host) থেকে PHP ডোমেন রান করা / সার্ভার আর্কিটেকচার মেকানিজম:১. Direct Host Machine (ডাইরেক্ট হোস্ট মেশিন):Host machine-এর মধ্যেই সরাসরি ইনস্টল থাকে:phpcomposermysqlredis২. Virtual Machine (VM Structure):Host Machine VM $\rightarrow$ যার ভেতর পৃথক VM তৈরি থাকে।প্রতিটিতে আলাদাভাবে ইনস্টল করা থাকে:phpcomposermysqlredis৩. Docker Container Structure (ডকার কন্টেইনার):Host Machine + Docker Engine $\rightarrow$ এর ভেতর একাধিক Docker container চলে।প্রতিটি কন্টেইনারের ভেতর থাকে:phpcomposermysqlredisহাস্টিং টাইপ (Hosting Types):VPS (Virtual Private Server)Shared hostingcPanel





Orchestration (অরকেস্ট্রেশন):Docker swarm   Kubernetes $\rightarrow$ Docker ম্যানেজ করার হাতিয়ার।   লোকাল থেকেই সরাসরি ডিপ্লয়মেন্ট শুরু করার জন্য বা deployment-এর কনফিগারেশন ঠিক করতে হবে।   যেমন: .htaccess, কনফিগার ফাইলে ডাটা ঠিক করতে হয়।   Git pull, composer install, migration ইত্যাদি করতে হয়।   Web hook সেট আপ করা।   




Optimize (অপ্টিমাইজেশন):php artisan config:cacheএটি সব config-কে একটি ফাইলে নিয়ে এসে অপ্টিমাইজ করার জন্য ব্যবহৃত হয়।   php artisan event:cacheইভেন্ট, লিসেনার সবগুলোকে একসাথে নিয়ে আসে।   php artisan route:cacheসব রাউটগুলোকে ক্যাশ ফাইলে নিয়ে আসে।   php artisan optimize কমান্ড রান করলে উপরের সব ক্যাশ একবারে হয়ে যায়।   Health Check (হেলথ চেক):->withRouting(...)web: ...health: '/up'health: '/status'সার্ভিসটি ওকে আছে কিনা তা চেক করতে হেলথ চেক রুট (Health Route) ব্যবহৃত হয়। 


Laravel Forge ব্যবহার করলে সার্ভার ম্যানেজমেন্ট করা সহজ হয়ে যায়।   Laravel Vapour-এ সার্ভারলেস টেকনোলজি ম্যানেজ করতে হয়।   Envoyermer: Zero downtime PHP deployment   New Code $\rightarrow$ Server/Container এর মধ্যে কাজ করে:Git pull   Webserver restart   Migration   নতুন কোড সার্ভারে আপ করলে migration টেবল থেকে যায়, ফলে সার্ভার ডাউন হতে পারে। তাই সার্ভার ডাউন হয়ে যায়।   php artisan down $\rightarrow$ সার্ভার মেইনটেন্যান্স মোডে নিয়ে যাওয়া হয়।   এটার সাথে সার্ভার ডাউন না হয়ে উজান (zero downtime) মেইনটেইন করার জন্য Laravel Envoy টুল ব্যবহার করা যায়।   

CI/CD Pipeline (সিআই/সিডি পাইপলাইন)CICD পাইপলাইন মাধ্যমে কোডের সিকিউরিটি সহ অনেক কিছু চেক করা হয়।   এটি GitHub Actions দিয়ে করা যায়। 
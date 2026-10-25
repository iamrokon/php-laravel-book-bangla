Module 10(3) : Episode 7 : Chunking and Lazy Loading

১ লক্ষ বা ১০ লক্ষ বা ১ কোটি ডেটা আমরা যখন লোড করতে চাই তখন মেমোরি খুব সময় লাগবে। এতে মেমোরি ওভারফ্লো হয়ে যেতে পারে।
Laravel Debugger দিয়ে আমরা দেখতে পাব কতটুকু সময় লাগছে বা মেমোরি কতটুকু লাগছে।
DB::table('users') -> 13MB (10000 আর্টিকেল) 69ms
এজন্য আমরা একসাথে অনেক ডেটা লোড না করে chunk করে লোড করতে পারি। অর্থাৎ অল্প অল্প করে ডেটা লোড করতে পারি।
5mb 1.39s (মেমোরি কম লাগছে ও সময় বেশি লাগছে ১০০১টি ডেটা)
DB::table('users') -> orderBy('id') -> chunk(100, function($users) {
    foreach($users as $user) {
        //
    }
});

ইমেজ ও স্ট্রিং বা অ্যানক্রিপশন খুব বেশি মেমোরি খরচ হয়।
মেমোরি কম রাখা খুব গুরুত্বপূর্ণ, সময় একটু বেশি লাগলে সমস্যা নাই। একজন এটা বেশি সময় বলে ইগনোর করে।
এটা পরিবর্তন করতে তাই কখন ব্যবহার হবে।
সেটা দেখতে হবে।
select * from users order by 'id' asc limit 10 offset 0
* " " " " " " " " " " " " 10 " 10
* " " " " " " " " " " " " 10 " 20
* " " " " " " " " " " " " 10 " 30

অনেক কোয়েরি হবে।
chunk ব্যবহার করে বড় ডেটা প্রসেস করলে আমাদের chunkById()
ব্যবহার করতে হবে।
dev.to/hungthai1401/laravel-chunk-be-chreful-40jo
Post::where('processed', 0)->chunk(100, function ($posts) {
    foreach ($posts as $post) {
        $post->processed = 1;
        $post->save();
    }
});

মোট পোস্ট 400
প্রথমে unprocessed পোস্ট 400 (id 1-400)। ১ম কোয়েরি:
select * from 'posts' where 'processed' = 0 limit 100 offset 0,
id 1-100 চেক হবে।
শেষ হওয়ার পর unprocessed পোস্ট 300 (id 101-400), ২য় কোয়েরি:
select * from 'posts' where 'processed' = 0 limit 100 offset 100,
id 101-200 চেক হবে। এর ফলে আগের 100 বাদ পড়ে যাবে।

এজন্য এটি কোয়েরি হবে নিম্নরূপ:
Post::where('processed', 0)->chunkById(100, function ($posts) {
    foreach ($posts as $post) {
        $post->processed = 1;
        $post->save();
    }
});

1st chunk: select * from 'posts' where 'processed' = 0 and 'id' > 0 order by
id asc limit 100
2nd chunk: select * from 'posts' where 'processed' = 0 and 'id' > 100
order by id asc limit 100

Module 11: Episode 2: Fortify, Sanctum, Passport

Laravel Breeze এর মতই Fortify। লারাভেল Breeze ইন্সটল করলে আমরা দেখতে পাব এর রাউট গুলো routes > auth.php ফাইলে চলে গেছে। আর কন্ট্রোলার গুলো থাকবে app > Http > Controllers > Auth ফোল্ডারে।

লারাভেল Fortify শুধুমাত্র backend এর portion টুকু দেয়। আমরা Laravel Breeze এর লজিক গুলো পরিবর্তন করতে পারি। কিন্তু Laravel Fortify এর কোড গুলো exposed থাকেনা এবং change করা যায়না।

Jetstream মূলত Fortify কেই ব্যবহার করে।

Sanctum মূলত Api Authentication নিয়ে কাজ করে। Single Page Application এও কাজ করে। এটি মূলত SPA Authentication এর জন্য।

একটি Session Based Authentication।

লারাভেল Passport মূলত OAuth2 এর স্ট্যান্ডার্ড মেইনটেইন করে। Api Authentication এর জন্য এটি।
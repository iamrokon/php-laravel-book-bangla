ইন্টারভিউয়ের জন্য ইম্পর্ট্যান্ট টপিকগুলো (১) দিয়ে চিহ্নিত করব।
Module 10(3)-Episode 6: Deep dive in query builder.
Insert, update, delete
After 2mins

আমরা যদি ডেটাবেসের কোন একটা টেবিলের ডেটা নিয়ে নতুন আরেকটি টেবিল ইনসার্ট করতে চাই, যার প্রথম insertUsing() মেথড ব্যবহার করতে পারি। যার প্রথম প্যারামিটার থাকে যে টেবিলে ইনসার্ট করতে চাই সেই টেবিলের নামগুলো, দ্বিতীয় প্যারামিটারে কোয়েরিটা থাকে। অর্থাৎ কোন টেবিল থেকে আমরা ডেটা নিয়ে আসতে চাই সেই কোয়েরি।

DB::table('pruned_users') ->insertUsing(
['id', 'name', 'email', 'email_verified_at'],
DB::table('users') ->select(
'id', 'name', 'email', 'email_verified_at',
) ->where('updated_at', '<=', now()->subMonth())
);

আমরা existing কোন কোয়েরি বিল্ডার দিয়ে আপডেট করতে পারি নিম্নরুপে:
$affected = DB::table('users')
->where('id', 1) -> যে Entry কে আপডেট করতে চাই
->update(['votes' => 1]); -> যে কলামগুলোকে আপডেট করতে চাই।

DB::table('users')
    ->updateOrInsert(
        ['email' => 'john@example.com'], // columns to check match
        ['votes' => '2'] // columns to update
    );
১ম আর্গুমেন্ট ব্যবহার করে ডাটাবেসে কোন রেকর্ড আছে কিনা তা খুঁজে বের করবে, যদি রেকর্ড থাকে তবে দ্বিতীয় আর্গুমেন্ট দ্বারা আপডেট করবে। রেকর্ড না থাকলে তিনটি আর্গুমেন্ট মিলিয়ে নতুন রেকর্ড তৈরি করবে।

Upsert:
DB::table('users')
DB::table('flights')->upsert(
    [
        ['departure' => 'Oakland', 'destination' => 'San Diego', 'price' => 99],
        ['departure' => 'Chicago', 'destination' => 'New York', 'price' => 150]
    ],
    ['departure', 'destination'], // columns to check match
    ['price'] // columns to update
);
২য় আর্গুমেন্ট বলে দেয়া হবে কোন কোন কলামের ভিত্তিতে আমরা ডাটাবেসে কোন রেকর্ড আছে কিনা তা চেক করব। তৃতীয় আর্গুমেন্ট কোন কলামের ভ্যালু আপডেট হবে তা বলে দেয়া হয়। যদি ডাটাবেসে কোন রেকর্ড না থাকে তবে ১ম প্যারামিটারগুলো ভ্যালু ইনসার্ট হবে।

৬। updateOrInsert() মেথডটি দুটি কোয়েরি রান হয়। ১ম কোয়েরি
দিয়ে চেক করে যে ডাটা আছে কিনা বা খুঁজে বের করে। এরপর update
বা insert কোয়েরি । কিন্তু upsert() এ একটা কোয়েরি দিয়েই
সব হয়। এই মেথডটি ব্যবহার করে ডাটার।

আমরা কোন একটা কলামের ভ্যালু ১ করে বা ২ বা ... করে
বাড়াতে increment() মেথড কল করতে পারি।

DB::table('users')->increment('votes');
DB::table('users')->increment('votes', 5); // ৫ করে কমবে
DB::table('users')->decrement('votes', 5); // ৫ করে কমবে

কোয়েরি দিয়ে ডাটা ডিলিট করাঃ
$deleted = DB::table('users')->delete(); // users টেবিলের
সব ডাটা ডিলিট
$deleted = DB::table('users')->where('vote', '>', 100)->delete();
নির্দিষ্ট কন্ডিশন ভিত্তিতে ডিলিট হবে।
পুর্বের মেথডটা এই পদ্ধতিতে ডিলিট হবে, Auto
incrementing আইডি এর পর থেকে শুরু হবে।
কিন্তু truncate() মেথড ব্যবহার করলে ডাটা ডিলিট করলে Auto
incrementing এর ID আবার ০ থেকে শুরু হবে।
DB::table('users')->truncate();


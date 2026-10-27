Module 12: Episode 2: Eloquent ORM: Active Record vs. Data Mapper Pattern

ORM ইমপ্লিমেন্ট করার জন্য কিছু ডিজাইন প্যাটার্ন আছে।
যেমন- Active Record, Data Mapper Pattern

Active Record প্যাটার্ন অনুযায়ী একটা নির্দিষ্ট ক্লাস Model ক্লাস ডাটাবেজের একটা টেবিলকে সূচিত করে।
প্রতিটি Model ক্লাস একটা বেজ Model ক্লাসকে Extend করে। বেজ Model ক্লাসে অনেক ফাংশনালিটি আছে যা সব Model ক্লাসে লাগে না। এজন্য Active Record এর ইমপ্লিমেন্টেশনটা Slower। এর Performance Slower হলেও এটি Developer Friendly।

Data Mapper -> এই প্যাটার্নে Model এর পরিবর্তে থাকে Entity
Entity -> simple PHP Object

Symphony Doctrine ORM ব্যবহার করে এই Data Mapper এই প্যাটার্নকে ইমপ্লিমেন্ট করেছে।
এখানে Model ক্লাস কাউকে Extend করে না। এখানে property গুলো বলে দেওয়া থাকে।

আবার Data Mapper প্যাটার্নে Model ক্লাস ডাটাবেজের সাথে কমিউনিকেশন করে না। এর জন্য Data Mapper প্যাটার্নে একটা Entity Manager ক্লাস থাকে যা মেথড অ্যাসাইনমেন্ট সাথে কমিউনিকেট করে। এর persist মেথড আমাদের মডেলকে পুশ করে দিতে হয়।




# Module 12(2): Episode 2: File storage and retrieval

<form action="{{ route('file.store') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <input type="file" name="profile-photo">
    <button type="submit">Submit</button>
</form>
// ফাইল সাবমিট করলে enctype দিতেই হবে।

web.php
Route::post('/post', function (Request $request) {
    $path = Storage::putFile('public', $request->file('profile-photo'));
    
    // আমরা চাইলে স্টোরকৃত ফাইলের নামও বলে দিতে পারি নিম্নরূপেঃ
    $path = Storage::putFileAs('public', $request->file('profile-photo'), '1.jpg');
    // $request->file('profile-photo')->store('public');
    // ->storeAs('...', 2); // ফাইলটি এই নামে সেভ হবে
});



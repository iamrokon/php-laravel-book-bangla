Module 12: Episode 3: Eloquent ORM: More about Eloquent



মডেলের একটি Naming কনভেনশন আছে। যেমন: flights টেবিলের নাম হলে মডেলের নাম হবে Flight আর প্রথম অক্ষর বড় হাতের এবং singular ফর্ম হবে। আমরা চাইলে ভিন্ন টেবিল নামও ব্যবহার করতে পারি $table প্রপার্টি চেঞ্জ করে।

ভিন্ন টাইপের primary-key ও ইনক্রিমেন্টিং false করে দিতে পারি।

public $incrementing = false; -> Model এ

localhost/post/1 -> এটি দ্বারা 1 নম্বর রেকর্ডকে নির্দেশ করছে।
এটা অনেক সময় security শঙ্কার কারণ। এজন্য uuid ব্যবহার করা হয়। এটি দেখতে অগোছালো বিষয়ের মতো (সংখ্যার পরিবর্তে)।
আমরা চাইলে কাস্টম entry তৈরি করতে পারি। (প্রত্যেক Model থেকে false করে দিতে পারি)।

আমরা timestamp ব্যবহার করতে না চাইলে সেটাকে Model থেকে false করে দিতে পারি।

class Flight extends Model
{
    public $timestamps = false;
}

মডেলগুলো বাই ডিফল্ট .env ফাইলের কানেকশনকে ব্যবহার করে।
আমরা চাইলে ভিন্ন কানেকশনও বলে দিতে পারি,
protected $connection = 'sqlite';

Illuminate\Support\Collection -> বেজ কালেকশন ক্লাস
Illuminate\Database\Eloquent\Collection; -> Child কালেকশন ক্লাস

Eloquent দিয়ে নতুন ডাটা ইনসার্ট:
public function store(Request $request) {
    $flight = new Flight; -> ইন্সট্যান্স তৈরি

    $flight->name = $request->name; -> প্রপার্টি ভ্যালু বসানো

    $flight->save(); -> save() মেথড কল
}

এছাড়াও মডেলের facade ব্যবহার করে create() মেথড কল করেও নতুন ডাটা ইনসার্ট করা যায়।
$flight = Flight::create([
    'name' => 'London to Paris'
]);

আপডেট করার জন্য অবজেক্টটা প্রথমে find করে নিয়ে আসতে হবে। তারপর update করতে হবে।
$flight = Flight::find(1);
$flight->name = 'Paris to London';
$flight->save();

অথবা আমরা চাইলে where কন্ডিশনের মাধ্যমে Entry বের করে সেটাকে update() করতে পারি।
Flight::where('active', 1)
    ->update(['delayed' => 1]);

আমরা ডাটাবেজ থেকে কোন ভ্যালু পুরোপুরি ডিলিট না করে বরং তার deleted_at কলামে কোন ডাটা দিয়ে রাখলে সেটাকে পার্মানেন্টলি ডিলিট না করে Soft Delete বলে।

আমরা চাইলে ইভেন্ট লিসেন করেও বিভিন্ন কাজ করতে পারি। যেমন মডেল তৈরির সময় সেটকে লিসেন করা যায় নিম্নরূপে:

class User extends Model
{
    protected static function booted()
    {
        static::created(function ($user) {
            // ...
        });
    }
}
















# Module 12: Episode 5: Eloquent Relationships

Relationship types in Relational DB
Eloquent এর ৩ ধরনের Relationship রয়েছে:
-> One to one
-> One to many
-> Many to many

employees -> company-cars:
one to one

one-to-one রিলেশনশিপের ক্ষেত্রে ডাটাগুলো একই টেবিলে রাখা সম্ভব। কিন্তু আলাদা টেবিলে রাখা হয়।


One-to-many:
dbdiagram.io

users -> posts:
একজন ইউজারের অনেকগুলো posts থাকতে পারে, আবার একটা পোস্টের সাথে অনেকগুলো কমেন্ট থাকে।
এরা উভয়েই one-to-many রিলেশনশিপকে সূচিত করে।

customers -> orders:
one-to-many
একজন customer এর অনেকগুলো order থাকতে পারে কিন্তু একটা অর্ডার শুধুমাত্র একজন customer এর কাছেই belong করে। ওটাও one-to-many রিলেশনশিপ।

Many-to-many (learning management system):
lms (learning management system)


Many-to-many রিলেশনশিপ:
students <-> enrollments <-> courses

একজন স্টুডেন্ট একাধিক কোর্স নিতে পারে।
এনরোল করার সুযোগ আছে।
এই many-to-many রিলেশনশিপের জন্য মাঝখানে একটি pivot table (যেমন: enrollments) তৈরি করা হয়।

users <-> user_settings
users ও user_settings দুটি টেবিলের মধ্যে one-to-one রিলেশনশিপ বিদ্যমান। এটি দুটি টেবিল দিয়ে না তৈরি করলেও চলত।
select * from users join user_settings on users.id = user_settings.user_id

user-settings:
user_id (foreign_key -> users.id)
email_notification_enabled
subscribed_to_newsletter


one-to-one রিলেশনশিপে join করলে একটি entity বের হয়ে আসে (যেমন: hasOne() দিয়ে করা যায়)।

models\User.php

public function setting()
{
    return $this->hasOne(UserSetting::class);
}

web.php

Route::get('/', function () {
    $user = User::with('setting')->find(1);
    // select * from 'users' where 'users.id' = 1 limit 1
    // select * from 'user_settings' where 'user_settings.user_id' is (1)
});

Eloquent এর ক্ষেত্রে user_id দিয়ে users টেবিলের সাথে সার্চ করে নিয়ে আসে।
user_id দিয়ে ডাটা নিয়ে আসার পরিক্রমায় User model এর মাধ্যমে নিয়ে আসার পর Eloquent relations নামক প্রপার্টিতে User model সংরক্ষিত থাকে।


অর্থাৎ সিঙ্গেল মডেল মধ্যস্থ মূল মডেলকে resolve করে তার ডাটাকে কল দেয়। Join সরাসরি দিয়ে না করে Model দিয়ে করায়।

কম্পাইলার যেসব মেথড কল করবে:
User model (User) এর বিল্টইন মেথড (UserSetting) কল করবে। যে মডেল থেকে কল করা হচ্ছে (User) তার রিলেটেড ইনফরমেশন সংগৃহীত থাকে।

মার্জ উইথ ডাইনামিক মডেল (User) আর User setting (User) দুইটার কি আলাদা করা রয়েছে।

User মডেলের সাথে hasOne(User_setting), আর সেটা হবে foreign_key থাকবে (user_setting) এর মডেলের নাম হতে হবে hasOne() দিয়ে কল করা যাবে।

মডেল (সংশ্লিষ্ট) নাম belongsTo()

app\Models\UserSetting.php

class UserSetting extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

One to many relationship:
মেথড স্পেসিফিক অনেকগুলো কভার করতে পারে। Posts টেবিলের foreign-key অর্থাৎ post_id এর মাধ্যমে comments টেবিল। এটি Post মডেল ফিল্টারিং করে hasMany()

class Post extends Model
{
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}

class Comment extends Model
{
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}


hasMany() -> মেথডের মাধ্যমে একটা ডাটার নির্দিষ্ট ডাটা নেওয়ার খুব একটা প্রয়োজন হয় না।

আমরা কাস্টমাইজড করে এভাবে করতে পারি:

class Post extends Model
{
    public function latestComment()
    {
        return $this->hasOne(Comment::class)->latestOfMany();
    }
}

Has One Through:

mechanics:
id - integer
name - string

cars:
id - integer
model - string
mechanic_id - integer

owners:
id - integer
name - string
car_id - integer

মেকানিকস টেবিলের সাথে cars টেবিলের one-to-one রিলেশনশিপ, আবার cars টেবিলের সাথে owners টেবিলের one-to-one রিলেশনশিপ। এর অর্থ মেকানিকস কিসের owner এর সাথে কাজ করছে সেটা বের করতে হবে। একই সাথে has-one-through এপ্রোচে hasOneThrough() মেথডটি ব্যবহৃত হয়। কোন দুটি মডেলের মাধ্যমে সেটা বলে দিতে হয়।

class Mechanic extends Model
{
    public function carOwner()
    {
        return $this->hasOneThrough(Owner::class, Car::class);
    }
}

Many-to-many রিলেশনশিপ:

users -> roles
id - integer
name - string

role_user (pivot table)
role_id - integer
user_id - integer

roles
id - integer
name - string

এখানে একজন user এর অনেকগুলো role থাকতে পারে। আবার একটি role এর ব্যাকএন্ডে অনেকগুলো user থাকতে পারে।
এজন্য তাদের মধ্যে relation হলো belongsToMany()

class User extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }
}

class Role extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}

লারাভেল টেবিলের (role_user) নামানুসারে নাম খুঁজে নেয়। নাম অন্যরকম থাকলেও আর্গুমেন্টে উল্লেখ করে দেওয়া যায়।







# Module 12: Episode 5: Eloquent Relationship

Many-to-many রিলেশনশিপের ক্ষেত্রে আমরা চাইলে পিভট টেবিলের নামের কনভেনশন ফলো নাও করতে পারি। সেক্ষেত্রে আমাদের belongsToMany() মেথডের মধ্যে পিভট টেবিলের নাম এবং কলামগুলোর নাম বলে দিতে হবে।

class User ...
{
    public function roles () {
        return $this->belongsToMany(Role::class, 'role_user', 'user_id', 'role_id');
    }
}

One-to-one (Polymorphic) রিলেশনশিপ: যখন একটি টেবিলের সাথে একাধিক টেবিলকে one-to-one রিলেশনশিপের মাধ্যমে যুক্ত করা হয় তাকে বলা হয় one-to-one polymorphic রিলেশনশিপ।

posts
id
name

users
id
name

images
id
url
imageable_id - post/user id
imageable_type - টাইপ অর্থাৎ posts/user

এখানে image টা user এর ইমেজ ও হতে পারে আবার post এর ইমেজও হতে পারে। এই পলিমরফিক রিলেশনশিপটা রিলেশনালের ডাটাবেজের কোনো ডিফ্ল্ট কনসেপ্ট নয়। এজন্য ওটা ডেভলপারদের চেষ্টা করতে হবে।


One-to-one poly morphic রিলেশনের ক্ষেত্রে যে টেবিলের সাথে রিলেশন কনস্ট্রাক্ট হয় অর্থাৎ যে টেবিলে foreign key থাকে (images) সেই টেবিলে ব্যবহৃত হয় morphTo() মেথড। আর যে টেবিলগুলোকে কানেক্ট করা হয় সেই টেবিলগুলোতে ব্যবহার করা হয় morphOne() মেথড।

class Image extends Model
{
    public function imageable()
    {
        return $this->morphTo();
    }
}

যেমন সাতে Posts extends Model
{
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}

class User extends Model
{
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}

One-to-many polymorphic রিলেশনশিপও একই রকম। পার্থক্য হলো morphOne() এর পরিবর্তে morphMany() মেথড ব্যবহৃত হয়।




# Module 12(2): Episode 5: File storage : Intro to Laravel Media Library Package

spatie-র একটা প্যাকেজ ফাইল নিয়ে কাজ করার জন্য আছে `laravel-medialibrary` নামে। এর দুইটা ভার্সন আছে। একটা হলো open source free ভার্সন আরেকটা হলো paid ভার্সন (pro)।

প্রথমে media লাইব্রেরিটি ইনস্টল করে নিতে হবে। এরপর বিভিন্ন মডেলের জন্য এই Media library টা ব্যবহার করা যাবে। যেমনঃ
$user = User::find(1);
$user->addMedia($pathToFiie)->toMediaCollection('images');

আমরা যে মডেলে Media লাইব্রেরি টা ব্যবহার করব সেটি HasMedia ইন্টারফেসকে ইমপ্লিমেন্ট করবে এবং InteractsWithMedia ট্রেইটকে ব্যবহার করবে.

আমরা চাইলে প্রতিটি ইমেজের ভিন্ন ভিন্ন ভার্সন রাখতে পারি। যেমন- ইউজার বড় কোনো ইমেজ আপ দিলে আমরা সেটার preview বা ছোট ও কোনো ভার্সন স্টোর করতে পারি, সাথে প্রকৃত ইমেজটাও রাখতে পারি। এই কাজটাও এই লাইব্রেরি দিয়ে করা যাবে 

সেক্ষেত্রে আমরা উক্ত মডেলে নিচের ফাংশনটা ইমপ্লিমেন্ট করব. এই কনভার্শনটা টাইম কনজিউমিং, তাই এটাকে queue বা job দিয়ে হ্যান্ডেল করতে হবে। asynchronously কাজটা হবে.

use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

public function registerMediaConversions(Media $media = null): void
{
    $this->addMediaConversion('preview')
        ->fit(Manipulations::FIT_CROP, 300, 300)
        ->nonQueued();
}
```


$yourModel = YourModel::find(1);
$yourModel
    ->addMedia($pathToFile)
    ->preservingOriginal()
    ->toMediaCollection(); // এক্ষেত্রে ডাটাবেজে মডেলের সাথে ফাইলটাকে কানেক্ট করে দেওয়া হবে।

ইমেজের অরিজিনাল ভার্সনটাও রাখবে। ইমেজটাকে তুলে আনবো বা শো করবো নিম্নরূপে:
$mediaItems = $yourModel->getMedia("*"); //


 মাল্টিপল ইমেজ হলে
// ->getFirstMedia() -> একটাই ইমেজ নিতে









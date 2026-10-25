Module 12: Episode 7: Eloquent ORM: Model Factories

DB ক্লাসরুম ব্যবহার করে ডাটাবেজে ডাটা ইনসার্ট করা যায় সিডার এর মাধ্যমে। আবার Eloquent মডেল ব্যবহার করে ও আমরা ডাটাবেজে কোয়েরি ইনসার্ট করতে পারি। লারাভেল প্রতিটি মডেলের সাথেই একটা factory প্রদান করে। অর্থাৎ Factory হলো ডামি ডাটা ইনসার্ট করার একটি সুবিধাজনক মাধ্যম。

class UserFactory
class DatabaseSeeder
{
    public function run() {
        DB::table('users')->insert([
            // ...
        ]);
    }
}
// DB ক্লাস ব্যবহার করে এভাবে কুয়েরি ইনসার্ট করতে হয়

class UserFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
        ];
    }
}
// একটা থেকে নাম জেনারেট করার জন্য ডামি ডেটা জেনারেট করতে হয়




Factory তৈরির কমান্ডঃ
php artisan make:factory PostFactory

Factory ব্যবহার করতে হলে মডেলের মধ্যে অবশ্যই HasFactory ট্রেইট ব্যবহার করতে হবে।
class User extends Authenticator
{
    use ... HasFactory ...;
}

class DatabaseSeeder extends seeder
{
    public function run()
    {
        User::factory()->create(); -> একটি ডাটা ইনসার্ট হবে
        User::factory(10)->create();
    }
}

লারাভেলে ফেক ডাটা ইনসার্ট করার জন্য fake() নামে হেল্পার ফাংশন প্রদান করে।
আমরা কোনো নির্দিষ্ট ডাটা ইনসার্ট করতে চাইলে সেটাও factory()->create() মেথডের মধ্যে বলে দিতে পারি। এক্ষেত্রে যে কি গুলোর মান বলে দিব শুধু factory-র শুধুমাত্র সেই কি গুলো ওভাররাইড হবে। বাকি কিগুলোর ভ্যালু factory ক্লাস থেকে নেবে।
```



DatabaseSeeder.php
class DatabaseSeeder
{
    public function run()
    {
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@website.com',
        ]);
        // বাকি কি গুলোর ভ্যালু UserFactory থেকে নেবে।
    }
}

যদি আমরা কখনো কোনো নির্দিষ্ট ফিল্ড বা ভ্যালু চেঞ্জ করে দিতে চাই তবে আমরা state() মেথডের মাধ্যমে একটা জেনারেটর তৈরি করতে পারি। এই মেথডের মধ্যে সেই ভ্যালু পাস করে তার মান ফিক্স করা হয়।

// class UserFactory এর মধ্যে definition() এর মধ্যে এডিটিং করার জন্য আমরা
public function unverified(): static
{
    // এই মেথডের মাধ্যমে অ্যাট্রিবিউট ওভাররাইড করবো।
    return $this->state(fn (array $attributes) => [
        'email_verified_at' => null, // কিংবা কোনো কিছু নাull
    ]);
}

DatabaseSeeder.php
public function run() {
    User::factory()->unverified()->create(); -> এটি দিলে email_verified_at এ কিলে null ঢুকবে।
}
```



আমরা চাইলে কল করার সময়ও state() মেথড দিতে পারি।

class DatabaseSeeder
{
    public function run()
    {
        $users = User::factory()
            ->count(10)
            ->state(new Sequence(
                fn (Sequence $sequence) => ['role' => UserRole::all()->random()]
                // প্রত্যক user এর জন্য র‍্যান্ডমলি একেক role বরাদ্দ হবে।
            ))
            ->create();
    }
}

create() মেথড সরাসরি ডাটাবেজে ডাটা ইনসার্ট করে।
make()
আমরা যদি মডেল দিয়ে শুধু Factory টা চাই পরবর্তীতে আরো কিছু অপারেশনের পর হয়তো আমরা ডাটাবেজে ডাটা ইনসার্ট করব সেক্ষেত্রে make() মেথড ব্যবহার করতে পারি।

Databaseseeder
public function run()
{
    $user = User::factory()->make(); // ডাটাবেজে এখনো ইনসার্ট হয়নি শুধু ফ্যাক্টরি তৈরি হয়েছে।
}



যদি আমাদের কোনো ফিল্ডে প্রতিবার প্রতিবার নতুন কোনো ডাটা দেওয়া প্রয়োজন তখন তা Sequence ক্লাসের মাধ্যমে দেওয়া যায়। যেমন - ১ জন admin এবং ৫ জন user রোলেন সেটা ইনসার্ট করা যায় নিম্নরূপে।

DatabaseSeeder
public function run()
{
    User::factory(10)
        ->state(new Sequence(
            ['role' => 'admin'],
            ['role' => 'user']
        ))
        ->create();
} // ২ম user admin, ২য় user user, ৩য় user অ্যাডমিন হবে।

ফ্যাক্টরি দিয়ে আমরা একটা মডেলের ডাটা ইনসার্ট করার সময় তার রিলেটেড মডেলের ডাটাও ইনসার্ট করতে পারি। এক্ষেত্রে hasMany রিলেশনশিপের জন্য has() মেথড ব্যবহৃত হয়।

DatabaseSeeder
$user = User::factory()
    ->has(Post::factory()->count(3))
    ->create(); // ১ জন ইউজার তৈরির সাথে সাথে ওই ইউজার আইডি দিয়ে ৩ টি পোস্ট ক্রিয়েট হবে।

উপরের কাজটিই আমরা এভাবেও করতে পারি:
$user = User::factory()
    ->hasPosts(3)
    ->create(); // ৩ টি পোস্টের ৩ টি ক্রিয়েট হবে।




    Post এর state যদি ভিন্ন হয় আমরা স্টেট্টিও বলে দিতে পারি নিম্নরূপেঃ

$user = User::factory()
    ->has(
        Post::factory()
            ->count(3)
            ->state(function (array $attributes, User $user) {
                return ['user_type' => $user->type];
            })
    )
    ->create();

উপরের কাজটিই আমরা আরো সহজে নিম্নরূপে করতে পারি। সেক্ষেত্রে count এর পরে state টা দিতে হবে।

$user = User::factory()
    ->hasPosts(3, [
        'published' => false
    ])
    ->create();

Belongs To রিলেশনশিপের ক্ষেত্রে for() মেথড ব্যবহৃত হয়। যেমন - Post টা কোন ইউজারের সেটার জন্যঃ

$posts = Post::factory()
    ->count(3)
    ->for(User::factory()->state([
        'name' => 'Jessica Archer'
    ]))
    ->create();
```

এটা নিম্নরূপেও করা যায় :
$user = User::factory()->create();
$posts = Post::factory()
    ->count(3)
    ->for($user)
    ->create();

`for` এর জন্য ও একটা ম্যাজিক মেথড আছে। সেটা হল `forUser()` এই মেথডটি singular কারণ `belongsTo` হচ্ছে কার সাথে।

$posts = Post::factory()
    ->count(3)
    ->forUser([
        'name' => 'Jessica Archer'
    ])
    ->create();

Many to many রিলেশনশিপের Factory ক্রিয়েট করতেও `has()` মেথড ব্যবহৃত হয়। যেমন - একটা ইউজারের অনেকগুলো রোল থাকতে পারে।

$user = User::factory()
    ->has(Role::factory()->count(3))
    ->create();
``

পিভটের পিভট টেবিলে যদি আমরা অতিরিক্ত কোনো টেবিলের id বাদে আরো কোনো অতিরিক্ত ডেটা রাখতে চাই সেক্ষেত্রে রাধা যাবে নিম্নরূপ। এক্ষেত্রে hasAttached() মেথড দিয়ে পিভটকে যুক্ত করা হয়।

$user = User::factory()
    ->hasAttached(
        Role::factory()->count(3),
        ['active' => true]
    )
    ->create();
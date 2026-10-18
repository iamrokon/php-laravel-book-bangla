Module 11 (2) : Live etas Episode 1 : Best Practices and
recommendations : PSR and Coding Conventions



PSR-12 এর আরেকটি নিয়ম হলোঃ কোনো একটা নতুন ক্লাসকে
ইমপ্লিমেন্ট করার সময় প্যারেন্থেসিস ব্যবহার করতে হবে,
এমনকি কোনো আর্গুমেন্ট পাস না করলেও হবে।

class Animal {
//
$animal = new Animal(); // সঠিক

$animal = new Animal; // ভুল

- কোনো একটি ক্লাস 'extends' আর 'implements' এর কিওয়ার্ডগুলো
করতে হলে ক্লাসের নামের সাথে ওই লাইনে ডিক্লেয়ার
করতে হবে। আলাদা লাইনে করা যাবেনা। -> PSR-12 এর ভুল
class Database extends Connection implements Eloquent
//

- ক্লাসের ওপেনিং ব্রেস নতুন লাইনে রাখতে হবে, অর্থাৎ
ক্লাসের নামে লাইনে রাখা যাবেনা। ওপেনিং ব্রেস মূল
ক্লাসের পরের লাইনে যাবে। -> PSR-12 এর ভুল
class Animal { // এভাবে লেখা যাবে না
}
class Animal
{



    //... কোড
}

⇒ ক্লাস ডিক্লেয়ার করতে হলে ক্লাসের ও পেনিং ব্রেস এক
একদম পরপরই, অর্থাৎ পরের লাইনেই 'use' কিওয়ার্ড দিয়ে
ডিক্লেয়ার করতে হবে। — PSR-12 এর নিয়ম

class Database
{
    use Mutable;
    // ওই লাইনে লেখা যাবে না

    // ভ্যারিয়েবল ডিক্লেয়ার করে ফেলে ক্লাস প্রপার্টি ডিক্লেয়ার
    করা যাবেনা। PSR-12 এর নিয়ম
    → typed property এর ক্ষেত্রে টাইপ ডিক্লেয়ারেশন আর
    প্রপার্টির নামের মাঝে অবশ্যই একটি স্পেস দিতে হবে।
    PSR-12

    class Hello
    {
        public string $message;
        // ওই স্পেস না দিলে কাজ করবে কিন্তু স্ট্যান্ডার্ড
    }

→ মেথড ফাংশনের আর্গুমেন্ট গুলার মধ্যে যেগুলোর
ডিফল্ট ভ্যালু সেট করা থাকবে, সেগুলোকে আর্গুমেন্ট
লিস্টের শেষে রাখতে হবে। — PSR-12





function greet ($name, $message, $is_special = true) {
}

// মেথড কিংবা ফাংশন কল করতে গেলে মেথড বা ফাংশনের নাম
আর প্যারামিটার এর মধ্যে কোন গ্যাপ রাখা যাবে না।
এছাড়াও ওপেনিং প্যারেন্থেসিস এর পরে আর ক্লোজিং প্যারেন্থেসিস
এর আগে কোন গ্যাপ দেওয়া যাবে না। - PSR-12
sayHi();
গ্যাপ হবে না

// টার্নারি অপারেটরের ক্ষেত্রে এবং ফাংশনের আগে পরে
একটি গ্যাপ ব্যবহার করতে হবে।
'yes' : 'no' -> এই জায়গাগুলোতে গ্যাপ না দিলেও
true -> কাজ করবে, কিন্তু এটাই স্ট্যান্ডার্ড

// ক্লোজার বা অ্যানোনিমাস ফাংশনের ক্ষেত্রে
কীওয়ার্ড এর পরে একটি গ্যাপ ব্যবহার করতে হবে।
এছাড়াও ফাংশনের আগে-পরে 'use' কিওয়ার্ড ব্যবহার করলে,
'use' কিওয়ার্ডের পরে গ্যাপ দিতে হবে। ($manmarks) {
$percent = function ($marks) use ($manmarks) {
return $marks * 100 / $manmarks;
};
echo "marks: 285 percentage: " . $percent(285);




PHP-FIG -> PSRs থেকে Coding style পড়ে দেখতে হবে।
Module 11(2): Episode 2: Best practices: Intro to coding
Standard Tools (PHPCS etc.)

bad.php (খারাপ কোড)
-> শুরুতে কোন স্পেস বা নিউলাইন থাকবে না।
// php fmt -> ঠিকঠাক আগে পরে স্পেস নাই।
<? $m1 = "Hello"; -> ভেরিয়েবলের নাম থেকে বোঝা যাচ্ছে না ভেরিয়েবলটি কি।
$m2 = "World"; echo $m1 . $m2; // message1, message2
-> একই লাইনে ব্রেক দিয়ে যাব। একাধিক স্টেটমেন্ট রাখব না।
function add-numbers($a,$b){ -> এর পর স্পেস দিতে হবে।
$sum = $a+$b; -> কনক্যাট অপারেটরের আগে পরে স্পেস দিতে হবে।
} $result = add-numbers(5, 7); -> ফাংশনের নামের পরে স্পেস দিতে হবে।
Tab বা স্পেস দিতে হবে। -> লাইন নিচে যেতে হবে।
lowercase IF($result>10) { -> এটা পরের লাইনে যাবে।
echo "Result is not greater than 10!"; -> নিউ লাইন যাবে।
} ELSE { -> নিউ লাইন যাবে।
class Example class { public function __construct(){echo"..
This is an example class.
}
}
চাব বা public function say-hello (
$name){ -> নিউ লাইন হবে।
echo "Hello", $name; -> কনক্যাট এর আগে পরে স্পেস হবে।
}
?> -> শুধু পিএইচপি কোড থাকলে Ending ট্যাগ লাগবে না।






_____________________________________page 37  addd korte hobe ekhane __________________________





public function say hello ($name)
{
    echo "Hello, " . $name;
}

$example = new Exampleclass();
$example->sayhello("John");

PHP_Code Sniffer এর মাধ্যমে আমরা সহজেই কোডের ইনডেন্টেশন ঠিক করতে পারি। এটি পিএইচপি স্ট্যান্ডার্ড বা pear কোড স্ট্যান্ডার্ড অনুযায়ী কোড ঠিক করে দেবে।
ইনস্টলেশন: composer global require "squizlabs/php-codesniffer"
phpcs -h -> এই কমান্ড চালিয়ে কোডিংয়ের রুল হব এবং আমরা গুলো দেখতে পাব।

bad.php (কোডটি ভুল)
$example = new Exampleclass();
-> এখানে কোন স্পেস বা ইনডেন্টেশন হবেনা

)
-> ইনডেন্টেশন ঠিক নাই -> $example->say-hello("John"); -> আর্গুমেন্ট এর আগে স্পেস রাখো
-> ইনডেন্টেশন ঠিক নাই -> আগের লাইনের আগে পরে স্পেস হবেনা

?>

Module 11 (3) : Episode 1: Error handling, Logging and Debugging : Exception handler
লারাবেল Exception handling এর জন্য একটা global exception handler প্রোভাইড করে।


লারভেল app > Exceptions > Handler.php ফাইলে Handler নামক ক্লাস আছে যার আন্ডারে Illuminate\Foundation\Exceptions\Handler কে এক্সটেন্ড করে।

রিকুয়েস্ট রেসপন্সের যেকোনো জায়গায় কোনো Exception থ্রো হলে তা এই হ্যান্ডলার দ্বারা ধরা হয়।

try {
    // Code that can throw exception
} catch (Exception $e) {
    // Handle exception
}

লারভেল এর বেজ কার্নেল Kernel এর ভেতরে আমরা দেখতে পাই try catch () ব্লক রয়েছে। যেখান থেকে Exception থ্রো হয়। এই হ্যান্ডেল() মেথডই পুরো রিকুয়েস্ট রেসপন্স হ্যান্ডেল করে।

framework > src > Illuminate > Foundation > Http > Kernel.php

public function handle($request) {
    try {
        $response = $this->sendRequestThroughRouter($request);
    } catch (Throwable $e) {
        $this->reportException($e); // এটি এক্সেপশন লগার সাইডে লগ তৈরি করে
        $response = $this->renderException($request, $e); // ও ইউজারকে কাছে উত্তর পাঠায়
    }
}


এরর Throwable হলো : Error এবং Exception দুটিই
Throwable ইন্টারফেসকে extend করে বানানো



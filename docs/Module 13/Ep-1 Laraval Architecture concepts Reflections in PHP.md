Module 13: Episode 1: Laravel Architecture concepts: Reflections in PHP

Reflection হলো মেটাপ্রোগ্রামিং এর একটা টার্ম বা ইমপ্লিমেন্টেশনা। মেটাপ্রোগ্রাম হলো যে নিজেকে আবার অ্যানালাইজ করতে পারে। অর্থাৎ কোড এক্সিকিউশনের সময় সে নিজেকে অ্যানালাইজ করে সেখান থেকে ডাটা নিতে পারবে।

Reflection
class A {
}

class Sample {
    public $pubProperty = 'pubValue';
    private $privProperty = 'hidden';
    
    public function __construct(A $a) {
    }
}
```

আমরা কোডের কোন একটা সেন্সকে সেন্সমান গিয়ে আমরা দেখতে চাই ক্লাসে কি কি প্রপার্টি আছে। অবজেক্ট তৈরি না করে কোন অবজেক্ট তৈরি করলে সেই অবজেক্টের অবজেক্ট কি, তার ভ্যালুগুলো কি। এই জিনিসগুলো আমরা রান টাইমে অ্যানালাইজ করতে Reflection API ব্যবহার করতে পারি। PHP প্রদান করে।

// Reflection API
$reflector = new ReflectionClass(Sample::class);

var_dump($reflector->getName()); // ক্লাসের নাম রিটার্ন করবে
// Output: Sample

var_dump($reflector->getConstructor()->getParameters());
// Output: ... "a" -> কনস্ট্রাক্টরে "a" প্যারামিটারটি নাম হয়।

$params = $reflector->getConstructor()->getParameters();
foreach ($params as $param) {
    var_dump($param->getClass()); // প্যারামিটারের ক্লাসের নাম দেখায়।
}
// "A"

var_dump($reflector->getProperties());
// pubProperty
// privProperty


$obj = new Sample();
$reflectionObj = new ReflectionObject($obj);
var_dump($reflectionObj->getProperty("pubProperty")
    ->getValue($obj));
// Output: pubValue

কিন্তু private property কে এভাবে অ্যাক্সেস করা যায় না। এতে fatal এরর দেবে। কিন্তু আমরা অর্ডিনারি reflection এর মাধ্যমে private প্রোপার্টিতেও অ্যাক্সেস করতে পারি।
$reflectionProp = $reflectionObj->getProperty('privProperty');
$reflectionProp->setAccessible(true);
var_dump($reflectionProp->getValue($obj)); // Output: hidden



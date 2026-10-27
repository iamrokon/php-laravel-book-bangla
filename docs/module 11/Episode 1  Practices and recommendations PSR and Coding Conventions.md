# Module 11 (2):

## Episode 1: Best Practices and Recommendations — PSR and Coding Conventions

### ১. PSR-12 Coding Standard

PSR-12 হলো PHP-এর একটি coding style standard। এর উদ্দেশ্য হলো কোডকে পরিষ্কার, পাঠযোগ্য এবং একটি নির্দিষ্ট নিয়ম অনুযায়ী লেখা।

#### ১.১. Object তৈরি করার সময় Parentheses ব্যবহার

নতুন কোনো class-এর object তৈরি করার সময় parentheses ব্যবহার করতে হবে, এমনকি কোনো argument পাস না করলেও।

```php
class Animal
{
}

// সঠিক
$animal = new Animal();

// ভুল
$animal = new Animal;
```

#### ১.২. `extends` এবং `implements` ব্যবহার

কোনো class-কে `extends` বা `implements` ব্যবহার করে declare করলে class-এর declaration একই লাইনে রাখতে হবে।

```php
// সঠিক
class Database extends Connection implements Eloquent
{
}

// ভুল
class Database
    extends Connection
    implements Eloquent
{
}
```

#### ১.৩. Class-এর Opening Brace

PSR-12 অনুযায়ী class-এর opening brace (`{`) পরবর্তী লাইনে থাকবে।

```php
// সঠিক
class Animal
{
    // কোড
}

// ভুল
class Animal {
    // কোড
}
```

#### ১.৪. Trait ব্যবহার

Class-এর ভেতরে trait ব্যবহার করার জন্য `use` keyword ব্যবহার করা হয়। সাধারণত class-এর opening brace-এর পরবর্তী লাইনে trait declare করা হয়।

```php
class Database
{
    use Mutable;
}
```

#### ১.৫. Typed Property

Typed property লেখার সময় property-এর type এবং নামের মাঝে একটি space দিতে হবে।

```php
class Hello
{
    public string $message;
}
```

এখানে `string` হলো property-এর type এবং `$message` হলো property-এর নাম।

#### ১.৬. Default Argument-এর অবস্থান

ফাংশন বা মেথডের যেসব parameter-এর default value থাকে, সেগুলো সাধারণত parameter list-এর শেষে রাখা উচিত। তবে PHP-তে কিছু ক্ষেত্রে optional parameter-এর পরে required parameter রাখার বিশেষ নিয়ম রয়েছে।

```php
function greet($name, $message, $isSpecial = true)
{
    // কোড
}
```

#### ১.৭. Function ও Method Call-এর নিয়ম

Function বা method-এর নামের পরে এবং opening parentheses-এর আগে কোনো space দেওয়া যাবে না। Parentheses-এর ভেতরে প্রথম ও শেষ argument-এর পাশে অপ্রয়োজনীয় space দেওয়া যাবে না।

```php
// সঠিক
sayHi();
greet('John');

// ভুল
sayHi ();
greet( 'John' );
```

#### ১.৮. Ternary Operator-এর নিয়ম

Ternary operator (`?:`) ব্যবহার করার সময় operator-এর আগে ও পরে space দিতে হবে।

```php
$result = ($marks >= 40) ? 'Pass' : 'Fail';
```

#### ১.৯. Closure বা Anonymous Function

Closure-এর ক্ষেত্রে `function` keyword-এর পরে space দিতে হয়। `use` keyword ব্যবহার করলে তার পরেও space দিতে হবে।

```php
$fullMarks = 300;

$percentage = function ($marks) use ($fullMarks) {
    return $marks * 100 / $fullMarks;
};

echo 'Percentage: ' . $percentage(285);
```

### ২. PHP-FIG এবং PSR

PHP-FIG হলো PHP Framework Interop Group। এই গ্রুপ PHP-এর বিভিন্ন coding standard ও interoperability guideline তৈরি করে।

PHP-এর coding style সম্পর্কে আরও জানতে PHP-FIG-এর PSR documentation পড়া উচিত।



---

# Module 11 (2): Episode 2 — Best Practices: Introduction to Coding Standard Tools (PHPCS etc.)

## ১. Coding Standard Tools

Coding standard tools ব্যবহার করে PHP কোডের formatting, indentation, spacing এবং coding style-এর ভুল শনাক্ত করা যায়।

### ১.১. Bad PHP Code-এর উদাহরণ

নিচের কোডে variable naming, spacing, indentation এবং function naming-এর সমস্যা রয়েছে।

```php
<?php
$m1 = "Hello";
$m2 = "World";
echo $m1 . $m2;

function addNumbers($a, $b)
{
    $sum = $a + $b;
    return $sum;
}

$result = addNumbers(5, 7);

if ($result > 10) {
    echo "Result is greater than 10!";
} else {
    echo "Result is not greater than 10!";
}
```

### ১.২. Coding Standard অনুসরণের নিয়ম

- PHP কোডের indentation ঠিক রাখতে হবে।
- Variable-এর নাম অর্থপূর্ণ হতে হবে।
- এক লাইনে অপ্রয়োজনীয় একাধিক statement লেখা এড়িয়ে চলতে হবে।
- Operator-এর আগে ও পরে প্রয়োজনীয় space দিতে হবে।
- Function ও method-এর নামের ক্ষেত্রে উপযুক্ত naming convention অনুসরণ করতে হবে।
- `if`, `else` এবং অন্যান্য control structure সঠিকভাবে লিখতে হবে।
- Class-এর নাম সাধারণত `PascalCase` convention অনুসরণ করবে।
- Method ও function-এর নাম সাধারণত `camelCase` convention অনুসরণ করবে।
- শুধুমাত্র PHP কোড থাকা ফাইলে closing `?>` tag না দেওয়াই ভালো।

### ১.৩. সঠিক Class ও Method-এর উদাহরণ

```php
<?php

class ExampleClass
{
    public function sayHello($name)
    {
        echo 'Hello, ' . $name;
    }
}

$example = new ExampleClass();

$example->sayHello('John');
```

এখানে `ExampleClass` একটি class, `sayHello()` একটি method এবং `$example` হলো class-এর object।

### ১.৪. PHP_CodeSniffer (PHPCS)

PHP_CodeSniffer হলো একটি tool, যার সাহায্যে PHP কোডের coding standard-এর ভুল শনাক্ত করা যায়। এটি নির্দিষ্ট coding standard অনুযায়ী কোড পরীক্ষা করে এবং কোথায় কী পরিবর্তন করা প্রয়োজন তা দেখায়।

**ইনস্টলেশন কমান্ড:**

```bash
composer global require squizlabs/php_codesniffer
```

ইনস্টলেশন যাচাই করতে:

```bash
phpcs -h
```

কোনো PHP ফাইল পরীক্ষা করতে:

```bash
phpcs bad.php
```

PSR-12 অনুসারে কোড পরীক্ষা করতে:

```bash
phpcs --standard=PSR12 bad.php
```

PHPCS-এর মাধ্যমে কোডের indentation, spacing, naming convention এবং অন্যান্য coding standard-এর সমস্যা শনাক্ত করা যায়।

**নোট:** PHPCS সাধারণত ভুলগুলো শনাক্ত করে। স্বয়ংক্রিয়ভাবে অনেক formatting-এর ভুল ঠিক করতে PHP Code Beautifier and Fixer (`phpcbf`) ব্যবহার করা যায়।

```bash
phpcbf --standard=PSR12 bad.php
```

### ১.৫. Page 37-এর নোট

এখানে Page 37-এর বিষয়বস্তু যোগ করতে হবে।

---

# Module 11 (3): Episode 1 — Error Handling, Logging and Debugging

## ১. Exception Handler

Laravel-এ Exception Handling-এর জন্য একটি centralized exception-handling ব্যবস্থা রয়েছে। Request processing-এর সময় কোনো exception বা error ঘটলে Laravel সেটি report এবং render করতে পারে।

পুরোনো Laravel ভার্সনে `app/Exceptions/Handler.php` ফাইলে `Handler` class পাওয়া যায়। নতুন Laravel ভার্সনে exception configuration সাধারণত `bootstrap/app.php` ফাইলে করা হয়।

### ১.১. Exception কী?

Exception হলো এমন একটি ঘটনা, যা প্রোগ্রামের স্বাভাবিক execution-এ বাধা সৃষ্টি করে। Exception throw হলে সেটি `try-catch` block-এর মাধ্যমে handle করা যায়।

```php
try {
    // যে কোড থেকে Exception হতে পারে
} catch (Exception $e) {
    // Exception handle করার কোড
}
```

### ১.২. Laravel-এর Exception Handling Process

Laravel-এর HTTP Kernel request-কে router-এর মাধ্যমে process করে। Request handling-এর সময় কোনো throwable error ঘটলে Laravel-এর exception-handling ব্যবস্থা সেটি report এবং render করে।

পুরোনো Laravel architecture-এ HTTP Kernel-এর ফাইলের অবস্থান ছিল:

`vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php`

উদাহরণস্বরূপ, request handle করার প্রক্রিয়াটি ধারণাগতভাবে এমন:

```php
public function handle($request)
{
    try {
        $response = $this->sendRequestThroughRouter($request);
    } catch (Throwable $e) {
        $this->reportException($e);

        $response = $this->renderException($request, $e);
    }

    return $response;
}
```

**এখানে:**

- `reportException()` — exception report করার প্রক্রিয়া চালায়।
- `renderException()` — exception-কে HTTP response-এ রূপান্তর করে।
- `$response` — request-এর জন্য তৈরি response।

এটি Laravel-এর exception-handling process বোঝানোর জন্য একটি ধারণাগত উদাহরণ; সব Laravel version-এর মূল source code হুবহু এমন নাও হতে পারে।

### ১.৩. Throwable কী?

PHP-তে `Throwable` হলো একটি interface। `Error` এবং `Exception`—দুটিই `Throwable` implement করে। তাই `catch (Throwable $e)` ব্যবহার করে উভয় ধরনের throwable ধরা যায়।

```php
try {
    throw new Exception('Something went wrong');
} catch (Throwable $e) {
    echo $e->getMessage();
}
```

### ১.৪. Logging এবং Debugging

- **Logging:** কোনো error বা গুরুত্বপূর্ণ event-এর তথ্য সংরক্ষণ করা।
- **Debugging:** কোডের সমস্যা খুঁজে বের করে সমাধান করা।
- **Exception Handling:** exception ঘটলে সেটি report করা এবং উপযুক্ত response দেওয়া।

Laravel-এর logging ব্যবস্থা error-এর তথ্য log file-এ সংরক্ষণ করতে পারে। Development environment-এ debugging-এর জন্য exception page-এ stack trace-ও দেখা যেতে পারে।

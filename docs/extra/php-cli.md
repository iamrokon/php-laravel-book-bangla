# PHP CLI and Execution Flow (Live Class 4)

পিএইচপি কোড কীভাবে ব্যাকগ্রাউন্ডে কাজ করে তার ধাপগুলো নিচে দেওয়া হলো:

1. **Lexing (Tokenization):** কোডকে ছোট ছোট পার্টে (টোকেন) ভাগ করে।
2. **Parsing:** টোকেনগুলো থেকে **AST (Abstract Syntax Tree)** জেনারেট করে।
3. **Compilation:** AST থেকে **Opcode** তৈরি করে।
4. **Execution:** Zend Engine এই Opcode রান করে আউটপুট দেখায়।

## OpCache (In-memory storage)
বারবার কম্পাইল করার সময় বাঁচাতে **OpCache** ব্যবহার করা হয়। এটি কম্পাইল করা Opcode ক্যাশ করে রাখে, ফলে এক্সিকিউশন অনেক ফাস্ট হয়। 
নতুন কোড প্রোডাকশনে (Production) Deploy করলে পুরনো কোড ক্যাশ ফেলে দিয়ে পুনরায় নতুন ফাইল ক্যাশে সেভ করে। 

যখন স্ক্রিপ্ট ইনিশিয়ালাইজ হয় তখন প্রথমে চেক করা হয় যে, স্পেসিফিক ফাইলটি ক্যাশ করা আছে কিনা। 
- যদি ক্যাশ করা থাকে, তবে সেখান থেকে সরাসরি Zend Engine এ চলে যাবে। 
- না থাকলে সব স্টেপ (Lexing, Parsing, Compiling) পার করে OpCode তৈরি হয়ে ক্যাশ হবে। 

**কীভাবে OpCache চালু করবেন?**
`php.ini` ফাইল থেকে OpCache চালু করতে হয়। এটি `opcache.enable=1` করে দিলে কাজ শুরু করবে। Development মোডে সাধারণত অপক্যাশ ব্যবহার করা হয় না কারণ তখন বারবার কোড এডিট করতে হয়। এটি ব্যবহার হয় Production Environment-এ।

### Preloading
OpCache এর পূর্বেই আরো পারফর্ম্যান্স ইমপ্রুভমেন্টের জন্য পিএইচপি ৭.৪ (PHP 7.4)-এ এসেছে **Preloading**। যে ফাইলগুলো খুব বেশি ব্যবহৃত হয় সেগুলোকে প্রথম রিকোয়েস্ট আসার আগেই ক্যাশ করে ফেলাটাই Preloading. এর জন্য CLI থেকে ওয়ার্কার স্ক্রিপ্ট (worker script) রান করতে হয়।
```php
// php.ini
opcache.preload=/path/to/project/preload.php
```

```php
// preload.php এর কোড:
$files = [/* An array of files that you want to preload */];

foreach ($files as $file) {
    opcache_compile_file($file);
}
```

## JIT (Just In Time) Compiler
বিভিন্ন ক্যাশিং (Caching) অনেক লেভেলে হতে পারে, যেমন- অ্যাপ্লিকেশন লেভেলে, ডাটাবেজ লেভেলে। JIT কম্পাইলার মূলত কোডের **Opcode-কে মেশিন কোডে (Machine Code)** কনভার্ট করে। কিছু অপকোড যদি একইরকম হয় তখন আগে কনভার্টকৃত কোডই সে পুনরায় ব্যবহার করে পারফর্ম্যান্স বাড়ায়।

কোডের এক্সিকিউশন বা অপারেশন সাধারণত দুই ধরনের হয়: 
1. **Compute Intensive (Compute heavy):** ম্যাথমেটিক্যাল অপারেশন বেশি থাকে। যেমন: Prime number generation। এর জন্য CPU এর প্রচুর রিসোর্স প্রয়োজন হয়। (এছাড়া: Report generation, Image/Video processing). 
2. **I/O Intensive:** যখন ফাইলের রিড/রাইট, ডেটাবেস থেকে ডেটা ফেচ করা বা API থেকে রেসপন্স পেতে ওয়েট করতে হয়, সেগুলোকে I/O Intensive টাস্ক বলা হয়। 

> JIT Compiler মূলত **Compute Intensive** কাজে ভালো পারফর্ম করে। **I/O Intensive** কাজে (যেমন: File I/O, API I/O) এটি তেমন ডিফারেন্স তৈরি করতে পারে না।

## Type System: Dynamic and Weakly Typed
পিএইচপি একটি **Dynamic** এবং **Weakly Typed** ল্যাঙ্গুয়েজ।

- **Static vs Dynamic Type:** যেসব ল্যাঙ্গুয়েজে ভ্যারিয়েবল ডিক্লেয়ার করার সময় ডেটা টাইপ বলে দিতে হয় তাকে স্ট্যাটিক টাইপ বলে (যেমন: `int a = 10;`)। অন্যদিকে, পিএইচপি-তে এটা ফ্লেক্সিবল (Flexible)। `a = 10` লিখলে পিএইচপি নিজেই বুঝে নেয় এটি নাম্বার। এরপর আবার `a = 'abc'` লিখলে টাইপ বদলে স্ট্রিংয়ে পরিণত হতে পারে।
- **Strong vs Weak Type:** পিএইচপিতে যদি `$a = '10'` (স্ট্রিং) এবং `$b = $a + 5` লিখি, তাহলে সে নিজে থেকেই স্ট্রিংটিকে নাম্বারে বা নাম্বারের অংশে কাস্ট করে আউটপুট `15` দিয়ে দেবে। জাভা (Java) বা C-তে এটি সম্ভব নয়, কারণ তারা Strongly Typed ল্যাঙ্গুয়েজ।

## SAPI (Server API) এবং সার্ভার প্রসেস
আমাদের ওয়েব সার্ভারের (যেমন: Nginx, Apache, IIS) সাথে **PHP Engine** যোগাযোগ করার জন্য যে কমিউনিকেশন লেয়ার বা প্রটোকলটি ব্যবহার করে তাকেই **SAPI** বলা হয়। 
ইউজারের কাছ থেকে রিকোয়েস্ট আসলে সেটা সার্ভার কীভাবে পিএইচপি ইঞ্জিনে পাঠাবে সেটাই SAPI ডিসাইড করে। বিভিন্ন ধরনের SAPI-এর উদাহরণ হলো:
- Apache -> `mod_php`
- CLI -> `cli`
- Nginx -> `cgi`, `fastcgi`, `fpm`

**Process Management:**
- **CGI:** ইউজারের প্রত্যেকটি রিকোয়েস্টের জন্য একটি করে নতুন PHP প্রসেস তৈরি করে কোড এক্সিকিউট করে। ফলে অনেক বেশি মেমরি ও রিসোর্স নষ্ট হয়।
- **FastCGI:** আগে থেকেই কিছু প্রসেস রিজার্ভ করে রাখে, নতুন রিকোয়েস্ট আসলে রিজার্ভ করা প্রসেসগুলো সেই কাজ করে দেয়। 
- **PHP-FPM (FastCGI Process Manager):** এটি FastCGI-এরই একটি অ্যাডভান্সড ভার্সন। এটি নিজেই একটি প্রসেস ম্যানেজার, যার মধ্যে অনেক ওয়ার্কার (worker) থাকে, যারা মেমরি লিকেজ ঠেকানো, রিকোয়েস্ট ম্যানেজ করা ইত্যাদি কাজ দারুণভাবে হ্যান্ডেল করে। (বর্তমানে Nginx এর সাথে ফাস্ট-সিজিআই হিসেবে PHP-FPM ব্যাপকভাবে ব্যবহৃত হয়)।

রিকোয়েস্ট যদি ওয়ার্কার প্রসেসগুলো শেষ করতে না পারে বা মেমোরি লিমিট ওভারলোড হয়, তখন সার্ভার `502 Bad Gateway` বা সার্ভার ডাউন মেসেজ দিয়ে থাকে। তখন নতুন সার্ভার যোগ করা (Horizontal scaling - Load Balancer) অথবা মেমোরি বাড়ানো (Vertical scaling) লাগে।

> RoadRunner, FrankenPHP, Swoole এগুলো সরাসরি পিএইচপির **Application Server**। এগুলো সরাসরি PHP Engine এর সাথে কাজ করে, এদের জন্য কোনো SAPI লাগে না। তাই এদের Performance অনেক ভালো।

## PECL, PEAR, COMPOSER
- **PECL:** পিএইচপি এক্সটেনশন (PHP Extensions) যেগুলো C ল্যাঙ্গুয়েজ দিয়ে বানানো (যেমন: Oracle, MongoDB ড্রাইভার), সেগুলোকে ম্যানেজ করে।
- **PEAR (Deprecated):** পিএইচপিতে লেখা প্যাকেজগুলোকে (গ্লোবালি) ম্যানেজ করার টুল ছিলো PEAR.
- **Composer:** এটি PEAR-এর বেটার বিকল্প, যা পুরো প্রোজেক্টের ডিপেন্ডেন্সি (Dependency) ম্যানেজ করে। 

---

## Building PHP CLI Applications

### CLI Introduction
**CLI (Command Line Interface)**-এর অনেক ব্যবহার আছে। যেমন: প্যাকেজ ইন্সটল, ডেটাবেস মাইগ্রেশন বা সার্ভার রান করতে লারাভেল CLI-এর ব্যাপক ব্যবহার করে। এছাড়াও থার্ড-পার্টি API কল করা, CSV থেকে JSON এ কনভার্ট, বা ক্রন-জব (Cronjob)-এর জন্যও পিএইচপি স্ক্রিপ্ট ব্যবহার করা যায়।

> CLI এবং ওয়েব সার্ভার এক্সিকিউশনের মধ্যে বড় পার্থক্য হলো, ওয়েব সার্ভারে `max_execution_time` বলে একটি লিমিট থাকে। কিন্তু CLI-এর ক্ষেত্রে `max_execution_time` আনলিমিটেড বা `0` থাকে। 

যেকোন ফোল্ডারে কমান্ড লাইন থেকে `php index.php` লিখে আমরা কোড এক্সিকিউট করতে পারি। আবার বিল্ট-ইন সার্ভার হিসেবে `php -S localhost:9000` চালিয়ে পিএইচপি কোড রান করা সম্ভব। 

```php
var_dump(php_sapi_name()); 
// CLI থেকে আউটপুট আসবে "cli"
// লোকালহোস্ট ওয়েবসর্ভার থেকে আসবে "cli-server"
```

### Popular CLI Tools in PHP
পিএইচপিতে তৈরি কিছু জনপ্রিয় CLI টুল:
- **Laravel Valet:** Mac OS-এ ডেভেলপমেন্ট এনভায়রনমেন্ট ম্যানেজ করার জন্য।
- **Psalm, PHPStan:** পিএইচপি অ্যাপ্লিকেশনে এরর বের করার (Static analysis) টুল। 
- **phpinsights, PHP-CS-Fixer, PHP_CodeSniffer:** কোড কোয়ালিটি ও স্ট্যান্ডার্ড চেক করার টুল। 
- **Rector:** পুরনো কোড অটোম্যাটিক আপডেট/রিফ্যাক্টর করার টুল। 
- **Takeout:** লোকাল কন্টেইনার সার্ভিস ম্যানেজ করার টুল। 

### Executable Scripts in Mac/Linux
কমান্ড লাইনে সরাসরি পিএইচপি স্ক্রিপ্টকে এক্সিকিউটেবল হিসেবে রান করতে ফাইলের একদম উপরে (shebang) লিখতে হবে:
```php
#!/usr/bin/env php
<?php
echo "Hello from executable command!";
```
এবং কনসোল থেকে `chmod +x index.php` করে এক্সিকিউটেবল পারমিশন দিতে হবে। তখন ফাইলটিকে `./index.php` দিলে এটি অটোম্যাটিক্যালি রান হবে (তবে Windows এ এটা কাজ করে না)।

### CLI Arguments & Options (`$argc`, `$argv`, `getopt`)
CLI থেকে আর্গুমেন্ট রিসিভ করার জন্য ব্যবহার হয় গ্লোবাল অ্যারে `$argv` এবং আর্গুমেন্ট কাউন্ট `$argc`।

ধরুন, আমরা ইনপুট দিলাম: `php index.php from=10 to=20`
```php
$from = $argv[1]; // from=10
$to = $argv[2]; // to=20
```
তবে এই পদ্ধতি কিছুটা জটিল, তাই অপশনস (Options) রিসিভ করতে আমরা **`getopt()`** মেথড ব্যবহার করতে পারি।

**`getopt()` এর ব্যবহার:**
```php
$longOptions = ["from:", "to:"];
$options = getopt("", $longOptions); // শর্টকাট ফ্ল্যাগ এর জন্য এখানে "" রাখা হয়েছে 

$from = $options["from"];
$to = $options["to"];

for ($i = $from; $i <= $to; $i++) {
    echo $i . PHP_EOL;
}
```
যেকোনো সিকোয়েন্সেই ইনপুট দেওয়া যাবে:
`php index.php --to=5 --from=1`
আউটপুট: 1 2 3 4 5

### CLI Console Input & Output
কনসোল থেকে ইউজার ইনপুট নেয়ার জন্য **`readline()`** বা **`fscanf()`** ব্যবহার করা যায়:
```php
$input = readline("Enter your text: ");
var_dump($input);

fscanf(STDIN, "%d %d\n", $a, $b);
printf("%d %d\n", $a, $b);
```

**Number Guessing Game Example:**
```php
$options = getopt("", ["min::", "max::"]);

$min = $options["min"] ?? 1;
$max = $options["max"] ?? 20;

$number = rand($min, $max);

while (true) {
    $guess = (int) readline("What is the number? (between {$min}-{$max}): ");
    if ($guess === $number) {
        printf("Yes, you are correct!\n");
        break;
    } elseif ($guess > $number) {
        printf("Try a smaller number.\n");
    } else {
        printf("Try a higher number.\n");
    }
}
```
রান করার নিয়ম: `php index.php --min=1 --max=10`

### Building CLI Using Symfony Console
Symfony Console ব্যবহার করে আমরা দারুণসব কমান্ড লাইন অ্যাপ্লিকেশন তৈরি করতে পারি। 
প্রথমে একটি প্রোজেক্ট ডিরেক্টরি তৈরি করে `composer init` দিয়ে কম্পোজার সেটআপ করে নিতে হবে। এরপর সিম্ফোনি কনসোল প্যাকেজ ইনস্টল করতে হবে:
`composer require symfony/console`

**`app.php` ফোল্ডার সেটআপ:**
```php
#!/usr/bin/env php
<?php
// app.php
require __DIR__ . '/vendor/autoload.php';

use Symfony\Component\Console\Application;
use Src\App\CsvToJsonCommand;

$application = new Application();

// Register the command
$application->add(new CsvToJsonCommand());

$application->run();
```

**`src/CsvToJsonCommand.php` ফাইল (Command Class):**
```php
namespace Src\App;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CsvToJsonCommand extends Command
{
    protected function configure(): void
    {
        $this->setName('csv-to-json')
             ->addArgument('input', InputArgument::REQUIRED, 'Input file Name')
             ->addArgument('output', InputArgument::REQUIRED, 'Output File Name');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $inputFileName = $input->getArgument('input');
        $outputFileName = $input->getArgument('output');
        
        if (!file_exists($inputFileName)) {
            $output->writeln('<error>File not found!</error>');
            return Command::FAILURE;
        }

        $items = array_map('str_getcsv', file($inputFileName));
        // var_dump($items);

        $header = array_shift($items); // [name, age, email]
        $jsonContent = [];

        foreach ($items as $item) {
            $jsonContent[] = array_combine($header, $item);
        }

        file_put_contents($outputFileName, json_encode($jsonContent, JSON_PRETTY_PRINT));
        $output->writeln('<info>File successfully created.</info>');
        
        return Command::SUCCESS; 
    }
}
```

CLI ইনপুট:
```bash
$ php app.php csv-to-json --input=invalid.txt
# যেহেতু invalid.txt ফাইল নাই তাই, 
# Output: File not found!

$ php app.php csv-to-json --input=input.txt --output=output.txt
# Output: File successfully created.
```

---

### Assignment 2 (CLI App for Finance Manager)
বিকাশ বা USSD মেন্যুর মতো কনসোল-ভিত্তিক প্রম্পট (Prompt) তৈরি করে একটি ফাইন্যান্স ম্যানেজার ডেভেলপ করার কনসেপ্ট:

```php
declare(strict_types=1);

class CLIApp
{
    private FinanceManager $financeManager;
    
    private const ADD_INCOME = 1;
    private const ADD_EXPENSE = 2;
    private const VIEW_INCOME = 3;
    private const VIEW_EXPENSE = 4;
    private const VIEW_SAVINGS = 5;
    private const VIEW_CATEGORIES = 6;
    private const EXIT_APP = 7;

    private array $options = [
        self::ADD_INCOME => 'Add income',
        self::ADD_EXPENSE => 'Add expense',
        self::VIEW_INCOME => 'View incomes',
        self::VIEW_EXPENSE => 'View expenses',
        self::VIEW_SAVINGS => 'View savings',
        self::VIEW_CATEGORIES => 'View categories',
        self::EXIT_APP => 'Exit'
    ];

    public function __construct()
    {
        $this->financeManager = new FinanceManager(new FileStorage());
    }

    public function run(): void
    {
        while (true) {
            foreach ($this->options as $option => $label) {
                printf("%d. %s\n", $option, $label);
            }

            $choice = intval(readline("Enter your option: "));

            switch ($choice) {
                case self::ADD_INCOME:
                    $amount = (float) trim(readline("Enter income amount: "));
                    $category = trim(readline("Enter income category: "));
                    $this->financeManager->addIncome($amount, $category);
                    break;
                case self::ADD_EXPENSE:
                    $amount = (float) trim(readline("Enter expense amount: "));
                    $category = trim(readline("Enter expense category: "));
                    $this->financeManager->addExpense($amount, $category);
                    break;
                case self::VIEW_INCOME:
                    $this->financeManager->showIncomes();
                    break;
                case self::VIEW_EXPENSE:
                    $this->financeManager->showExpenses();
                    break;
                case self::VIEW_SAVINGS:
                    $this->financeManager->showSavings();
                    break;
                case self::VIEW_CATEGORIES:
                    $this->financeManager->showCategories();
                    break;
                case self::EXIT_APP:
                    break 2; // Exit the while loop
                default:
                    echo "Invalid option.\n";
            }
        }
    }
}
```
*(এই অ্যাসাইনমেন্টের অংশ হিসেবে `FinanceManager.php`, `Transaction.php`, এবং `Income.php` ক্লাস তৈরি করে ডিপেন্ডেন্সি ম্যানেজমেন্ট ও অবজেক্ট ওরিয়েন্টেড ডিজাইন (OOP) প্র্যাকটিস করতে হবে।)*
```

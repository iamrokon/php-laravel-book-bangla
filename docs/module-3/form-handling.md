# Form Handling in PHP (Registration & Login)

## Basic Setup

### 1. Database Connection (PDO)
`db.php` ফাইলে ডাটাবেস সংযোগ (Connection) সেটআপ করা হয়:
```php
<?php
$host = "localhost";
$dbname = "veronica";
$username = "root";
$password = "";

try {
    // $dsn = "mysql:host=$host;dbname=$dbname;";
    $dsn = "sqlite:database.sqlite"; // Example of SQLite Database
    
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
```

### 2. Helper Functions
`helpers.php` ফাইলে কিছু ইউটিলিটি (Utility) ফাংশন:
```php
<?php

// Form Data Sanitization
function sanitize(string $data): string {
    return htmlspecialchars(stripslashes(trim($data)));
}

// Debugging Utility
function dd(mixed $data): void {
    echo '<pre>';
    print_r($data);
    echo '</pre>';
    die();
}

// Flash Session Messages
function flash($key, $message = null) {
    if ($message) {
        $_SESSION['flash'][$key] = $message;
    } else if (isset($_SESSION['flash'][$key])) {
        $message = $_SESSION['flash'][$key];
        unset($_SESSION['flash'][$key]);
        return $message;
    }
}
```

## Form Handling Process
ফর্ম ডেটা সাবমিট করার পর কিছু স্পেসিফিক রুলস ফলো করতে হয়:
1. ডাটাবেজ কানেক্ট করা (DB Connection)।
2. ফর্ম সাবমিট হয়েছে কিনা তা চেক করা (Is Post Request)।
3. ইনপুটগুলোর স্যানিটাইজেশন (Sanitize) এবং ভ্যালিডেশন (Validate) করা।
4. কোনো এরর বা ভুল আছে কিনা চেক করা।
5. ডাটাবেজে SQL Query রান বা এক্সিকিউট (Execute) করা।
6. সফল হলে অন্য পেইজ বা রিডাইরেক্ট করে দেওয়া।

> ফর্মে `novalidate` অ্যাট্রিবিউট ব্যবহার করলে এইচটিএমএলের (HTML5) ব্রাউজার-সাইড ভ্যালিডেশন কাজ করবে না। যেমন- `required`, `type="email"` ইত্যাদি কাজ করানো ছাড়াই ডাইরেক্ট পিএইচপি ভ্যালিডেশন চেক করার ক্ষেত্রে এটি কাজে লাগে।

### 3. Registration Page
`register.php` ফাইলের উদাহরণ:
```php
<?php
session_start();
require "db.php";
require "helpers.php";

$name = $email = $password = '';
$errors = [];

// 1. Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // 2. Validate and sanitize name
    if (empty($_POST['name'])) {
        $errors['name'] = 'Please provide a name';
    } else {
        $name = sanitize($_POST['name']);
    }
    
    // (Assuming email & password are validated similarly...)

    // 3. Prepare the SQL statement & Execute
    if (empty($errors)) {
        $params = [
            ':name' => $name,
            ':email' => $email,
            ':password' => password_hash($password, PASSWORD_DEFAULT)
        ];
        
        $sql = "INSERT INTO users (name, email, password) VALUES (:name, :email, :password)";
        $stmt = $pdo->prepare($sql);
        
        if ($stmt->execute($params)) {
             flash('success', 'Successfully registered. Please login.');
             header('Location: login.php');
             exit;
        } else {
             $errors['auth_error'] = 'Something went wrong, try again';
        }
    }
}
?>

<!-- HTML Form -->
<form action="<?= htmlspecialchars($_SERVER['PHP_SELF']) ?>" method="POST" novalidate>
    <input type="text" name="name">
    <?php if (isset($errors['name'])): ?>
        <p class="error"><?php echo $errors['name']; ?></p>
    <?php endif; ?>
    
    <!-- (Email & Password Inputs) -->
    
    <?php if (isset($errors['auth_error'])): ?>
        <span><?= $errors['auth_error'] ?></span>
    <?php endif; ?>
</form>
```

### 4. Login Page
`login.php` ফাইলের উদাহরণ:
```php
<?php
session_start();
require('db.php');
require('helpers.php');

$errors = [];
$email = $password = '';

// Check Success Message from Registration
$message = flash('success');

// 1. Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // 2. Validate Email
    if (empty($_POST['email'])) {
        $errors['email'] = 'Please provide an email address';
    } else {
        $email = sanitize($_POST['email']);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Please provide a valid email address';
        }
    }

    // 3. Validate Password
    if (empty($_POST['password'])) {
        $errors['password'] = 'Please provide a password';
    } else if (strlen($_POST['password']) < 8) {
        $errors['password'] = 'Please provide a password longer than 8 characters';
    } else {
        $password = sanitize($_POST['password']);
    }

    // 4. Authenticate User
    if (empty($errors)) {
        $query = 'SELECT * FROM users WHERE email = :email';
        $stmt = $pdo->prepare($query);
        
        if ($stmt->execute([':email' => $email])) {
            $user = $stmt->fetch();
            
            // Password Verification
            if ($user && password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id']; // Store Session
                header('Location: dashboard.php');
                exit;
            } else {
                $errors['auth_error'] = 'Invalid email or password';
            }
        }
    }
}
?>

<!-- HTML Form -->
<?php if ($message): ?>
    <span class="success"><?= $message ?></span>
<?php endif; ?>

<form action="login.php" method="POST">
    <input type="email" name="email">
    <input type="password" name="password">
    
    <?php if (isset($errors['auth_error'])): ?>
        <span><?= $errors['auth_error'] ?></span>
    <?php endif; ?>
    
    <button type="submit">Login</button>
</form>
```

### 5. Dashboard and Logout
সঠিক ইউজার ছাড়া (যাদের সেশনে আইডি নেই) `dashboard.php` পেজে কেউ অ্যাক্সেস করতে পারবে না:

```php
<?php
// dashboard.php
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit;
}
?>
<h1>Welcome to Dashboard</h1>
<a href="logout.php">Sign out</a>
```

`logout.php` এর কাজ হলো তৈরি হওয়া সেশনটি ডেস্ট্রয় (Destroy) করে ইউজারকে লগআউট করা:
```php
<?php
// logout.php
session_start();

session_unset();    // Remove all session variables
session_destroy();  // Destroy the session

header('Location: login.php');
exit;
```

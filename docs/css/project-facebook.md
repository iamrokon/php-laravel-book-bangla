# Project: Facebook Login Clone

এই প্রজেক্টে আমরা ফেসবুকের লগইন পেজের লেআউট ক্লোন করবো এবং দেখবো কীভাবে ফ্লেক্সবক্স দিয়ে এটি সহজে তৈরি করা যায়।

### ১. HTML স্ট্রাকচার
```html
<section id="body_area">
    <div id="content_area" class="container">
        <!-- বাম পাশের অংশ -->
        <div class="left_side">
            <img src="img/logo.svg" alt="Facebook">
            <h2>Facebook helps you connect and share with the people in your life.</h2>
        </div>

        <!-- ডান পাশের অংশ (Form) -->
        <div class="form-area">
            <form>
                <input type="email" placeholder="Email address or phone number">
                <input type="password" placeholder="Password">
                <input type="button" value="Log In">
                <a href="#">Forgotten password?</a>
                <hr>
                <button type="button" class="create-btn">Create new account</button>
            </form>
            <p><a href="#"><b>Create a Page</b></a> for a celebrity, brand or business.</p>
        </div>
    </div>
</section>
```

### ২. মূল স্টাইল (Desktop Layout)
```css
#body_area {
    background: #f0f2f5;
    padding: 72px 0 112px;
}

.container {
    width: 980px;
    margin: 0 auto;
    display: flex; /* ফ্লেক্স ব্যবহার করে পাশাপাশি আনা */
    justify-content: space-between;
    align-items: center;
}

.left_side {
    flex-basis: 540px;
}
.left_side img { height: 106px; margin: -20px; }
.left_side h2 { font-size: 28px; font-weight: normal; margin-top: 10px; }

.form-area {
    flex-basis: 396px;
}

.form-area form {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.1);
    text-align: center;
}
```

### ৩. ফরম ইনপুট ও বাটন স্টাইল
```css
form input {
    width: 100%;
    padding: 14px 16px;
    margin-bottom: 12px;
    border: 1px solid #dddfe2;
    border-radius: 6px;
    font-size: 17px;
}

input[type="button"] {
    background: #1877f2;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
}

.create-btn {
    background: #42b72a;
    color: #fff;
    font-weight: bold;
    padding: 16px;
    border: none;
    border-radius: 6px;
    margin-top: 20px;
}
```

### ৪. রেসপনসিভ (Mobile Layout)
মোবাইলে এই উইজেটগুলো একটার নিচে একটা আসবে।
```css
@media screen and (max-width: 900px) {
    .container {
        width: 100%;
        flex-direction: column; /* নিচে নামিয়ে ফেলা */
        padding: 20px;
    }
    
    .left_side {
        text-align: center;
        flex-basis: auto;
        margin-bottom: 40px;
    }
    
    .left_side h2 { font-size: 24px; }

    .form-area {
        flex-basis: 100%;
        width: 100%;
    }
}
```

### ৫. Footer Area
ফেসবুকের ফুটারে ছোট ছোট লিঙ্ক এবং কপিরাইট টেক্সট থাকে।
```css
#footer_area {
    background: #fff;
    padding: 20px 0;
    color: #737373;
    font-size: 12px;
}
#footer_area ul {
    border-bottom: 1px solid #ddd;
    padding-bottom: 15px;
    margin-bottom: 15px;
}
#footer_area li {
    display: inline-block;
    margin-right: 15px;
}
```
> [!TIP]
> ফেসবুকের লোগো ডাইনামিকভাবে পাওয়ার জন্য আপনি **facebookbrand.com** থেকে অফিসিয়াল লোগো ব্যবহার করতে পারেন।

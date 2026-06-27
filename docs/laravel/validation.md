# লারাভেল ভ্যালিডেশন (Validation in Laravel)

ওয়েব অ্যাপ্লিকেশনে ইউজারের সাবমিট করা ডেটা যাতে সঠিক ফরম্যাটে থাকে, কেউ যেন কোনো ভুল বা ক্ষতিকারক ডেটা ইনপুট করতে না পারে এবং ইনভ্যালিড ডেটা যাতে ডেটাবেজে জমা না হয়, তার জন্য **Validation** ব্যবহার করা হয়। লারাভেলে ভ্যালিডেশন করার একাধিক চমৎকার ও নমনীয় উপায় রয়েছে।

---

## ১. লারাভেল ভ্যালিডেশন পরিচিতি ও বেসিক ইমপ্লিমেন্টেশন

ধরা যাক, আমাদের স্টুডেন্ট এনরোলমেন্টের জন্য দুটি রাউট রয়েছে যেখানে আমরা "name", "email", "gender", "age", এবং "photo" ইনপুট নিয়ে ভ্যালিডেট করব।

### রাউট ডিক্লারেশন (`web.php`):
```php
Route::middleware('auth')->group(function () {
    Route::get('/students/enroll', [StudentController::class, 'create'])->name('students.enroll');
    Route::post('/students/enroll', [StudentController::class, 'store'])->name('students.store');
});
```

### কন্ট্রোলার অ্যাকশন (`StudentController.php`):
আমরা সরাসরি `Request` অবজেক্টের `validate()` মেথড ব্যবহার করে সহজে ইনপুট ভ্যালিডেশন করতে পারি:
```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function create()
    {
        return view('students.enroll');
    }

    public function store(Request $request)
    {
        // ইনপুট ভ্যালিডেশন রুলস ডিক্লেয়ার করা
        $validated = $request->validate([
            'name' => 'required|max:100',
            'email' => ['required', 'email'],
            'gender' => ['required'],
            'photo' => ['required', 'image'],
            'age' => ['required', 'numeric', 'min:6', 'max:25']
        ]);
        
        // ভ্যালিডেশন সাকসেস হলে $validated ভেরিয়েবলে ফিল্টারড ডেটা পাওয়া যাবে
        dd($validated);
    }
}
```

---

## ২. ব্লেড ভিউতে এরর মেসেজ প্রদর্শন করা (Displaying Validation Errors)

ভ্যালিডেশন ফেইল করলে লারাভেল অটোমেটিক্যালি ব্রাউজারকে আগের পৃষ্ঠায় রিডাইরেক্ট করে এবং সেশনের মাধ্যমে একটি গ্লোবাল `$errors` ভেরিয়েবল ব্লেড ভিউতে পাঠিয়ে দেয়।

### ক. সব এরর মেসেজ একসাথে তালিকা আকারে দেখানো:
`students/enroll.blade.php` ফাইলের যেকোনো স্থানে নিচের কোডটি ব্যবহার করে সব এরর প্রদর্শন করা যায়:
```html
@if ($errors->any())
    <div class="alert alert-danger text-red-500">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
```

### খ. প্রতিটি ইনপুট ফিল্ডের নিচে সুনির্দিষ্ট এরর মেসেজ দেখানো:
উক্ত ফিল্ডের জন্য এরর থাকলে তা দেখাতে আমরা `@error` ডিরেক্টিভ ব্যবহার করতে পারি:
```html
<div>
    <label for="name">Name:</label>
    <input type="text" name="name" class="@error('name') border-red-500 @enderror">
    
    @error('name')
        <div class="text-red-500 text-sm">{{ $message }}</div>
    @enderror
</div>
```

---

## ৩. ফর্ম রিকোয়েস্ট ভ্যালিডেশন (Form Request Validation)

যদি ভ্যালিডেশন রুলস অনেক বড় হয়, তবে কন্ট্রোলারের ভেতর কোড জটিল না করে আলাদা ফাইল বা ক্লাসে ভ্যালিডেশন লজিক সরিয়ে নেওয়া উত্তম। একে **Form Request** বলা হয়।

### ক. ফর্ম রিকোয়েস্ট তৈরি করার কমান্ড:
```bash
php artisan make:request StudentEnrollmentRequest
```
এটি রান করলে `app/Http/Requests/StudentEnrollmentRequest.php` ফাইল তৈরি হবে।

### খ. রিকোয়েস্ট ক্লাস ফাইল কনফিগারেশন:
এই ফাইলে মূলত দুটি মেথড থাকে:
1. `authorize()`: রিকোয়েস্টকারী ইউজার এই কাজটি করার অনুমতি রাখে কিনা তা চেক করে (`true` বা `false` রিটার্ন করে)।
2. `rules()`: ভ্যালিডেশন রুলসগুলোর অ্যারে রিটার্ন করে।

```php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentEnrollmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // ইউজার অথরাইজড হলে এটিকে true করে দিতে হবে
        return true; 
    }

    public function rules(): array
    {
        return [
            'name' => 'required|max:100',
            'email' => ['required', 'email'],
            'gender' => ['required'],
            'photo' => ['required', 'image'],
            'age' => ['required', 'numeric', 'min:6', 'max:25']
        ];
    }
}
```

### গ. কন্ট্রোলারে ফর্ম রিকোয়েস্ট ব্যবহার করা:
কন্ট্রোলার মেথডে ডিফল্ট `Request` ক্লাসের পরিবর্তে আমাদের তৈরি করা কাস্টম `StudentEnrollmentRequest` টাইপ-হিন্ট করতে হবে:
```php
use App\Http\Requests\StudentEnrollmentRequest;

public function store(StudentEnrollmentRequest $request)
{
    // কন্ট্রোলারের রান হওয়ার আগেই ভ্যালিডেশন অটোমেটিক রান হবে
    // ভ্যালিডেটেড ডেটা পেতে:
    $validated = $request->validated();
    
    // পরবর্তী কার্যক্রম...
}
```

---

## ৪. কাস্টম ভ্যালিডেটর দিয়ে ভ্যালিডেশন (Validator Facade)

যদি আমরা লারাভেলের অটোমেটিক রিডাইরেকশন না চেয়ে ম্যানুয়ালি কন্ডিশন চেক করে এরর হ্যান্ডেল করতে চাই, তবে `Validator` ফ্যাসাড ব্যবহার করা যায়।

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

public function store(Request $request) {
    $validator = Validator::make($request->all(), [
        'name' => 'required|max:100',
        'email' => 'required|email',
    ]);
    
    // ভ্যালিডেশন ফেইল করলে ম্যানুয়ালি রিডাইরেক্ট করা ওল্ড ইনপুট ও এরর সহ:
    if ($validator->fails()) {
        return redirect()->route('students.enroll')
            ->withErrors($validator)
            ->withInput();
    }

    // ভ্যালিডেটেড পুরো ডেটা পেতে:
    $validated = $validator->validated();

    // শুধুমাত্র সুনির্দিষ্ট কলামের ভ্যালিডেটেড ডেটা ফিল্টার করে নিতে:
    $safeData = $validator->safe()->only(['email', 'gender']);
    $exceptData = $validator->safe()->except(['photo', 'gender']);
}
```

---

## ৫. সাবমিট করা ওল্ড ডেটা পুনরুদ্ধার করা (Retrieve Old Form Data)

ফর্ম ভ্যালিডেশন এরর হওয়ার পর রিডাইরেক্ট হলে ইনপুট করা পূর্বের ডেটাগুলো ফর্ম ফিল্ডে ধরে রাখার জন্য `old()` হেল্পার ফাংশন ব্যবহার করতে হয়।

### ক. টেক্সট ও ইমেইল ইনপুট:
```html
<input id="email" type="email" name="email" value="{{ old('email') }}">
```

### খ. রেডিও বাটন (Radio Button):
রেডিও বাটনে `checked` রাখার পদ্ধতি:
```html
<input id="gender-female" type="radio" value="female" name="gender" 
    {{ old('gender') == 'female' ? 'checked' : '' }}> Female

<input id="gender-male" type="radio" value="male" name="gender" 
    {{ old('gender') == 'male' ? 'checked' : '' }}> Male
```

### গ. ড্রপডাউন সিলেক্ট (Select Option):
সিলেক্ট অপশন `selected` রাখার পদ্ধতি:
```html
<select id="countries" name="country">
    <option value="bd" {{ old('country') == 'bd' ? 'selected' : '' }}>Bangladesh</option>
    <option value="in" {{ old('country') == 'in' ? 'selected' : '' }}>India</option>
</select>
```

### ঘ. মাল্টিপল চেকবক্স (Multiple Checkboxes):
একাধিক চেকবক্স সিলেক্টেড রাখার পদ্ধতি (`in_array` ব্যবহার করে):
```html
<input type="checkbox" id="interest-design" value="design" name="interests[]" 
    {{ in_array('design', old('interests', [])) ? 'checked' : '' }}> UI/UX Design

<input type="checkbox" id="interest-dev" value="development" name="interests[]" 
    {{ in_array('development', old('interests', [])) ? 'checked' : '' }}> Development
```

### ঙ. টেক্সট-এরিয়া (Textarea):
টেক্সট এরিয়াতে ওল্ড ভ্যালু ট্যাগের মাঝখানে বসে:
```html
<textarea id="bio" name="bio" rows="4">{{ old('bio') }}</textarea>
```

---

## ৬. Blade Directives: `@checked` এবং `@selected`

ম্যানুয়ালি টার্নারি কন্ডিশন লেখার চেয়ে লারাভেলের ব্লেড ডিরেক্টিভ ব্যবহার করলে কোড অনেক পরিচ্ছন্ন ও রিডেবল হয়।

- **`@checked()` ডিরেক্টিভ:** আর্গুমেন্ট সত্য (true) হলে এটি অটোমেটিক 'checked' বসিয়ে দেয়।
  ```html
  <input id="gender-male" type="radio" value="male" name="gender" 
      @checked(old('gender') == 'male')>
  ```
- **`@selected()` ডিরেক্টিভ:** আর্গুমেন্ট সত্য (true) হলে এটি অপশনটিতে 'selected' বসিয়ে দেয়।
  ```html
  <option value="bd" @selected(old('country') == 'bd')>Bangladesh</option>
  ```
- **অন্যান্য দরকারী ডিরেক্টিভ:** লারাভেলে অনুরূপভাবে `@disabled()`, `@readonly()`, এবং `@required()` ডিরেক্টিভও রয়েছে।

---

## ৭. কাস্টম ভ্যালিডেশন রুলস তৈরি করা (Custom Validation Rules)

লারাভেলের ডিফল্ট ভ্যালিডেশন রুলস ছাড়াও আমরা কাস্টম রুলস তৈরি করতে পারি। এটি দুইভাবে করা যায়:
1. ক্লোজার বা অ্যানোনিমাস ফাংশন ব্যবহার করে।
2. ডেডিকেটেড ক্লাস তৈরি করে।

### ক. ক্লাসের মাধ্যমে কাস্টম ভুল তৈরি করা:
প্রথমে নিচের কমান্ড দিয়ে কাস্টম রুল ক্লাস তৈরি করতে হবে:
```bash
php artisan make:rule CustomGenderRule
```
এটি `app/Rules/CustomGenderRule.php` ফাইল তৈরি করবে। এর `validate()` মেথডে কন্ডিশন সেট করতে হয়:

```php
namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CustomGenderRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // ইনপুট ভ্যালুটি আমাদের অ্যারের বাইরে হলে এরর কল করা হবে
        if (!in_array($value, ['male', 'female', 'other'])) {
            $fail('Please select a valid gender option.');
        }
    }
}
```

**ফর্ম রিকোয়েস্টে এই রুল ব্যবহার করার নিয়ম:**
```php
use App\Rules\CustomGenderRule;

public function rules(): array
{
    return [
        'gender' => ['required', new CustomGenderRule],
    ];
}
```

### খ. ক্লোজার (Closure) ব্যবহার করে সরাসরি কাস্টম রুল লেখা:
আলাদা ক্লাস তৈরি না করে সরাসরি রুলসের ভেতর ক্লোজার ফাংশন লিখেও ভ্যালিডেশন করা যায়:
```php
public function rules(): array
{
    return [
        'gender' => ['required', function (string $attribute, mixed $value, Closure $fail) {
            if (!in_array($value, ['male', 'female', 'other'])) {
                $fail('Please select a valid gender.');
            }
        }],
    ];
}
```

---

## ৮. কাস্টম এরর মেসেজ সেটআপ (Custom Error Messages)

লারাভেলের ভ্যালিডেশন এরর মেসেজগুলো ডিফল্টভাবে ইংরেজিতে থাকে। আমরা চাইলে এগুলো পরিবর্তন বা বাংলা করতে পারি।

### ক. ল্যাঙ্গুয়েজ ফাইল পাবলিশ করা:
প্রথমেই নিচের কমান্ড দিয়ে ল্যাঙ্গুয়েজ ফাইলগুলো লোকাল ডিরেক্টরিতে নিয়ে আসতে হবে:
```bash
php artisan lang:publish
```
এর ফলে `lang/` নামে একটি ফোল্ডার তৈরি হবে এবং তার ভেতর ইংরেজি (`en/`) ফাইলগুলো পাওয়া যাবে। কাস্টম মেসেজ যুক্ত করার জন্য `lang/en/validation.php` ফাইল ওপেন করতে হবে।

### খ. ল্যাঙ্গুয়েজ ফাইলে কাস্টম মেসেজ ডিফাইন করা:
`validation.php` ফাইলের `custom` অ্যারেতে কোনো ফিল্ডের রুলের জন্য মেসেজ সেট করা যায়:
```php
'custom' => [
    'name' => [
        'required' => 'আপনাকে অবশ্যই একটি নাম দিতে হবে।',
        'max' => 'নাম ১০০ অক্ষরের বেশি হতে পারবে না।',
    ],
    'photo' => [
        'required' => 'আপনাকে অবশ্যই একটি ছবি আপলোড করতে হবে।',
    ],
],
```

আমরা চাইলে ফিল্ডের ইংরেজি নামের পরিবর্তে বাংলা নাম দেখাতে `attributes` অ্যারে আপডেট করতে পারি:
```php
'attributes' => [
    'email' => 'ইমেইল অ্যাড্রেস',
    'age' => 'বয়স',
],
```

### গ. ফর্ম রিকোয়েস্টে কাস্টম মেসেজ লেখা:
ল্যাঙ্গুয়েজ ফাইলে হাত না দিয়ে সরাসরি নির্দিষ্ট কোনো `FormRequest` ক্লাসের ভেতর `messages()` এবং `attributes()` মেথড ওভাররাইড করে মেসেজ কাস্টমাইজ করা যায়:

```php
// app/Http/Requests/StudentEnrollmentRequest.php

class StudentEnrollmentRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'gender' => ['required'],
            'age' => ['required', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'gender.required' => 'একটি লিঙ্গ নির্বাচন করা আবশ্যক।',
        ];
    }

    public function attributes(): array
    {
        return [
            'age' => 'বয়স',
        ];
    }
}
```

### ঘ. কন্ট্রোলারের ভেতর কাস্টম মেসেজ দেওয়া:
`Validator::make()` বা `$request->validate()` এর দ্বিতীয় ও তৃতীয় প্যারামিটার হিসেবে কাস্টম মেসেজ ও কাস্টম অ্যাট্রিবিউট পাঠানো যায়:
```php
$validator = Validator::make($request->all(), [
    'name' => 'required|max:100',
    'email' => 'required|email'
], [
    'name.required' => 'নাম দেওয়া আবশ্যক ভাই!',
    'email.required' => 'ইমেইল অ্যাড্রেসটি দিন দয়া করে।',
]);

---

## ৯. অ্যাডভান্সড ভ্যালিডেশন টপিকস (Advanced Validation Topics)

ইনপুট ভ্যালিডেশনকে আরও সুরক্ষিত, নমনীয় এবং আধুনিক করার জন্য লারাভেলে বেশ কিছু অ্যাডভান্সড ভ্যালিডেশন ফিচার রয়েছে। নিচে সেগুলো আলোচনা করা হলো:

### ক. ফর্ম রিকোয়েস্ট অথরাইজেশন (Form Request Authorization):
লারাভেলের `FormRequest` ক্লাসের `authorize()` মেথডের মাধ্যমে আমরা রিকোয়েস্টকারী ইউজারকে অথরাইজ করতে পারি। অর্থাৎ ভ্যালিডেশন রান হওয়ার পূর্বেই ইউজার অথেন্টিকেটেড অথবা এই কাজের জন্য উপযুক্ত অনুমতি (Permission) বা রোল (Role) হোল্ড করে কিনা তা নির্ধারণ করা যায়।

`app/Http/Requests/StudentEnrollmentRequest.php` ফাইলে:
```php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentEnrollmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        // ১. শুধুমাত্র অ্যাডমিন ইউজারদের অনুমতি দিতে:
        return auth()->user()->is_admin; 
        
        // ২. অথবা লারাভেলের গেট বা পলিসি (can) মেথড ব্যবহার করে পারমিশন চেক করতে:
        // return auth()->user()->can('enroll user');
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            // অন্যান্য রুলস...
        ];
    }
}
```

এছাড়াও আমরা Spatie-এর Permission প্যাকেজ ব্যবহার করলে সরাসরি পারমিশন চেক করতে পারি:
```php
// return auth()->user()->hasPermissionTo('create student');
```

যেহেতু ফর্ম রিকোয়েস্টের ভেতর কারেন্ট রিকোয়েস্টের সমস্ত ইনস্ট্যান্স এবং তথ্য পাওয়া যায়, তাই আমরা `$this->user()` দিয়েও কারেন্ট ইউজার অবজেক্ট অ্যাক্সেস করতে পারি:
```php
// return $this->user()->is_admin();
```

---

### খ. কন্ডিশনাল ভ্যালিডেশন (Conditionally Validate Fields):
অ্যাপ্লিকেশনের লজিকের ওপর ভিত্তি করে ইনপুট ফিল্ডগুলোকে কন্ডিশনালি ভ্যালিডেট করার জন্য লারাভেলে একাধিক চমৎকার রুল রয়েছে। 

ধরা যাক, আমাদের স্টুডেন্ট রেজিস্ট্রেশন ফর্মে কিছু কন্ডিশনাল প্রয়োজনীয়তা রয়েছে:
1. স্টুডেন্টের বয়স যদি ১৪ বছরের কম হয়, তবে প্যারেন্টের ফোন নম্বর (`phone`) আবশ্যক। (১৮ বছরের কম হলে ফোন নম্বর আবশ্যক - এভাবেও আমরা কন্ডিশন দিতে পারি)।
2. স্টুডেন্টের আইডেন্টিটি ভেরিফিকেশনের জন্য ফটো (`photo`) অথবা বায়োমেট্রিক/সিগনেচার (`biometric`) যেকোনো একটি প্রদান করা বাধ্যতামুলক।

এই কন্ডিশনাল রুলগুলো আমরা নিম্নরূপ লিখতে পারি:
```php
$validated = $request->validate([
    'age' => 'required|numeric',
    
    // বয়স ১৮ না হলে (বা এর চেয়ে কম হলে) phone ফিল্ডটি required হবে
    'phone' => 'required_unless:age,18',
    
    // biometric ফিল্ডটি থাকলে photo ফিল্ডটিকে রিকোয়ারমেন্ট থেকে বাদ দেওয়া হবে (exclude_with)। 
    // অন্যথায় photo ফিল্ডটি ইমেজ ফরম্যাটে সাবমিট করতে হবে
    'photo' => ['exclude_with:biometric', 'sometimes', 'image'],
    'biometric' => ['exclude_with:photo', 'image'],
    
    // photo অথবা biometric এর যেকোনো একটি ফিল্ড উপস্থিত থাকলে privacy ফিল্ডটি আবশ্যক হবে এবং এর ভ্যালু public বা private হতে পারবে
    'privacy' => ['required_with:photo,biometric', 'in:public,private']
]);
```

---

### গ. অ্যারে ইনপুট ভ্যালিডেশন (Array Input Validation):
লারাভেলে অ্যারে ফরম্যাটের ইনপুটগুলোকে খুব সহজেই ভ্যালিডেট করা যায়। যেমন—ইউজারের Resume তৈরির একটা ফর্মে একই সাথে একাধিক শিক্ষাগত যোগ্যতা (`educations`) এবং অভিজ্ঞতা (`experiences`) এর অ্যারে ডেটা সাবমিট করা হলো:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123, Main Street, Cityville",
  "about": "A passionate professional",
  "educations": [
    {
      "graduation": "Bachelor of Science",
      "institute": "University of Examples",
      "cgpa": "3.8",
      "passing_year": "2020"
    },
    {
      "graduation": "Master of Business Administration",
      "institute": "Business Institute XYZ",
      "cgpa": "3.9",
      "passing_year": "2022"
    }
  ],
  "experiences": [
    {
      "company": "Techcorp",
      "details": "Worked on developing and maintaining web applications"
    }
  ]
}
```

আমরা যদি কোনো API-এর মাধ্যমে এই ডেটাগুলো ভ্যালিডেট ও প্রসেস করতে চাই, তবে নিচের মতো রাউট ও কন্ট্রোলার সাজাতে পারি:

#### API রাউট ডিক্লারেশন (`routes/api.php`):
```php
use App\Http\Controllers\ResumeController;

Route::post('/resume/create', [ResumeController::class, 'store']);
```

আমরা VS Code-এর **Thunder Client** এক্সটেনশন অথবা **Postman** দিয়ে `POST` রিকোয়েস্ট পাঠাব:
`http://127.0.0.1:8000/api/resume/create`

> [!TIP]
> API থেকে JSON রেসপন্স পাওয়ার জন্য রিকোয়েস্ট হেডারে `Accept: application/json` সেট করে দেওয়া আবশ্যক।

ভ্যালিডেশন ফেইল করলে লারাভেল নিম্নরূপ JSON এরর রেসপন্স ব্যাক করবে:
```json
{
  "message": "আপনাকে অবশ্যই একটি নাম দিতে হবে।",
  "errors": {
    "name": ["আপনাকে অবশ্যই একটি নাম দিতে হবে।"]
  }
}
```

#### কন্ট্রোলার অ্যাকশন (`ResumeController.php`):
অ্যারে ভ্যালিডেশনের ক্ষেত্রে ইনপুটের মূল কী-টিকে (যেমন: `educations`) প্রথমে ভ্যালিডেট করা হয়, এবং এর ভেতরের প্রতিটি রো ভ্যালিডেট করার জন্য ডট নোটেমশন ও ওয়াইল্ডকার্ড `*` ব্যবহার করতে হয়:

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResumeController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'address' => 'required|string',
            'about' => 'nullable|string|max:1000',
            
            // educations ইনপুটটি অবশ্যই একটি অ্যারে হতে হবে এবং কমপক্ষে ১টি আইটেম থাকতে হবে
            'educations' => 'required|array|min:1',
            'educations.*.graduation' => 'required|string|max:255',
            'educations.*.institute' => 'required|string|max:255',
            'educations.*.cgpa' => 'required|string|max:50',
            'educations.*.passing_year' => 'required|digits:4',
            
            // experiences ইনপুটটিও একটি অ্যারে হতে হবে
            'experiences' => 'required|array|min:1',
            'experiences.*.company' => 'required|string|max:255',
            'experiences.*.details' => 'required|string|max:1000'
        ]);
        
        return response()->json([
            'message' => 'Resume processed successfully!',
            'data' => $validated
        ]);
    }
}
```

---

### ঘ. ফাইল ভ্যালিডেশন (Validating Files):
ইউজাররা যাতে অহেতুক বড় ফাইল বা আমাদের অনুমোদিত নয় এমন ক্ষতিকারক ফাইল বা ভুল ডাইমেনশনের ছবি আপলোড করতে না পারে, তার জন্য ফাইল ভ্যালিডেশন অত্যন্ত জরুরী। 

লারাভেলে ফাইল ভ্যালিডেশন করার জন্য আমরা সরাসরি রুল অ্যারে ব্যবহার করতে পারি অথবা `Illuminate\Validation\Rules\File` রুল ক্লাসটির সাহায্য নিতে পারি:

```php
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\Rule;

$request->validate([
    'gender' => ['required', 'string'],
    'photo' => [
        'exclude_with:biometric', 
        'sometimes', 
        // File অবজেক্টের মাধ্যমে ইমেজ টাইপ, সাইজ ও ডাইমেনশন ডিফাইন করা:
        File::image()
            ->types(['jpg', 'jpeg', 'png', 'webp'])
            ->max('2mb') // সর্বোচ্চ সাইজ ২ এমবি (2048 KB)
            ->dimensions(Rule::dimensions()->width(500)->height(500)) // ছবি ঠিক ৫০০x৫০০ পিক্সেল হতে হবে
    ]
]);
```

আমরা চাইলে সাধারণ স্ট্রিং ফরম্যাটেও ফাইল ভ্যালিডেশন রুলগুলো লিখতে পারি:
```php
'photo' => [
    'exclude_with:biometric',
    'sometimes',
    'image',
    'mimes:jpg,jpeg,png,webp',
    'max:2048', // কিলোবایت হিসেবে (২০৪৮ কেবি = ২ এমবি)
    'dimensions:width=500,height=500'
]
```
```

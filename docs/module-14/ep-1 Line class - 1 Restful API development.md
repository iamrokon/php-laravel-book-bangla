
① Module 14. Line class - 1 : Restful API development
MPA তে সার্ভার থেকে HTML serve হয়। বাকি সব ক্লায়েন্ট সাইডে (যেমন- SPA, APP...) ডেটাগুলো থেকে serve হয় Data(JSON), আমাদের ওয়েব অ্যাপের ক্লায়েন্টসমূহঃ
- Browser (MPA) -> Multi page application
- Browser (SPA) -> Single page application -> ডেটা API
- Mobile app -> ব্যবহার করে।

- Iot device
- Web service

Serve: Data (JSON)
SPA তে পুরো ওয়েবসাইট একটাই পেজ থাকে। শুধু ভিন্ন ভিন্ন রাউটের জন্য কিছু কন্টেন্ট চেঞ্জ হয়। কিন্তু MPA তে প্রতিটি রাউটের জন্য পুরো পেজ
Web API -> কন্টেন্ট নতুনভাবে লোড হয়।

আমাদের অনেক সময় SPA ও MPA এর কমিউনিকেশন ও কোন অ্যাপ্লিকেশন
বানানো লাগতে পারে।
SOAP -> XML -> registry -> এটাকে ধরে নিয়ম SOAP
এর REST এর আগে জনপ্রিয় ছিল। এর প্রাইমারি Endpoint এটি ছিল।
REST করতে যেগুলোকে কি service available (পছন্দ করা হয়),
GraphQL -> এটি এখন আর পছন্দ নয়। কোন কোন তথ্যসমেত
gRPC -> রিকোয়েস্ট করতে হবে।

Rest: -> ডেটা Stateless
-> JSON ডেটা রিটার্ন করে।
-> HTTP (GET, POST, PUT, DELETE) -> PATCH
-> Naming Convention -> (api/users) কিছু স্ট্যান্ডার্ড আছে
-> (GET api/users) list of resources
-> (GET api/users/1) resource details
-> Rest এর কোন Bindings নাই এটা flexible।



HTTP verb
- (POST api/users) create new resource
- (PUT api/users/1) update a resource fully
- (PATCH api/users/1) update a resource partially
- (DELETE api/users/1) delete a resource

নেস্টেড Resource:
- (GET api/posts/10/comments) -> ১০ নম্বর পোস্টের সব কমেন্ট
- (GET api/posts/10/comments/5) -> ১০ নম্বর পোস্টের ৫ নম্বর কমেন্ট
- (DELETE api/posts/10/comments/5) -> কমেন্ট ডিলিট

এই দুইটা মূলত [ (DELETE api/posts/10/comments/5) ] এইটা হলো
আমরা যে কমেন্ট ডিলিট করতে চাই তার post_id এবং comment_id লাগে, তাই
এই কমেন্ট রুট এ post_id ও লাগে।

Public API, Private API, Partner API
Public API এর ডকুমেন্টেশন পাবলিক। এতে অথেনটিকেশন
থাকতে ও পারে, নাও পারে।
যেসব API এর ডকুমেন্টেশন অর্থাৎ কিভাবে ব্যবহার করা
হবে তা পাবলিক না সেটা Private API।
Private API টা একটা নির্দিষ্ট অর্গানাইজেশন এর জন্য।
Partner API : Partnership এর মাধ্যমে সেবার
API এর সুবিধা হয়। Partner API গুলোর এক
ধরনের Private API। অর্থাৎ টাকা দিলে ওই API গুলোর অ্যাক্সেস
পাওয়া যায়।
(DELETE api/posts/10/comments/5/replies/2)
payment gateway এর ধরনের private api partner api


১৮। REST এর কনসেপসগুলো ফলো করলে HATEOAS মেইনটেইন করে অ্যাপ্লিকেশনগুলো বানাতে হবে।
HATEOAS (Hypermedia as the Engine of Application state)
→ ব্রাউজেবল API

Rest এর গাইডলাইন ফলো করে API বানালে
সেগুলো Rest full API।
একটা Api তে হিট করলে যে কিছু ডেটা প্রদান করবে, সাথে আমরা
next আর কি কি কাজ করতে পারব (যেমন- GET, POST, ইত্যাদি), আরও কিছু লিঙ্ক,
metadata প্রদান করে।

{
  "departmentId": 10,
  "departmentName": "Administration",
  "links": [
    {
      "href": "/10/employees",
      "rel": "employees",
      "type": "GET"
    }
  ]
}

লারাবেল এ Sanctum ব্যবহার করতে
routes > api.php
php artisan install:api
sanctum মূলত api অথেনটিকেশন হ্যান্ডেল করে।
sanctum দিয়ে api তে token based অথেনটিকেশন করা যায়।
আবার sanctum দিয়ে spa তে session/cookie বেসড অথেনটিকেশন করা
যায়।


user অথেনটিকেটেড কিয়া এটা sanctum করে টোকেন দিয়ে। যখন টোকেন সহ রিকোয়েস্ট করা হয়।
sanctum মূলত personal_access_tokens টেবিল ব্যবহার করে।

চিন্তা করছি:
আমাদের API এর ক্ষেত্রেও কি same ভাবে কাজ করবে?
আমরা দুইটা জিনিস নিয়েছি। Web ও api নামে।

app > Http > Controllers > API > ProductController.php
php artisan make:controller API/ProductController
php artisan make:model Post -mfa

create_posts_table.php
public function up() {
    Schema::create('posts', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->text('content');
        $table->text('description');
        $table->timestamps();
        $table->softDeletes();
    });
}

posts.php
class Post extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'description'
    ];
}

api.php
Route::get('posts', [PostController::class, 'list'])->name('posts.list');

20. Browser (MPA) -> Multi-page application
এ ক্ষেত্রে আমরা একটা পেজ রিকোয়েস্ট করলে ব্রাউজার সেই পেজের এইচটিএমএল
পাঠিয়ে দেয়। আবার অন্য একটা রাউটে হিট করলে
ব্যাক এন্ড থেকে ওই পেজের এইচটিএমএল পাঠিয়ে দেয়। এখন
একে বলে Multi-page application.

SPA - Single Page Application
এ ক্ষেত্রে প্রথমবার ব্রাউজার থেকে রিকোয়েস্ট যায় ব্যাকএন্ডে। ব্যাকএন্ড
থেকে বেসিক পেজ আমাদেরকে পাঠিয়ে দেয় এইচটিএমএল হিসেবে।
এর সাথে একটা জাভাস্ক্রিপ্ট বান্ডল বা কোড আমাদের কাছে
পাঠায়। ওই জাভাস্ক্রিপ্ট কোডের কাজ হচ্ছে যখন যে পেজ
আমরা ব্রাউজ করতে চাই, সেই পেজের জন্য সে ব্যাকএন্ড
থেকে ডাটা কল করে। অর্থাৎ পুরো এইচটিএমএল কন্টেন্ট আর
লোড হয় না। জাভাস্ক্রিপ্ট বলেছে কন্টেন্ট লোড
সেজে অন্য লজিকটা থাকে। সে শুধুমাত্র রিকোয়েস্ট
পাঠায় ব্যাক এন্ড থেকে ডাটা কল করে নিয়ে আসে।

Rest api তে রিকোয়েস্টগুলোর জন্য আমরা সর্বদা plural form
use করব। যেমন: /api/users
/api/users/1

REST API (Representational State Transfer Application Programm-
ing Interface) এটি এমন একটি পদ্ধতি যার মাধ্যমে
ভিন্ন ভিন্ন টাইপের অ্যাপ্লিকেশন একে অপরের সাথে
কমিউনিকেট করে HTTP মেথডগুলোর মাধ্যমে।


রিসোর্সের কাজ হলো সহজে CRUD অপারেশন করা। ধরো, আমাদের যদি ১০০টি কলাম বা ডেটা নিয়ে কাজ করতে হয়, তাহলে প্রতিটি কাজ আলাদাভাবে না করে রিসোর্স ব্যবহার করে সহজে করা যায়।
রিসোর্স ব্যবহার করে আমরা API তৈরি করতে পারি। ওয়েবের জন্য Blade এবং React-এর জন্য API ব্যবহার করা যায়।
ফাইলের লোকেশন:
app/Http/Controllers/API/PostController.php


<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\JsonResponse;

class PostController extends Controller
{
    public function list(): JsonResponse
    {
        $posts = Post::paginate(5);

        return response()->json($posts);
    }
}

class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(),
            'description' => $this->faker->paragraph(),
        ];
    }
}

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::factory(10)->create();
    }
}

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            PostSeeder::class,
        ]);
    }
}




Rest API হল এমন একটি API যার নির্দিষ্ট কিছু আর্কিটেকচারাল
স্টাইল রয়েছে যাকে বলে REST Principles + এটি ফলো করে।

php artisan migrate
php artisan db:seed
Postman এ GET posts
Laravel এ http://localhost:9998/api/posts -> সবগুলা পোস্ট দেখতে পাব।

আমরা api এর কাছে সরাসরি json বাটি রিটার্ন করব না।
লারাবেল api Resource নামে ফাংশনটি জিনিস রয়েছে।
user -> একটি resource, post -> একটি resource,
product -> একটি resource
এই রিসোর্সগুলোকে কোন স্ট্রাকচারে রিটার্ন করব সেই API
Resource. (এটা একটা factory এর মত)।

রিসোর্স তৈরির কমান্ড: php artisan make:resource PostResource

class PostResource extends JsonResource {
    public function toArray($request) {
        return [
            'title' => $this->title,
            'content' => $this->content
        ];
    }
}

class PostController {
    public function list() {
        $post = Post::all();
        return response()->json(
            PostResource::collection($post)
        );
    }

    $post = Post::paginate(5);
    return PostResource::collection($post);
}

এই ফরম্যাটে রিটার্ন করলে আমাদের আলাদা কোন কনকশন ক্লাস
বানানোর প্রয়োজন নেই। এখান থেকেই meta ডাটা পাওয়া যাবে।|


web ও api এর জন্য আমরা দুটি কন্ট্রোলার দুটি আলাদা
করব। Request ক্লাস, Resource, service ক্লাস
web ও api এর জন্য একই হলেই চলবে।
Resource ক্লাস মূলত api এর জন্য কাজ করবে হয়।
spa এর জন্য vue, react এর সাথে কাজ করবে হয়।

api.php
Route::get('posts/{post}', [PostController::class, 'show'])
    ->name('posts.details');

PostController.php
class PostController {
    public function show(string $id) {
        $post = Post::select('title', 'content')->findOrFail($id);
        return response()->json(
            new PostResource($post)
        );
    }
}

আমরা চাইলে $post কে toArray() মেথড কে
ব্যবহার করি। কিন্তু আমরা
Resource ব্যবহার করি এই কারণে যে,
আমাদের ডাটাবেসের কলামগুলো মডিফাই/কাস্টমাইজ রিটার্ন করতে হয়।
Resource এর মূল কাজ হলো Separation of Concern
Service ক্লাসকে আমরা ব্যবহার করব মূল বিজনেস
লজিক লেখার জন্য। আর Resource ক্লাসকে ব্যবহার
করব শুধুমাত্র ডাটা ফরম্যাটিং এর জন্য। আর Service
থেকে আসা ডাটাকে আমরা Resource ক্লাসে ফরম্যাট
এর জন্য।


যখন আমাদের কালেকশন এর সাথে এক্সট্রা ডেটা পাঠাতে হয়। যখন আমাদের রিসোর্স লিস্ট রিটার্ন করতে হয় তখন রিসোর্স কালেকশন ক্লাস বানাতে হয়।

যেমন:
Resources\V1\AppointmentForExpertResourceCollection.php

class AppointmentForExpertResourceCollection extends ResourceCollection {
    public $collects = AppointmentForExpertResource::class;

    public function toArray($request) {
        return [
            'data' => $this->collection,
            'meta' => [
                'path' => $this->path(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
                'from' => $this->firstItem(),
                'to' => $this->lastItem(),
                'total' => $this->total(),
            ],
        ];
    }
}

AppointmentController.php




পুরো অ্যাপ্লিকেশনের আর্কিটেকচার টা কেমন সেটিই মানসিকভাবে ঠিক করা।
হয়। কিন্তু মাইক্রোসার্ভিস রিলেটেড থাকে তবে একটাই কোডবেস
আলাদা হয়। যেমন: একটা ইনভেন্টরি, পেমেন্ট, ইউজার সার্ভিস-এর
কে আলাদা রাখার হিসেবে। ফোল্ডার আর্কিটেকচার।
ওটাকে মেইনটেইন করা।

class AppointmentController {
    $collection = new AppointmentForExpertResourceCollection(
        $packageBookings);
    return response()->json([
        'success' => true,
        'message' => 'Appointment list fetched successfully',
        'data' => $collection['data'],
        'meta' => $collection['meta'],
    ]);
}

Api তে ফেরত ও with দিয়ে Eagerload করা হলো n+1
কোয়েরি প্রবলেম দূর হবে।
Web এবং Api এর রিলেশন ভিন্ন হলো তবে জন আমরা
Request ও আলাদা ফোল্ডার নিয়ে নেব।
লজিক যেমন হলে web এবং Api এর জন্য আমরা সেম Service
কাজ করবে।
Api Resource এর phpleague fractal নামে একটা package
আছে। এছাড়া spatie-র laravel-fractal নামে প্যাকেজ
আছে। তবে নার্ভেল-এ api resource খুব ভালো কাজ
আছে। HTTP হল stateless তাই আগে কেন স্টেট মেইনটেইন করা হয় না।


Api তে এসে এরর মেসেজ রিটার্নঃ
app>Http>Controllers>Api>V1>AppointmentController.php
Module 14 Live Class 2:
public function getAppointmentDetailsForUser(Request $request) {
    PackageBooking::packageBooking -> user_id != auth()->id() ) {
        return response()->json([
            'success' => false,
            'message' => 'You cannot access this resource',
        ], 403);
    }
    API তে কেমন বাছতে হয় ওভাবে দেখাব।
    হয় না।
    আবার কোন কোন রিটার্ন করা হয় নিম্নরুপঃ
    AppointmentController.php
    public function scheduleSession(SessionScheduleRequest $request,
                                    SessionBookingService $sessionBookingService)
    {
        try {
            $sessionBookingService->scheduleSessionBooking(
                $packageBooking->package,
                $sessionBooking,
                $request->get('appointment_time')
            );
        } catch (SessionSchedulingValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot schedule session',
                'errors' => [
                    'appointment_time' => $e->getMessage()
                ]
            ], 422);
        }
    }
    কমিউনিকেশন লার্নিং বালাইড কর।


app\Http\Requests\v1\SessionScheduleRequest {
class SessionScheduleRequest {
    public function rules() {
        return [
            'appointment_time' => ['required', 'date_format:Y-m-d H:i:s']
        ];
    }
}



Module 14: Live Class 2: Rest Api Part-2
রিকুয়েস্ট, Debug করার জন্য আমরা Laravel Telescope ব্যবহার
করতে পারি।
Api তে version ম্যানেজ করা অত্যন্ত গুরুত্বপূর্ণ। web এর ক্ষেত্রে দেওয়া হবে যে এটাই নোট করবে। এবং versin ম্যানেজ করা আলোচনা।
কিন্তু Api এর ক্ষেত্রে আমরা আরকজন ক্লায়েন্ট কে যেহেতু বাটি দিচ্ছি নির্দিষ্ট ফরম্যাট ও তে দিতে আমরা যেখানে কোন লজিক চেক করলে ক্লায়েন্ট সাইডে ইস্যু তৈরি করবে, বা অ্যাপ্লিকেশনটি ব্রেক করবে, তখন Api তে ভার্সন ম্যানেজ করা অত্যন্ত গুরুত্বপূর্ণ। এভাবে ডকুমেন্টেশন তৈয়ার হতে হবে।



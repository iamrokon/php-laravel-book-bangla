# Git: Version Control System

**Git** এর পূর্ণরূপ Global Information Tracker। এটি আমাদের কোডের বিভিন্ন ভার্সন ম্যানেজ করতে সাহায্য করে।

### Basic Configuration
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### Git Workflow
1. **Working Directory:** যেখানে আমরা কোড লিখছি।
2. **Staging Area:** যেখানে কোড কমিট করার জন্য তৈরি করা হয় (`git add`).
3. **Local Repository:** যেখানে কোড স্থায়ীভাবে সেভ হয় (`git commit`).

### Advanced Git Workflow (Live Class Notes)

কোডের বিভিন্ন ভার্সনে আনডু (undo) করতে হলে আমরা `reflog`, `reset`, বা `revert` ব্যবহার করতে পারি:
- `git reflog`: আগের সমস্ত কমিটের পয়েন্টার (HEAD) দেখতে।
- `git reset HEAD@{5}`: ৫ কমিট আগে ফিরে যাবে তবে কোডগুলো Staging অবস্থায় থাকবে।
- `git reset HEAD@{5} --hard`: হার্ডলি আনডু হবে, অর্থাৎ কোড পার্মানেন্টলি ডিলিট হয়ে আগের অবস্থায় ফিরে যাবে।
- `git revert <commit-hash>`: নির্দিষ্ট কমিটের পরিবর্তনগুলো রিভার্ট (undo) করে নতুন একটি কমিট তৈরি করে (যেমন: `git revert 0c4cbfb`)।

### Branching and Merging
আমরা মূল কোডে পরিবর্তন না এনে নতুন ফিচারের কাজ আলাদা **Branch**-এ করতে পারি। 

- `git branch practice`: "practice" নামে নতুন ব্রাঞ্চ তৈরি করতে।
- `git checkout practice`: "practice" ব্রাঞ্চে নেভিগেট করতে। ব্রাঞ্চ তৈরি এবং নেভিগেট একসাথে করতে `git checkout -b practice` কমান্ড ব্যবহার করা যায়।

**Merging Example:**
ধরুন, আমাদের "practice" ব্রাঞ্চে নতুন কিছু কোড রয়েছে এবং "main" ব্রাঞ্চেও আলাদা কিছু কোড আচে। আমরা যদি এগুলো একত্রে করতে চাই, তবে:
1. প্রথমে মূল ব্রাঞ্চে যেতে হবে: `git checkout main`
2. এরপর মার্জ কমান্ড দিতে হবে: `git merge practice`

**Conflict Resolution:** 
মার্জ করার সময় কনফ্লিক্ট (conflict) দেখা দিতে পারে (যখন একই ফাইলের একই লাইনে দুই ব্রাঞ্চে পরিবর্তন থাকে)। কনফ্লিক্ট এড়াতে "practice" ব্রাঞ্চে কাজ করার সময় নিয়মিত `git pull` বা `git merge main` করে মূল ব্রাঞ্চের আপডেট নিয়ে রাখা উচিত। কনফ্লিক্ট দেখা দিলে সেটা manually সলভ করে তারপর কমিট করতে হয়। 

`git stash`: ফাইলগুলো কমিট করার উপযুক্ত অবস্থায় না থাকলে, টেম্পোরারি (temporary) সেভ করে মূল ব্রাঞ্চে পরিবর্তন করতে আমরা `stash` ব্যবহার করতে পারি।

ব্রাঞ্চের কাজ শেষ হয়ে গেলে সেটি ডিলিট করতে:
```bash
git branch -d practice
```
(বি.দ্র: `git log` দেখার সময় যদি `:` (কোলন) আসে, তবে নেভিগেট করতে অ্যারো-কী এবং বের হতে `q` চাপতে হয়।)

### Remote Repository, Fork & Clone
- গিটহাব রিপোজিটরির Settings > Danger Zone এ গিয়ে এর Visibility (Public / Private) পরিবর্তন করা যায়।
- **Clone:** অন্য কারো প্রোজেক্ট ডাউনলোড করে কাজ করতে চাইলে সেটি ক্লোন করতে হয়। যেমন:
  `git clone https://github.com/faisal2410/phpmvc.git`
- **Fork:** ওপেন সোর্স প্রজেক্টে কন্ট্রিবিউট (contribute) করতে চাইলে প্রথমে ওই প্রজেক্ট নিজের প্রোফাইলে Fork করে নিতে হয়। তারপর নিজের ওই ফর্ক করা প্রোজেক্ট ক্লোন করে কাজ করা হয়। কাজ শেষে আসল রিপোজটরিতে **Pull Request** বা PR পাঠাতে হয়।

### Cherry-Pick
আমাদের কোনো ব্রাঞ্চে যদি অনেকগুলো কমিট থাকে, এবং সেগুলোর মধ্যে নির্দিষ্ট একটি বা দুটি কমিট মূল ব্রাঞ্চে (main) মার্জ করতে চাই, তবে **`git cherry-pick <commit-hash>`** কমান্ড ব্যবহার করা হয়।

### Github Profile customization
গিটহাব প্রোফাইলকে আরো সুন্দর এবং কাস্টমাইজ করতে চাইলে `skyline.github.com/<username>` এর মতো থ্রি-ডি ভিউ ব্যবহার করার সুযোগ রয়েছে।

বিস্তারিত জানতে: [git-scm.com/doc](https://git-scm.com/doc)

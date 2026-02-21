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

### Important Commands
- `git init`: গিট রিপোজিটরি শুরু করতে।
- `git status`: বর্তমান অবস্থা দেখতে।
- `git log`: সব কমিট হিস্ট্রি দেখতে।
- `git checkout [hash]`: কোড আগের ভার্সনে নিয়ে যেতে।
- `git reset` / `git revert`: পরিবর্তনগুলো আনডু করতে।

বিস্তারিত জানতে: [git-scm.com/doc](https://git-scm.com/doc)

export default {
    title: "পিএইচপি-লারাভেল কোর্স",
    description: "একটি বিগেনার ফ্রেন্ডলি পিএইচপি-লারাভেল কোর্স | আমরা যারা একদম নতুন তাদের সহজ ভাষায় পিএইচপি-লারাভেল শিখানোর চেষ্টা করি ।",
    themeConfig: {
        nav: [
            { text: "হোম পেজ", link: "/" },
            { text: "ডকুমেন্টেশন", link: "/module-1/introduction" },
        ],

        sidebar: [
            {
                text: 'মডিউল ১: পিএইচপি মৌলিক',
                collapsed: false,
                items: [
                    { text: 'PHP এর ইতিহাস ও পরিচিতি', link: '/module-1/introduction' },
                    { text: 'Episode 1: Data Types', link: '/module-1/data-types' },
                    { text: 'Episode 2: Type Hinting', link: '/module-1/type-hinting' },
                    { text: 'Episode 3: Type Casting', link: '/module-1/type-casting' },
                    { text: 'Episode 4: Intro to Variables', link: '/module-1/variables' },
                    { text: 'Episode 5: Intro to Arrays', link: '/module-1/arrays' },
                    { text: 'Episode 6: Array Manipulation', link: '/module-1/array-manipulation' },
                    { text: 'Episode 7: Intro to Functions', link: '/module-1/functions' },
                    { text: 'Episode 8: Built-in Functions', link: '/module-1/builtin-functions' },
                    { text: 'Episode 10: Named Arguments', link: '/module-1/named-arguments' },
                    { text: 'Episode 11: Intro to Closures', link: '/module-1/closures' },
                    { text: 'Episode 12: Intro to Loops', link: '/module-1/loops' },
                    { text: 'Interview Questions', link: '/module-1/interview-questions' },
                ]
            },
            {
                text: 'মডিউল ২: ডিপেন্ডেন্সি ম্যানেজমেন্ট',
                collapsed: true,
                items: [
                    { text: 'Episode 1: Autoloading', link: '/module-2/autoloading' },
                    { text: 'Episode 2: Composer Intro', link: '/module-2/composer-intro' },
                    { text: 'Episode 3 & 4: Composer Autoloading', link: '/module-2/composer-autoloading' },
                    { text: 'Episode 5: Managing Dependencies', link: '/module-2/managing-dependencies' },
                    { text: 'Episode 6: Packagist & Packages', link: '/module-2/packagist' },
                    { text: 'Episode 7: Advanced Dependency Management', link: '/module-2/advanced-dependency' },
                ]
            },
            {
                text: 'মডিউল ৩: ওয়েব প্রাইমার ও ওওপি (OOP)',
                collapsed: true,
                items: [
                    { text: 'Episode 1-5: Web Primer', link: '/module-3/web-primer' },
                    { text: 'Live Class: Nginx & Web Server', link: '/module-3/nginx-web-server' },
                    { text: 'Live Class: Form Handling', link: '/module-3/form-handling' },
                    { text: 'Live Class: OOP Basics', link: '/module-3/oop-basics' },
                ]
            },
            {
                text: 'মডিউল ৪: অ্যাডভান্সড ওওপি ও ডাটাবেজ',
                collapsed: true,
                items: [
                    { text: 'Programming Paradigms', link: '/module-4/programming-paradigms' },
                    { text: 'OOP Deep Dive', link: '/module-4/oop-deep-dive' },
                    { text: 'Namespaces', link: '/module-4/namespaces' },
                    { text: 'OOP Design Principles', link: '/module-4/oop-principles' },
                    { text: 'Dependency Injection & Composition', link: '/module-4/dependency-injection' },
                    { text: 'SOLID Principles', link: '/module-4/solid-principles' },
                    { text: 'Constants & Enums', link: '/module-4/constants-enums' },
                    { text: 'Database Design & Architecture', link: '/module-4/database-design' },
                ]
            },
            {
                text: 'টুলস ও প্রবলেম সলভিং',
                collapsed: true,
                items: [
                    { text: 'Git & Version Control', link: '/tools/git' },
                    { text: 'PHP Problem Solving & DSA', link: '/dsa/problem-solving' },
                    { text: 'PHP CLI & Internal Flow', link: '/extra/php-cli' },
                ]
            }
        ]
    }
}
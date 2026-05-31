export default {
    title: "Learn With Rokon",
    description: "একটি কমপ্লিট প্রোগ্রামিং বুক | সহজ ভাষায় ওয়েব ডেভেলপমেন্ট ও প্রোগ্রামিং শিখুন ।",
    themeConfig: {
        nav: [
            { text: "হোম পেজ", link: "/" },
            { text: "PHP", link: "/module-1/introduction" },
            { text: "Laravel", link: "/laravel/introduction" },
            { text: "CSS", link: "/css/introduction" },
            { text: "JavaScript", link: "/coming-soon" },
            { text: "Python", link: "/coming-soon" },
            { text: "Node.js", link: "/coming-soon" },
        ],

        sidebar: {
            // PHP Sidebar shared across multiple directories
            ...Object.fromEntries(
                ['/module-', '/tools/', '/dsa/', '/extra/'].map(path => [
                    path,
                    [
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
                                { text: 'Traits', link: '/module-4/traits' },
                                { text: 'Magic Methods', link: '/module-4/magic-methods' },
                                { text: 'Dependency Injection & Composition', link: '/module-4/dependency-injection' },
                                { text: 'SOLID Principles', link: '/module-4/solid-principles' },
                                { text: 'Constants & Enums', link: '/module-4/constants-enums' },
                                { text: 'Database Design & Architecture', link: '/module-4/database-design' },
                            ]
                        },
                        {
                            text: 'মডিউল ৬: ক্লিন কোড ও ডিজাইন প্যাটার্ন',
                            collapsed: true,
                            items: [
                                { text: 'Clean Code Practice', link: '/module-6/clean-code' },
                                { text: 'Software Design Patterns', link: '/module-6/design-patterns' },
                            ]
                        },
                        {
                            text: 'মডিউল ৮: লারাভেল ফ্রেমওয়ার্ক',
                            collapsed: true,
                            items: [
                                { text: 'Intro to Laravel', link: '/module-8/laravel-intro' },
                                { text: 'Request-Response Lifecycle', link: '/module-8/request-lifecycle' },
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
                ])
            ),

            // Laravel Sidebar
            '/laravel/': [
                {
                    text: 'Laravel Fundamentals',
                    items: [
                        { text: 'Laravel Introduction', link: '/laravel/introduction' },
                        { text: 'Installation', link: '/laravel/installation' },
                        { text: 'Directory Structure', link: '/laravel/directory-structure' },
                    ]
                }
            ],

            // CSS Sidebar
            '/css/': [
                {
                    text: 'CSS Basic',
                    items: [
                        { text: 'CSS Introduction', link: '/css/introduction' },
                        { text: 'CSS Selectors', link: '/css/selectors' },
                        { text: 'CSS Colors', link: '/css/colors' },
                        { text: 'CSS Backgrounds', link: '/css/backgrounds' },
                        { text: 'CSS Borders', link: '/css/borders' },
                        { text: 'CSS Margin & Padding', link: '/css/margin-padding' },
                        { text: 'CSS Height & Width', link: '/css/height-width' },
                        { text: 'CSS Box Model', link: '/css/box-model' },
                    ]
                },
                {
                    text: 'CSS Text & Fonts',
                    items: [
                        { text: 'CSS Text Formatting', link: '/css/text-formatting' },
                        { text: 'CSS Fonts', link: '/css/fonts' },
                        { text: 'CSS Icons', link: '/css/icons' },
                        { text: 'CSS Links', link: '/css/links' },
                        { text: 'CSS Lists', link: '/css/lists' },
                        { text: 'CSS Tables', link: '/css/tables' },
                    ]
                },
                {
                    text: 'CSS Layout',
                    items: [
                        { text: 'CSS Display', link: '/css/display' },
                        { text: 'CSS Position', link: '/css/position' },
                        { text: 'CSS Z-index', link: '/css/z-index' },
                        { text: 'CSS Overflow', link: '/css/overflow' },
                        { text: 'CSS Float', link: '/css/float' },
                        { text: 'CSS Combinators', link: '/css/combinators' },
                        { text: 'CSS Pseudo Classes', link: '/css/pseudo-classes' },
                        { text: 'CSS Opacity', link: '/css/opacity' },
                    ]
                },
                {
                    text: 'CSS Advanced',
                    items: [
                        { text: 'CSS Navigation Bar', link: '/css/navbar' },
                        { text: 'CSS Dropdowns', link: '/css/dropdowns' },
                        { text: 'CSS Attribute Selectors', link: '/css/attribute-selectors' },
                        { text: 'CSS Forms', link: '/css/forms' },
                        { text: 'CSS Counters (Nth-child)', link: '/css/nth-child' },
                        { text: 'CSS Specificity', link: '/css/specificity' },
                        { text: 'CSS Math Functions', link: '/css/math-functions' },
                        { text: 'CSS Box Sizing', link: '/css/box-sizing' },
                    ]
                },
                {
                    text: 'CSS Effects',
                    items: [
                        { text: 'CSS Transitions', link: '/css/transitions' },
                        { text: 'CSS Transforms', link: '/css/transforms' },
                        { text: 'CSS Animations', link: '/css/animations' },
                    ]
                },
                {
                    text: 'CSS Modern Layout',
                    items: [
                        { text: 'CSS Variables', link: '/css/variables' },
                        { text: 'CSS Flexbox', link: '/css/flexbox' },
                        { text: 'CSS Grid', link: '/css/grid' },
                        { text: 'Responsive Web Design', link: '/css/responsive' },
                    ]
                },
                {
                    text: 'Projects',
                    items: [
                        { text: 'Prothom Alo Clone', link: '/css/project-prothom-alo' },
                        { text: 'Facebook Login Clone', link: '/css/project-facebook' },
                    ]
                }
            ]
        }
    }
}
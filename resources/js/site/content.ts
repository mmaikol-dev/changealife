import type { Programme, DonationPreset } from '@/types/site';

export const orgName = 'Change A Life Initiative';

export const orgTagline = 'Empowering individuals, Transforming Lives';

export const orgContact = {
    addressLines: ['Embe Creatives, Maji Mazuri Rd', 'Nairobi, Kenya'],
    phone: '+254 726 080 987',
    phoneHref: 'tel:+254726080987',
    email: 'info@changealife.co.ke',
    emailHref: 'mailto:info@changealife.co.ke',
};

export const heroStats = [
    { value: '150+', label: 'child-headed homes supported in 2020–2021' },
    { value: '3', label: 'women\u2019s prisons visited each quarter' },
    { value: '47', label: 'Kenyan counties in our reach' },
    { value: '6', label: 'years of direct community programmes' },
];

export const whoWeAre = {
    heading: 'We Change Lives',
    paragraphs: [
        'Change A Life runs direct development programmes and a Technical Assistance practice that helps NGOs and consortia strengthen programme delivery. We work with vulnerable communities and with the organisations serving them.',
        'We believe in the power of inclusive programmes that empower individuals, foster holistic wellness, and provide equitable opportunities to all, regardless of background or circumstance. Through our targeted initiatives, we aim to foster a society where every person has the chance to thrive in health, education, and personal development.',
    ],
};

export const programmes: Programme[] = [
    {
        key: 'empower-her-wellness',
        name: 'Empower Her Wellness',
        short: 'Support for children living in prison with incarcerated mothers, including quarterly women\u2019s-prison visits.',
        tagline:
            'Supporting children residing in prison with their incarcerated mothers.',
        description: [
            'We strive to visit one women\u2019s prison every quarter to provide support toward the welfare of the children residing there with their mothers.',
            'Each visit focuses on the children\u2019s early development and wellbeing so they can enjoy good early experiences despite their circumstances.',
        ],
        bullets: [
            'Upgrade of children holding rooms',
            'Early learning material',
            'Donation of clothing',
            'Provision of toys',
            'Creation of playgrounds',
        ],
        goal: 'To ensure children residing in prison with their mothers enjoy good early development like other children in the outside world, and activities that occupy their minds and form good memories of early life.',
        image: '/images/cali/empower-her-wellness.jpg',
        stories: [
            {
                title: 'Langata Women\u2019s Prison',
                caption:
                    'Visits and activities with children and their mothers at Langata Women\u2019s Prison.',
                image: '/images/cali/story-langata.jpg',
            },
            {
                title: 'Daycare Room Rehabilitation at Kitale Women\u2019s Prison',
                caption:
                    'Rehabilitation of the daycare holding room at Kitale Women\u2019s Prison.',
                image: '/images/cali/story-kitale.jpg',
            },
            {
                title: 'Shimo La Tewa Prison Visit',
                caption:
                    'A support visit to children residing at Shimo La Tewa Prison.',
                image: '/images/cali/story-shimo-la-tewa.jpg',
            },
        ],
    },
    {
        key: 'disability-inclusion',
        name: 'Disability Inclusion',
        short: 'Making schools and public spaces accessible for people who are abled differently.',
        tagline:
            'Transforming public spaces, especially school environments, to be disability friendly.',
        description: [
            'The Disability Inclusion project targets to transform public spaces — especially school environments — making them disability friendly for people who are abled differently.',
            'Our primary target is primary and secondary schools to ensure improved quality of life for students living with disabilities, as well as public community spaces.',
        ],
        bullets: [
            'Install ramps in schools and key public buildings',
            'Install assistive tools in bathrooms and washrooms',
            'Provide braille machines',
            'Provide wheelchairs and other assistive devices',
        ],
        goal: 'To reduce stigma and discrimination and increase acceptance of persons who are abled differently.',
        image: '/images/cali/disability-inclusion.jpg',
        stories: [
            {
                title: 'Eyeglasses for the Visually Impaired',
                caption:
                    'Optical check-ups and eyeglasses for visually-impaired children from humble backgrounds.',
                image: '/images/cali/disability-inclusion.jpg',
            },
            {
                title: 'From Stigma to Support',
                caption:
                    'A young boy once kept hidden by his family now attends regular physiotherapy at a local Level 3 hospital.',
                image: '/images/cali/who-we-are.jpg',
            },
        ],
    },
    {
        key: 'digital-literacy',
        name: 'Digital Literacy',
        short: 'Bridging the digital divide for youth, women, and young scholars.',
        tagline:
            'Equipping individuals with the essential skills to navigate the digital world.',
        description: [
            'The Digital Literacy programme aims to bridge the digital divide in underserved communities by equipping individuals with the essential skills to navigate the digital world.',
            'We focus on basic computer skills, online safety, and digital communication, empowering individuals to participate in the digital economy. By promoting digital inclusion, we help communities leverage technology for education, job opportunities, and social engagement.',
        ],
        bullets: [
            'Basic computer skills',
            'Online safety',
            'Digital communication',
            'Training for young scholars, youth, and women in marginalized communities',
        ],
        goal: 'To enable individuals to thrive in the modern digital landscape — for education, job opportunities, and social engagement.',
        image: '/images/cali/digital-literacy.jpg',
        stories: [
            {
                title: 'Computer Basics for Adults',
                caption:
                    'Hands-on introduction to computers — keyboard and mouse skills, file management, and everyday internet use — for adults in underserved settlements.',
                image: '/images/cali/digital-literacy.jpg',
            },
            {
                title: 'Online Safety Workshops',
                caption:
                    'Practical sessions on secure passwords, recognising scams and phishing, and protecting personal information online.',
                image: '/images/cali/who-we-are.jpg',
            },
            {
                title: 'Digital Skills for Young Scholars',
                caption:
                    'School holidays training that gives learners essential skills to study, research, and communicate safely in the digital world.',
                image: '/images/cali/hero.jpg',
            },
        ],
    },
    {
        key: 'special-projects',
        name: 'Special Projects',
        short: 'Rapid-response initiatives for urgent or emerging community needs.',
        tagline: 'Responding quickly to urgent and emerging community needs.',
        description: [
            'Special Projects is our rapid-response arm — stepping in when communities face urgent needs outside of our regular programmes.',
            'Each project is time-bound and targeted, drawn from real situations we encounter in the field.',
        ],
        bullets: [
            'Food and non-food items support',
            'Medical support',
            'School fees support',
            'Emergency relief for emerging needs',
        ],
        goal: 'To respond quickly and effectively to urgent and emerging community needs with dignity and accountability.',
        image: '/images/cali/special-projects.jpg',
        stories: [
            {
                title: 'Food And Non-food Items Support',
                caption:
                    'Supported 150 child-headed homes, orphans, and those living with disabilities with monthly care packages during the COVID-19 pandemic.',
                image: '/images/cali/how-you-can-help.jpg',
            },
            {
                title: 'Samuel\u2019s Medical Support',
                caption:
                    'Samuel Khaemba, a 14-year-old from Bungoma, had a mouth tumour treated successfully in Spain with support from Change A Life. We went on to support his school fees after he joined Class 4 in 2019.',
                image: '/images/cali/hero.jpg',
            },
            {
                title: 'Brandom\u2019s School Fees Support',
                caption:
                    'School fees support (KSh 23,500 / $182) for Brandom Salmon Simih, a 2019 Class Eight candidate who returned to school in third term to sit his exams.',
                image: '/images/cali/special-projects.jpg',
            },
        ],
    },
];

export const technicalAssistance = {
    name: 'Technical Assistance',
    tagline: 'Closing the gap between design and delivery.',
    intro: 'Most development programmes fail not in design but in delivery. Change A Life Initiative works in the implementation layer — helping NGOs and consortia close the gap between what a programme is supposed to do and what actually happens on the ground.',
    whatWeDo: [
        'We install simple execution systems that give programme leadership real-time visibility into what is happening across partners and sites, clear accountability structures so everyone knows who owns what, and escalation paths so problems surface early, when they are still cheap to fix.',
        'We work alongside M&E, not instead of it. M&E answers the question: \u201cAre we achieving our outcomes?\u201d We answer the question: \u201cAre we actually doing what we said we\u2019d do, week to week, so that outcomes become possible?\u201d',
    ],
    whoWeWorkWith:
        'Mid-sized Kenyan and East African NGOs, consortium leads, fund managers, and technically focused NGOs with regional implementation complexity.',
    services: [
        {
            name: 'Execution Diagnostic',
            description:
                'A structured 10–15 day assessment of where programme execution is breaking down. Produces a written report, a one-page weekly execution view, and a prioritized intervention list. Organisations own all outputs.',
        },
        {
            name: 'Execution Sprint',
            description:
                'A 4–8 week engagement that installs a weekly execution rhythm, partner accountability structure, and issue escalation system across your programme or consortium. Your team runs it independently after we leave.',
        },
        {
            name: 'Sustained Support',
            description:
                'Light-touch monthly coaching after a sprint to embed the system through scaling, partner transitions, and new programme phases.',
        },
    ],
    whyCali: [
        'We are not a typical consulting firm. We have run our own programmes since 2019 — in women\u2019s empowerment, wellness, digital literacy, and community development.',
        'We formalized technical assistance from solving execution problems in our own work. When we talk about implementation challenges, we have lived them ourselves. For consortium and donor purposes, we engage as a TA provider on standard terms.',
    ],
    image: '/images/cali/technical-assistance.jpg',
};

export const howYouCanHelp = [
    {
        title: 'Donate',
        description:
            'Give financial support, or donate in kind — supplies, equipment, and materials that serve our programmes directly.',
        image: '/images/cali/how-you-can-help.jpg',
    },
    {
        title: 'Become a sustaining donor',
        description:
            'A recurring, predictable gift that lets us plan support for families and schools months ahead, not just week to week.',
        image: '/images/cali/digital-literacy.jpg',
    },
    {
        title: 'Partner with us',
        description:
            'Work with us on a programme, a special project, or a technical assistance engagement that fits your mission.',
        image: '/images/cali/disability-inclusion.jpg',
    },
    {
        title: 'Direct support',
        description:
            'Choose a verified case and fund someone\u2019s need directly — anonymously and transparently.',
        image: '/images/cali/empower-her-wellness.jpg',
    },
];

export const donationPresets: DonationPreset[] = [
    50, 100, 500, 1000, 2000, 5000, 10000,
].map((amount) => ({
    amount,
    label: `KES ${amount.toLocaleString()}`,
}));

export const donationRecurringOptions = [
    'None',
    'Daily',
    'Weekly',
    'Monthly',
    'Biannually',
    'Annually',
];

export const caseFieldOptions = {
    genders: ['Female', 'Male', 'Prefer not to say'],
    relationships: [
        'Self',
        'Family',
        'Friend',
        'Teacher',
        'Community leader',
        'Other',
    ],
    supportTypes: [
        { value: 'one_time', label: 'One-time support' },
        { value: 'ongoing', label: 'Ongoing support' },
    ],
};

export const blogCategories = [
    'Community Impact',
    'Digital Literacy',
    'Disability Inclusion',
    'Empower Her Wellness',
];

export const impactWords = [
    'Empower Her Wellness',
    'Disability Inclusion',
    'Digital Literacy',
    'Special Projects',
    'Direct Support',
    'Technical Assistance',
    'Women’s Empowerment',
    'Community Development',
];

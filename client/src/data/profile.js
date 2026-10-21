/**
 * All portfolio content lives here.
 * Update this file to change text on the site — no component changes needed.
 */

export const person = {
  firstName: 'Olti',
  fullName: 'Olti Kryeziu',
  initials: 'OK',
  role: 'AdTech & Digital Media Specialist',
  location: 'Prishtina, Kosovo',
  status: 'Open to new opportunities',
  email: 'oltikryeziu2005@gmail.com',
  phone: '+383 45 953 433',
  phoneHref: 'tel:+38345953433',
  linkedin: 'https://www.linkedin.com/in/olti-kryeziu-39084a165/',
  cvFileName: 'Olti-Kryeziu-CV.pdf',
};

export const hero = {
  greeting: "Hi, I'm Olti.",
  headline: 'I run ad campaigns in 20+ countries, and I can build the pages they land on.',
  intro:
    'I plan, launch and optimize programmatic, Meta and affiliate campaigns for a living. Before that I trained as a full-stack developer, so I’m comfortable on both sides of the table: talking KPIs with the media team and talking APIs with the developers.',
  monogramNote: 'my initials literally say OK',
};

export const about = {
  paragraphs: [
    'My day-to-day is programmatic advertising: CTV, display, DOOH, native and audio campaigns across Europe, North America and Latin America. I own them end to end, from the media plan and DSP setup to pacing, troubleshooting and the post-campaign analysis that tells us what to do next time.',
    'The part I enjoy most is where marketing turns technical. Setting up Dynamic Creative Optimization, building custom Google Tag Manager logic, or wiring a Looker Studio dashboard that finally makes the numbers make sense. That’s also why I keep writing code: this site is my own MERN build.',
  ],
  facts: [
    { label: 'Based in', value: 'Prishtina, Kosovo' },
    { label: 'Studying', value: 'Computer Science & Engineering, UBT' },
    { label: 'Speaks', value: 'Albanian, English, some German' },
    { label: 'Before ad tech', value: 'Full-stack intern and IT technician' },
  ],
};

export const experience = [
  {
    role: 'AdTech & Digital Media Specialist',
    company: 'Tangoo',
    period: 'Nov 2025 – Present',
    highlights: [
      'Run multi-market programmatic campaigns in 20+ countries across Europe, North America and Latin America, owning strategy, activation, pacing, forecasting and optimization.',
      'Plan and buy CTV, display, DOOH, native and audio through DSPs such as DV360, Amazon Ads, Teads and Hivestack, and SSPs including Index Exchange and Google AdX.',
      'Own Dynamic Creative Optimization end to end with Google Studio, CM360 and dynamic feeds, serving tailored ad variants to each audience segment.',
      'Build Looker Studio and GA4 dashboards and cross-channel attribution frameworks; run post-campaign analysis on viewability, completion rate, CTR and ROAS.',
      'Manage a portfolio of 100+ affiliate clients across networks like Awin, Rakuten, Impact and CJ, working with their technical teams to fix tracking discrepancies.',
      'Implement Google Tag Manager with custom functionality and keep campaigns compliant with GDPR and CCPA.',
    ],
    tools: ['DV360', 'CM360', 'Amazon Ads', 'Meta Ads', 'GA4', 'GTM', 'Looker Studio'],
  },
  {
    role: 'IT Technician',
    company: 'Gjirafa',
    period: 'May 2025 – Nov 2025',
    highlights: [
      'Provided first-line support for hardware, software and network issues across the company.',
      'Built the technical setup, piece by piece, for an esports tournament held in Kosovo in 2025.',
      'Set up workstations, accounts, email and access permissions for new and existing staff.',
      'Documented solutions to recurring tickets so the same fixes took less time the next time.',
    ],
    tools: ['Hardware', 'Networking', 'User management'],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'SHARP Group',
    period: 'Dec 2024 – Mar 2025',
    highlights: [
      'Built and maintained features on both the front end and back end of web applications using the MERN stack.',
      'Created and integrated REST APIs and worked with MongoDB to store and retrieve application data.',
      'Built responsive interfaces, debugged and tested features before release.',
      'Worked with senior developers through Git and code reviews; finished with a reference letter.',
    ],
    tools: ['MongoDB', 'Express', 'React', 'Node.js', 'Git'],
  },
];

export const projects = [
  {
    name: 'This portfolio',
    // Add your GitHub repo link here once you push the code, e.g. https://github.com/<username>/portfolio
    url: '',
    linkLabel: 'View the code on GitHub',
    summary:
      'Designed and built with the MERN stack. A React front end talks to an Express and MongoDB API that serves my CV and counts visits and downloads, the same way I’d measure a campaign.',
    tags: ['React', 'Express', 'MongoDB', 'Node.js'],
  },
];

export const skillGroups = [
  {
    title: 'Programmatic & media buying',
    skills: [
      'DV360',
      'Amazon Ads',
      'Teads',
      'Hivestack',
      'CM360',
      'Dynamic Creative Optimization',
      'Meta Ads',
      'Index Exchange',
      'Google AdX',
      'CTV, DOOH, Native, Audio',
    ],
  },
  {
    title: 'Measurement & analytics',
    skills: ['GA4', 'Google Tag Manager', 'Looker Studio', 'A/B testing', 'Attribution', 'SEO'],
  },
  {
    title: 'Affiliate networks',
    skills: [
      'Awin',
      'Tradedoubler',
      'Rakuten',
      'Webgains',
      'Impact',
      'PartnerStack',
      'Partnerize',
      'CJ',
      'Daisycon',
      'Belboon',
    ],
  },
  {
    title: 'Web development',
    skills: [
      'JavaScript',
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'HTML5',
      'CSS / SASS',
      'Git',
      'WordPress',
      'Webflow',
    ],
  },
];

export const education = [
  {
    title: 'Computer Science and Engineering',
    detail: "Bachelor's degree, UBT",
    period: 'Oct 2023 – Present',
  },
  {
    title: 'Natural Sciences',
    detail: 'High school diploma, Xhevdet Doda',
    period: 'Sep 2020 – Jun 2023',
  },
];

export const certificates = [
  {
    title: 'Marketing Essentials',
    detail: 'The Trade Desk Edge Academy',
    period: 'Dec 2025 – Jan 2026',
  },
  {
    title: 'Full-Stack Web Development Training',
    detail: 'ROI Academy',
    period: 'Sep 2024 – Mar 2025',
  },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

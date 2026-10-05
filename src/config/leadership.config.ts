export type LeadershipMember = {
  id: string;
  name: string;
  role: string;
  group: 'president' | 'directors' | 'secretaries';
  additionalRoles?: string[];
  bio?: string;
  image?: string;
  portfolio?: string;
  linkedin?: string;
  accent: 'gekko' | 'violet' | 'cyan' | 'pink' | 'amber' | 'rose';
  tags: string[];
};

export const leadership: LeadershipMember[] = [
  {
    id: 'president',
    name: 'Sheikh Mohammad Rajking',
    role: 'President',
    group: 'president',
    additionalRoles: ['Founding Developer'],
    bio: 'Leads the Team Gekko community — sets vision, organises initiatives, and keeps the team moving forward together.',
    image: '/team/president-sm-rajking.png',
    portfolio: 'https://smrajking.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/rajking39/',
    accent: 'gekko',
    tags: ['COMMUNITY LEAD', 'STRATEGY', 'DEVELOPMENT'],
  },
  {
    id: 'vice-president',
    name: 'Uday Barua',
    role: 'Vice President',
    group: 'directors',
    additionalRoles: ['Streamer'],
    bio: 'Partners with the President to run day-to-day operations, support member success, and bridge the work across teams.',
    image: '/team/vp-uday-barua.png',
    portfolio: 'https://uday-barua-portfolio.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/uday-barua-b608a12a7/',
    accent: 'violet',
    tags: ['OPERATIONS', 'MEMBER SUCCESS', 'STREAMING'],
  },
  {
    id: 'general-secretary',
    name: 'A.M. Asik Ifthaker Hamim',
    role: 'General Secretary',
    group: 'directors',
    additionalRoles: ['Founding Developer'],
    bio: 'AI engineer and researcher. Runs the platform that keeps the squad connected and helps members compete at their best.',
    image: '/team/secretary-asik-hamim.png',
    portfolio: 'https://asik-ifthaker-hamim.netlify.app/',
    linkedin: 'https://www.linkedin.com/in/a-m-asik-ifthaker-hamim-154434328/',
    accent: 'cyan',
    tags: ['AI ENGINEER', 'RESEARCH', 'DEVELOPMENT'],
  },
  {
    id: 'discipline-secretary',
    name: 'Fuad Ahmed',
    role: 'Discipline Secretary',
    group: 'directors',
    additionalRoles: ['Streamer & Election Commissioner of Gekko'],
    bio: 'Maintains discipline and fair play within the community, while engaging members through streaming and organizing elections.',
    image: 'https://avatars.githubusercontent.com/u/67238058?v=4',
    portfolio: 'https://itsfahamed.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/f4hamed/',
    accent: 'amber',
    tags: ['DISCIPLINE', 'STREAMING', 'ELECTIONS'],
  },
  {
    id: 'joint-general-secretary',
    name: 'Adri Shikhar Barua',
    role: 'Joint General Secretary',
    group: 'secretaries',
    bio: 'Supports overall coordination, communication, and administrative tasks across the community.',
    image: 'https://avatars.githubusercontent.com/u/98202968?v=4',
    portfolio: 'https://adrishikharbarua.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/adri-shikhar-barua/',
    accent: 'cyan',
    tags: ['COORDINATION', 'OPERATIONS'],
  },
  {
    id: 'organizing-secretary',
    name: 'Abdul Mohaimin',
    role: 'Organizing Secretary',
    group: 'secretaries',
    bio: 'Plans and organizes community events, tournaments and member engagement activities.',
    image: '/team/Abdul Mohaimin.jpg',
    linkedin: 'https://www.linkedin.com/in/abdul-mohaimin-95543a353/',
    accent: 'violet',
    tags: ['EVENTS', 'ORGANIZATION'],
  },
  {
    id: 'office-secretary',
    name: 'Shafin Shahariar',
    role: 'Office Secretary',
    group: 'secretaries',
    bio: 'Handles documentation, communication and day-to-day office administration.',
    image: '/team/Shafin shahariar.png',
    portfolio: 'https://shafin-shahriar-portfolio.vercel.app/',
    linkedin: 'https://www.linkedin.com/in/shafin-shahriar/',
    accent: 'gekko',
    tags: ['ADMINISTRATION', 'DOCUMENTATION'],
  },
  {
    id: 'finance-secretary',
    name: 'Didarul Alam Swapnil',
    role: 'Finance Secretary',
    group: 'secretaries',
    bio: 'Manages finances, budgeting and ensures transparent financial operations for the community.',
    image: 'https://avatars.githubusercontent.com/u/109724358?v=4',
    portfolio: 'https://lynx-swapnil.github.io/Portfolio/',
    linkedin: 'https://www.linkedin.com/in/didarul-alam-swapnil/',
    accent: 'rose',
    tags: ['FINANCE', 'MANAGEMENT'],
  },
];

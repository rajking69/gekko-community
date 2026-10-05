export type FaqItem = {
  q: string;
  a: string;
};

export const faq: FaqItem[] = [
  {
    q: 'What is Team Gekko?',
    a: 'A gaming community at heart, growing into more. We run squads in Valorant, PUBG, CS2, and FIFA, host tournaments, share clips and learning, and hang out together — online and IRL.',
  },
  {
    q: 'Is it free to join?',
    a: 'Yes. Joining the community and attending events is free. Some tournaments may have a small entry fee to cover prizes or hosting — those are clearly marked.',
  },
  {
    q: 'Do I need to be hardcore to join?',
    a: 'No. We have casual players, sweaty rankeds, FIFA fans, content creators, and total beginners. Pick a game, find a squad, queue up. The community grows by being welcoming, not by gatekeeping.',
  },
  {
    q: 'How does the role system work?',
    a: 'Everyone starts as a Member. Verified members get verified-only channels. Active players become Regulars. Moderators help run the community. Admins and the owner have additional permissions for running the platform.',
  },
  {
    q: 'Which games are you most active in?',
    a: 'Valorant, CS2, PUBG, and EA SPORTS FC are the daily rotation. Apex Legends and Rocket League run on weekend nights. New games rotate in when enough members show interest — propose one in Discord.',
  },
  {
    q: 'How do I host an event?',
    a: 'Once you have Regular status, you can propose an event in the Discord. Moderators help you schedule, promote, and run it. The platform handles registration, reminders, and feedback for you.',
  },
  {
    q: 'Is it just about gaming?',
    a: 'Games are the front door. Past that, we run watch parties, meetups, workshops, and creator nights. The community is built to grow your friendships, your skills, and your network — gaming is just where it starts.',
  },
  {
    q: 'Where is my data stored?',
    a: 'Profile data lives in Postgres (Neon). Uploaded media (avatars, gallery) lives in Cloudinary. Emails go through Resend. You can request a full export or deletion of your account from Settings → Danger at any time.',
  },
  {
    q: 'How do I contact support?',
    a: 'Open a ticket from the Support page, or DM a moderator in Discord. For urgent issues (account compromise, abuse), use the Contact form — those tickets are flagged as urgent automatically.',
  },
];

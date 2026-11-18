/**
 * Who Justin is, for the home page and /about. Imported from his Webflow site
 * (justinbarton.webflow.io) on 2026-11-17, with Toast added. Testimonials are
 * as written, first names and titles only, and public, as they were on
 * Webflow.
 */

export const about = {
  name: 'Justin Barton',
  role: 'Associate Director, User Design',
  company: 'Toast',
  headline: 'I empower design teams to deliver product impact.',
  intro:
    'I create the conditions for designers to do their best work, by leading with clarity, creativity and focused energy. My teams craft product experiences that drive user value and business outcomes.',
  bio: 'With over 20 years of experience driving design innovation, I’ve worked in environments where ideas and impact thrive.',
  location: 'Sturbridge, Massachusetts',
  /**
   * Justin's portrait, from ~/Documents/Personal/photos/profile-photo.jpg.
   * It replaced the older selfie on his Webflow home page.
   */
  photo: { src: '/people/justin.jpg', w: 1254, h: 1254, alt: 'Justin Barton' },
  /**
   * The life outside work, from the Work-life balance section of his Webflow
   * site. No names for the kids.
   */
  home: {
    heading: 'My greatest inspiration comes from home.',
    text: 'My family and the small, meaningful moments that make life truly fulfilling.',
    photos: [
      {
        src: '/people/family/home-sunset.jpg',
        w: 756,
        h: 1008,
        alt: 'Justin crouching on a gravel driveway with his son and their spaniel, under an orange sunset, with the house behind them',
        caption: 'Home, on a summer evening.',
      },
      {
        src: '/people/family/truck-selfie.jpg',
        w: 878,
        h: 1021,
        alt: 'A car selfie of Justin, his wife and their son, all smiling',
        caption: 'On the road.',
      },
      {
        src: '/people/family/baseball.jpg',
        w: 998,
        h: 998,
        alt: 'Two of the kids laughing together at a baseball field on a sunny evening',
        caption: 'At the ball field.',
      },
      {
        src: '/people/family/wells-beach.jpg',
        w: 998,
        h: 998,
        alt: 'Justin’s wife and two of the kids, arm in arm and barefoot on a beach at golden hour',
        caption: 'Wells Beach, Maine.',
      },
    ],
  },
  linkedin: 'https://www.linkedin.com/in/justinbarton/',

  /** Newest first. `years` is as written. */
  experience: [
    // Start date not on record yet. Justin to supply.
    { company: 'Toast', title: 'Associate Director, User Design', years: 'Now' },
    { company: 'Hewlett Packard Enterprise', title: 'Head of Product Design', years: '2017 to 2025' },
    { company: 'HPE SimpliVity', title: 'Lead UX Designer and Front-End Developer', years: '2015 to 2017' },
    { company: 'Staples', title: 'Lead Visual UX Designer', years: '2014 to 2015' },
    { company: 'Nowspeed', title: 'Creative Director', years: '2007 to 2014' },
    { company: 'Snowbound Software (Accusoft)', title: 'Creative Manager', years: '2003 to 2007' },
  ],

  education: [
    { school: 'NVIDIA', program: 'AI Infrastructure and Operations', year: '2024' },
    { school: 'Duke University', program: 'Human Factors in AI', year: '2024' },
    { school: 'Nielsen Norman Group', program: 'NN/g UX Certified', year: '2022' },
    { school: 'LUMA Institute', program: 'Instructor of Human-Centered Design', year: '2021' },
    { school: 'Fairfield University', program: 'BA, English and Studio Art', year: '2000' },
  ],

  testimonials: [
    {
      text: 'Justin has a unique ability to bring people together, encouraging open dialogue and fostering a sense of community in our big team. He gives everyone the space to grow and shine.',
      who: 'Marina',
      title: 'Sr. Product Designer',
    },
    {
      text: "He's deeply focused on empowering our team, building our individual careers, fostering inclusivity, encouraging work-life balance, and creating a culture of mutual respect and honest communication.",
      who: 'Jeff',
      title: 'Principal Product Designer',
    },
    {
      text: 'I greatly appreciate your product / operations expertise, innovation enablement, transparency/ knowledge sharing, and peaceful demeanor, all of these make our workplace a haven of learning and positivity.',
      who: 'Betty',
      title: 'Product Designer',
    },
    {
      text: 'Working under your leadership has helped me explore my strengths and discover new areas of expertise. Your feedback and insights have been invaluable, and I feel fortunate to be part of such a collaborative team.',
      who: 'Enas',
      title: 'Product Designer',
    },
    {
      text: 'I appreciate the clear, open communication we have, and the way in which you continually seek out opportunities for me and my team to collaborate with you and your team.',
      who: 'Katy',
      title: 'Head of UX Research',
    },
    {
      text: 'Huge thanks for helping me to push boundaries and strive for a better user experience in the Copilot project. Your insights were invaluable in crafting a compelling vision for my proposal. Your support meant a lot.',
      who: 'Miriam',
      title: 'Sr. Product Designer',
    },
    {
      text: 'Thank you for pushing for better by transforming our design process from a gated waterfall one into a Lean UX process. All done in a very short period of time!',
      who: 'Alyssa',
      title: 'Sr. Director of User Experience',
    },
    {
      text: 'You have impressed me countless times with how you can lead such a large team while still considering each team member with a supportive attitude. This propels the entire team forward and reassures us that you have our backs.',
      who: 'George',
      title: 'Product Designer',
    },
  ],
}

/** The chapters of the career, newest first. */
export const chapters = [
  { id: 'toast', name: 'Toast', span: 'Now', blurb: 'Point of sale design, platform foundations and the POS design org.' },
  { id: 'hpe', name: 'Hewlett Packard Enterprise', span: '2015 to 2025', blurb: 'Head of Product Design for the GreenLake platform, from SimpliVity on.' },
  { id: 'earlier', name: 'Earlier', span: '2003 to 2015', blurb: 'Staples, Nowspeed and Snowbound Software.' },
] as const

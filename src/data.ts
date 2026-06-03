import { Service, Project, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Beautiful Websites',
    tagline: 'Turn Online Visitors into Regular Customers',
    description: 'We build gorgeous, super-fast websites for local businesses like cozy cafes, builders, and tutoring centers. We make it simple for neighbors and new clients to find your opening hours, read your delicious menu, look at your family home projects, or book your courses with zero tech stress.',
    iconName: 'Globe',
    benefits: [
      'Stunning custom designs that make you stand out as the top local choice',
      'Loads instantly on any phone, even on slow public or mobile networks',
      'Clear call buttons that make booking, ordering, or calling effortless',
      'Perfect display on iPhones, Androids, iPads, and office computers'
    ],
    deliverables: [
      'A beautiful homepage and clear service pages',
      'Interactive tools, simple menus, or custom price estimators',
      'Google Maps, direct contact forms, and local neighborhood SEO setup',
      'An incredibly easy editor to update your items, prices, or photos in seconds'
    ],
    businessGoalAlign: 'Makes your business look reliable and polished, helps new local clients find you on Google, and gets your phone ringing.',
    levels: [
      {
        label: 'Local Business Essentials',
        description: 'Perfect for growing cafes, shops, or local contractors wanting a highly professional online presence.',
        multiplier: 1.0,
        deliveryTime: '2-3 weeks',
        metricBoost: 'Est. +45% increase in customer visits'
      },
      {
        label: 'Neighborhood Brand Leader',
        description: 'Full custom design with advanced client tools, reservation guides, interactive menu listings, and high-impact galleries.',
        multiplier: 1.5,
        deliveryTime: '4-5 weeks',
        metricBoost: 'Est. 2x more online phone calls & inquiries'
      }
    ]
  },
  {
    id: 'web-apps',
    title: 'Smart Scheduling & Portals',
    tagline: 'Manage Your Crew, Students, or Clients Online',
    description: 'Throw away the messy paper sheets, lost emails, and chaotic text chains. We build helpful online portals and scheduling boards. Perfect for schools share schedules with parents, building teams logging daily worksites, or centers booking appointments.',
    iconName: 'Cpu',
    benefits: [
      'Saves hours of phone calls by tracking bookings and jobs automatically',
      'Private client or student portals where customers can securely sign in',
      'Simple, clear dashboards that anyone on your staff can learn in 5 minutes',
      'Keep calendars, job sheets, and documents in one tidy online home'
    ],
    deliverables: [
      'Private student, client, or team logging portals',
      'Visual class schedules or crew assignment boards',
      'Automated client invoice builders and simple PDF generators',
      'Seamless sync with tools you already use like Google Calendar'
    ],
    businessGoalAlign: 'Clears out daily paperwork, saves your staff dozens of hours every week, and keeps your clients incredibly happy.',
    levels: [
      {
        label: 'Paperwork Automator',
        description: 'Essential portal setup to handle secure bookings, simple calendars, and automatic email confirmations.',
        multiplier: 1.0,
        deliveryTime: '4-5 weeks',
        metricBoost: 'Saves around 40-60 administrative hours monthly'
      },
      {
        label: 'All-In-One Company Hub',
        description: 'Multi-role hub tracking tools, inventories, customer messaging, payments, and automatic text alerts.',
        multiplier: 1.8,
        deliveryTime: '8-10 weeks',
        metricBoost: 'Saves 150+ hours monthly with zero manual scheduling overlap'
      }
    ]
  },
  {
    id: 'mobile-apps',
    title: 'Friendly Mobile Apps',
    tagline: 'Stay Just One Tap Away on Customers Phones',
    description: 'Keep your customers coming back with a personalized mobile app for iOS and Android. Excellent for local bakery pre-orders, boutique loyalty stamps, fitness class registrations, or direct teacher-parent mobile chat.',
    iconName: 'Smartphone',
    benefits: [
      'Your business icon is visible right on your customer\'s smartphone home screen',
      'Send direct push notifications about daily specials, discounts, or alerts',
      'Super-friendly buttons and fast tabs designed for busy clients on the go',
      'Customers can view catalogs or menus even when they don\'t have internet'
    ],
    deliverables: [
      'Easy setups for Apple App Store and Google Play Store',
      'Mobile loyalty cards, point systems, or digital discount stamp cards',
      'One-click phone calls and integrated map navigation directions',
      'An application that is easy for parents, kids, and grandparents to use'
    ],
    businessGoalAlign: 'Builds deep neighborhood loyalty, reminds customers to order again, and makes repeat bookings incredibly easy.',
    levels: [
      {
        label: 'Neighborhood Loyalty App',
        description: 'Clean mobile framework with rewards, local menus, announcements, and direct chat links.',
        multiplier: 1.0,
        deliveryTime: '5-6 weeks',
        metricBoost: 'Est. +60% more repeat bookings'
      },
      {
        label: 'Full Native Feature Suite',
        description: 'Advanced app with simple mobile registers, active delivery drivers tracking, secure parent files, and family group accounts.',
        multiplier: 1.7,
        deliveryTime: '10-12 weeks',
        metricBoost: 'Est. +180% repeat customer engagement'
      }
    ]
  },
  {
    id: 'ecommerce',
    title: 'Online Shops & Orders',
    tagline: 'Sell Your Goods or Pre-Orders with Ease',
    description: 'Forget clunky, slow shop templates. We build fast, simple checkout systems for selling physical crafts, bread pre-orders, school uniforms, or workshop entry spots. Clean checkout pages make buying on a mobile phone a breeze.',
    iconName: 'ShoppingBag',
    benefits: [
      'Smooth checkout designed to prevent buyers from leaving mid-way',
      'Instant local payments via Apple Pay, Google Pay, credit cards, or cash on pickup',
      'Beautiful, large photo galleries that showcase your physical products beautifully',
      'Automatic stock calculations so you never accidentally double-sell an item'
    ],
    deliverables: [
      'A beautiful, lightning-fast online shop page',
      'No-hassle customer carts and automatic email receipt builders',
      'Custom promo coupon codes, gift card logs, and bulk-buy calculators',
      'Bridges securely to your favorite card reader (Stripe, Square, or PayPal)'
    ],
    businessGoalAlign: 'Boosts your online sales, cuts cart abandonment in half, and makes fulfilling orders simple and stress-free.',
    levels: [
      {
        label: 'Boutique Shop Starter',
        description: 'Perfect showcase shop for cafes, local nurseries, or authors selling specialized products.',
        multiplier: 1.0,
        deliveryTime: '3-4 weeks',
        metricBoost: 'Est. +35% increase in online revenue'
      },
      {
        label: 'High-Volume Order Store',
        description: 'Includes recurring box subscriptions (like coffee/biscuit of the month), and wholesale pricing calculators.',
        multiplier: 1.6,
        deliveryTime: '6-8 weeks',
        metricBoost: 'Est. +90% boost in recurring monthly orders'
      }
    ]
  },
  {
    id: 'business-systems',
    title: 'All-In-One Dashboards',
    tagline: 'Connect Your Spreadsheets, Calendars, & Staff',
    description: 'Stop digging through dozens of paper notes, separate calendars, and fragile Excel sheets. We gather your entire business in one friendly screen. Track your construction site gear, bakery supplies, or daycare enrollments all at once.',
    iconName: 'Database',
    benefits: [
      'Paves the way for zero-stress paperwork and clear daily organization',
      'Ensures classroom teachers or field crews always know their schedules',
      'Sends quick automatic alerts to your phone when supplies run low',
      'Provides a crystal-clear summary of your weekly sales and employee hours'
    ],
    deliverables: [
      'Custom visual schedule board for physical crews or classrooms',
      'Easy-to-read dashboard showing monthly sales and customer signups',
      'Simple inventory tracker with mobile low-stock text alerts',
      'Smart bridges that connect your emails, calendars, and tables automatically'
    ],
    businessGoalAlign: 'Scales your business capacity with zero human errors, keeps everyone on the same page, and eases management stress.',
    levels: [
      {
        label: 'Smart System Sync',
        description: 'Connects your core sheets, booking forms, and email contacts together in one simple, clear dashboard.',
        multiplier: 1.0,
        deliveryTime: '3-4 weeks',
        metricBoost: 'Saves hours of copy-pasting data every single week'
      },
      {
        label: 'Total Family Business Hub',
        description: 'Our most comprehensive tool: coordinates staff, worksite locations, supply inventories, customer billing, and daily reports.',
        multiplier: 2.0,
        deliveryTime: '8-10 weeks',
        metricBoost: 'Enables your business to handle 30% more clients with ease'
      }
    ]
  }
];

export const PORTFOLIO: Project[] = [
  {
    id: 'residence-collective',
    title: 'Interactive Builders Portfolio',
    category: 'Beautiful Websites',
    industry: 'Local Family Home Builder',
    clientName: 'Oakwood Home Builders',
    tagline: 'How an interactive floor plan visualizer helped parents customize and choose home models with absolute confidence.',
    metrics: {
      value: '+224%',
      label: 'More Direct Inquiry Calls'
    },
    duration: '4 Weeks',
    challenge: 'A family-owned building company was struggling to help home buyers visualize layout options and materials using plain paper blueprints and static text PDFs.',
    solution: 'We crafted a simple, gorgeous web showcase with an interactive model selector. Families can tap floor plan choices, alter bedroom counts, and calculate price ranges in real-time.',
    outcome: 'Families loved the hands-on layout tool. Phone calls for consultations jumped dramatically, and clients arrived at meetings with their exact dream layout printed directly from the site.',
    servicesProvided: ['Custom Website Layout', 'Interactive Floor Plan Customizer', 'Local Search Ranking Setup', 'Easy Contact Booking System'],
    technologies: ['Fast Responsive UI', 'SVG Blueprint Renderer', 'Inquiry Storage', 'Touch-Friendly Navigation'],
    imageTheme: 'cyan'
  },
  {
    id: 'medica-portal',
    title: 'Preschool enrollment & scheduling portal',
    category: 'Smart Scheduling & Portals',
    industry: 'Community Daycare & Preschools',
    clientName: 'Little Sprouts Early Learning',
    tagline: 'Moving family sign-ups off paper sheets. Removing manual dispatch errors while expanding therapist and classroom updates.',
    metrics: {
      value: '290 Hrs',
      label: 'Daycare Office Hours Saved / Mo'
    },
    duration: '7 Weeks',
    challenge: 'Little Sprouts managed child logs, parent notifications, teacher assignments, and meal updates entirely across paper cards and chaotic group texts.',
    solution: 'We engineered an elegant, warm parent-teacher portal. Parents can easily review class calendars, receive daily announcements, update emergency emergency details, and sign field-trip permissions.',
    outcome: 'Office staff saved 290 hours of manual phone tags and filing a month, school administrators have instantaneous headcounts, and moms/dads feel incredibly connected to their children\'s daily learning games.',
    servicesProvided: ['Parent Portal System', 'Classroom Scheduler Grid', 'Secure Children database Blocks', 'Mobile Text Notifications'],
    technologies: ['Simple Role Access', 'Calendar Management', 'PDF Document Maker', 'Encrypted Student Storage'],
    imageTheme: 'purple'
  },
  {
    id: 'vital-supply',
    title: 'Smart Pastry Pre-Ordering System',
    category: 'Online Shops & Orders',
    industry: 'Neighborhood Bakery & Cafe',
    clientName: 'The Daily Roast Bakery',
    tagline: 'Replacing heavy online forms with a ultra-fast pre-order page to boost mobile sales and eliminate morning queues.',
    metrics: {
      value: '+52%',
      label: 'More Bread Pre-Orders'
    },
    duration: '5 Weeks',
    challenge: 'A popular local artisan bakery was selling out of croissants by 8:30 AM, but morning lines were too long for busy commuters, and their old web page was slow and tricky on phone screens.',
    solution: 'We built an incredibly fast mobile ordering page. Commuters can select sourdough loaves, tap "Apple Pay", and secure their pastry basket in 2 easy seconds while sitting on the bus.',
    outcome: 'Pastry pre-orders jumped immediately, wasting zero food. Regular clients grab-and-go from a dedicated counter, and bakery staff know exactly how much flour to prep each night.',
    servicesProvided: ['Speedy Mobile Shop', 'One-Click Apple & Google Pay', 'Friendly Cart Drawers', 'Automatic Bakery Invoicing'],
    technologies: ['Bespoke Cart Engine', 'Fast Card Readers Integration', 'Live Stock Counter', 'Local Receipt Printer link'],
    imageTheme: 'amber'
  },
  {
    id: 'build-track',
    title: 'Rugged Crew & Tool Tracker',
    category: 'All-In-One Dashboards',
    industry: 'Local Construction & Contracting',
    clientName: 'Solid Rock Construction Co.',
    tagline: 'Bringing heavy equipment logistics, crew assignments, and site reports into one clear screen.',
    metrics: {
      value: '+18%',
      label: 'More Equipment Use Time'
    },
    duration: '8 Weeks',
    challenge: 'Solid Rock had 10 active neighborhood building projects but coordinators were constantly calling foremen to find where high-cost tools, trucks, and generators were located.',
    solution: 'We build a highly visual site tracker. Foremen on sites can mark equipment as "In Use" or "Ready for Pickup" in three quick taps on their phone screens, right from their pockets.',
    outcome: 'Coordinators now enjoy instant equipment maps. No more lost diggers or schedule clashes, field crew phone tag dropped by 90%, and project delivery schedules scaled up easily.',
    servicesProvided: ['Rugged Field Dashboard', 'Machinery & Crew Calendars', 'Mobile-Friendly Logging Forms', 'Simple Equipment Health Alerts'],
    technologies: ['Visual Job Assign boards', 'Clean Field Database', 'Quick Text Alert Webhooks', 'Simple Excel Downloaders'],
    imageTheme: 'emerald'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    author: 'Elena Rostova',
    role: 'Principal School Director',
    company: 'Little Sprouts Early Learning',
    text: 'Byte Sutra didn\'t confuse us with tech talk. They asked about our classrooms, how parents sign up, and how we notify families. The web portal they made replaced piles of paper forms, saving us days of admin work and giving us much more quality time with our students.',
    rating: 5,
    industry: 'Early Childhood Education'
  },
  {
    id: 'test-2',
    author: 'Marcus Vance',
    role: 'Bakery Founder & Master Baker',
    company: 'The Daily Roast Bakery',
    text: 'The pastry pre-order system they made for us changed how we run our mornings. Instead of guessing how many sourdough loaves to bake, we have secure pre-orders from our neighborhood regulars. Our sales jumped and our customers love skipping the queue!',
    rating: 5,
    industry: 'Local Hospitality'
  },
  {
    id: 'test-3',
    author: 'David Chen',
    role: 'Managing Partner',
    company: 'Solid Rock Construction Co.',
    text: 'Most web developers just install a cheap template and walk away. Byte Sutra listened to how our crews work in the field, built an amazingly easy home showcase, and made our pricing estimator dead simple. We get solid, hot phone calls from clients every week.',
    rating: 5,
    industry: 'Residential Building'
  }
];

export const FAQS = [
  {
    question: 'Do I need to be a tech genius to work with you?',
    answer: 'Not at all! We speak in plain, friendly English, never confusing code. We understand that you are incredibly busy running your business, school, or worksite. Our job is to handle all the complicated stuff—servers, domains, security, and speeds—so you can focus entirely on serving your local clients with total peace of mind.'
  },
  {
    question: 'Can we easily update text, prices, or photos ourselves after launch?',
    answer: 'Absolutely! We build extremely easy, custom editor pages for you. If a cafe needs to change a soup price, a builder wants to add a new project photo, or a preschool wants to update an alert, you can do it in two clicks from your smartphone with zero hassle.'
  },
  {
    question: 'How do we know if our new website is actually helping us?',
    answer: 'We set up extremely clear, easy-to-read numbers that show you exactly what matters—like how many new phone calls, reservation forms, or pastry orders you received this week. There are no confusing metrics, just simple charts showing your custom system growing your business.'
  },
  {
    question: 'We already use tools like Google Calendar or spreadsheets. Can you connect to them?',
    answer: 'Yes! We love keeping your setup simple. We can link your custom website directly to your Google Calendar, standard Excel/Google sheets, email list, or payment systems so everything updates automatically without any double-work.'
  }
];

export const TRUST_STATS = [
  { value: '0.4s', label: 'Average Page Load Speed' },
  { value: '+85%', label: 'Visitor Attention Retention' },
  { value: '99.9%', label: 'Systems Reliability & Uptime' },
  { value: '7,200 hrs', label: 'Paperwork Hours Saved for Owners' }
];

export const WHY_US_PILLARS = [
  {
    title: 'Designed to Growing Your Sales',
    description: 'Every website or portal we build is designed to make you money or save you time—whether that\'s more pre-orders, faster consultation bookings, or less paperwork.'
  },
  {
    title: 'Stunning Tailored Designs',
    description: 'No boring cookie-cutter layouts. We design websites that feel unique, friendly, and memorable, helping your business stand out as the absolute best in your neighborhood.'
  },
  {
    title: 'No Stress, No Complex Jargon',
    description: 'We handle all the servers, domain names, mobile setups, and security. We explain everything in plain language so you always feel in control.'
  },
  {
    title: 'On-Time Delivery You Can Trust',
    description: 'We respect your schedule. We deliver clear updates in plain English each week, launching your new platform exactly when promised with zero surprises.'
  }
];

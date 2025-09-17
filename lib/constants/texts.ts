import { Facebook, Instagram, Tiktok, Whatsapp } from '@/components/icons';
import { HeaderLinkProps } from '@/components/layout/Header';
import { FeatureCardProps } from '@/components/sections/home/About';
import { BillboardLocation } from '@/components/sections/home/BillboardLocations';
import { ContactCardProps } from '@/components/sections/home/Contact';
import { Building2, Target, Globe2, Award, Phone, Mail, Clock } from 'lucide-react';

const liveUrl = process.env.live_url || 'https://pinglobal.ng';

export const SEO_DETAILS = {
  title: {
    default: 'Billboard Advertising That Gets You Seen',
    template: '%s | Pin Global',
  },
  description:
    'Pin Global specializes in strategic billboard advertising across prime locations. Book your billboard today and connect with your audience through high-visibility outdoor advertising.',
  ogDesc:
    'Strategic billboard advertising across prime locations. Connect brands with audiences through high-visibility outdoor placements.',
  metadataBase: new URL(liveUrl),
  alternates: {
    canonical: liveUrl,
  },
  image: 'https://static.pinglobal.ng/images/site-preview.webp',
  icons: '/favicon.png',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
    },
  },
  authors: [{ name: 'Edward-Precious Omegbu', url: 'https://portfolio-codegiyu.vercel.app' }],
  keywords: [
    'pinglobal',
    'the she initiative',
    'shei',
    'women',
    'empowerment',
    'gender-based violence',
    'financial literacy',
    'girl child',
    'education',
    'support',
    'Maryam A. Gimba, Esq',
  ],
  generator: 'Next.js',
  // referrer: 'no-referrer',
  publisher: 'Pinpoint Global Limited',
  category: 'Creative Agency',
  classification: 'Complete solution for branding, marketing, packaging and digital products',
};

export const NAV_LINKS: HeaderLinkProps[] = [
  { text: 'About', href: '/#about' },
  { text: 'Locations', href: '/#billboard-locations' },
  { text: 'Book Billboard', href: '/#book-billboard' },
  { text: 'Contact', href: '/#contact' },
];

export const CONTACT_INFORMATION = {
  address: '18 Aba Close, Area 8, Garki, Abuja',
  tel: ['+234 811 111 6287', '+234 811 111 6284'],
  whatsapp: '+234 811 111 6284',
  email: 'pinglobal@pinpoint.ng',
};

export const CONTACT_CARDS: ContactCardProps[] = [
  {
    LucideIcon: Phone,
    title: 'Phone',
    texts: CONTACT_INFORMATION.tel.map(phone => ({
      text: phone,
      link: `tel:${phone.replaceAll(' ', '')}`,
    })),
  },
  {
    LucideIcon: Mail,
    title: 'Email',
    texts: [{ text: CONTACT_INFORMATION.email, link: `mailto:${CONTACT_INFORMATION.email}` }],
    subtitle: 'Get in touch anytime',
  },
  {
    Icon: Whatsapp,
    title: 'Whatsapp',
    texts: [
      {
        text: CONTACT_INFORMATION.whatsapp,
        link: `https://wa.me/${CONTACT_INFORMATION.whatsapp.slice(1).replaceAll(' ', '')}`,
      },
    ],
  },
  // {
  //   LucideIcon: MapPin,
  //   title: 'Visit Us',
  //   texts: [{ text: CONTACT_INFORMATION.address }],
  // },
  {
    LucideIcon: Clock,
    title: 'Business Hours',
    texts: [{ text: 'Mon - Fri: 9:00 AM - 6:00 PM' }],
    subtitle: 'Weekend consultations available',
  },
];

export const CONTACT_CARDS_FOR_FOOTER = [
  {
    LucideIcon: Phone,
    title: 'Phone',
    texts: CONTACT_INFORMATION.tel.slice(0, 1).map(phone => ({
      text: phone,
      link: `tel:${phone.replaceAll(' ', '')}`,
    })),
  },
  ...CONTACT_CARDS.slice(1),
];

export const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pinpointpackaging?igsh=MXNlbTN3MnQ3bzdicg==',
    Icon: Instagram,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/19MUWfmSiG/?mibextid=wwXIfr',
    Icon: Facebook,
  },
  // {
  //   label: 'LinkedIn',
  //   href: 'https://be.linkedin.com/company/atelier-design',
  //   Icon: Linkedin,
  // },
  // {
  //   label: 'X',
  //   href: 'https://x.com/atelierdesign',
  //   Icon: XIcon,
  // },
  {
    label: 'Tiktok',
    href: 'https://www.tiktok.com/@pinpointglobal?_t=ZS-8yRAXCYmRLp&_r=1',
    Icon: Tiktok,
  },
];

export const FEATURES: FeatureCardProps[] = [
  {
    LucideIcon: Building2,
    title: 'Prime Locations',
    description: 'Strategic placements in high-traffic areas for maximum visibility and impact.',
  },
  {
    LucideIcon: Target,
    title: 'Targeted Reach',
    description: 'Connect with your ideal audience through data-driven location selection.',
  },
  {
    LucideIcon: Globe2,
    title: 'Proven Network',
    description: "Part of Pinpoint Global's extensive outdoor advertising ecosystem.",
  },
  {
    LucideIcon: Award,
    title: 'Expert Support',
    description: 'Dedicated team to help optimize your billboard advertising strategy.',
  },
];

export const footerCompanyDescription = `
  We are a creative brand consultancy specializing in design, branding and packaging. 
  Since 2020, we've partnered with leading organizations to solve brand and business challenges. 
  With a diverse team across multiple locations, we harness the power of creativity to help businesses grow, stand out, and connect better with their audiences.
`;

export const BILLBOARDS: BillboardLocation[] = [
  {
    _id: 'downtown_intersection',
    name: 'Downtown Intersection',
    location: '5th & Main Street',
    status: 'available',
    dailyViews: 125_000,
    demographics: 'Business Professionals',
    size: { width: 20, height: 5, unit: 'm' },
    image: '/images/billboard-sample.webp',
  },
  {
    _id: 'highway_101_north',
    name: 'Highway 101 North',
    location: 'Mile Marker 45',
    status: 'occupied',
    dailyViews: 200_000,
    demographics: 'Commuters',
    size: { width: 20, height: 5, unit: 'm' },
    image: '/images/billboard-sample.webp',
  },
  {
    _id: 'shopping_district',
    name: 'Shopping District',
    location: 'Westfield Mall Area',
    status: 'available',
    dailyViews: 80_000,
    demographics: 'Families & Shoppers',
    size: { width: 20, height: 5, unit: 'm' },
    image: '/images/billboard-sample.webp',
  },
  {
    _id: 'airport_terminal',
    name: 'Airport Terminal',
    location: 'Terminal 2 Entrance',
    status: 'available',
    dailyViews: 150_000,
    demographics: 'Travelers',
    size: { width: 20, height: 5, unit: 'm' },
    image: '/images/billboard-sample.webp',
  },
  {
    _id: 'university_district',
    name: 'University District',
    location: 'Campus Drive',
    status: 'occupied',
    dailyViews: 95_000,
    demographics: 'Students & Faculty',
    size: { width: 20, height: 5, unit: 'm' },
    image: '/images/billboard-sample.webp',
  },
  {
    _id: 'subway_station',
    name: 'Subway Station',
    location: 'Central Metro Hub',
    status: 'available',
    dailyViews: 175_000,
    demographics: 'Transit Users',
    size: { width: 20, height: 5, unit: 'm' },
    image: '/images/billboard-sample.webp',
  },
];

export const AVAILABLE_BILLBOARDS = BILLBOARDS.filter(b => b.status === 'available');

export const PRIVACY_POLICY: string[][] = [];

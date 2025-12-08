import { Instagram, Whatsapp } from '@/components/icons';
import { HeaderLinkProps } from '@/components/layout/Header';
import { FeatureCardProps } from '@/components/sections/home/About';
import { ContactCardProps } from '@/components/sections/home/Contact';
import { RegulatoryCardProps } from '@/components/sections/home/Regulatories';
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
  image: 'https://static.pinglobal.ng/site-preview.webp',
  icons: 'https://static.pinglobal.ng/favicon.png',
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
    'pin global',
    'Pinpoint Global',
    'abuja billboard company',
    'billboard advertising in abuja',
    'outdoor advertising in abuja',
    'billboard agency in abuja',
    // 'digital billboards',
    'static billboards',
    'billboard marketing',
    'out-of-home media',
    'brand visibility',
    'advertising solutions',
    'marketing campaigns',
    'creative billboards',
    'large format advertising',
    'brand promotion',
    'advertising agency',
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
  { text: 'Regulatory Bodies', href: '/#regulatories', showInFooterOnly: true },
  { text: 'Book Billboard', href: '/#book-billboard' },
  { text: 'Contact', href: '/#contact' },
];

export const CONTACT_INFORMATION = {
  address: '18 Aba Close, Area 8, Garki, Abuja',
  tel: ['+234 811 111 6287', '+234 811 111 6284'],
  whatsapp: '+234 811 111 6284',
  email: 'info@pinglobal.ng',
  locationUrl: 'https://maps.app.goo.gl/mwhvMGDnWFWNnEz8A',
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
    href: 'https://www.instagram.com/pinglobalbillboard',
    Icon: Instagram,
  },
  // {
  //   label: 'Facebook',
  //   href: 'https://www.facebook.com/share/19MUWfmSiG/?mibextid=wwXIfr',
  //   Icon: Facebook,
  // },
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
  // {
  //   label: 'Tiktok',
  //   href: 'https://www.tiktok.com/@pinpointglobal?_t=ZS-8yRAXCYmRLp&_r=1',
  //   Icon: Tiktok,
  // },
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

export const REGULATORIES: RegulatoryCardProps[] = [
  {
    img: '/images/ARCON-logo.png',
    name: 'Advertising Regulatory Council of Nigeria',
  },
  {
    img: '/images/OAAN-logo.jpg',
    name: 'Outdoor Advertising Association of Nigeria',
  },
  {
    img: '/images/DOAS-logo.png',
    name: 'Department of Outdoor Advertisement and Signage',
  },
];

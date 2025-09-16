import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SEO_DETAILS } from '@/lib/constants/texts';
import { Providers } from '@/components/Providers';
import { ScrollRestorationHandler } from '@/components/general/ScrollRestorationHandler';
import { omit } from 'lodash';

export const metadata: Metadata = {
  ...omit(SEO_DETAILS, ['image', 'ogDesc']),
  openGraph: {
    title: SEO_DETAILS.title,
    description: SEO_DETAILS.ogDesc,
    type: 'website',
    url: SEO_DETAILS.metadataBase.toString(),
    siteName: 'Pin Global',
    images: [{ url: SEO_DETAILS.image }],
  },
  twitter: {
    card: 'summary_large_image',
    // site: '@site',
    creator: '@TheLonerider20',
    images: SEO_DETAILS.image,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'only light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ScrollRestorationHandler />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

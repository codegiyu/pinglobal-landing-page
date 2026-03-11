'use client';

import { motion } from 'motion/react';

const BRAND_LOGOS: { src: string; alt: string }[] = [
  { src: 'https://static.pinglobal.ng/brands/arenas-schools.png', alt: 'Arenas Group of Schools' },
  { src: 'https://static.pinglobal.ng/brands/christ-embassy.png', alt: 'Christ Embassy' },
  { src: 'https://static.pinglobal.ng/brands/coza.png', alt: 'COZA' },
  { src: 'https://static.pinglobal.ng/brands/gidi-steel.png', alt: 'Gidi Steel' },
  { src: 'https://static.pinglobal.ng/brands/henez-homes.png', alt: 'Henez Homes' },
  {
    src: 'https://static.pinglobal.ng/brands/hon-christopher-zakka.png',
    alt: 'Hon. Christopher Zakka',
  },
  {
    src: 'https://static.pinglobal.ng/brands/kahera-country-club.png',
    alt: 'Kahera Country Club Signage',
  },
  { src: 'https://static.pinglobal.ng/brands/kingzglow.png', alt: 'Kingzglow Real Property' },
  { src: 'https://static.pinglobal.ng/brands/koinonia.png', alt: 'Koinonia' },
  { src: 'https://static.pinglobal.ng/brands/linglong.png', alt: 'Linglong' },
  { src: 'https://static.pinglobal.ng/brands/livingspring.png', alt: 'Livingspring' },
  {
    src: 'https://static.pinglobal.ng/brands/phillips-tanimu.png',
    alt: 'Sen. Phillips Tanimu Aduda',
  },
  // {
  //   src: 'https://static.pinglobal.ng/brands/prime-essential.png',
  //   alt: 'Prime Essential Frozen Foods',
  // },
];

export const BrandsMarquee = () => {
  return (
    <section id="brands-marquee" className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h4 className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by leading brands
        </h4>
      </div>

      <div className="w-full overflow-hidden py-8 relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-card to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-card to-transparent pointer-events-none" />

        <motion.div
          className="flex flex-row shrink-0 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            duration: 60,
            ease: 'linear',
          }}>
          {[1, 2].map(copy => (
            <div key={copy} className="flex flex-row gap-24 items-center shrink-0">
              {BRAND_LOGOS.map(logo => (
                <div
                  key={`${copy}-${logo.alt}`}
                  className="flex-shrink-0 flex items-center justify-center px-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-[80px] w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

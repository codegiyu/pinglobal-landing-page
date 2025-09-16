/* eslint-disable @next/next/no-img-element */
'use client';

import { RegularBtn } from '@/components/atoms/RegularBtn';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={'/images/hero-billboard.jpg'}
          alt="Modern billboard in urban setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pin-gray-dark/90 via-pin-gray-dark/60 to-pin-gray-dark/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left max-w-3xl">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Billboard Advertising
            <span className="text-pin-red-light block">That Gets You Seen</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed">
            Connecting brands with audiences through strategic billboard placements across prime
            locations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <RegularBtn
              variant="hero"
              size="hero"
              onClick={() => scrollToSection('book-billboard')}
              className="w-full sm:w-fit"
              wrapClassName="w-full sm:w-fit">
              Book a Billboard
            </RegularBtn>
            <RegularBtn
              variant="outline"
              size="hero"
              onClick={() => scrollToSection('billboard-locations')}
              className="w-full sm:w-fit bg-white/10 border-white/30 text-white hover:bg-white hover:text-pin-gray-dark"
              wrapClassName="w-full sm:w-fit">
              View Locations
            </RegularBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

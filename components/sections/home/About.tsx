'use client';

import { Card } from '@/components/general/Card';
import { FEATURES } from '@/lib/constants/texts';
import { LucideIconComp } from '@/lib/types/general';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-gradient-subtle">
      <div className="regular-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Pin Global</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pin Global is a subsidiary of Pinpoint Global, dedicated to outdoor advertising
            excellence. We provide high-visibility billboard spaces across prime locations to help
            brands connect with their audience and achieve maximum market impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export interface FeatureCardProps {
  LucideIcon: LucideIconComp;
  title: string;
  description: string;
}

const FeatureCard = ({ LucideIcon, title, description }: FeatureCardProps) => {
  return (
    <Card className="p-8 text-center shadow-pin-card hover:shadow-pin-button transition-all duration-300 hover:scale-105 border-pin-gray-light">
      <div className="mb-6 mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
        <LucideIcon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
};

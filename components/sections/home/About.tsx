'use client';

import { Card } from '@/components/general/Card';
import { Building2, Target, Globe2, Award } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: Building2,
      title: 'Prime Locations',
      description: 'Strategic placements in high-traffic areas for maximum visibility and impact.',
    },
    {
      icon: Target,
      title: 'Targeted Reach',
      description: 'Connect with your ideal audience through data-driven location selection.',
    },
    {
      icon: Globe2,
      title: 'Proven Network',
      description: "Part of Pinpoint Global's extensive outdoor advertising ecosystem.",
    },
    {
      icon: Award,
      title: 'Expert Support',
      description: 'Dedicated team to help optimize your billboard advertising strategy.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Pin Global</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pin Global is a subsidiary of Pinpoint Global, dedicated to outdoor advertising
            excellence. We provide high-visibility billboard spaces across prime locations to help
            brands connect with their audience and achieve maximum market impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-8 text-center shadow-pin-card hover:shadow-pin-button transition-all duration-300 hover:scale-105 border-pin-gray-light">
                <div className="mb-6 mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

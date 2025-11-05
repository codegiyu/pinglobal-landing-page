'use client';

import { Card } from '@/components/general/Card';
import { SectionHeading } from '@/components/general/SectionHeading';
import { REGULATORIES } from '@/lib/constants/texts';

export const Regulatories = () => {
  return (
    <section id="regulatories" className="py-24 bg-gradient-subtle">
      <div className="regular-container">
        <SectionHeading title="Our Regulatory Bodies" />

        <div className="flex flex-col xs:flex-row flex-wrap xl:flex-nowrap items-center justify-center gap-8">
          {REGULATORIES.map((body, idx) => (
            <RegulatoryCard key={idx} {...body} />
          ))}
        </div>
      </div>
    </section>
  );
};

export interface RegulatoryCardProps {
  img: string;
  name: string;
}

const RegulatoryCard = ({ img, name }: RegulatoryCardProps) => {
  return (
    <Card className="w-[320px] xl:w-full flex-none xl:flex-shrink-1 p-8 text-center shadow-pin-card hover:shadow-pin-button transition-all duration-300 hover:scale-105 border-pin-gray-light">
      <div className="w-fit bg-gradient-hero rounded-none mb-6 mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="h-[120px] object-cover" />
      </div>
      <h6 className="text-xs font-semibold text-foreground mb-4">{name}</h6>
    </Card>
  );
};

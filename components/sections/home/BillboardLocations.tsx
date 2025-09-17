/* eslint-disable @next/next/no-img-element */
'use client';

import { RegularBtn } from '@/components/atoms/RegularBtn';
import { Card, CardContent } from '@/components/general/Card';
import { Badge } from '@/components/ui/badge';
import { AVAILABLE_BILLBOARDS, BILLBOARDS } from '@/lib/constants/texts';
import { LucideIconComp } from '@/lib/types/general';
import { formatPopulation } from '@/lib/utils/general';
import { MapPin, Users, Eye, Scan } from 'lucide-react';

export const BillboardsLocations = () => {
  return (
    <section id="billboard-locations" className="py-24 bg-background">
      <div className="regular-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Billboard Locations & Availability
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our premium billboard locations across key strategic areas.
          </p>

          {/* Filter Stats */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Badge variant="outline" className="text-sm px-4 py-2">
              {BILLBOARDS.length} Total Locations
            </Badge>
            <Badge className="text-sm px-4 py-2 bg-green-500 hover:bg-green-600">
              {AVAILABLE_BILLBOARDS.length} Available Now
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BILLBOARDS.map(billboard => (
            <LocationCard key={billboard._id} {...billboard} />
          ))}
        </div>
      </div>
    </section>
  );
};

export type BillboardLocationStatus = 'available' | 'occupied';
export interface BillboardSize {
  width: number;
  height: number;
  unit: string;
}
export interface BillboardLocation {
  _id: string;
  name: string;
  location: string;
  status: BillboardLocationStatus;
  dailyViews: number;
  demographics: string;
  size: BillboardSize;
  image: string;
}

const LocationCard = ({
  _id,
  name,
  location,
  status,
  dailyViews,
  demographics,
  size,
  image,
}: BillboardLocation) => {
  return (
    <Card
      key={_id}
      className="overflow-hidden shadow-pin-card hover:shadow-pin-button transition-all duration-300 hover:scale-105">
      <div className="relative h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <Badge
            className={
              status === 'available'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-pin-red hover:bg-pin-red-dark'
            }>
            {status === 'available' ? 'Available' : 'Occupied'}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>
          <DataRow LucideIcon={MapPin} property={location} />
        </div>

        <div className="space-y-3 mb-6">
          <DataRow
            LucideIcon={Scan}
            property="Size"
            value={`W: ${size.width}${size.unit} H: ${size.height}${size.unit}`}
          />
          <DataRow LucideIcon={Eye} property="Daily Views" value={formatPopulation(dailyViews)} />
          <DataRow LucideIcon={Users} property="Demographics" value={demographics} />
        </div>

        {status === 'available' ? (
          <RegularBtn
            variant="cta"
            text="Select This Location"
            className="w-full"
            onClick={() => {
              const form = document.getElementById('book-billboard');
              const selectElement = form?.querySelector(
                'select[name="billboardLocation"]'
              ) as HTMLSelectElement;
              if (selectElement) {
                selectElement.value = _id;
              }
              form?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ) : (
          <RegularBtn variant="outline" text="Currently Occupied" className="w-full" disabled />
        )}
      </CardContent>
    </Card>
  );
};

interface DataRowProps {
  LucideIcon: LucideIconComp;
  property: string;
  value?: string;
}

const DataRow = ({ LucideIcon, property, value }: DataRowProps) => {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center">
      <div className="flex items-center text-muted-foreground">
        <LucideIcon className="w-4 h-4 mr-2" />
        <span className="text-sm">{property}</span>
      </div>
      {value && (
        <span className="font-semibold text-foreground text-wrap break-words">{value}</span>
      )}
    </div>
  );
};

/* eslint-disable @next/next/no-img-element */
'use client';

import { RegularBtn } from '@/components/atoms/RegularBtn';
import { Card, CardContent } from '@/components/general/Card';
import { Badge } from '@/components/ui/badge';
import { AVAILABLE_BILLBOARD_FACES, BILLBOARDS } from '@/lib/constants/texts';
import { BillboardFace, BillboardSize } from '@/lib/types/billboard';
import { LucideIconComp } from '@/lib/types/general';
import { formatPopulation, getOrientationLabel } from '@/lib/utils/general';
import { MapPin, Users, Eye, Compass, Ruler } from 'lucide-react';

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
              {AVAILABLE_BILLBOARD_FACES.length} Available Faces
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BILLBOARDS.map(billboard => (
            <LocationCard key={billboard.billboardId} {...billboard} />
          ))}
        </div>
      </div>
    </section>
  );
};

export interface BillboardDisplay {
  billboardId: string;
  name: string;
  address: string;
  dailyViews: number;
  demographics: string;
  image: string;
  faces: BillboardFaceDisplay[];
}

export interface BillboardFaceDisplay {
  faceId: BillboardFace['_id'];
  name: string;
  isAvailable: boolean;
  size: BillboardSize;
  orientation: number;
  isDigital?: boolean;
}

const LocationCard = ({
  billboardId,
  name,
  address,
  dailyViews,
  demographics,
  image,
  faces,
}: BillboardDisplay) => {
  const isAvailable = faces.some(f => f.isAvailable);

  return (
    <Card className="overflow-hidden shadow-pin-card hover:shadow-pin-button transition-all duration-300 hover:scale-105">
      <div className="relative h-48">
        <img src={image} alt={address} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <Badge
            className={
              isAvailable ? 'bg-green-500 hover:bg-green-600' : 'bg-pin-red hover:bg-pin-red-dark'
            }>
            {isAvailable ? 'Available' : 'Fully Occupied'}
          </Badge>
        </div>
      </div>

      <CardContent className="pt-6 pb-0 px-4 md:px-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-foreground mb-2">{name}</h3>
          <DataRow LucideIcon={MapPin} property={address} />
        </div>

        <div className="space-y-3 mb-6">
          <DataRow LucideIcon={Eye} property="Daily Views" value={formatPopulation(dailyViews)} />
          <DataRow LucideIcon={Users} property="Demographics" value={demographics} />
        </div>

        {/* Billboard Faces */}
        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-semibold text-foreground">
            Billboard Faces ({faces.length})
          </h4>
          {faces.map(face => (
            <BillboardFaceCard
              key={billboardId + '-' + face.faceId}
              {...face}
              billboardId={billboardId}
            />
          ))}
        </div>
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

const BillboardFaceCard = ({
  faceId,
  name,
  isAvailable,
  size,
  orientation,
  isDigital,
  billboardId,
}: BillboardFaceDisplay & { billboardId: string }) => {
  return (
    <div className="border border-border rounded-lg p-3 space-y-2">
      <div className="flex items-center justify-between">
        <h5 className="font-semibold font-montserrat">{name}</h5>
        <div className="flex items-center gap-2">
          {isDigital && (
            <Badge variant="outline" className="text-xs">
              Digital
            </Badge>
          )}
          <Badge
            variant={isAvailable ? 'default' : 'secondary'}
            className={isAvailable ? 'bg-green-500 hover:bg-green-600' : ''}>
            {isAvailable ? 'Available' : 'Occupied'}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center text-muted-foreground">
          <Ruler className="w-3 h-3 mr-1" />
          {/* {size.width}×{size.height}
          {size.unit} */}
          <p className="mr-1">
            <span className="font-semibold text-dark/65">W:</span> {size.width}
            {size.unit}
          </p>
          <p className="mx-1">
            <span className="font-semibold text-dark/65">H:</span> {size.height}
            {size.unit}
          </p>
        </div>
        <div className="flex items-center text-muted-foreground">
          <Compass className="w-3 h-3 mr-1" />
          {getOrientationLabel(orientation)} ({orientation}°)
        </div>
      </div>

      {isAvailable && (
        <RegularBtn
          variant="cta"
          size="sm"
          text="Book This Face"
          className="w-full"
          wrapClassName="w-full mt-2"
          onClick={() => {
            const form = document.getElementById('book-billboard');
            window.location.hash = `billboardLocation:${billboardId} ${faceId}`;
            form?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState, useMemo } from 'react';
import { RegularBtn } from '@/components/atoms/RegularBtn';
import { Card, CardContent } from '@/components/general/Card';
import { Badge } from '@/components/ui/badge';
import { callApi } from '@/lib/services/callApi';
import type { IPopulatedBillboard } from '@/lib/constants/endpoints';
import { BillboardFace, BillboardSize } from '@/lib/types/billboard';
import { LucideIconComp } from '@/lib/types/general';
import { formatPopulation, getOrientationLabel } from '@/lib/utils/general';
import { MapPin, Users, Eye, Compass, Ruler, Loader2 } from 'lucide-react';
import { useBillboardsStore } from '@/lib/stores/useBillboardsStore';

// Transform API billboard data to display format
const transformBillboard = (billboard: IPopulatedBillboard): BillboardDisplay => {
  // Get the first image or use a placeholder
  const image = billboard.images?.[0] || '/images/billboard-sample.webp';

  // Build address from location
  const addressParts = [
    billboard.location.address,
    billboard.location.area,
    billboard.location.city,
    billboard.location.state,
  ].filter(Boolean);
  const address = addressParts.join(', ') || 'Location details coming soon';

  // Transform faces
  const faces = (billboard.faces || []).map(face => ({
    faceId: face._id,
    slug: face.slug,
    name: face.name,
    isAvailable:
      !face.hasActiveBookings &&
      !face.isBooked &&
      (face.currentBookings ?? []).length === 0 &&
      face.status === 'active',
    size: face.size,
    orientation: face.orientationDegrees ?? 0, // Handle optional orientationDegrees
    isDigital: face.isDigital ?? false, // Handle optional isDigital
  }));

  return {
    billboardId: billboard._id,
    name: billboard.name,
    address,
    dailyViews: billboard.dailyViews || 0,
    demographics: billboard.demographics || 'General Audience',
    image,
    faces,
  };
};

export const BillboardsLocations = () => {
  const {
    billboards: rawBillboards,
    loading,
    error,
    actions: { setLoading, setError, setBillboards },
  } = useBillboardsStore(state => ({
    billboards: state.billboards,
    loading: state.loading,
    error: state.error,
    actions: state.actions,
  }));
  const [totalLocations, setTotalLocations] = useState(0);
  const [availableFaces, setAvailableFaces] = useState(0);

  // Transform billboards for display
  const billboards = useMemo(() => rawBillboards.map(transformBillboard), [rawBillboards]);

  useEffect(() => {
    const fetchBillboards = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: apiError } = await callApi('LIST_BILLBOARDS', {
          query: '?page=1&limit=100', // Fetch up to 100 billboards
        });

        if (apiError) {
          setError(apiError.message || 'Failed to load billboards');
          setLoading(false);
          return;
        }

        if (data?.billboards) {
          setBillboards(data.billboards);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we don't have billboards already
    if (rawBillboards.length === 0) {
      fetchBillboards();
    }
  }, [rawBillboards.length]);

  // Calculate stats when billboards change
  useEffect(() => {
    if (billboards.length > 0) {
      setTotalLocations(billboards.length);
      const totalAvailable = billboards.reduce(
        (acc: number, billboard: BillboardDisplay) =>
          acc + billboard.faces.filter((face: BillboardFaceDisplay) => face.isAvailable).length,
        0
      );
      setAvailableFaces(totalAvailable);
    }
  }, [billboards]);

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
              {loading ? '...' : totalLocations} Total Locations
            </Badge>
            <Badge className="text-sm px-4 py-2 bg-green-500 hover:bg-green-600">
              {loading ? '...' : availableFaces} Available Faces
            </Badge>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            <span className="ml-3 text-muted-foreground">Loading billboards...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <RegularBtn
              variant="outline"
              // size="sm"
              text="Retry"
              onClick={() => window.location.reload()}
            />
          </div>
        )}

        {!loading && !error && billboards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No billboards available at the moment.</p>
          </div>
        )}

        {!loading && !error && billboards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {billboards.map((billboard: BillboardDisplay) => (
              <LocationCard key={billboard.billboardId} {...billboard} />
            ))}
          </div>
        )}
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
  slug: string;
  name: string;
  isAvailable: boolean;
  size: BillboardSize;
  orientation: number;
  isDigital?: boolean;
}

const LocationCard = ({
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
            <BillboardFaceCard key={face.slug} {...face} />
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
  slug,
  name,
  isAvailable,
  size,
  orientation,
  isDigital,
}: BillboardFaceDisplay) => {
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
            window.location.hash = `billboardLocation:${slug}`;
            form?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </div>
  );
};

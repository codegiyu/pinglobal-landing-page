// A face (side) of a billboard
export interface BillboardFace {
  id: string;
  billboardId: string; // reference to parent billboard
  name: string; // Like Face A or Face 2 or East Face

  orientationDegrees: number; // 0–359
  orientationLabel: string; // e.g. "N", "NE", "SSE"

  size: BillboardSize;

  image: string;

  isDigital: boolean;
  lighting: 'frontlit' | 'backlit' | 'none';

  pricePerMonth?: number;

  booking: BillboardBooking | null;

  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

// The billboard structure itself
export interface Billboard {
  id: string;
  name: string;

  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
    country: string;
    mapUrl?: string; // link to Google Maps, OpenStreetMap, etc.
  };

  image?: string;

  type: 'unipole' | 'wallscape' | 'bridge' | 'rooftop' | 'other';
  owner?: string; // Usually 'Pin Global'
  status: 'active' | 'inactive' | 'maintenance';

  installedAt?: Date;
  lastServicedAt?: Date;

  tags: string[];
  dailyViews: number;
  demographics: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface BillboardBooking {
  bookedBy: string;
  bookingStart: string;
  bookingEnd?: string;
}

export type BillboardLocationStatus = 'Available' | 'Fully Occupied';

export interface BillboardSize {
  width: number;
  height: number;
  unit: 'm' | 'ft';
}

export const DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

export type Direction = (typeof DIRECTIONS)[number];

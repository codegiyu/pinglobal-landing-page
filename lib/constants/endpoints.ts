/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IBillboard,
  IBillboardBookingRequest,
  IBillboardFace,
  BillboardFaceBookingRequestData,
} from '../types';

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type EndpointDefinition<
  Payload extends Record<string, any> | undefined = undefined,
  Response = unknown,
  Query extends string | undefined = undefined,
> = Query extends undefined
  ? Payload extends undefined
    ? { payload?: never; query?: never; response: Response }
    : { payload: Payload; query?: never; response: Response }
  : Query extends `${string}` | undefined
    ? Payload extends undefined
      ? { payload?: never; query?: Query; response: Response }
      : { payload: Payload; query?: Query; response: Response }
    : Payload extends undefined
      ? { payload?: never; query: Query; response: Response }
      : { payload: Payload; query: Query; response: Response };

export type EndpointDetails = {
  path: `/${string}`;
  method: HttpMethods;
  isNotAuthenticated?: boolean;
};

export type PageAndSizeQuery = `?${string}`;

// Populated Billboard type
export interface IPopulatedBillboard extends Omit<IBillboard, 'faces'> {
  faces: IBillboardFace[];
}

// Populated Billboard Face type
export interface IPopulatedBillboardFace extends Omit<IBillboardFace, 'billboard'> {
  billboard: Pick<
    IBillboard,
    '_id' | 'name' | 'slug' | 'owner' | 'status' | 'type' | 'location' | 'images' | 'tags'
  >;
}

// Billboard Faces List Response
export interface IBillboardFacesListRes {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  faces: IPopulatedBillboardFace[];
  billboard?: IPopulatedBillboard;
}

// Billboards List Response
export type GetListRes<T, Name extends string> = {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} & Record<Name, T[]>;

export type IBillboardsListRes = GetListRes<IPopulatedBillboard, 'billboards'>;

export type BillboardBookingFaceData = Omit<BillboardFaceBookingRequestData, 'billboardFace'> & {
  billboardFaceId: string;
};

// Booking Request Payload
export interface ICreateBookingRequestPayload {
  billboardBookingRequestSubmit: {
    fullName: string;
    brandName?: string;
    phoneNumber: string;
    email?: string;
    faces: BillboardBookingFaceData[];
    note?: string;
  };
}

// All Endpoints Interface
export interface AllEndpoints {
  // Booking Request
  CREATE_BOOKING_REQUEST: EndpointDefinition<
    ICreateBookingRequestPayload,
    { request: IBillboardBookingRequest },
    undefined
  >;

  // Billboard Management (Public)
  LIST_BILLBOARDS: EndpointDefinition<undefined, IBillboardsListRes, PageAndSizeQuery>;
  GET_BILLBOARD: EndpointDefinition<undefined, { billboard: IPopulatedBillboard }, `/${string}`>;

  // Billboard Face Management (Public)
  LIST_BILLBOARD_FACES_BY_BILLBOARD: EndpointDefinition<
    undefined,
    IBillboardFacesListRes,
    `/${string}/faces`
  >;
  LIST_BILLBOARD_FACES: EndpointDefinition<undefined, IBillboardFacesListRes, PageAndSizeQuery>;
  GET_BILLBOARD_FACE: EndpointDefinition<
    undefined,
    { face: IPopulatedBillboardFace; billboard: IPopulatedBillboard },
    `/${string}`
  >;
}

// Endpoints Configuration
export const ENDPOINTS: Record<keyof AllEndpoints, EndpointDetails> = {
  // Booking Request
  CREATE_BOOKING_REQUEST: {
    path: '/customer/booking-requests',
    method: 'POST',
    isNotAuthenticated: true,
  },

  // Billboard Management (Public)
  LIST_BILLBOARDS: {
    path: '/customer/billboards',
    method: 'GET',
    isNotAuthenticated: true,
  },
  GET_BILLBOARD: {
    path: '/customer/billboards', // /:billboardId
    method: 'GET',
    isNotAuthenticated: true,
  },

  // Billboard Face Management (Public)
  LIST_BILLBOARD_FACES_BY_BILLBOARD: {
    path: '/customer/billboards', // /:billboardId/faces
    method: 'GET',
    isNotAuthenticated: true,
  },
  LIST_BILLBOARD_FACES: {
    path: '/customer/billboard-faces',
    method: 'GET',
    isNotAuthenticated: true,
  },
  GET_BILLBOARD_FACE: {
    path: '/customer/billboard-faces', // /:billboardFaceId
    method: 'GET',
    isNotAuthenticated: true,
  },
};

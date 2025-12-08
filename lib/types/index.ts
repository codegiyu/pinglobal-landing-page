// Shared TypeScript types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Add more types as needed

export * from './general';
export * from './http';
export * from './models';
export * from './settings';

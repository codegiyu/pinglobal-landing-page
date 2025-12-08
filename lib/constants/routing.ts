export const unprotectedRoutes = new Set([
  '/auth/login',
  '/auth/accept-invite/create-password',
  '/auth/forgot-password',
  '/auth/reset-password-mail-notification',
  '/auth/reset-password',
  '/auth/reset-password-success',
]);
export const authenticatedAuthRoutes = new Set<string>([]);
export const noAuthCheckRoutes: string[] = [];

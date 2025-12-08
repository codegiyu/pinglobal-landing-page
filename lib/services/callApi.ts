import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import type { ApiErrorResponse, ApiSuccessResponse, ResponseMessage } from '../types/http';
import { useInitAuthStore } from '../stores/useAuthStore';
import { assertENV, getDataFromRequest, getPathname, getQueryParam } from '../utils/general';
import { type AllEndpoints, ENDPOINTS } from '../constants/endpoints';
import { authenticatedAuthRoutes } from '../constants/routing';
import { getRouter } from '../navigation';
import { ENVIRONMENT } from '../constants/environment';

const BACKEND_API = assertENV(ENVIRONMENT.SERVER.BASEURL, {
  message: 'Please add the NEXT_PUBLIC_BASEURL variable to your .env file',
});

const ACCESS_TOKEN_HEADER = assertENV(ENVIRONMENT.TOKEN_NAMES.HEADERS.ACCESS, {
  message: 'Please define the access token header in ENVIRONMENT.TOKEN_NAMES.HEADERS.ACCESS',
});
const REFRESH_TOKEN_HEADER = assertENV(ENVIRONMENT.TOKEN_NAMES.HEADERS.REFRESH, {
  message: 'Please define the refresh token header in ENVIRONMENT.TOKEN_NAMES.HEADERS.REFRESH',
});
const ACCESS_TOKEN_COOKIE = 'pinpoint_access_token';
const REFRESH_TOKEN_COOKIE = 'pinpoint_refresh_token';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

const hasDocument = () => typeof document !== 'undefined';

const setCookie = (name: string, value: string) => {
  if (!hasDocument()) return;
  const secureFlag = window.location.protocol === 'https:' ? 'Secure; ' : '';
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; Max-Age=${COOKIE_MAX_AGE_SECONDS}; Path=/; ${secureFlag}SameSite=Strict`;
};

const getCookie = (name: string) => {
  if (!hasDocument()) return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
};

const normaliseHeaderLookup = (
  headers: AxiosResponse['headers'],
  target: string
): string | undefined => {
  if (!headers) return undefined;
  const targetLower = target.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === targetLower) {
      const headerVal = headers[key];
      if (Array.isArray(headerVal)) {
        return headerVal[0];
      }
      return headerVal as string | undefined;
    }
  }
  return undefined;
};

const persistTokensFromHeaders = (headers: AxiosResponse['headers']) => {
  if (!hasDocument()) return;
  const accessToken = normaliseHeaderLookup(headers, ACCESS_TOKEN_HEADER);
  if (accessToken) {
    setCookie(ACCESS_TOKEN_COOKIE, accessToken);
  }
  const refreshToken = normaliseHeaderLookup(headers, REFRESH_TOKEN_HEADER);
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE, refreshToken);
  }
};

export const tokenHeadersFromCookies = (): Record<string, string> => {
  if (!hasDocument()) return {};
  const headers: Record<string, string> = {};
  const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
  if (accessToken) {
    headers[ACCESS_TOKEN_HEADER] = accessToken;
  }
  const refreshToken = getCookie(REFRESH_TOKEN_COOKIE);
  if (refreshToken) {
    headers[REFRESH_TOKEN_HEADER] = refreshToken;
  }
  return headers;
};

export const api = axios.create({
  baseURL: BACKEND_API,
  timeout: 120000,
  withCredentials: true,
});

export const callApi = async <T extends keyof AllEndpoints>(
  endpoint: T,
  options: Omit<AllEndpoints[T], 'response'>,
  isServerCall?: boolean
): Promise<ResponseMessage<T>> => {
  const { path, method } = ENDPOINTS[endpoint];

  const source = axios.CancelToken.source();
  const pathname = getPathname();

  let redirectPath = '';

  try {
    const tokenHeaders = tokenHeadersFromCookies();

    const requestConfig: AxiosRequestConfig = {
      url: path + (options.query || ''),
      method,
      cancelToken: source.token,
      headers: tokenHeaders,
    };

    if (options.payload) {
      requestConfig.data = options.payload;
    }

    const response: AxiosResponse<ApiSuccessResponse<T>> =
      await api.request<ApiSuccessResponse<T>>(requestConfig);

    persistTokensFromHeaders(response.headers);

    return getDataFromRequest({ data: response.data }, endpoint);
  } catch (error) {
    if (isServerCall) {
      const thisErr = error as unknown as {
        response?: { data?: ApiErrorResponse };
        message?: string;
      };

      return getDataFromRequest(
        {
          error: thisErr.response?.data || {
            message: thisErr.message || thisErr.response?.data?.message || 'Some error occurred',
            error: {},
            success: false,
            responseCode: 550,
          },
        },
        endpoint
      );
    }

    let apiError: ApiErrorResponse | undefined;

    if (axios.isCancel(error)) {
      console.info('Request cancelled', error.message);
      apiError = {
        message: error.message || 'Request cancelled',
        error: {},
        success: false,
        responseCode: 600,
      };
    }

    if (axios.isAxiosError(error) && error.response) {
      console.log({ errRes: error.response.data });
      persistTokensFromHeaders(error.response.headers);
      apiError = error.response.data as ApiErrorResponse;

      if (error.response.status === 401) {
        useInitAuthStore.getState().actions.clearSession();

        const pageIsInAuth = pathname.startsWith('/auth') && !authenticatedAuthRoutes.has(pathname);
        const redirectQueryValue = getQueryParam('redirectTo');

        const loginRoute = '/auth/login';

        switch (true) {
          case Boolean(pageIsInAuth):
            redirectPath = ``;
            break;
          case Boolean(redirectQueryValue):
            redirectPath = `${loginRoute}`;
            break;

          default:
            redirectPath = `${loginRoute}`;
            break;
        }
      }
      if (error.response.status === 429) {
        const {
          actions: { set429TokenModalActive },
        } = useInitAuthStore.getState();

        set429TokenModalActive(true);
      }
      if (error.response.status === 403) {
        console.error({ _403Err: error.message });
      }
      if (error.response.status === 500) {
        const errMessage = error.response.data.message;
        console.error({ err: errMessage });
      }
      if (error.response.status == null) {
        console.log('null status');
      }

      apiError = error.response.data;
    } else if (error instanceof Error) {
      apiError = {
        message: error.message,
        error: {},
        success: false,
        responseCode: 600,
      };
    }

    return getDataFromRequest({ error: apiError }, endpoint);
  } finally {
    if (redirectPath && !isServerCall) {
      const router = getRouter();

      if (router) {
        router.replace(redirectPath);
      }
    }
  }
};

export default api;

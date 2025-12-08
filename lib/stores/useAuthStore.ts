'use client';
// Note: This is a minimal implementation. For full functionality, install zustand:
// npm install zustand
// Then replace this with the full zustand-based implementation from pinpoint-admin

import type { IAdmin, Permission } from '../types/models';

export interface HeaderWarning {
  warning: string;
  href: string;
}

export interface AuthStore {
  initLoading: boolean;
  user: IAdmin | null;
  permissions: Permission[];
  headerWarning: HeaderWarning;
  pauseNavigatingAwayFromAuth: boolean;
  permanentToast: string;
  inactivityModalActive: boolean;
  _429ModalActive: boolean;
  authExpiresIn: string | null;
  twoFaCallback: ((value: boolean | PromiseLike<boolean>) => void) | null;
  actions: {
    setUser: (
      user: IAdmin | null,
      options?: {
        pauseNavigatingAwayFromAuth?: boolean;
        initLoading?: boolean;
        permissions?: Permission[];
      }
    ) => Promise<void>;
    setPermissions: (permissions: Permission[]) => void;
    resumeNavigatingAwayFromAuth: () => void;
    initSession: () => Promise<void>;
    clearSession: () => void;
    set429TokenModalActive: (val: boolean) => void;
    setAuthExpiresIn: (val: string | null) => void;
    setInactivityModalActive: (val: boolean) => void;
    setPermanentToast: (str: string) => void;
    logout: () => Promise<void>;
  };
}

const initialData: Omit<AuthStore, 'actions'> = {
  initLoading: true,
  user: null,
  permissions: [],
  headerWarning: {
    warning: '',
    href: '',
  },
  pauseNavigatingAwayFromAuth: false,
  _429ModalActive: false,
  inactivityModalActive: false,
  twoFaCallback: null,
  authExpiresIn: null,
  permanentToast: '',
};

// Simple state management without zustand
let authState: AuthStore = {
  ...initialData,
  permanentToast: '',
  actions: {
    setUser: async (user, options) => {
      const pauseNavigatingAwayFromAuth = options?.pauseNavigatingAwayFromAuth ?? false;
      const initLoading = options?.initLoading ?? false;
      const permissions = options?.permissions ?? [];

      authState = {
        ...authState,
        user,
        ...(permissions.length > 0 ? { permissions } : {}),
        pauseNavigatingAwayFromAuth,
        initLoading,
      };
    },
    setPermissions: permissions => {
      authState = { ...authState, permissions };
    },
    resumeNavigatingAwayFromAuth: () => {
      authState = { ...authState, pauseNavigatingAwayFromAuth: false };
    },
    initSession: async () => {
      authState = { ...authState, initLoading: true };
      // Implementation would call API here
    },
    clearSession: () => {
      authState = { ...authState, ...initialData, initLoading: false };
    },
    setPermanentToast: message => {
      authState = { ...authState, permanentToast: message };
    },
    set429TokenModalActive: val => {
      authState = { ...authState, _429ModalActive: val };
    },
    setInactivityModalActive: inactivityModalActive => {
      authState = { ...authState, inactivityModalActive };
    },
    setAuthExpiresIn: authExpiresIn => {
      authState = { ...authState, authExpiresIn };
    },
    logout: async () => {
      authState.actions.clearSession();
    },
  },
};

export const useInitAuthStore = {
  getState: () => authState,
};

// For React components, you'll need to implement a hook that subscribes to state changes
// This is a placeholder - install zustand for proper reactivity
export const useAuthStore = <T>(selector: (state: AuthStore) => T): T => {
  // This is a placeholder - install zustand for proper React integration
  return selector(authState);
};

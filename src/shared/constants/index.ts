export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const ROUTES = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  FORGET_PASSWORD: '/forget-password',
  VERIFY_CODE: '/verify-code',
  RESET_PASSWORD: '/reset-password',
  USER_HOME: '/app',
  ADMIN_HOME: '/admin',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
} as const;
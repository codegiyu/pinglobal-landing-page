export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  hasNextPage: boolean;
}

export interface WithTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface ICustomer {
  _id: string;
  googleId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  avatar?: string;
  accountStatus: AccountStatus;
  email: string;
  phoneNumber: string;
  gender?: Gender;
  location?: {
    address?: string;
    area?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  auth: UserAuth;
  kyc: KYC;
  wallets: UserWallets;
  businessMemberships: string[];
  preferences?: UserPreferences;
  isDeleted?: boolean;
  deleteRequestedAt?: string;
  deletionApprovedAt?: string;
  deletionApprovedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type DaySchedule = {
  startTime?: string; // Format: "HH:mm" (e.g., "09:00")
  endTime?: string; // Format: "HH:mm" (e.g., "18:00")
  breakStart?: string; // Format: "HH:mm" (e.g., "13:00")
  breakEnd?: string; // Format: "HH:mm" (e.g., "14:00")
  isWorking?: boolean; // Whether employee works on this day (default: true if schedule provided)
};

export interface IAdmin {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title?: string;
  email: string;
  avatar?: string;
  gender?: Gender;
  phoneNumber?: string;
  altPhoneNumbers?: string[];
  bio?: string;
  accountStatus: AccountStatus;
  auth: UserAuth;
  employmentData: {
    employmentDate?: string;
    employeeID?: string; // Fixed typo from employmeeID
    position?: string;
    status: EmployeeStatus;
    reportsTo?: string; // Fixed type from string
    employmentType?: EmploymentType;
    department?: string; // Reference to Department model
    branch?: string; // Reference to Branch model
    workLocationType?: WorkLocationType;
    workSchedule?: {
      monday?: DaySchedule;
      tuesday?: DaySchedule;
      wednesday?: DaySchedule;
      thursday?: DaySchedule;
      friday?: DaySchedule;
      saturday?: DaySchedule;
      sunday?: DaySchedule;
      timezone?: string;
    };
    shiftType?: ShiftType;
    directReports?: string[]; // Array of Admin IDs who report to this employee
    contractStartDate?: string;
    contractEndDate?: string;
    contractRenewalDate?: string;
    probationStartDate?: string;
    probationEndDate?: string;
    probationStatus?: ProbationStatus;
    terminationDate?: string;
    lastWorkingDay?: string;
    terminationReason?: string;
    terminatedBy?: string; // Reference to Admin who processed termination
    exitInterviewCompleted?: boolean;
    exitInterviewDate?: string;
    performance?: {
      lastReviewDate?: string;
      lastRating?: number; // e.g., 1-5 scale
      notes?: string;
      careerGoals?: string; // Employee's career aspirations
      developmentPlan?: string; // Development plan notes
      nextReviewDate?: string; // Scheduled next review date
    };
    internalNotes?: string; // HR/admin-only notes about the employee
    tags?: string[]; // Custom tags for categorization
    metadata?: Record<string, unknown>; // Flexible storage for custom fields
  };
  homeAddress?: {
    address?: string;
    area?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string; // e.g., "spouse", "parent", "sibling", "friend"
    phoneNumber: string;
    email?: string;
    address?: string;
  };
  skills?: string[]; // Array of skill names/tags
  qualifications?: Array<{
    name: string; // e.g., "Bachelor's Degree in Computer Science"
    institution?: string;
    year?: number;
    certification?: boolean; // true if it's a certification rather than education
  }>;
  socialLinks?: {
    linkedIn?: string;
    twitter?: string;
    github?: string;
    portfolio?: string;
    website?: string;
  };
  bankAccount?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    accountType?: 'savings' | 'current';
    bankCode?: string; // For Nigerian banks, this could be the bank code
  };
  taxId?: string; // Tax Identification Number
  nationalId?: string; // National ID number
  wallets: UserWallets;
  preferences?: UserPreferences;
  isDeleted?: boolean;
  deleteRequestedAt?: string;
  deletionApprovedAt?: string;
  deletionApprovedBy?: string;
  invitedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBranch {
  _id: string;
  name: string; // Branch name (e.g., "Lagos Main Office")
  code: string; // Branch code/identifier (unique)
  location: {
    latitude: number; // GPS latitude (required)
    longitude: number; // GPS longitude (required)
    address?: string; // Street address
    area?: string; // Area/neighborhood
    city: string; // City (required)
    state?: string;
    postalCode?: string;
    country?: string; // Default: 'Nigeria'
    mapUrl?: string; // Link to Google Maps or similar
  };
  isActive: boolean; // Whether branch is currently active
  description?: string; // Branch description
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  createdBy?: string; // Reference to Admin who created it
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IDepartment {
  _id: string;
  name: string; // Department name (e.g., "Engineering", "Sales", "Marketing")
  code?: string; // Department code/identifier (optional, unique if provided)
  description?: string; // Department description
  departmentLead?: string; // Reference to Admin (department head/lead)
  branch?: string; // Reference to Branch (if department is branch-specific)
  members?: string[]; // Array of Admin IDs (denormalized for performance)
  status: DepartmentStatus; // 'active' | 'inactive' | 'archived'
  metadata?: Record<string, unknown>; // Additional metadata
  createdBy?: string; // Reference to Admin who created it
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserWallets = {
  [K in WalletSlug]: Omit<Wallet, 'slug'> & { slug: K };
};

export interface Wallet {
  slug: WalletSlug;
  value: number;
  currency?: Currency;
}

export interface UserPreferences {
  language: string;
  currency: Currency;
  timezone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface IEmployeeEvent {
  _id: string;
  type: EmployeeEventType;
  oldValue: string;
  newValue: string;
  date: string;
  authorizedBy: string;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserAuth {
  password?: {
    value: string;
    passwordChangedAt?: string;
  };
  roles: AuthUserRole[];
  lastLogin?: string;
  refreshTokenJTI?: string;
  permissions?: string[];
}

export interface AuthUserRole {
  roleId: string;
  slug: string;
}

export interface IRole {
  _id: string;
  name: string;
  slug: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  slug: string;
  name: string;
  description: string;
  isRestricted?: boolean;
}

export interface KYC {
  email: {
    isVerified: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  };
  phoneNumber: {
    isVerified: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  };
}

export interface IBusiness {
  _id: string;
  registrationNumber?: string;
  name: string;
  slug: string;
  description: string;
  email: string;
  phoneNumber?: string;
  logo?: string;
  location: {
    address: string;
    area: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
  };
  status: BusinessStatus;
  industry: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: Record<string, any>;
  wallets: UserWallets;
  createdBy: string;
  creatorModel: 'Customer' | 'Admin';
  isDeleted?: boolean;
  deleteRequestedAt?: string;
  deletionApprovedAt?: string;
  deletionApprovedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBusinessMembership {
  _id: string;
  customer: string;
  business: string;
  role: BusinessRole;
  status: BusinessMembershipStatus;
  joinDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBillboard {
  _id: string;
  name: string;
  slug: string;

  location: {
    latitude?: number;
    longitude?: number;
    address: string;
    area: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
    mapUrl?: string; // link to Google Maps or sth like that.
  };

  images: string[];

  owner?: string; // Usually 'Pin Global'
  type: BillboardType;
  status: BillboardStatus;

  installedAt?: string;
  lastServicedAt?: string;

  tags: string[];
  dailyViews: number;
  demographics: string;
  note?: string;

  faces: string[];

  isDeleted?: boolean;
  deleteRequestedAt?: string;
  deletionApprovedAt?: string;
  deletionApprovedBy?: string;

  createdAt: string;
  updatedAt: string;
}

export interface IBillboardFaceRates {
  daily?: number;
  weekly?: number;
  monthly: number;
  quarterly?: number;
  sixMonthly?: number;
  annually?: number;
}

export interface IBillboardFace {
  _id: string;
  billboard: string; // reference to parent billboard
  name: string; // Like Face A or Face 2 or East Face
  slug: string;

  orientationDegrees?: number; // 0–359
  orientationLabel?: Direction; // e.g. "N", "NE", "SSE"

  size: BillboardSize;

  images: string[];

  isDigital?: boolean;
  lighting: BillboardFaceLighting;

  rates: IBillboardFaceRates;

  currentBookings: (string | { _id: string; startDate: string; endDate: string })[];
  isBooked?: boolean;
  hasActiveBookings?: boolean;
  condition: BillboardFaceCondition;
  status: BillboardFaceStatus;

  notes?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;

  createdAt: string;
  updatedAt: string;
}

export interface BillboardSize {
  width: number;
  height: number;
  unit: BillboardSizeUnit;
}

export const BILLBOARD_BOOKING_STATUSES = [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
] as const;
export type BillboardBookingStatus = (typeof BILLBOARD_BOOKING_STATUSES)[number];

export interface IBillboardBooking {
  _id: string;
  bookingNumber: string;
  customer?: string;
  business?: string;
  transaction?: string;
  faces: BillboardFaceBookingData[];
  processedBy: string;
  groupDiscount?: Discount;
  totalDiscount: number;
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  summary?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>;
  status: BillboardBookingStatus;
  statusUpdatedAt?: string;
  statusUpdatedBy?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  isDeleted?: boolean;
  deleteRequestedAt?: string;
  deletionApprovedAt?: string;
  deletionApprovedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillboardFaceBookingData {
  billboardFace: string;
  startDate: string;
  endDate: string;
  duration?: number;
  billingMode: MonthlyBillingMode;
  basePrice: number;
  discount?: Discount;
  priceAfterDiscount: number;
}

export interface Discount {
  value: number;
  isPercentage?: boolean;
}
export interface IBillboardFacePricingHistory {
  _id: string;
  billboard: string;
  billboardFace: string;
  previousRates: IBillboardFaceRates;
  newRates: IBillboardFaceRates;
  reason?: string;
  changedBy?: string;
  changeSource: 'admin' | 'system';
  changedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBillboardBookingRequest {
  _id: string;
  fullName: string;
  brandName?: string;
  phoneNumber: string;
  email?: string;
  faces: BillboardFaceBookingRequestData[];
  note?: string;
  customer?: string;
  isDeleted?: boolean;
  deleteRequestedAt?: string;
  deletionApprovedAt?: string;
  deletionApprovedBy?: string;
  status: 'pending' | 'in_review' | 'converted' | 'rejected' | 'cancelled';
  convertedBooking?: string;
  convertedAt?: string;
  convertedBy?: string;
  rejectionReason?: string;
  rejectedAt?: string;
  rejectedBy?: string;
  statusUpdatedAt?: string;
  statusUpdatedBy?: string;
  statusNotes?: string;
  cancellationReason?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillboardFaceBookingRequestData {
  billboardFace: string;
  startDate: string;
  endDate: string;
}

export interface BillboardFaceBookingConversionData extends BillboardFaceBookingData {
  billboardFace: string;
}

export interface ITransaction {
  _id: string;
  customer: string;
  business?: string;
  booking?: string;
  amount: number;
  subtotal?: number;
  fees?: number;
  taxAmount?: number;
  discountAmount?: number;
  netAmount?: number;
  currency: Currency;
  status: TransactionStatus;
  type: TransactionType;
  method: TransactionMethod;
  reference: string;
  description?: string;
  notes?: string;
  provider?: string;
  recordedBy?: string;
  channel?: TransactionChannel;
  showToCustomer?: boolean;
  summary?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  processedAt?: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDocument {
  _id: string;
  entityType: EntityType;
  entityId: string;
  intent: UploadIntent;
  filename: string;
  key: string;
  publicUrl: string;
  uploadUrl: string;
  fileExtension: string;
  contentType: string;
  status: DocumentStatus;
  uploadedAt?: string;
  verifiedAt?: string;
  expiresAt: string;
  size?: number;
  metadata?: Record<string, unknown>;
  uploadedBy?: string;
  uploadedByModel?: 'Customer' | 'Admin';
  errorMessage?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  deletedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEmailLog {
  _id: string;
  jobId: string; // BullMQ job ID
  company: CompanyKey;
  type: JobType;
  to: string; // Recipient email
  from: string; // Sender email
  subject: string;
  status: EmailStatus;
  messageId?: string; // Provider message ID (for webhook tracking)
  provider: string; // 'smtp', 'resend', etc.
  error?: string | null; // Error message if failed
  htmlContent?: string; // HTML content of the email
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
  isDeleted?: boolean;
  deleteRequestedAt?: string;
  deletionApprovedAt?: string;
  deletionApprovedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAuditLog {
  _id: string;
  actor: string;
  actorEmail?: string;
  action: AuditAction;
  resource: AuditLogResource;
  resourceId?: string | string;
  description?: string;
  metadata?: Record<string, unknown>;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  performedAt: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserActivityLog {
  _id: string;
  customer: string;
  action: UserActivityAction;
  resource: UserActivityResource;
  resourceId?: string | string;
  performedBy: ActivitySource;
  description?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  performedAt: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type NotificationEmailDelivery = {
  status: 'pending' | 'queued' | 'sent' | 'failed' | 'skipped' | 'disabled';
  jobId?: string;
  lastAttemptAt?: Date;
  lastSentAt?: Date;
  lastError?: string;
  statusReason?: string;
};

export type INotification = {
  _id: string;
  user: string;
  userModel: 'Customer' | 'Admin' | 'Business';
  eventType?: string;
  title?: string;
  message?: string;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
  triggerDate: Date;
  expiresAt: Date;
  emailDelivery: NotificationEmailDelivery;
};

export const AUDIT_LOG_RESOURCES = [
  'customer',
  'business',
  'businessMembership',
  'wallet',
  'transaction',
  'billboard',
  'booking',
  'notification',
  'system',
] as const;
export type AuditLogResource = (typeof AUDIT_LOG_RESOURCES)[number];

export const AUDIT_ACTIONS = {
  ADMIN_INVITE: 'admin.invite',
  CUSTOMER_CREATE: 'customer.create',
  CUSTOMER_PROFILE_UPDATE: 'customer.profile.update',
  CUSTOMER_PREFERENCES_UPDATE: 'customer.preferences.update',
  CUSTOMER_DELETE: 'customer.delete',
  CUSTOMER_SOFT_DELETE: 'customer.soft-delete',
  BUSINESS_CREATE: 'business.create',
  BUSINESS_UPDATE: 'business.update',
  BUSINESS_DELETE_REQUEST: 'business.delete-request',
  BUSINESS_STATUS_UPDATE: 'business.status.update',
  BUSINESS_DELETE: 'business.delete',
  BUSINESS_MEMBERSHIP_ADD: 'business.membership.add',
  BUSINESS_MEMBERSHIP_UPDATE: 'business.membership.update',
  BUSINESS_MEMBERSHIP_REMOVE: 'business.membership.remove',
  BUSINESS_WALLET_OPERATION: 'business.wallet.operation',
  TRANSACTION_CREATE: 'transaction.create',
  BILLBOARD_CREATE: 'billboard.create',
  BILLBOARD_UPDATE: 'billboard.update',
  BILLBOARD_DELETE: 'billboard.delete',
  BILLBOARD_FACE_CREATE: 'billboard.face.create',
  BILLBOARD_FACE_UPDATE: 'billboard.face.update',
  BILLBOARD_FACE_DELETE: 'billboard.face.delete',
  NOTIFICATION_CREATE: 'notification.create',
  BOOKING_STATUS_UPDATE: 'booking.status.update',
  BOOKING_DELETE: 'booking.delete',
} as const;
export const AUDIT_ACTION_VALUES = Object.values(AUDIT_ACTIONS);
export type AuditAction = (typeof AUDIT_ACTIONS)[keyof typeof AUDIT_ACTIONS];

export const USER_ACTIVITY_RESOURCES = [
  'customer',
  'business',
  'businessMembership',
  'wallet',
  'booking',
  'billboard',
] as const;
export type UserActivityResource = (typeof USER_ACTIVITY_RESOURCES)[number];

export const USER_ACTIVITY_ACTIONS = {
  CUSTOMER_PROFILE_UPDATE: 'customer.profile.update',
  CUSTOMER_PREFERENCES_UPDATE: 'customer.preferences.update',
  BUSINESS_CREATE: 'business.create',
  BUSINESS_UPDATE: 'business.update',
  BUSINESS_STATUS_UPDATE: 'business.status.update',
  BUSINESS_DELETE_REQUEST: 'business.delete-request',
  BUSINESS_DELETE: 'business.delete',
  BUSINESS_MEMBERSHIP_ADD: 'business.membership.add',
  BUSINESS_MEMBERSHIP_UPDATE: 'business.membership.update',
  BUSINESS_MEMBERSHIP_REMOVE: 'business.membership.remove',
  BUSINESS_WALLET_OPERATION: 'business.wallet.operation',
  BILLBOARD_CREATE: 'billboard.create',
  BILLBOARD_UPDATE: 'billboard.update',
  BILLBOARD_DELETE: 'billboard.delete',
  BILLBOARD_FACE_CREATE: 'billboard.face.create',
  NOTIFICATION_CREATE: 'notification.create',
} as const;
export const USER_ACTIVITY_ACTION_VALUES = Object.values(USER_ACTIVITY_ACTIONS);
export type UserActivityAction = (typeof USER_ACTIVITY_ACTIONS)[keyof typeof USER_ACTIVITY_ACTIONS];

export type ActivitySource = 'self' | 'admin' | 'system';

export type ACCESS_TYPES = 'client' | 'console';

export const TOKEN_SCOPES = ['verify-email', 'reset-password'] as const;
export type TokenScope = (typeof TOKEN_SCOPES)[number];

export const USER_ROLES = ['customer', 'admin', 'super-admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const BUSINESS_ROLES = ['owner', 'admin', 'employee'] as const;
export type BusinessRole = (typeof BUSINESS_ROLES)[number];

export const PERMISSION_SLUGS = {
  ADMIN_LIST: 'admin:list',
  ADMIN_VIEW: 'admin:view',
  ADMIN_INVITE: 'admin:invite',
  ADMIN_REINVITE: 'admin:reinvite',
  ADMIN_UPDATE: 'admin:update',
  ADMIN_DELETE: 'admin:delete',
  MANAGE_ROLES: 'manage-roles',
  BUSINESS_CREATE_FOR_CUSTOMER: 'business:create-for-customer',
  BUSINESS_LIST: 'business:list',
  BUSINESS_VIEW: 'business:view',
  BUSINESS_UPDATE: 'business:update',
  BUSINESS_DELETE: 'business:delete',
  BUSINESS_UPDATE_STATUS: 'business:update-status',
  BUSINESS_MANAGE_MEMBERS: 'business:manage-members',
  BUSINESS_VIEW_WALLETS: 'business:view-wallets',
  BUSINESS_VIEW_WALLET_TRANSACTIONS: 'business:view-wallet-transactions',
  BUSINESS_MANAGE_WALLET: 'business:manage-wallet',
  CUSTOMER_VIEW_BOOKINGS: 'customer:view-bookings',
  CUSTOMER_VIEW_PAYMENTS: 'customer:view-payments',
  CUSTOMER_VIEW_NOTIFICATIONS: 'customer:view-notifications',
  CUSTOMER_LIST: 'customer:list',
  CUSTOMER_VIEW: 'customer:view',
  CUSTOMER_CREATE: 'customer:create',
  CUSTOMER_UPDATE: 'customer:update',
  CUSTOMER_DELETE: 'customer:delete',
  CUSTOMER_UPDATE_PREFERENCES: 'customer:update-preferences',
  CUSTOMER_VIEW_DASHBOARD: 'customer:view-dashboard',
  BILLBOARD_VIEW: 'billboard:view',
  BILLBOARD_CREATE: 'billboard:create',
  BILLBOARD_UPDATE: 'billboard:update',
  BILLBOARD_DELETE: 'billboard:delete',
  BILLBOARD_FACE_CREATE: 'billboard.face:create',
  BILLBOARD_FACE_VIEW: 'billboard.face:view',
  BILLBOARD_FACE_UPDATE: 'billboard.face:update',
  BILLBOARD_FACE_DELETE: 'billboard.face:delete',
  BILLBOARD_BOOKING_CREATE: 'billboard.booking:create',
  BILLBOARD_BOOKING_VIEW: 'billboard.booking:view',
  BILLBOARD_BOOKING_UPDATE: 'billboard.booking:update',
  BILLBOARD_BOOKING_DELETE: 'billboard.booking:delete',
  BILLBOARD_BOOKING_REQUEST_VIEW: 'billboard.booking-request:view',
  BILLBOARD_BOOKING_REQUEST_UPDATE: 'billboard.booking-request:update',
  BILLBOARD_BOOKING_REQUEST_DELETE: 'billboard.booking-request:delete',
  BILLBOARD_FACE_STATUS_UPDATE: 'billboard.face:status.update',
  NOTIFICATION_CREATE: 'notification:create',
  AUDIT_LOG_VIEW: 'audit-log:view',
  ADMIN_VIEW_FINANCIAL: 'admin:view-financial',
  ADMIN_VIEW_PERSONAL: 'admin:view-personal',
  ADMIN_VIEW_EMPLOYMENT_SENSITIVE: 'admin:view-employment-sensitive',
  ADMIN_VIEW_EMPLOYMENT_BASIC: 'admin:view-employment-basic',
  ADMIN_UPDATE_FINANCIAL: 'admin:update-financial',
  ADMIN_UPDATE_PERSONAL: 'admin:update-personal',
  ADMIN_UPDATE_EMPLOYMENT_SENSITIVE: 'admin:update-employment-sensitive',
  ADMIN_UPDATE_EMPLOYMENT_BASIC: 'admin:update-employment-basic',
} as const;
export type PermissionSlug = (typeof PERMISSION_SLUGS)[keyof typeof PERMISSION_SLUGS];

export const BUSINESS_MEMBER_PERMISSION_GROUPS: Record<BusinessRole, PermissionSlug[]> = {
  owner: [
    PERMISSION_SLUGS.BUSINESS_UPDATE,
    PERMISSION_SLUGS.BUSINESS_DELETE,
    PERMISSION_SLUGS.BUSINESS_UPDATE_STATUS,
    PERMISSION_SLUGS.BUSINESS_MANAGE_MEMBERS,
    PERMISSION_SLUGS.BUSINESS_VIEW,
    PERMISSION_SLUGS.BUSINESS_VIEW_WALLETS,
    PERMISSION_SLUGS.BUSINESS_VIEW_WALLET_TRANSACTIONS,
    PERMISSION_SLUGS.BUSINESS_MANAGE_WALLET,
    PERMISSION_SLUGS.CUSTOMER_VIEW_BOOKINGS,
    PERMISSION_SLUGS.CUSTOMER_VIEW_PAYMENTS,
    PERMISSION_SLUGS.CUSTOMER_VIEW_NOTIFICATIONS,
  ],
  admin: [
    PERMISSION_SLUGS.BUSINESS_UPDATE,
    PERMISSION_SLUGS.BUSINESS_MANAGE_MEMBERS,
    PERMISSION_SLUGS.BUSINESS_VIEW,
    PERMISSION_SLUGS.BUSINESS_VIEW_WALLETS,
    PERMISSION_SLUGS.BUSINESS_VIEW_WALLET_TRANSACTIONS,
    PERMISSION_SLUGS.CUSTOMER_VIEW_BOOKINGS,
    PERMISSION_SLUGS.CUSTOMER_VIEW_PAYMENTS,
    PERMISSION_SLUGS.CUSTOMER_VIEW_NOTIFICATIONS,
  ],
  employee: [
    PERMISSION_SLUGS.BUSINESS_VIEW,
    PERMISSION_SLUGS.CUSTOMER_VIEW_BOOKINGS,
    PERMISSION_SLUGS.CUSTOMER_VIEW_NOTIFICATIONS,
  ],
};

export const CURRENCIES = ['₦', '$'] as const;
export type Currency = (typeof CURRENCIES)[number];

export const WALLET_SLUGS = ['main', 'commission', 'referral'] as const;
export type WalletSlug = (typeof WALLET_SLUGS)[number];

export const BUSINESS_MEMBER_PERMISSIONS = [
  'manage-profile',
  'manage-members',
  'manage-bookings',
  'view-financials',
  'manage-payments',
] as const;
export type BusinessMemberPermission = (typeof BUSINESS_MEMBER_PERMISSIONS)[number];

export const EMPLOYEE_STATUSES = ['active', 'probation', 'suspended', 'terminated'] as const;
export type EmployeeStatus = (typeof EMPLOYEE_STATUSES)[number];

export const EMPLOYMENT_TYPES = [
  'full-time',
  'part-time',
  'contract',
  'intern',
  'consultant',
  'temporary',
] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const SHIFT_TYPES = ['morning', 'evening', 'night', 'flexible', 'custom'] as const;
export type ShiftType = (typeof SHIFT_TYPES)[number];

export const WORK_LOCATION_TYPES = ['remote', 'hybrid', 'on-site'] as const;
export type WorkLocationType = (typeof WORK_LOCATION_TYPES)[number];

export const PROBATION_STATUSES = ['active', 'completed', 'extended', 'terminated'] as const;
export type ProbationStatus = (typeof PROBATION_STATUSES)[number];

export const DEPARTMENT_STATUSES = ['active', 'inactive', 'archived'] as const;
export type DepartmentStatus = (typeof DEPARTMENT_STATUSES)[number];

export const EMPLOYEE_EVENT_TYPES = [
  'position-change',
  'department-transfer',
  'status-change',
] as const;
export type EmployeeEventType = (typeof EMPLOYEE_EVENT_TYPES)[number];

export const BUSINESS_STATUSES = [
  'pending',
  'active',
  'inactive',
  'suspended',
  'deleted',
  'blacklisted',
] as const;
export type BusinessStatus = (typeof BUSINESS_STATUSES)[number];

export const BUSINESS_MEMBERSHIP_STATUSES = ['active', 'inactive', 'removed'] as const;
export type BusinessMembershipStatus = (typeof BUSINESS_MEMBERSHIP_STATUSES)[number];

export const GENDERS = ['male', 'female', 'others'] as const;
export type Gender = (typeof GENDERS)[number];

export const ACCOUNT_STATUSES = [
  'unverified',
  'active',
  'suspended',
  'deleted',
  'blacklisted',
  'invited',
] as const;
export type AccountStatus = (typeof ACCOUNT_STATUSES)[number];

export const TRANSACTION_STATUSES = [
  'pending',
  'processing',
  'succeeded',
  'failed',
  'refunded',
  'reversed',
  'cancelled',
] as const;
export type TransactionStatus = (typeof TRANSACTION_STATUSES)[number];

export const TRANSACTION_TYPES = [
  'booking_payment',
  'booking_refund',
  'manual_credit',
  'manual_debit',
  'adjustment',
] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const TRANSACTION_METHODS = ['online', 'bank_transfer', 'cash', 'manual'] as const;
export type TransactionMethod = (typeof TRANSACTION_METHODS)[number];

export const TRANSACTION_CHANNELS = ['customer_portal', 'admin_console', 'system', 'api'] as const;
export type TransactionChannel = (typeof TRANSACTION_CHANNELS)[number];

export const BILLBOARD_SIZE_UNITS = ['m', 'ft'] as const;
export type BillboardSizeUnit = (typeof BILLBOARD_SIZE_UNITS)[number];

export const BILLBOARD_TYPES = [
  'backlit-lightbox',
  'lightbox',
  'unipole',
  'wallscape',
  'bridge',
  'rooftop',
  'other',
] as const;
export type BillboardType = (typeof BILLBOARD_TYPES)[number];

export const BILLBOARD_STATUSES = ['active', 'inactive', 'maintenance'] as const;
export type BillboardStatus = (typeof BILLBOARD_STATUSES)[number];

export const BILLBOARD_FACE_LIGHTING = ['frontlit', 'backlit', 'none'] as const;
export type BillboardFaceLighting = (typeof BILLBOARD_FACE_LIGHTING)[number];

export const BILLBOARD_FACE_CONDITIONS = [
  'operational',
  'needs_maintenance',
  'out_of_service',
] as const;
export type BillboardFaceCondition = (typeof BILLBOARD_FACE_CONDITIONS)[number];

export const BILLBOARD_FACE_STATUSES = ['active', 'inactive'] as const;
export type BillboardFaceStatus = (typeof BILLBOARD_FACE_STATUSES)[number];

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

export const MONTHLY_BILLING_MODES = ['prorata', 'rolling30'] as const;
export type MonthlyBillingMode = (typeof MONTHLY_BILLING_MODES)[number];

export const COMPANY_KEYS = ['pinpoint-global', 'pin-global'] as const;
export type CompanyKey = (typeof COMPANY_KEYS)[number];

export const JOB_TYPES = [
  'deleteFile',
  'inviteAdmin',
  'resetPassword',
  'verificationCode',
  'bookingConfirmation',
  'bookingRequestSubmission',
  'bookingRequestRejection',
  'bookingStatusUpdate',
  'notificationEmail',
  'processPushNotifications',
  'processBugProcessing',
  'processBroadcastNotifications',
  'processMigrations',
  'processUserMigration',
  'processTransactionMigration',
  'dailyBackup',
] as const;

export type JobType = (typeof JOB_TYPES)[number];

export const EMAIL_STATUSES = [
  'pending',
  'sent',
  'delivered',
  'bounced',
  'failed',
  'opened',
  'clicked',
] as const;

export type EmailStatus = (typeof EMAIL_STATUSES)[number];

export const DOCUMENT_STATUSES = ['pending', 'uploaded', 'verified', 'failed', 'expired'] as const;
export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];

export type UploadIntent =
  | 'avatar'
  | 'logo'
  | 'billboard-image'
  | 'face-image'
  | 'billboard-transaction'
  | 'other';
export type EntityType = 'customer' | 'admin' | 'business' | 'billboard' | 'billboard-face';

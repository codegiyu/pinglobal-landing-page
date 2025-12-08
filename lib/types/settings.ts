export interface ISettings {
  name: 'settings';
  lastUpdatedBy: string;
  authSettings: AuthSettings;
  supportSettings: SupportSettings;
  socialMediaSettings: SocialMediaSettings;
  consultationSettings: ConsultationSettings;
  depositSettings: DepositSettings;
  withdrawalSettings: WithdrawalSettings;
}

export type ValidSettingName = keyof ISettings;
export type ValidSettingsSlice = {
  [K in ValidSettingName]: ISettings[K];
}[ValidSettingName];

export interface DepositSettings {
  permission: string;
  isEnabled: boolean;
  minDeposit: number;
  maxDeposit: number;
  providers: Record<string, DepositProvider>;
}

export interface DepositProvider {
  isEnabled: boolean;
  displayName: string;
  colorHex: string;
  gatewayFee: TxCharge;
}

export interface TxCharge {
  charge: number;
  isPercentage: boolean;
  capped: number;
}

export interface WithdrawalSettings {
  permission: string;
  isEnabled: boolean;
  minWithdrawal: number;
  maxWithdrawal: number;
  providers: Record<string, WithdrawalProvider>;
}

export interface WithdrawalProvider {
  isEnabled: boolean;
  displayName: string;
  colorHex: string;
  gatewayFee: TxCharge;
  customerFee: TxCharge;
}

export interface AuthSettings {
  permission: string;
  enableSignIn: boolean;
  enableSignUp: boolean;
}

export interface ConsultationSettings {
  permission: string;
  isBookingEnabled: boolean;
  isJitsiConsultationEnabled: boolean;
}

export type SupportSettings = Record<'email' | 'phoneNumber', SupportDetail> & {
  permission: string;
};

export interface SupportDetail {
  value: string;
  isVisible: boolean;
}

export interface SocialMediaSettings {
  permission: string;
  platforms: Record<string, SocialMediaDetail>;
}

export interface SocialMediaDetail {
  displayName: string;
  value: string;
  isVisible: boolean;
}

import type { TheConfig } from '@/config/config';

export type Config = Required<
  TheConfig & {
    message?: {
      email?: {
        pass: string;
        from: string;
        port?: number;
        host?: string;
        to?: string;
      };
    };
  }
>;

export type MabEmptyConfig = Config | undefined;
export type ConfigArray = MabEmptyConfig[];

export interface MultiConfig {
  account: Config[];
  message: Config['message'];
}

export type CouponBalanceUseType = '充电' | '电池' | 'charge' | 'battery';

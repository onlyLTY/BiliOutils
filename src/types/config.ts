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
    lottery: {
      actFollowMsg?: 'read' | 'del' | 'delete' | 'none' | undefined;
      scanFollow?: string | 'only';
    };
  }
>;

export interface MultiConfig {
  account: Config[];
  message: Config['message'];
}

export type CouponBalanceUseType = '充电' | '电池' | 'charge' | 'battery';

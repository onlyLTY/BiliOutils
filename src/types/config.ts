import type { TheConfig } from '@/config/config';

type MessageType = {
  message: {
    email: {
      pass: string;
      from: string;
      port: number;
      host: string;
      to: string;
    };
  };
};

// 必选项
type RequiredConfig = {
  cookie: string;
};

type CommonBase = {
  __common__: boolean;
};

export type CommonConfig = Omit<UserConfig, 'cookie' | 'accessKey'> & CommonBase;

export type Config = Required<TheConfig & MessageType>;

export type UserConfig = RecursivePartial<TheConfig & MessageType> & RequiredConfig;

export type MabEmptyConfig = UserConfig | undefined;
export type ConfigArray = MabEmptyConfig[];

export type CouponBalanceUseType = '充电' | '电池' | 'charge' | 'battery';

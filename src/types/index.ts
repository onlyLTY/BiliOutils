export * from './config';
export * from './LiveHeart';
export * from './scf';
export * from './fc';

export type IdType = number | string;
export type SLSType = 'scf' | 'fc' | 'cfc' | 'agc' | 'hg';
export interface CronDateType {
  hours: number;
  minutes: number;
  seconds?: number;
}

export interface ActivityLotteryIdType {
  sid: string;
  title?: string;
}

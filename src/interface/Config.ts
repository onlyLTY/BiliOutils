export interface Config {
  cookie: string;
  message?: {
    email?: {
      from: string;
      to?: string;
      pass: string;
      host: string;
      port?: number;
    };
    serverChan?: string;
  };
  function?: {
    silver2Coin?: boolean;
    liveSignTask?: boolean;
    addCoins?: boolean;
    mangaSign?: boolean;
    shareAndWatch?: boolean;
    supGroupSign?: boolean;
    judgement?: boolean;
  };
  targetLevel?: number;
  stayCoins?: number;
  userAgent?: string;
  dailyRunTime?: string;
  targetCoins?: number;
  customizeUp?: number[];
  coinRetryNum?: number;
  apiDelay?: [number, number] | number;
  upperAccMatch?: boolean;
}

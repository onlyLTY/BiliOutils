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
    pushplusToken?: string;
  };
  function?: {
    silver2Coin?: boolean;
    liveSignTask?: boolean;
    addCoins?: boolean;
    mangaSign?: boolean;
    shareAndWatch?: boolean;
    supGroupSign?: boolean;
    liveSendMessage?: boolean;
    charging?: boolean;
    getVipPrivilege?: boolean;
    giveGift?: boolean;
    matchGame?: boolean;
  };
  targetLevel?: number;
  stayCoins?: number;
  userAgent?: string;
  dailyRunTime?: string;
  heartRunTime?: string;
  targetCoins?: number;
  customizeUp?: number[];
  giftUp?: number[];
  coinRetryNum?: number;
  apiDelay?: [number, number] | number;
  upperAccMatch?: boolean;
  chargeUpId: number;
  chargePresetTime: number;
  matchCoins: number;
  matchSelection: number;
  sls: {
    appName: string;
    name: string;
    description?: string;
    region?: string;
  };
}

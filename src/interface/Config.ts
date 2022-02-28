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
    api?: string;
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
    liveHeart?: boolean;
  };
  targetLevel?: number;
  stayCoins?: number;
  userAgent?: string;
  dailyRunTime?: string;
  heartRunTime?: string;
  targetCoins?: number;
  customizeUp?: number[];
  apiDelay?: [number, number] | number;
  giftUp?: number[];
  coinRetryNum?: number;
  upperAccMatch?: boolean;
  chargeUpId?: number;
  chargePresetTime?: number;
  matchCoins?: number;
  matchSelection?: number;
  matchDiff?: number;
  /** 新的配置方式 */
  match?: {
    coins?: number;
    selection?: number;
    diff?: number;
  };
  charge?: {
    mid?: number;
    presetTime?: number;
  };
  gift?: {
    mid?: number;
  };
  coin?: {
    customizeUp?: number[];
    retryNum?: number;
    upperAccMatch?: boolean;
    targetLevel?: number;
    stayCoins?: number;
    targetCoins?: number;
  };
  sls?: {
    appName: string;
    name: string;
    description?: string;
    region?: string;
    dailyRunTime?: string;
    heartRunTime?: string;
  };
}

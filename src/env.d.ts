declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUSHPLUS_TOKEN?: string;
      IS_LOCAL?: string;
      BILITOOLS_CONFIG?: string;
      LIVE_HEART_FORCE?: string;
      TENCENT_SECRET_ID?: string;
      TENCENT_SECRET_KEY?: string;
      ALI_SECRET_ID?: string;
      ALI_SECRET_KEY?: string;
      CONFIG_ITEM_INDEX?: string;
      USE_NETWORK_CODE?: string;
    }
  }
}
export {};

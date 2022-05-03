declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PUSHPLUS_TOKEN?: string;
      /** 使用 SCF 时直接通过环境变量配置 */
      BILI_SCF_CONFIG?: string;
      TENCENT_SECRET_ID?: string;
      TENCENT_SECRET_KEY?: string;
      ALI_SECRET_ID?: string;
      ALI_SECRET_KEY?: string;
    }
  }
}
export {};

export type SCFEvent = {
  key1?: string; // 手动执行时会有
  key2?: string; // 手动执行时会有
  /** 附带信息 */
  Message?: string;
  Time?: string;
  TriggerName?: string;
  /** 触发器类型 */
  Type?: string;
};

export type SCFContext = {
  callbackWaitsForEmptyEventLoop: unknown;
  getRemainingTimeInMillis: unknown;
  memory_limit_in_mb: number;
  time_limit_in_ms: number;
  request_id: string;
  environment: string;
  environ: string;
  function_version: string;
  function_name: string;
  namespace: string;
  tencentcloud_region: string;
  tencentcloud_appid: string;
  tencentcloud_uin: string;
};

// https://help.aliyun.com/document_detail/426947.html
export interface FCContext {
  requestId: string;
  credentials: {
    accessKeyId?: string;
    accessKeySecret?: string;
    securityToken?: string;
  };
  function: { name: string; handler: string; memory: number; timeout: number };
  service: {
    name: string;
    qualifier: string;
    logProject?: string;
    logStore?: string;
    versionId?: unknown;
  };
  /* 区域 */
  region: string;
  accountId: string;
  logger: {
    // 与 requestId 相同
    requestId: string;
    logLevel: string;
  };
  retryCount: number;
  tracing: {
    openTracingSpanBaggages: Record<string, unknown>;
    openTracingSpanContext?: unknown;
    jaegerEndpoint?: unknown;
  };
  waitsForEmptyEventLoopBeforeCallback: boolean;
}

export interface FCEvent {
  /** eg: '2022-05-03T11:10:00Z' */
  triggerTime: string;
  triggerName: string;
  payload: string;
  [key: string]: unknown;
}

export type FCCallback = (err?: Error, message?: string) => void;

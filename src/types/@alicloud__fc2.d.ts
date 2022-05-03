// https://doxmate.cool/aliyun/fc-nodejs-sdk/api.html
declare module '@alicloud/fc2' {
  interface FCClientProp {
    accessKeyID;
    accessKeySecret;
    region: string;
    timeout?: string; // Request timeout in milliseconds, default is 10s
  }

  interface TriggerConfig {
    payload?: string;
    cronExpression?: string;
    enable?: boolean;
  }

  interface TriggerOptions {
    invocationRole?: unknown;
    sourceArn?: string;
    triggerType?: string;
    triggerName?: string;
    triggerConfig?: TriggerConfig;
  }

  interface TriggerResponse {
    headers: {
      'content-type': string;
      date: string;
      'content-length': string;
      [key: string]: string;
    };
    data: {
      triggerName: string;
      description: string;
      triggerType: string;
      triggerId: string;
      sourceArn: string;
      invocationRole: null;
      qualifier: string;
      urlInternet: null;
      urlIntranet: null;
      triggerConfig: TriggerConfig;
      createdTime: string;
      lastModifiedTime: string;
    };
  }

  export default class {
    constructor(accountId: string, props: FCClientProp);

    createTrigger(serviceName: string, functionName: string, options: TriggerOptions);

    getTrigger(
      serviceName: string,
      functionName: string,
      triggerName: string,
    ): Promise<TriggerResponse>;

    updateTrigger(
      serviceName: string,
      functionName: string,
      triggerName: string,
      options: TriggerOptions,
    ): Promise<TriggerResponse>;

    deleteTrigger(
      serviceName: string,
      functionName: string,
      triggerName: string,
    ): Promise<TriggerResponse>;
  }
}

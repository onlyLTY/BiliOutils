import { envCommaArray, envToNumber } from './envUtil';

//默认的任务配置
export abstract class TaskConfig {
  /**bilibili账号的jct */
  static readonly BILIJCT: string = process.env.BILIJCT || process.env.BILI_JCT; //变量名兼容

  /**操作用户的bilibili uid */
  static readonly USERID: number = envToNumber('USERID');

  /** 用于登录的token */
  static readonly SESSDATA: string = process.env.SESSDATA;

  /**用于鉴权的cookie 必须传入USERID,SESSDATA,BILIJCT三个环境变量*/
  static readonly COOKIT: string = `DedeUserID=${TaskConfig.USERID};SESSDATA=${TaskConfig.SESSDATA};bili_jct=${TaskConfig.BILIJCT};`;

  /**【可选】用户代理(浏览器) */
  static readonly USER_AGENT: string = process.env.USER_AGENT;

  /** 预计投币数,默认5 */
  static readonly BILI_TARGET_COINS: number =
    envToNumber('BILI_TARGET_COINS') ?? 5;

  private static biliApiDelay = envCommaArray('BILI_API_DELAY', true);
  /** 调用api时的延迟(单位s),默认2s至6s */
  static readonly BILI_API_DELAY: number[] = TaskConfig.biliApiDelay.length
    ? TaskConfig.biliApiDelay
    : [2, 6];

  /**自定义高优先级用户列表 */
  static readonly BILI_CUSTOMIZE_UP: Array<number> = envCommaArray(
    'BILI_CUSTOMIZE_UP'
  );

  /** 目标等级 默认6级 */
  static readonly BILI_TARGET_LEVEL: number =
    envToNumber('BILI_TARGET_LEVEL') ?? 6;

  /** 最低剩余硬币数,默认0 */
  static readonly BILI_STAY_COINS: number = envToNumber('BILI_STAY_COINS') ?? 0;
}

//任务完成情况统计
export abstract class TaskModule {
  /**拥有硬币数量 */
  static money: number = 0;
  /**还需要投币数量,初值BILI_TARGET_COINS */
  static coinsTask: number = TaskConfig.BILI_TARGET_COINS;
  /**今日是否已经分享视频 */
  static share: boolean = false;
  /**今日是否已经观看视频 */
  static watch: boolean = false;
}

//风纪委员情况
export abstract class JuryTask {
  static isJury: boolean = false;
  /** 总仲裁数量 */
  static caseNum: number = 0;
  /** 仲裁胜率 */
  static rightRadio: number = 0;
  /** 是否继续进行 */
  static isRun: boolean = true;
  /** 不运行的原因 */
  static noRunMessage: string = '';
}

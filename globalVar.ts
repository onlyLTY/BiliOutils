/**
 * 取得环境变量,并将字符串转化为数字
 * @param key 环境变量名称
 *
 * 不能转化成数字的返回0
 */
function envToNumber(key: string): number {
  const value = process.env[key];
  const valueNum = Number(value);
  if (typeof valueNum === 'number' && !isNaN(valueNum)) {
    return valueNum;
  } else {
    return 0;
  }
}

/**
 * 将逗号分割的字符串转换为数组
 * @param key 环境变量名
 */
function envCommaArray(key: string): Array<any> {
  const value = process.env[key];
  return value ? value.split(',') : [];
}

//默认的任务配置
export module TaskConfig {
  /**bilibili账号的jct */
  export const BILIJCT: string = process.env.BILIJCT || process.env.BILI_JCT; //变量名兼容
  /**操作用户的bilibili uid */
  export const USERID: number = envToNumber('USERID');
  /**用于鉴权的cookie 必须传入USERID,SESSDATA,BILIJCT三个环境变量*/
  export const COOKIT: string = `DedeUserID=${TaskConfig.USERID};SESSDATA=${process.env.SESSDATA};bili_jct=${TaskConfig.BILIJCT};`;
  /**【可选】用户代理(浏览器) */
  export const USER_AGENT: string = process.env.USER_AGENT;
  /** 预计投币数,默认5 */
  export const BILI_TARGET_COINS: number =
    envToNumber('BILI_TARGET_COINS') || 5;
  /** 调用api时的延迟(单位s),默认2s至6s */
  export const BILI_API_DELAY: number = envToNumber('BILI_API_DELAY') * 1000;
  /**自定义高优先级用户列表 */
  export const BILI_CUSTOMIZE_UP: Array<number> = envCommaArray(
    'BILI_CUSTOMIZE_UP'
  );
}

//任务完成情况统计
export module TaskModule {
  /**拥有硬币数量 */
  export let money: number = 0;
  /**还需要投币数量 */
  export let coinsTask: number = TaskConfig.BILI_TARGET_COINS;
  /**今日时候已经分享视频 */
  export let share: boolean = false;
  /**今日时候已经观看视频 */
  export let watch: boolean = false;
}

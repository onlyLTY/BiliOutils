//注意顺序
export module TaskConfig {
  export const TARGET_COINS: number =
    Number(process.env.BILI_TARGET_COINS) || 5;
  export const TARGET_EXP: number = TARGET_COINS * 10;
}

export module TaskModule {
  export let money: number = 0;
  export let coinsTask: number = TaskConfig.TARGET_COINS;
  export let share: boolean = false;
  export let watch: boolean = false;
}

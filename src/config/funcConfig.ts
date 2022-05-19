const functionConfig = {
  silver2Coin: true,
  liveSignTask: true,
  addCoins: true,
  mangaSign: false,
  shareAndWatch: true,
  supGroupSign: false,
  liveSendMessage: false,
  taskReward: true,
  charging: false,
  getVipPrivilege: false,
  giveGift: false,
  matchGame: false,
  liveLottery: false,
};

export function getFunctionConfig() {
  return { ...functionConfig };
}

export default getFunctionConfig;

export type FunctionConfig = typeof functionConfig;

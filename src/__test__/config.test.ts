import { defaultConfig, getDefaultConfig, mergeConfig } from '../config/config';

const cookie = `PVID=2; b_lsid=DC1063E54_17E335AC2B4; innersign=1; buvid3=3EC0C0B1-BE9D-A31D-634B-DE9FEBBE438293482infoc; i-wanna-go-back=-1; b_ut=5; _uuid=5CDSADAE8-E10BF-15D4-3549-643624494A3294315infoc; buvid_fp=9D06706F-BDAF-47DB-83C2-B80304C60D9ASDJH623infoc; sid=80t40970; fingerprint=9bf21321335233b0d958e26edff5c6; buvid_fp_plain=9D06706F-BDAF-47DB-83C2-B80304C60D9C167623infoc; SESSDATA=8fd23sdasdb3912312552%asdsa%2C236f1%2A11; bili_jct=asjdklha17238213b213gc213; DedeUserID=11111111; DedeUserID__ckMd5=sjakdjashdjsagdjsdsd; bp_video_offset_415244372=29738123716235135; CURRENT_FNVAL=2000; blackside_state=0; CURRENT_BLACKGAP=0; rpdid=0zbfAHYASDASDSDM|X9|3w1N5JkB`;

// 是否成功处理兼容
const userConfig = {
  cookie,
  targetLevel: 1,
  stayCoins: 1,
  targetCoins: 1,
  customizeUp: [1],
  giftUp: [1],
  coinRetryNum: 1,
  chargeUpId: 1,
  chargePresetTime: 1,
  matchCoins: 1,
  matchSelection: 1,
  matchDiff: 1,
  intimacy: {
    liveSendMessage: true,
    liveShare: false,
    liveLike: false,
    whiteList: [1],
    blackList: undefined,
  },
};
const theConfig = {
  BILIJCT: 'asjdklha17238213b213gc213',
  USERID: 11111111,
  cookie,
  message: {
    email: {
      host: 'smtp.163.com',
      port: 465,
    },
    api: undefined,
    pushplusToken: process.env.PUSHPLUS_TOKEN,
  },
  function: {
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
    liveRedPack: false,
    liveIntimacy: false,
  },
  apiDelay: [2, 6],
  userAgent: '',
  dailyRunTime: '17:30:00-23:40:00',
  match: {
    coins: 1,
    selection: 1,
    diff: 1,
  },
  charge: {
    mid: 1,
    presetTime: 1,
  },
  gift: {
    mids: [1],
  },
  coin: {
    customizeUp: [1],
    retryNum: 1,
    targetLevel: 1,
    stayCoins: 1,
    targetCoins: 1,
  },
  sls: {
    name: '',
    description: '',
    region: 'ap-chengdu',
    dailyRunTime: '17:30:00-23:40:00',
  },
  lottery: {
    excludeAward: [
      '舰',
      '船',
      '航海',
      '代金券',
      '优惠券',
      '自拍',
      '照',
      '写真',
      '图',
      '提督',
      '车车一局',
      '再来一局',
      '游戏道具',
    ],
    includeAward: ['谢'],
    blackUid: [65566781, 1277481241, 1643654862, 603676925],
    isMoveTag: true,
    moveTag: '天选时刻',
    pageNum: 2,
    actFollowMsg: 'read',
    scanFollow: undefined,
    skipNeedFollow: false,
  },
  redPack: {},
  intimacy: {
    liveSendMessage: true,
    liveShare: false,
    liveLike: false,
    whiteList: [1],
    blackList: [],
    liveHeart: false,
  },
};
const newConfig = mergeConfig(userConfig);

describe('config 配置测试', () => {
  test('defaultConfig 引用不一致', () => {
    expect(getDefaultConfig()).not.toBe(defaultConfig);
    expect(getDefaultConfig().message.email).not.toBe(defaultConfig.message.email);
  });

  test('最终结果符合预期？', () => {
    expect(newConfig).toEqual(theConfig);
  });
});

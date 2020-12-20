import { JuryVoteOption } from '../interface/Jury';
import { JuryCaseInfoDto, JuryVoteOpinionDto } from '../dto/Jury.dto';
import {
  juryCaseInfo,
  juryCaseObtain,
  juryInfo,
  juryVote,
  juryVoteOpinion,
} from '../net/juryRequest';
import { JuryTask } from '../config/globalVar';
import { apiDelay, random } from '../utils';

const prohibitWords = require('../config/prohibitWords.json');

type VoteType = JuryVoteOption['vote'];
type VoteOpinion = JuryVoteOpinionDto['data'];

enum Vote {
  '未投票',
  '封禁',
  '保留',
  '弃权',
  '删除',
}

/**
 * 获取个人仲裁信息
 */
async function getJuryInfo() {
  const { data, code, message } = await juryInfo();
  if (code === 25005) {
    console.log('未成为风纪委员,请在小黑屋中进行申请');
    return;
  }
  if (code !== 0) {
    console.log('获取个人信息失败!!! ', code, message);
    return;
  }
  if (data.status === 2) {
    console.log('你的风纪委员资格已经过期!');
    return;
  }
  console.log(
    `${data.uname}:
     仲裁总数:${data.caseTotal},
     仲裁胜率:${data.rightRadio}%,
     资格剩余天数:${data.restDays}天`
  );

  JuryTask.isJury = true;
  return true;
}

/**
 * 获取一个案件
 */
async function getJuryCaseObtain() {
  const { data, code, message } = await juryCaseObtain();
  if (code === 25008) {
    console.log((JuryTask.noRunMessage = '没有新的案件了'));
    JuryTask.isRun = false;
    return;
  }
  if (code === 25014) {
    console.log(
      (JuryTask.noRunMessage = '今日的案件已经审核完成'),
      ++JuryTask.dailyCompleteCount
    );
    JuryTask.isRun = false;
    return;
  }
  if (code !== 0) {
    console.log('获取案件失败: ', code, message);
    return;
  }
  console.log('获得新案件: ', data.id);

  return data.id;
}

/**
 * 获取一个案件的详细信息
 * @param cid 案件id
 */
async function getJuryCaseInfo(
  cid: number | string
): Promise<JuryCaseInfoDto['data']> {
  const { data, message, code } = await juryCaseInfo(cid);
  if (code !== 0) {
    console.log('获取案件详情失败: ', code, message);
    return;
  }
  console.log('获取信息成功');

  return data;
}

/**
 * 获取正反方留言人数
 * @param cid 案件id
 * @param otype 1 支持删除 2 支持保留
 */
async function getJuryVoteOpinion(
  cid: string | number,
  otype: 1 | 2 = 1
): Promise<VoteOpinion | undefined> {
  try {
    const { data, message, code } = await juryVoteOpinion(cid, otype);
    if (code !== 0) {
      console.log('获取案件意见失败(仅报告): ', code, message);
      return;
    }
    console.log(`获取${otype == 1 ? '红方' : '蓝方'}意见成功`);

    return data;
  } catch (error) {
    console.log('获取案件意见异常(仅报告): ', error);
    return;
  }
}

function containProhibit(words: string[], str: string): boolean {
  return words.some((el) => {
    return str.indexOf(el) !== -1;
  });
}

function makeDecision({
  voteDelete = 0,
  voteBreak = 0,
  voteRule = 0,
  originContent,
  voteOpinionBlue,
  voteOpinionRed,
}: {
  voteDelete?: number;
  voteBreak?: number;
  voteRule?: number;
  originContent: string;
  voteOpinionBlue: VoteOpinion;
  voteOpinionRed: VoteOpinion;
}): VoteType {
  //瞎鸡*巴计算怎么投票
  let myVote: VoteType = 0;

  const opinionRedCount = voteOpinionRed?.count;
  const opinionBlueCount = voteOpinionBlue?.count;

  const banOfRed =
    voteOpinionRed?.opinion?.filter((el) => el.vote === Vote['封禁']) || [];
  const ban = containProhibit(prohibitWords, originContent);

  //大家都说你
  if (ban && originContent.length < 6) {
    //就这几个字你好含有地域黑嫌疑词
    console.log('应该是地域黑吧?');
    myVote = Vote['封禁'];
  } else if (opinionRedCount > 3 && banOfRed.length / opinionRedCount >= 0.8) {
    //>3 还是严谨点
    console.log('多人发布观点表示封禁');
    myVote = Vote['封禁'];
  } else if (voteDelete > 200 && voteRule < 20) {
    myVote = Vote['删除'];
  } else if (voteRule > voteDelete * 2 && voteRule > 200) {
    //保留的人多
    myVote = Vote['保留'];
  } else if (voteDelete > voteRule * 2 && voteRule > 100) {
    //删除的人多
    myVote = Vote['删除'];
  } else if (opinionRedCount >= 5 && opinionBlueCount <= 1) {
    //删除的人还是挺多的
    myVote = Vote['删除'];
  } else if (opinionBlueCount >= 7 && opinionRedCount === 0) {
    //保留的人确实多
    if (voteRule > voteDelete) {
      myVote = Vote['保留'];
    } else {
      myVote = Vote['删除'];
    }
  } else if (voteDelete > voteRule && opinionRedCount > opinionBlueCount) {
    myVote = Vote['删除'];
  } else if (voteDelete < voteRule && opinionRedCount < opinionBlueCount) {
    myVote = Vote['保留'];
  } else {
    //投删除就对了
    myVote = Vote['删除'];
  }
  return myVote;
}

/**
 * 执行一次投票
 * @param delayTime 每次操作获取到投票的间隔时间
 */
export async function doOneJuryVote(delayTime: number) {
  const DELAY_TIME = delayTime / 2;
  try {
    /** 获取一个案件 */
    const caseObtainId = await getJuryCaseObtain();
    if (caseObtainId === undefined) return;
    await apiDelay(600);

    /** 获取案件的详细信息 */
    let caseObtainInfo = await getJuryCaseInfo(caseObtainId);

    //id在,没信息就再获取
    while (caseObtainId && !caseObtainInfo) {
      await apiDelay();
      caseObtainInfo = await getJuryCaseInfo(caseObtainId);
    }

    const { voteBreak, voteDelete, voteRule, originContent } = caseObtainInfo;

    await apiDelay(DELAY_TIME);
    /** 获取双方评论人数 */
    const voteOpinionRed = await getJuryVoteOpinion(caseObtainId, 1);
    const voteOpinionBlue = await getJuryVoteOpinion(caseObtainId, 2);
    let myVote: VoteType = 0;

    myVote = makeDecision({
      originContent,
      voteBreak,
      voteDelete,
      voteRule,
      voteOpinionBlue,
      voteOpinionRed,
    });

    /** 投票配置 */
    const options: JuryVoteOption = { attr: 1, vote: myVote };

    await apiDelay(DELAY_TIME);
    /** 投票 */
    let { code, message } = await juryVote(caseObtainId, options);
    if (code === 25012) {
      console.log('重复投票');
      return;
    }
    if (code === -400) {
      console.log('参数错误: ', code, message);
      return;
    }
    if (code !== 0) {
      console.log('投票失败: ', code, message);
      //再试一次
      const data = await juryVote(caseObtainId, options);
      code = data.code;
      message = data.message;
      return;
    }

    JuryTask.caseNum++;
    console.log(
      `
      处理案件数:${JuryTask.caseNum} -- 案件id:${caseObtainId} 
      评审内容:${originContent}
      红方人数:${voteDelete}/评论数:${voteOpinionRed.count}
      蓝方人数:${voteRule}/评论数:${voteOpinionBlue.count}
      弃权人数:${voteBreak}
      本人投票:【${Vote[myVote]}】
      `
    );
  } catch (error) {
    console.log('风纪委员投票异常', error);
  }
}

/**
 * 循环进行风纪委员任务
 */
export default async function judgement() {
  console.log('----【风纪委员任务】----');

  /** 获取一下信息 */
  const userInfo = await getJuryInfo();
  if (userInfo === undefined) {
    console.log('主函数中获取信息失败');
    return;
  }

  while (JuryTask.isRun) {
    await apiDelay();
    await doOneJuryVote(random(12000, 30000));
  }

  console.log(`一共处理了${JuryTask.caseNum}件案件`);
}

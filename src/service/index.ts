import liveSignTask from './liveSignTask';
import loginTask from './loginTask';
import taskReward from './taskReward';
import shareAndWatch from './shareAndWatch';
import addCoins from './addCoins';
import mangaSign from './mangaTask';
import silver2Coin from './silver2Coin';
import supGroupSign from './supGroupSign';
import judgement, { doOneJuryVote } from './judgement';
import liveSendMessage from './sendLiveMsg';

export { loginTask, taskReward, doOneJuryVote };

export default {
  liveSignTask,
  shareAndWatch,
  silver2Coin,
  addCoins,
  mangaSign,
  supGroupSign,
  judgement,
  liveSendMessage
};

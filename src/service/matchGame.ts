import { TaskConfig, TaskModule } from '../config/globalVar';
import { getGuessCollection, guessAdd } from '../net/matchGameRequest';
import { GuessCollectionDto } from '../dto/matchGameDto';

// 0 反选，大于 0 正选
const InvertSelection = 0;

export default async function matchGame() {
  console.log('----【赛事硬币竞猜】----');

  if (isLackOfCoin()) {
    return;
  }

  const list = await getOneGuessCollection();
  if (!list) {
    return;
  }

  const count = await guessOne(list);
  console.log(`【竞猜结束】一共参与${count}次预测`);
}

async function getOneGuessCollection() {
  try {
    const {
      code,
      message,
      data: { list, page },
    } = await getGuessCollection();

    if (code !== 0) {
      console.log('获取赛事错误', code, message);
      return;
    }

    if (page.total === 0) {
      console.log('今日已经无法获取赛事');
      return null;
    }

    return list;
  } catch (error) {}
}

async function guessOne(list: GuessCollectionDto['data']['list']) {
  let count = 0;
  try {
    for (const games of list) {
      const { contest, questions } = games;
      const contestId = contest.id;
      const [{ id: questionsId, title, details, is_guess }] = questions;
      const [team1, team2] = details;

      if (isLackOfCoin()) {
        return count;
      }

      if (is_guess) {
        continue;
      }

      console.log(`${title} <=> ${team1.odds}:${team2.odds}`);

      const oddResult = team1.odds > team2.odds;
      let teamSelect: typeof team1;
      // 正选，赔率越小越选
      if (InvertSelection > 0) {
        teamSelect = oddResult ? team2 : team1;
      } else {
        teamSelect = oddResult ? team1 : team2;
      }

      console.log(`预测[ ${teamSelect.option} ] ${5} 颗硬币`);

      const { code } = await guessAdd(contestId, questionsId, teamSelect.detail_id, 5);
      if (code !== 0) {
        console.log('预测失败');
      } else {
        count++;
        TaskModule.money -= 5;
      }
      return count;
    }
  } catch (error) {}
  return count;
}

function isLackOfCoin() {
  if (TaskModule.money - 5 < TaskConfig.BILI_TARGET_COINS) {
    console.log(`需要保留${TaskConfig.BILI_TARGET_COINS}个硬币，任务结束`);
    return true;
  }
  return false;
}

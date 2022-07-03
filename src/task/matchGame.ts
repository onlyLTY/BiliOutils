import { TaskConfig, TaskModule } from '../config/globalVar';
import { getGuessCollection, guessAdd } from '../net/match-game.request';
import { GuessCollectionDto } from '../dto/match-game.dto';
import { apiDelay } from '../utils';
import { logger } from '../utils/log';

export default async function matchGame() {
  logger.info('----【赛事硬币竞猜】----');
  const { match } = TaskConfig;

  if (match.coins <= 0) {
    logger.info('硬币数量不能小于 0');
    return;
  }

  if (isLackOfCoin()) {
    return;
  }

  const list = await getOneGuessCollection();
  await apiDelay();

  if (!list) {
    return;
  }

  const count = await guessOne(filterList(list, match.diff));
  logger.info(`【竞猜结束】一共参与${count}次预测`);
}

/**
 * 过滤掉差值小于 n 的赛事
 */
function filterList(list: GuessCollectionDto['data']['list'], n: number) {
  return list.filter(item => {
    const { questions } = item;
    const [{ details, is_guess }] = questions;
    if (is_guess) {
      return false;
    }
    const [team1, team2] = details;
    const diff = Math.abs(team1.odds - team2.odds);
    return diff >= n;
  });
}

async function getOneGuessCollection() {
  try {
    const {
      code,
      message,
      data: { list, page },
    } = await getGuessCollection();

    if (code !== 0) {
      logger.warn(`获取赛事错误 ${code} ${message}`);
      return;
    }

    if (page.total === 0) {
      logger.info('今日已经无法获取赛事');
      return null;
    }

    return list;
  } catch (error) {
    logger.debug(error.message);
  }
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

      logger.info(`${title} <=> ${team1.odds}:${team2.odds}`);

      const oddResult = team1.odds > team2.odds,
        { match } = TaskConfig;
      let teamSelect: typeof team1;
      // 正选，赔率越小越选
      if (match.selection > 0) {
        teamSelect = oddResult ? team2 : team1;
      } else {
        teamSelect = oddResult ? team1 : team2;
      }

      logger.info(`预测[ ${teamSelect.option} ] ${match.coins} 颗硬币`);

      await apiDelay();
      const { code } = await guessAdd(contestId, questionsId, teamSelect.detail_id, match.coins);
      if (code !== 0) {
        logger.info('预测失败');
      } else {
        count++;
        TaskModule.money -= match.coins;
      }
    }
  } catch (error) {
    console.warn(error.message);
  }
  return count;
}

function isLackOfCoin() {
  const { coin, match } = TaskConfig;
  if (TaskModule.money - match.coins < coin.stayCoins) {
    logger.info(`需要保留${coin.stayCoins}个硬币，任务结束`);
    return true;
  }
  return false;
}

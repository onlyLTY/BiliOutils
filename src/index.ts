import type { SCFEvent } from './types/scf';
import { dailyMain, liveHeartMain } from './main';
import { Constant } from './config/globalVar';

exports.main_handler = async (event: SCFEvent) => {
  if (event.TriggerName === Constant.HEART_TRIGGER_NAME) {
    return await liveHeartMain(event);
  }
  return await dailyMain(event);
};

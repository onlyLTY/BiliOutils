import { apiDelay, random } from '../util';
import { addShare, uploadVideoHeartbeat } from '../net/videoRequest';
import { getAidByByPriority } from './getOneAid';
import { TaskModule } from '../globalVar';

/**
 * 每日分享/播放视频
 */
export async function shareAndWatch() {
  console.log('----【分享/播放视频】----');
  if (TaskModule.share && TaskModule.watch) {
    console.log('已完成,跳过分享/播放');
    return;
  }
  let gAid = 0;
  //获取aid
  try {
    let biliav = await getAidByByPriority();

    if (biliav.msg === '0') {
      const { aid, author, title } = biliav.data;
      gAid = aid;
      console.log(`获取视频: ${title} --up【${author}】`);
    } else {
      console.log('获取视频失败', biliav.msg);
      return false;
    }
  } catch (error) {
    console.log('获取视频出现异常: ', error.message);
    return false; //不再执行
  }

  //分享
  if (!TaskModule.share) {
    await apiDelay();
    try {
      const { code, message } = await addShare(gAid);
      if (code === 0) {
        console.log(`分享视频成功!`);
      } else {
        console.log('分享视频失败: ', message);
      }
    } catch (error) {
      console.log('分享视频异常: ', error.message);
    }
  }

  //播放视频
  if (!TaskModule.watch) {
    await apiDelay();
    try {
      //随机上传4s到60s
      const { code, message } = await uploadVideoHeartbeat(gAid, random(4, 60));
      if (code === 0) {
        console.log(`播放视频成功!`);
      } else {
        console.log('播放视频失败: ', message);
      }
    } catch (error) {
      console.log('播放视频异常: ', error.message);
    }
  }
}

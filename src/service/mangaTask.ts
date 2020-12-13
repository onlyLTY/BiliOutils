import { clockIn } from '../net/mangaRequest';

export default async function mangaSign() {
  console.log('----【漫画签到】----');
  try {
    const { code } = await clockIn();
    if (code == 0) {
      console.log('漫画签到成功');
    } else {
      console.log('漫画签到失败');
    }
  } catch (error) {
    /**
     * 这是axios报的错误,重复签到后返回的状态码是400
     * 所以将签到成功的情况忽略掉
     */
    if (error.response.status === 400) {
      console.log('已经签到过了,跳过任务');
    } else {
      console.log('漫画签到异常', error.message);
    }
  }
}

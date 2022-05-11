import axios from 'axios';

/**
 * 获取最新版本
 */
export async function getLatestVersion(): Promise<string> {
  const options = {
    timeout: 6000,
  };
  try {
    const res = await Promise.any([
      axios.get('https://api.github.com/repos/catlair/BiliTools/releases/latest', options),
      axios.get('https://gitee.com/api/v5/repos/catlair/BiliTools/releases/latest', options),
    ]);
    return res.data.tag_name;
  } catch (error) {
    return;
  }
}

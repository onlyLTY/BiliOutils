/**
 * 扫码登录
 */
export async function scanLogin(filepath?: string) {
  const { defLogger } = await import('@/utils/log/def');
  try {
    const { pcLogin } = await import('@catlair/blogin');
    const loginInfo = await pcLogin();
    if (!loginInfo) {
      defLogger.error('登录失败/取消登录');
      return;
    }
    defLogger.info('登录成功');
    defLogger.info(JSON.stringify(loginInfo, null, 2));
    // 使用 readConfig 不是为了读取配置，而是为了获取配置文件路径
    if (!filepath) {
      const { readConfig } = await import('@/config/setConfig');
      readConfig();
      filepath = process.env.__BT_CONFIG_PATH__;
    }
    if (!filepath) {
      defLogger.debug('未找到配置文件，请手动配置');
      // 输出 cookie
      defLogger.info(`cookie: ${loginInfo.cookie}`);
      return;
    }
    const { replaceAllCookie } = await import('@/utils/file');
    // 是否替换成功
    if (replaceAllCookie(filepath, loginInfo.mid, loginInfo.cookie)) {
      defLogger.info('已经自动更新配置文件。');
      return;
    }
    defLogger.warn('这是一个新的账号，但我们暂时无法修改 json5 文件，故请手动配置');
    defLogger.info(`cookie: ${loginInfo.cookie}`);
    defLogger.info(`请将以上信息添加到 ${filepath} 中`);
  } catch (error) {
    if (error?.message?.includes('Cannot find module')) {
      defLogger.error('请先运行 yarn add @catlair/blogin');
      return;
    }
    defLogger.error(error);
  }
}

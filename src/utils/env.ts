/**
 * 是否是青龙面板
 */
export const isQingLongPanel = () => {
  return process.env.BARK_GROUP === 'QingLong' || process.env.QL_DIR === '/ql';
};

export function setConfigFileName() {
  const defaultConfigFileName = isQingLongPanel() ? 'cat_bili_config' : 'config',
    ext = '.json';

  const { BILITOOLS_FILE_NAME } = process.env;

  if (BILITOOLS_FILE_NAME) {
    if (BILITOOLS_FILE_NAME.endsWith(ext)) {
      return BILITOOLS_FILE_NAME;
    }
    return `${BILITOOLS_FILE_NAME}${ext}`;
  }

  return defaultConfigFileName + ext;
}

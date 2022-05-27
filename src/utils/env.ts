/**
 * 是否是青龙面板
 */
export const isQingLongPanel = () => {
  // @ts-ignore
  return '__IS_QINGLONG__' === 'true' || process.env.QL_BRANCH;
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

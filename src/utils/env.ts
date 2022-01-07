/**
 * 是否是青龙面板
 */
export const isQingLongPanel = () => {
  return process.env.BARK_GROUP === 'QingLong' || process.env.QL_DIR === '/ql';
};

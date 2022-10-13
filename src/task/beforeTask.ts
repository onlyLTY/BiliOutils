import getNewCookie from './getNewCookie';

export default async function beforeTask() {
  await getNewCookie();
}

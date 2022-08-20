import type { VGotOptions } from '@/types/got';
import { deepMergeObject } from '../pure';
import { getOptions } from './config';
import { BiliGot } from './BiliGot';

export function createRequest(opt: Partial<VGotOptions> = {}) {
  const biliGot = new BiliGot(deepMergeObject(getOptions(), opt));
  biliGot.init();
  return biliGot;
}

export const biliHttp = createRequest();

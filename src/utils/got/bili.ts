import type { VGotOptions } from '@catlair/node-got';
import { deepMergeObject } from '../pure';
import { getOptions } from './config';
import { BiliGot } from './BiliGot';

export function createRequest(opt: Partial<VGotOptions> = {}) {
  return new BiliGot(deepMergeObject(getOptions(), opt));
}

export const biliHttp = createRequest();

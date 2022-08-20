import type { VGotOptions } from '@/types/got';
import { deepMergeObject } from '../pure';
import { VGot } from './Got';
import { getOptions } from './config';

export function createRequest(opt: Partial<VGotOptions> = {}) {
  const vgot = new VGot(deepMergeObject(getOptions(), opt));
  vgot.init();
  return vgot;
}

export const defHttp = createRequest({
  requestOptions: {
    withBiliCookie: false,
  },
});

import { createRequest } from '@catlair/node-got';
import { getOptions } from './config';

export { createRequest };

export const defHttp = createRequest(getOptions());

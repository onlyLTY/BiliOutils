import * as assert from 'assert';
import { mergeHeaders } from '../pure';

const headers1 = {
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};

const headers2 = {
  'content-type': 'application/x-www-form-urlencoded',
  'user-agent': 'xxxxxxxxxxxxxxxxx',
};

const headers = {
  'x-requested-with': 'XMLHttpRequest',
  'content-type': 'application/x-www-form-urlencoded',
  'user-agent': 'xxxxxxxxxxxxxxxxx',
};

assert.deepStrictEqual(mergeHeaders(headers1, headers2), headers);

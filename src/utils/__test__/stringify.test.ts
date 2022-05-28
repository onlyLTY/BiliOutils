import * as assert from 'assert';
import { stringify } from '../pure';

const value = {
  demo: 1,
  statistics: {
    appId: 1,
    platform: 3,
    version: '6.74.0',
    abtest: '',
  },
};

const result =
  'demo=1&statistics=%7B%22appId%22%3A1%2C%22platform%22%3A3%2C%22version%22%3A%226.74.0%22%2C%22abtest%22%3A%22%22%7D';

assert(stringify(value) === result, 'stringify 对象');

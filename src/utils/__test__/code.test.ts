import * as assert from 'assert';
import { md5 } from '../pure';

assert(md5('123') === '202cb962ac59075b964b07152d234b70');

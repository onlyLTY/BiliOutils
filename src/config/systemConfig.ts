import { isQingLongPanel, setConfigFileName } from '../utils/env';

export abstract class SystemConfig {
  static readonly configFileName = setConfigFileName();
  static readonly isQingLongPanel = isQingLongPanel();
}

export default SystemConfig;

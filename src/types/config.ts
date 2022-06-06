import type { TheConfig } from '@/config/config';

export type Config = Required<
  RecursivePartial<TheConfig> & {
    message?: {
      email?: {
        pass: string;
        from: string;
        port?: number;
        host?: string;
        to?: string;
      };
    };
    lottery: {
      actFollowMsg?: 'read' | 'del' | 'delete' | 'none' | undefined;
      scanFollow?: string | 'only';
    };
  }
>;

export interface MultiConfig {
  account: Config[];
  message: Config['message'];
}

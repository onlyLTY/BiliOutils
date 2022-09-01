import { defLogger } from '@/utils/log/def';
import { runInVM } from '@/utils/vm';

export async function useVm(name: string, options?: Record<'event' | 'context', any>, run = true) {
  try {
    if (run || process.env.USE_NETWORK_CODE) {
      return await runInVM(name, options);
    }
  } catch (error) {
    defLogger.error(error);
  }
  return false;
}

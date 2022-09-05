import { runInVM } from '@/utils/vm';

export async function useVm(
  name: string,
  options?: Record<'event' | 'context', any>,
  run = true,
): Promise<boolean | string> {
  try {
    if (run || process.env.USE_NETWORK_CODE) {
      return (await runInVM(name, options)) as string;
    }
  } catch {
    return false;
  }
  return false;
}

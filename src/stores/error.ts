import type { CustomError, ExtendedPostgrestError } from '@/types/Error';
import type { PostgrestError } from '@supabase/supabase-js';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null);

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError | Error;
    customCode?: number;
  }) => {
    // is not a supabase error
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error;
      activeError.value.customCode = customCode || 500;
      return;
    }

    // is a supabase error
    activeError.value = error;
    activeError.value.statusCode = customCode || 500;
  };

  return {
    activeError,
    setError,
  };
});

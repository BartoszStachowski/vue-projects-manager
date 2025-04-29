import type { CustomError, ExtendedPostgrestError } from '@/types/Error';
import type { PostgrestError } from '@supabase/supabase-js';

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | CustomError | ExtendedPostgrestError>(null);

  const setError = ({
    error,
    customCode,
  }: {
    error: string | PostgrestError;
    customCode: number;
  }) => {
    // is not a supabase error
    if (typeof error === 'string') {
      activeError.value = Error(error);
      activeError.value.customCode = customCode;
      return;
    }

    // is a supabase error
    activeError.value = error;
    activeError.value.statusCode = customCode;
  };

  return {
    activeError,
    setError,
  };
});

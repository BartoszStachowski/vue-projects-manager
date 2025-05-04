<script setup lang="ts">
import { supabase } from './lib/supabaseClient';

const errorStore = useErrorStore();
const authStore = useAuthStore();

onErrorCaptured((error) => {
  errorStore.setError({ error });
});

onMounted(async () => {
  const { data } = await supabase.auth.getSession();
  if (data.session?.user) await authStore.setAuth(data.session);
});
</script>

<template>
  <AuthLayout>
    <AppErrorPage v-if="errorStore.activeError" />
    <RouterView v-else v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
          <span>Loading ...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>

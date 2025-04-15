<script setup lang="ts">
import AuthLayout from '@/components/Layout/main/AuthLayout.vue';
</script>

<template>
  <AuthLayout>
    <RouterView v-slot="{ Component, route }">
      <Suspense v-if="Component">
        <Component :is="Component" :key="route.name" />
        <template #fallback>
          <span>Loading ...</span>
        </template>
      </Suspense>
    </RouterView>
  </AuthLayout>
</template>

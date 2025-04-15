<script setup lang="ts">
import { usePageStore } from '@/stores/page.ts';
import { storeToRefs } from 'pinia';

import TopNavbar from '@/components/Layout/TopNavbar.vue';
import Sidebar from '@/components/Layout/Sidebar.vue';

const { pageData } = storeToRefs(usePageStore());
</script>

<template>
  <Sidebar />
  <div class="flex flex-col lg:ml-52 ml-16 transition-[margin]">
    <TopNavbar />
    <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
      </div>
      <slot />
    </main>
  </div>
</template>

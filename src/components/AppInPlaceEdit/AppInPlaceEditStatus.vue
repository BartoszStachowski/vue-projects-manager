<script setup lang="ts">
import type { Database } from 'database/types';
type Status = Database['public']['Enums']['current_status'];

const value = defineModel<Status>();
</script>

<template>
  <div class="text-2xl cursor-pointer">
    <iconify-icon v-if="value === 'completed'" icon="lucide:circle-check" class="text-green-500" />
    <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500" />
  </div>
</template>

<style scoped></style>

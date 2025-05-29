<script setup lang="ts">
const value = defineModel();

defineEmits(['commit']);
</script>
<template>
  <input
    class="w-full focus:outline-hidden p-1 bg-transparent focus:border-none focus:bg-gray-800 focus:rounded-md"
    type="text"
    v-model="value"
    @blur="$emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
  />
</template>

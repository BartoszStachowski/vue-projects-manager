<script setup lang="ts">
const inputValue = defineModel<string>();

const emit = defineEmits(['commit']);

const oldInputValue = ref(inputValue.value);
watch(inputValue, (newValue, oldValue) => {
  oldInputValue.value = oldValue;
});

const emitCommit = () => {
  if (inputValue.value !== oldInputValue.value) {
    emit('commit');
  }
};
</script>
<template>
  <textarea
    class="w-full focus:outline-hidden p-1 bg-transparent focus:border-none focus:bg-gray-800 focus:rounded-md"
    v-model="inputValue"
    @blur="emitCommit"
  />
</template>

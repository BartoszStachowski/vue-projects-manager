<script setup lang="ts">
interface LinkProp {
  title: string;
  to?: string;
  icon: string;
}

defineProps<{
  links: LinkProp[];
}>();

const emit = defineEmits<{
  actionClicked: [string];
}>();

const emitActionClicked = (linkTitle: string) => {
  emit('actionClicked', linkTitle);
};
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink v-if="link.to" activeClass="text-primary bg-muted" :to="link.to" class="nav-link">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </RouterLink>

    <div v-else class="nav-link cursor-pointer" @click="emitActionClicked(link.title)">
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="hidden lg:block text-nowrap">{{ link.title }}</span>
    </div>
  </template>
</template>

<style scoped>
@reference "@/index.css";
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary justify-center lg:justify-normal text-muted-foreground;
}
</style>

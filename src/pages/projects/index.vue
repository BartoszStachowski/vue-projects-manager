<script setup lang="ts">
import { projectsQuery } from '@/utils/supaQueries.ts';
import type { Projects } from '@/utils/supaQueries.ts';
import { columns } from '@/utils/tableColumns/projectsColumns.ts';

usePageStore().pageData.title = 'Projects';

const projects = ref<Projects | null>(null);
const getProjects = async () => {
  const { data, error } = await projectsQuery;

  if (error) console.log(error);

  projects.value = data;
};

await getProjects();
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>

<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns.ts';

usePageStore().pageData.title = 'Projects';

const projectsLoader = useProjectStore();
const { projects } = storeToRefs(projectsLoader);
const { getProjects } = projectsLoader;

await getProjects();

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators();

await getGroupedCollaborators(projects.value);

console.log('test :: ', groupedCollaborators.value);

// getGroupedCollaborators();
</script>

<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<style scoped></style>

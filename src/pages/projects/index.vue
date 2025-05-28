<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectsColumns.ts';

usePageStore().pageData.title = 'Projects';

const projectsLoader = useProjectsStore();
const { projects } = storeToRefs(projectsLoader);
const { getProjects } = projectsLoader;

await getProjects();

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators();

getGroupedCollaborators(projects.value);

const columnsWithCollaborators = columns(groupedCollaborators);
</script>

<template>
  <DataTable v-if="projects" :columns="columnsWithCollaborators" :data="projects" />
</template>

<style scoped></style>

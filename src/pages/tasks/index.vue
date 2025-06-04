<script setup lang="ts">
import { columns } from '@/utils/tableColumns/tasksColumns.ts';

usePageStore().pageData.title = 'Tasks';

const tasksLoader = useTasksStore();
const { tasks } = storeToRefs(tasksLoader);
const { getTasks } = tasksLoader;

await getTasks();

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators();

getGroupedCollaborators(tasks.value ?? []);
const columnsWithCollaborators = columns(groupedCollaborators);
</script>

<template>
  <DataTable v-if="tasks" :columns="columnsWithCollaborators" :data="tasks" />
</template>

<script setup lang="ts">
import { tasksWithProjectsQuery } from '@/utils/supaQueries.ts';
import type { TasksWithProjects } from '@/utils/supaQueries.ts';
import { columns } from '@/utils/tableColumns/tasksColumns.ts';

usePageStore().pageData.title = 'Tasks';

const tasks = ref<TasksWithProjects | null>(null);
const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery;

  if (error) useErrorStore().setError({ error, customCode: status });

  tasks.value = data;
};

await getTasks();
</script>

<template>
  <DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>

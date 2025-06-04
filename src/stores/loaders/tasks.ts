import { tasksWithProjectsQuery, type TasksWithProjects } from '@/utils/supaQueries';

export const useTasksStore = defineStore('task-store', () => {
  const tasks = ref<TasksWithProjects | null>(null);

  const getTasks = async () => {
    tasks.value = null; // Reset tasks before loading

    const { data, error, status } = await tasksWithProjectsQuery;

    if (error) useErrorStore().setError({ error, customCode: status });

    if (data) tasks.value = data;
  };

  return {
    tasks,
    getTasks,
  };
});

import { projectsQuery, type Projects } from '@/utils/supaQueries';

export const useProjectStore = defineStore('project-store', () => {
  const projects = ref<Projects | null>(null);
  const getProjects = async () => {
    if (projects.value?.length) return;

    const { data, error, status } = await projectsQuery;

    if (error) useErrorStore().setError({ error, customCode: status });

    projects.value = data;
  };

  return {
    projects,
    getProjects,
  };
});

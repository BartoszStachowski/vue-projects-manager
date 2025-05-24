import { projectsQuery, type Projects } from '@/utils/supaQueries';
import { useMemoize } from '@vueuse/core';

export const useProjectStore = defineStore('project-store', () => {
  const projects = ref<Projects>([]);

  // Memoize the projectsQuery to avoid unnecessary re-fetching
  const loadProjects = useMemoize(async (key: string) => await projectsQuery);

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data, error }) => {
        // Check if the data has changed
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          return;
        } else {
          // Clear the cache if the data has changed
          loadProjects.delete('projects');
          if (!error && data) projects.value = data;
        }
      });
    }
  };

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects');

    if (error) useErrorStore().setError({ error, customCode: status });

    if (data) projects.value = data;

    validateCache();
  };

  return {
    projects,
    getProjects,
  };
});

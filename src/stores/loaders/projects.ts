import { projectQuery, projectsQuery, type Project, type Projects } from '@/utils/supaQueries';
import { useMemoize } from '@vueuse/core';

export const useProjectsStore = defineStore('project-store', () => {
  const projects = ref<Projects>([]);
  const project = ref<Project>();

  // Memoize the projectsQuery to avoid unnecessary re-fetching
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery);
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug));

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

  const getProject = async (slug: string) => {
    const { data, error, status } = await loadProject(slug);

    if (error) useErrorStore().setError({ error, customCode: status });

    if (data) project.value = data;
  };

  return {
    projects,
    getProjects,
    getProject,
    project,
  };
});

import {
  projectQuery,
  projectsQuery,
  updateProjectQuery,
  type Project,
  type Projects,
} from '@/utils/supaQueries';
import { useMemoize } from '@vueuse/core';

export const useProjectsStore = defineStore('project-store', () => {
  const projects = ref<Projects | null>(null);
  const project = ref<Project | null>(null);

  // Memoize the projectsQuery to avoid unnecessary re-fetching
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery);
  const loadProject = useMemoize(async (slug: string) => await projectQuery(slug));

  interface ValidateCacheParams {
    ref: typeof projects | typeof project;
    query: typeof projectsQuery | typeof projectQuery;
    key: string;
    loaderFn: typeof loadProjects | typeof loadProject;
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query;

      finalQuery.then(({ data, error }) => {
        // Check if the data has changed
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return;
        } else {
          // Clear the cache if the data has changed
          loaderFn.delete(key);
          if (!error && data) ref.value = data;
        }
      });
    }
  };

  const getProjects = async () => {
    projects.value = null; // Reset projects before loading

    const { data, error, status } = await loadProjects('projects');

    if (error) useErrorStore().setError({ error, customCode: status });

    if (data) projects.value = data;

    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loaderFn: loadProjects,
    });
  };

  const getProject = async (slug: string) => {
    project.value = null; // Reset project before loading

    const { data, error, status } = await loadProject(slug);

    if (error) useErrorStore().setError({ error, customCode: status });

    if (data) project.value = data;

    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loaderFn: loadProject,
    });
  };

  const updateProject = async () => {
    if (!project.value) return;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tasks, id, ...projectProperties } = project.value;

    await updateProjectQuery(projectProperties, project.value.id);
  };

  return {
    projects,
    getProjects,
    getProject,
    project,
    updateProject,
  };
});

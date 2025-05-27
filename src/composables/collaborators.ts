import type { GroupedCollaborators } from '@/types/groupedCollaborators';
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/supaQueries';

export const useCollaborators = () => {
  const groupedCollaborators = ref<GroupedCollaborators>({});

  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds);

    if (error || !data) return [];
    return data;
  };

  const getGroupedCollaborators = async (items: Projects | TasksWithProjects) => {
    // Filter out items without collaborators
    const filteredItems = items.filter((item) => item.collaborators.length);

    const promises = filteredItems.map((item) => {
      return getProfilesByIds(item.collaborators);
    });

    const results = await Promise.all(promises);

    filteredItems.forEach((item, index) => {
      groupedCollaborators.value[item.id] = results[index];
    });
  };

  return {
    getProfilesByIds,
    getGroupedCollaborators,
    groupedCollaborators,
  };
};

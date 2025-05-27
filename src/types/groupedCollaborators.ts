import type { Collaborators } from '@/utils/supaQueries';

export type GroupedCollaborators = {
  [key: string]: Collaborators;
};

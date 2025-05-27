import type { ColumnDef } from '@tanstack/vue-table';
import type { Projects } from '@/utils/supaQueries.ts';
import { RouterLink } from 'vue-router';
import type { Ref } from 'vue';
import type { GroupedCollaborators } from '@/types/groupedCollaborators';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';

export const columns = (collaborators: Ref<GroupedCollaborators>): ColumnDef<Projects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/projects/${row.original.slug}`,
          class: 'text-left font-medium hover:bg-muted block w-full',
        },
        () => row.getValue('name'),
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('status'));
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        collaborators.value[row.original.id].map((collaborators) => {
          return h(Avatar, () => h(AvatarImage, { src: collaborators.avatar_url || '' }));
        }),
      );
    },
  },
];

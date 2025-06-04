import type { ColumnDef } from '@tanstack/vue-table';
import type { TasksWithProjects } from '@/utils/supaQueries.ts';
import { RouterLink } from 'vue-router';
import type { GroupedCollaborators } from '@/types/groupedCollaborators';
import type { Ref } from 'vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const columns = (
  collaborators: Ref<GroupedCollaborators>,
): ColumnDef<TasksWithProjects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
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
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'));
    },
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug}`,
              class: 'text-left font-medium hover:bg-muted block w-full',
            },
            () => row.original.projects?.name,
          )
        : '';
    },
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium h-20 flex items-center' },
        collaborators.value[row.original.id]
          ? collaborators.value[row.original.id].map((collaborators) => {
              return h(RouterLink, { to: `/users/${collaborators.username}` }, () => {
                return h(Avatar, { class: 'hover:scale-110 transition-transform mr-2' }, () =>
                  h(AvatarImage, { src: collaborators.avatar_url || '' }),
                );
              });
            })
          : row.original.collaborators.map(() => {
              return h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback));
            }),
      );
    },
  },
];

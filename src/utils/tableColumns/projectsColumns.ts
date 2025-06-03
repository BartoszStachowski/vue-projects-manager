import type { ColumnDef } from '@tanstack/vue-table';
import type { Projects } from '@/utils/supaQueries.ts';
import { RouterLink } from 'vue-router';
import type { Ref } from 'vue';
import type { GroupedCollaborators } from '@/types/groupedCollaborators';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import AppInPlaceEditStatus from '@/components/AppInPlaceEdit/AppInPlaceEditStatus.vue';

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
      return h(
        'div',
        { class: 'text-left font-medium' },
        h(AppInPlaceEditStatus, { modelValue: row.original.status, readonly: true }),
      );
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

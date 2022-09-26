import { DropdownOptionProps } from '@app/components';

import { IconWithTooltip } from './IconWithTooltip';

export const collectionsOptions: DropdownOptionProps[] = [
  {
    id: 'new',
    title: 'New',
  },
  {
    id: 'top',
    title: 'Top',
    iconRight: <IconWithTooltip />,
  },
];

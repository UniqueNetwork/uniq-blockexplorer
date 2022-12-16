import { DropdownOptionProps, IconWithTooltip } from '@app/components';

export const collectionsOptions: DropdownOptionProps[] = [
  {
    id: 'new',
    title: 'New',
  },
  {
    id: 'top',
    title: 'Top',
    iconRight: (
      <IconWithTooltip>
        <span>
          The value is calculated <br /> by the number of transfers{' '}
        </span>{' '}
      </IconWithTooltip>
    ),
  },
];

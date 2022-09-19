import ReactTooltip from 'react-tooltip';
import { FC } from 'react';
import styled from 'styled-components';

import { DropdownOptionProps, SVGIcon } from '@app/components';

const IconWithTooltip: FC = () => {
  return (
    <>
      <SVGIconStyled
        data-tip
        data-for="question"
        name="question"
        height={24}
        width={24}
      />
      <ReactTooltip id="question" effect="solid">
        <span>The value is calculated by the number of transfers </span>{' '}
      </ReactTooltip>
    </>
  );
};
const SVGIconStyled = styled(SVGIcon)`
  margin-left: 4px;
`;

export const tokensOptions: DropdownOptionProps[] = [
  {
    id: 'new',
    title: 'New',
  },
  {
    id: 'top',
    title: 'Top',
    iconRight: IconWithTooltip({}),
  },
];

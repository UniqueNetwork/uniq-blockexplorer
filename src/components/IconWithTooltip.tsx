import { FC, ReactNode } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components/macro';

import { SVGIcon } from '@app/components/index';
import { isTouchEnabled } from '@app/utils';

export const IconWithTooltip: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <SVGIconStyled data-tip data-for="question" name="question" height={24} width={24} />
    <ReactTooltip
      event={isTouchEnabled() ? 'click' : undefined}
      id="question"
      effect="solid"
    >
      {children}
    </ReactTooltip>
  </>
);

const SVGIconStyled = styled(SVGIcon)`
  margin-left: 4px;
`;

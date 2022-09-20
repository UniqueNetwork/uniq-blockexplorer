import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

import { SVGIcon } from '@app/components';
import { isTouchEnabled } from '@app/utils';

export const IconWithTooltip = () => (
  <>
    <SVGIconStyled data-tip data-for="question" name="question" height={24} width={24} />
    <ReactTooltip
      event={isTouchEnabled() ? 'click' : undefined}
      id="question"
      effect="solid"
    >
      <span>
        The value is calculated <br /> by the number of transfers{' '}
      </span>{' '}
    </ReactTooltip>
  </>
);

const SVGIconStyled = styled(SVGIcon)`
  margin-left: 4px;
`;

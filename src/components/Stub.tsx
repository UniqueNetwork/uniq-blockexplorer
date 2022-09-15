import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import { SVGIcon } from '@app/components/SVGIcon';

const Stub: FC = () => {
  return (
    <StubWrapper>
      <StyledSVGIcon height={80} name="magnifier" width={80} />
      <Text color="blue-grey-500" size="m">
        Nothing found
      </Text>
    </StubWrapper>
  );
};

const StubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`;

const StyledSVGIcon = styled(SVGIcon)`
  margin-bottom: var(--gap);
`;

export default Stub;

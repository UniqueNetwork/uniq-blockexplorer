import { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import magnifier from '@app/images/icons/magnifier.svg';

const Stub: FC = () => {
  return (
    <StubWrapper>
      <img alt="created" src={magnifier} />
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
  img {
    height: 80px;
    margin-bottom: var(--gap);
  }
`;

export default Stub;

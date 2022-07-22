import { VFC } from 'react';
import styled from 'styled-components';

interface BlurredCoverProps {
  coverSrc: string | undefined;
  name: string;
}

export const BlurredCover: VFC<BlurredCoverProps> = ({ coverSrc, name }) => {
  return (
    <Wrapper>
      <img
        alt={`collection ${name} cover`}
        src={coverSrc}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

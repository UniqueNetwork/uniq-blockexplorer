import { VFC } from 'react';
import styled from 'styled-components';

interface RoundedCoverProps {
  coverSrc: string | undefined;
  name?: string;
}

export const RoundedCover: VFC<RoundedCoverProps> = ({ coverSrc, name }) => {
  return (
    <Wrapper>
      <img
        alt={`collection ${name ?? ''} cover`}
        src={coverSrc}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

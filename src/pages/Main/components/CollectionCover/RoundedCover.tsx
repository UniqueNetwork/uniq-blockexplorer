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

const Wrapper = styled.div`
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 48px;
  height: 88px;
  width: 88px;
  position: absolute;
  top: calc(100% - 46px);
  left: calc(50% - 46px);
  overflow: hidden;
  
  img {
    width: 88px;
    height: 88px;
    position: absolute;
  }
`;

import { VFC } from 'react';
import styled from 'styled-components';

interface RoundedCoverProps {
  color: string;
  coverSrc: string | undefined;
  name?: string;
}

export const RoundedCover: VFC<RoundedCoverProps> = ({ color, coverSrc, name }) => {
  return (
    <Wrapper color={color}>
      { coverSrc && (
        <img
          alt={`collection ${name ?? ''} cover`}
          src={coverSrc}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
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

    @media (max-width: 767px) {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 767px) {
    width: 64px;
    height: 64px;
    top: calc(100% - 32px);
    left: calc(50% - 32px);
  }
`;

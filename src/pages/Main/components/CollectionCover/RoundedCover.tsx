import { VFC } from 'react';
import styled from 'styled-components';

import { IdentityIcon } from '@app/components';

interface RoundedCoverProps {
  collectionId: number;
  color: string;
  coverSrc: string | undefined;
}

export const RoundedCover: VFC<RoundedCoverProps> = ({
  collectionId,
  color,
  coverSrc,
}) => (
  <Wrapper color={color}>
    {coverSrc ? (
      <img alt={`collection ${collectionId ?? ''} cover`} src={coverSrc} />
    ) : (
      <IdentityIcon address={`collection ${collectionId ?? ''} cover`} size="84" />
    )}
  </Wrapper>
);

const Wrapper = styled.div<{ color: string }>`
  background-color: white;
  border: 2px solid ${(props) => props.color};
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

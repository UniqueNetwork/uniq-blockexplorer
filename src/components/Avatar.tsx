import React, { FC } from 'react';
import styled from 'styled-components';

interface AvatarProps {
  size: 'large' | 'middle' | 'small' | 'x-small';
  src?: string;
  className?: string;
}

const avatarSizes = { large: 72, middle: 64, small: 40, 'x-small': 24 };

const Avatar: FC<AvatarProps> = (props) => {
  const { className, size, src } = props;

  const avatarHeight = avatarSizes[size];

  return (
    <Wrapper width={avatarHeight}>
      <img alt="avatar" className={className} src={src} />
    </Wrapper>
  );
};

const Wrapper = styled.div.attrs<{ width: number }>((props) => ({
  width: props.width,
}))<{ width: number }>`
  height: ${(props) => props.width}px;
  width: ${(props) => props.width}px;
  border-radius: ${(props) => props.width}px;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
  }
`;

export default Avatar;

import { FC } from 'react';
import styled from 'styled-components/macro';

import { useCheckImageExists } from '@app/hooks';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import Avatar from '@app/components/Avatar';
import { IdentityIcon } from '@app/components/IdentityIcon';

interface SimpleRoundedCoverProps {
  avatarSize?: 'small' | 'large' | 'middle' | 'x-small';
  collectionId: number;
  coverImageUrl?: string;
  size?: number;
}

export const SimpleRoundedCover: FC<SimpleRoundedCoverProps> = ({
  avatarSize = 'small',
  collectionId,
  coverImageUrl,
  size = 40,
}) => {
  const { imgSrc } = useCheckImageExists(getCoverURLFromCollection(coverImageUrl));

  return (
    <Identity size={size}>
      {imgSrc ? (
        <Avatar size={avatarSize} src={getCoverURLFromCollection(coverImageUrl)} />
      ) : (
        <IdentityIcon
          address={`collection ${collectionId ?? ''} cover`}
          size={size.toString()}
        />
      )}
    </Identity>
  );
};

const Identity = styled.div.attrs<{ size: number }>((props) => ({
  size: props.size,
}))<{ size: number }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  min-width: ${(props) => props.size}px;
  border-radius: ${(props) => props.size}px;
  overflow: hidden;
  position: relative;

  svg {
    height: calc(${(props) => props.size}px + 10px);
    width: calc(${(props) => props.size}px + 10px);
    position: absolute;
    top: -5px;
    left: -5px;
  }
`;

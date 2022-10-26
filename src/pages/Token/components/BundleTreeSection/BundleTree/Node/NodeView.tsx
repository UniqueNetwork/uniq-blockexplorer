import React, { FC, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Tooltip, Skeleton } from '@unique-nft/ui-kit';

import { INodeView, Picture, SVGIcon } from '@app/components';
import { DeviceSize, useDeviceSize } from '@app/hooks';
import { useGraphQlCollection } from '@app/api';

import { INestingToken } from '../types';
import MobileModalActions from './MobileModalActions';

const NodeView: FC<INodeView<INestingToken>> = ({
  arrowClicked,
  isOpened,
  data,
  textClicked,
  isFirst,
  level,
  isSelected,
  isParentSelected,
  children,
  onViewNodeDetails,
}) => {
  const { id, collectionId } = useParams<{ id: string; collectionId: string }>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const deviceSize = useDeviceSize();
  const { isCollectionFetching, collection } = useGraphQlCollection(
    Number(data?.collection_id),
  );
  const squareIcon = useRef(null);

  const pinIconRef = useRef(null);

  const onClick = useCallback(
    (event: React.MouseEvent) => {
      if (deviceSize === DeviceSize.sm) setModalVisible(true);
      else textClicked(event);
    },
    [deviceSize, textClicked],
  );

  const showMenu = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setMenuVisible(true);
    event.stopPropagation();
  }, []);

  const hideMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  const viewTokenDetails = useCallback(() => {
    if (onViewNodeDetails) onViewNodeDetails(data);

    setModalVisible(false);
  }, [onViewNodeDetails, data]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const isCurrent =
    id === data.token_id.toString() && collectionId === data.collection_id.toString();

  return (
    <>
      <ViewContainer
        isFirst={isFirst}
        isSelected={isSelected}
        isParentSelected={isParentSelected}
        onClick={onClick}
        onMouseEnter={showMenu}
        onMouseLeave={hideMenu}
      >
        <NftInfo>
          <Arrow
            isFirst={isFirst}
            level={level}
            isOpened={isOpened}
            onClick={arrowClicked}
          >
            {!!children && (
              <SVGIcon
                width={16}
                height={16}
                name={'triangle'}
                color={'var(--primary-500)'}
              />
            )}
          </Arrow>
          <Picture
            alt={`T-${data.token_id} C-${data.collection_id}`}
            src={data.image?.fullUrl || undefined}
          />
          <TokenTitle
            token={data}
            isCollectionLoading={isCollectionFetching}
            prefix={collection?.token_prefix || ''}
          />
        </NftInfo>
        <Actions>
          {deviceSize !== DeviceSize.sm && (
            <ActionButtons className={'action-buttons'}>
              {!isCurrent && (
                <div onClick={viewTokenDetails}>
                  <Tooltip
                    align={{
                      vertical: 'top',
                      horizontal: 'middle',
                      appearance: 'vertical',
                    }}
                    targetRef={squareIcon}
                  >
                    Go to the token page
                  </Tooltip>
                  <SVGIcon
                    width={32}
                    height={32}
                    name={'square'}
                    color={'var(--primary-400)'}
                    innerRef={squareIcon}
                  />
                </div>
              )}
            </ActionButtons>
          )}
          {isCurrent && (
            <PinIcon className={'pin-icon'}>
              <Tooltip
                align={{ vertical: 'top', horizontal: 'middle', appearance: 'vertical' }}
                targetRef={pinIconRef}
              >
                Current token page
              </Tooltip>
              <SVGIcon width={32} height={32} name={'pin'} innerRef={pinIconRef} />
            </PinIcon>
          )}
        </Actions>
        <hr />
      </ViewContainer>
      <MobileModalActions isVisible={modalVisible} onClose={closeModal}>
        <ViewTokenAction onClick={viewTokenDetails}>
          Go to the token page
          <IconWrapper>
            <SVGIcon
              name={'arrowUpRight'}
              width={16}
              height={16}
              color={'var(--color-primary-500)'}
            />
          </IconWrapper>
        </ViewTokenAction>
      </MobileModalActions>
      {isOpened ? children : null}
    </>
  );
};

const ViewContainer = styled.div<{
  isFirst: boolean | undefined;
  isSelected: boolean | undefined;
  isParentSelected: boolean | undefined;
}>`
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 524px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? 'var(--primary-200)' : 'transparent')};
  hr {
    position: absolute;
    border-top: 1px dashed var(--grey-300);
    border-left: none;
    bottom: -3px;
    width: 100%;
    z-index: 1;
  }
  .picture {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-left: var(--gap);
    margin-right: calc(var(--gap) / 2);
    img {
      border-radius: 4px;
      max-width: 100%;
      max-height: 100%;
      object-fit: fill;
    }
  }
  &:hover {
    border: 1px solid var(--primary-400);
    z-index: 2;
    hr {
      display: none;
    }
    .action-buttons {
      display: flex;
    }
  }
  background-color: ${({ isSelected, isParentSelected }) =>
    isSelected
      ? 'var(--primary-200)'
      : isParentSelected
      ? 'var(--primary-100)'
      : 'none'} !important;
`;

const NftInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  gap: 4px;
  margin-right: 24px;
`;

const ActionButtons = styled.div`
  gap: 4px;
  display: none;
  align-items: center;
  svg:hover {
    fill: var(--secondary-200);
  }
`;

const PinIcon = styled.div``;

const Arrow = styled.div<{
  isOpened: boolean | undefined;
  isFirst: boolean | undefined;
  level: number;
}>`
  cursor: pointer;
  display: inline-block;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: 0.2s;
  transform: ${({ isOpened }) => !isOpened && 'rotate(180deg)'};
  margin-left: ${({ isFirst, level }) => (isFirst ? 24 : 24 + 16 * level)}px;
  width: 16px;
`;

const DropdownMenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  &:hover {
    background: var(--color-primary-100);
  }
`;

const TransferMenuItem = styled(DropdownMenuItem)`
  border-bottom: 1px dashed var(--grey-300);
  color: var(--primary-500);
  &:hover {
    color: var(--primary-600);
  }
`;

const ViewTokenAction = styled(TransferMenuItem)`
  svg {
    transform: rotateX(180deg);
  }
`;

const IconWrapper = styled.div`
  && {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    transform: rotate(-90deg);

    path {
      stroke: currentColor;
    }
  }
`;

export default NodeView;

const TokenTitle: FC<{
  isCollectionLoading: boolean;
  prefix: string;
  token: INestingToken;
}> = ({ isCollectionLoading, prefix, token }) => {
  if (isCollectionLoading) return <Skeleton height={24} width={60} />;

  return (
    <TitleContainer>
      <Name>
        {prefix} #{token.token_id}
      </Name>
      {token.nestingChildren?.length > 0 && (
        <NestedCount>
          {token.nestingChildren.length} item{token.nestingChildren.length > 1 && 's'}
        </NestedCount>
      )}
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  cursor: pointer;
  display: inline-block;
`;

const Name = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: var(--dark);
`;

const NestedCount = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: var(--blue-gray-500);
`;

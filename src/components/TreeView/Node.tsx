import React, { useCallback, useState } from 'react';
import styled from 'styled-components/macro';

import { classNames } from 'utils/classNames';

import { INode, INodeContainer } from './types';

export function Node<T extends INode>({
  data,
  onNodeClicked,
  nodeView: NodeView,
  isFirst,
  level,
  children,
  onViewNodeDetails,
  onTransferClick,
  onUnnestClick,
}: INodeContainer<T>) {
  const [isOpened, setIsOpened] = useState(data.opened);
  const [addClosingAnimation, setAddClosingAnimation] = useState(false);

  const arrowClicked = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setIsOpened(!isOpened);
    },
    [isOpened],
  );

  const arrowClickHandler = useCallback(
    (event: React.MouseEvent) => {
      setAddClosingAnimation(!!isOpened);

      if (!isOpened) arrowClicked(event);
      else {
        // we need some time to show animation before nodes will be removed from DOM
        setTimeout(() => {
          arrowClicked(event);
        }, 300);
      }
    },
    [arrowClicked, addClosingAnimation, isOpened],
  );

  const textClicked = useCallback(() => {
    if (onNodeClicked) onNodeClicked(data);
  }, [data, onNodeClicked]);

  return (
    <NodeContainer
      isOpened={!!isOpened}
      isSelected={!!data.selected}
      className={classNames({
        className: 'treenode',
        closeAnimation: addClosingAnimation,
      })}
    >
      <NodeView
        arrowClicked={arrowClickHandler}
        isOpened={!!isOpened}
        data={data}
        textClicked={textClicked}
        isFirst={isFirst}
        level={level}
        isSelected={!!data.selected}
        isParentSelected={!!data.parentSelected}
        onViewNodeDetails={onViewNodeDetails}
        onUnnestClick={onUnnestClick}
        onTransferClick={onTransferClick}
      >
        {children}
      </NodeView>
    </NodeContainer>
  );
}

const NodeContainer = styled.div<{ isOpened: boolean; isSelected: boolean }>`
  .treenode {
    @keyframes open-animation {
      from {
        transform: scaleY(0);
        opacity: 0;
      }
      to {
        transform: scaleY(1);
        opacity: 1;
      }
    }
    transform-origin: 50% 0;
    animation: open-animation 0.3s linear;
    display: ${({ isOpened }) => (!isOpened ? 'none' : 'block')};
    background-color: ${({ isSelected }) => (isSelected ? 'var(--primary-100)' : '')};
    &.closeAnimation {
      @keyframes close-animation {
        from {
          transform: scaleY(1);
          opacity: 1;
        }
        to {
          transform: scaleY(0);
          opacity: 0;
        }
      }
      .treenode {
        transform-origin: 50% 0;
        animation: close-animation 0.3s linear forwards 1;
      }
    }
  }
`;

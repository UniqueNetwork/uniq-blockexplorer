import { FC } from 'react';
import styled from 'styled-components';

import * as IconComponents from '@app/images/icons/icons';
import { IconType } from '@app/images/icons';

interface IComponentProps {
  name: IconType;
  width: number;
  height: number;
  className?: string;
}

export const SVGIcon: FC<IComponentProps> = ({
  name,
  className,
  height = 16,
  width = 16,
}: IComponentProps) => {
  const Icon = IconComponents[name];

  return (
    <IconWrapper className={className} height={height} width={width}>
      <Icon />
    </IconWrapper>
  );
};

const IconWrapper = styled.span.attrs<{ width: number; height: number }>((props) => ({
  width: props.width,
  height: props.height,
}))<{ width: number; height: number }>`
  display: flex;
  align-items: center;

  svg {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
  }
`;

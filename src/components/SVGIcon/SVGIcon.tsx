import { FC, ForwardedRef } from 'react';
import styled from 'styled-components/macro';

import * as IconComponents from '@app/images/icons/icons';
import { IconType } from '@app/images/icons';

export interface SVGIconProps {
  color?: string;
  name: IconType;
  width: number;
  height: number;
  className?: string;
  innerRef?: ForwardedRef<any>;
}

export const SVGIcon: FC<SVGIconProps> = ({
  name,
  className,
  color,
  height = 16,
  width = 16,
  innerRef,
  ...props
}: SVGIconProps) => {
  const Icon = IconComponents[name];

  return (
    <IconWrapper
      className={className}
      color={color}
      height={height}
      width={width}
      ref={innerRef}
      {...props}
    >
      <Icon />
    </IconWrapper>
  );
};

const IconWrapper = styled.span.attrs<{ color?: string; width: number; height: number }>(
  (props) => ({
    color: props.color,
    width: props.width,
    height: props.height,
  }),
)<{ color?: string; width: number; height: number }>`
  display: flex;
  align-items: baseline;

  svg {
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    path {
      fill: ${(props) => props.color ?? ''};
    }
  }
`;

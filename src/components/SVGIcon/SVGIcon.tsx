import { FC } from 'react';
import styled from 'styled-components';

import { useGetIcon } from './useGetIcon';

interface IComponentProps {
  path: string;
  className?: string;
}

export const SVGIcon: FC<IComponentProps> = ({ path, className }: IComponentProps) => {
  const icon = useGetIcon(path);

  return <IconStyled className={className} dangerouslySetInnerHTML={{ __html: icon }} />;
};

const IconStyled = styled.span`
  svg {
    fill: currentColor;

    path {
      fill: inherit;
    }
  }
`;

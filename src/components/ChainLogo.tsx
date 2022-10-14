import React, { useMemo } from 'react';
import styled from 'styled-components/macro';

import { useApi } from '@app/hooks';

import { chainLogos, emptyLogos, namedLogos, nodeLogos } from '../logos';

interface Props {
  className?: string;
  isInline?: boolean;
  logo?: keyof typeof namedLogos;
  onClick?: () => void;
  withoutHl?: boolean;
}

function sanitize(value?: string): string {
  return value?.toLowerCase().replace('-', ' ') || '';
}

function ChainLogo({ logo, onClick }: Props): React.ReactElement<Props> {
  const { currentChain } = useApi();

  const img = useMemo((): string => {
    const found = logo
      ? namedLogos[logo]
      : chainLogos[sanitize(currentChain.name)] || nodeLogos[sanitize(currentChain.name)];

    return (found || emptyLogos.empty) as string;
  }, [logo, currentChain.name]);

  return (
    <ChainLogoImg alt="chain logo" height={24} src={img} width={24} onClick={onClick} />
  );
}

const ChainLogoImg = styled.img`
  background: white;
  border-radius: 50%;
  box-sizing: border-box;
`;

export default React.memo(ChainLogo);

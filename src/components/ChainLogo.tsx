import React, { useMemo } from 'react';
import styled from 'styled-components';
import { chainLogos, emptyLogos, namedLogos, nodeLogos } from '../logos';
import { useApi } from '../hooks/useApi';

interface Props {
  className?: string
  isInline?: boolean
  logo?: keyof typeof namedLogos
  onClick?: () => void
  withoutHl?: boolean
}

function sanitize(value?: string): string {
  return value?.toLowerCase().replace('-', ' ') || '';
}

function ChainLogo({ logo, onClick }: Props): React.ReactElement<Props> {
  const { chainData } = useApi();

  const img = useMemo((): string => {
    const found = logo
      ? namedLogos[logo]
      : chainLogos[sanitize(chainData?.systemChain)] || nodeLogos[sanitize(chainData?.systemName)];

    return (found || emptyLogos.empty) as string;
  }, [logo, chainData?.systemChain, chainData?.systemName]);

  return (
    <ChainLogoImg
      alt='chain logo'
      onClick={onClick}
      src={img}
    />
  );
}

const ChainLogoImg = styled.img`
  background: white;
  border-radius: 50%;
  box-sizing: border-box;
`;

export default React.memo(ChainLogo);

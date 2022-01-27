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

function ChainLogo({ className,
  isInline,
  logo,
  onClick,
  withoutHl }: Props): React.ReactElement<Props> {
  const { chainData } = useApi();

  const [isEmpty, img] = useMemo((): [boolean, string] => {
    const found = logo
      ? namedLogos[logo]
      : chainLogos[sanitize(chainData?.systemChain)] || nodeLogos[sanitize(chainData?.systemName)];

    return [!found || logo === 'empty', (found || emptyLogos.empty) as string];
  }, [logo, chainData?.systemChain, chainData?.systemName]);

  return (
    <img
      alt='chain logo'
      className={`${className || ''}${isEmpty && !withoutHl ? ' highlight--bg' : ''}${
        isInline ? ' isInline' : ''
      }`}
      onClick={onClick}
      src={img}
    />
  );
}

export default React.memo(styled(ChainLogo)`
  background: white;
  border-radius: 50%;
  box-sizing: border-box;

  &.isInline {
    display: inline-block;
    height: 24px;
    margin-right: 0.75rem;
    vertical-align: middle;
    width: 24px;
  }
`);

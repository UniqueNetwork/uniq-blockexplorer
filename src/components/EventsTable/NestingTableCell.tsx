import { Text } from '@unique-nft/ui-kit';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components/macro';

import { Token } from '@app/api';
import TokenTableCell from '@app/components/TokenTableCell';
import config from '@app/config';

export type NestingTableCellProps = {
  tokens: Token[];
  tokenId: number;
  result: boolean;
};

export const NestingTableCell = ({ tokenId, tokens, result }: NestingTableCellProps) => {
  const { chainId } = useParams<'chainId'>();
  const { defaultChain } = config;
  const color = result ? 'blue-grey-600' : 'coral-700';
  let fromTokenData = tokens[0];
  let toTokenData = tokens[1];

  tokens.forEach((token: Token) => {
    if (token.token_id === tokenId) {
      toTokenData = token;
    } else fromTokenData = token;
  });

  return (
    <Text size="m" weight="regular" color={color}>
      <CellWrapper>
        <TokenTableCell
          chainId={chainId || defaultChain.network}
          collectionId={fromTokenData.collection_id}
          imageUrl={fromTokenData.image.fullUrl}
          tokenId={fromTokenData.token_id}
          tokenPrefix={fromTokenData.token_prefix}
          iconSize={24}
        />
      </CellWrapper>
      {result ? 'Transferred to' : 'Transfer to'}
      <CellWrapper>
        <TokenTableCell
          chainId={chainId || defaultChain.network}
          collectionId={toTokenData.collection_id}
          imageUrl={toTokenData.image.fullUrl}
          tokenId={toTokenData.token_id}
          tokenPrefix={toTokenData.token_prefix}
          iconSize={24}
        />
      </CellWrapper>
      {!result && 'failed'}
    </Text>
  );
};

const CellWrapper = styled.div`
  display: inline-block;
  vertical-align: bottom;
  margin-left: 4px;
  margin-right: 4px;
`;

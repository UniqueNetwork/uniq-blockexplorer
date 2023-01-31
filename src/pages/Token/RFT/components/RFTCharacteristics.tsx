import React, { FC } from 'react';
import { Heading, Skeleton, Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { Token } from '@app/api';
import { useGraphQLRftHolders } from '@app/api/graphQL/rftHolders/rftHolders';
import { formatBlockNumber } from '@app/utils';

interface RftCharacteristicsProps {
  token: Token;
}

export const RftCharacteristics: FC<RftCharacteristicsProps> = ({ token }) => {
  const { owners, isTokenHoldersFetching } = useGraphQLRftHolders({
    collectionId: token.collection_id,
    tokenId: token.token_id,
    owner: token.owner,
    limit: 1,
  });

  const distributedFractions = token.total_pieces - (owners?.[0]?.amount || 0);

  return (
    <CharacteristicsInfo>
      <Heading size="4">Characteristics</Heading>
      <RFTAttribute key={`attribute-fractions-minted`}>
        <Text color="grey-500">Total number of minted fractions:</Text>
        <Text>{formatBlockNumber(token.total_pieces)}</Text>
      </RFTAttribute>
      <RFTAttribute key={`attribute-distributed-fractions`}>
        <Text color="grey-500">Sent to other wallets:</Text>
        {isTokenHoldersFetching && <Skeleton height={22} width={60} />}
        {!isTokenHoldersFetching && (
          <Text>{formatBlockNumber(distributedFractions) || 0}</Text>
        )}
      </RFTAttribute>
    </CharacteristicsInfo>
  );
};

const CharacteristicsInfo = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);
  display: flex;
  flex-direction: column;
  gap: calc(var(--gap) / 2);
`;

const RFTAttribute = styled.div`
  display: flex;
  gap: calc(var(--gap) / 2);
  &:first-of-type {
    margin-top: calc(var(--gap) / 2);
  }
`;

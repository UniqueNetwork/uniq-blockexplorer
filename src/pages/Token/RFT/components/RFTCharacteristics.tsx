import React, { FC } from 'react';
import { Heading, Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { useGraphQLTokensSoldFractions } from '@app/api/graphQL/rftSoldFractions/rftSoldFractions';
import { Token } from '@app/api';

interface RftCharacteristicsProps {
  token: Token;
}

export const RftCharacteristics: FC<RftCharacteristicsProps> = ({ token }) => {
  const { soldFractions } = useGraphQLTokensSoldFractions({
    collectionId: token.collection_id,
    tokenId: token.token_id,
    owner: token.owner,
  });

  return (
    <CharacteristicsInfo>
      <Heading size="4">Characteristics</Heading>
      <RFTAttribute key={`attribute-fractions-minted`}>
        <Text color="grey-500">Total number of minted fractions:</Text>
        <Text>{token.total_pieces}</Text>
      </RFTAttribute>
      <RFTAttribute key={`attribute-fractions-sold`}>
        <Text color="grey-500">Total number of fractions sold:</Text>
        <Text>{soldFractions}</Text>
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

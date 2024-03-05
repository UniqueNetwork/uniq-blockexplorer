import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Skeleton } from '@unique-nft/ui-kit';

import { Picture } from '@app/components';
import { useGraphQlCollection } from '@app/api';

import { INestingToken, ITokenCard } from '../types';

function TokenCard({ token, onViewNodeDetails }: ITokenCard) {
  const { isCollectionFetching, collection } = useGraphQlCollection(
    Number(token?.collection_id),
  );

  const viewTokenDetails = useCallback(() => {
    if (onViewNodeDetails) onViewNodeDetails(token);
  }, [onViewNodeDetails, token]);

  return (
    <TokenCardWrapper onClick={viewTokenDetails}>
      <Picture
        alt={`T-${token.token_id} C-${token.collection_id}`}
        src={token.image || undefined}
      />
      <TokenTitle
        token={token}
        mode={collection?.type || ''}
        prefix={collection?.token_prefix || ''}
        isCollectionLoading={isCollectionFetching}
      />
      {token.nestingChildren && (
        <Text color="grey-500" size="xs">
          {token.nestingChildren.length} item{token.nestingChildren.length > 1 && 's'}
        </Text>
      )}
    </TokenCardWrapper>
  );
}

const TokenCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  background-color: var(--white-color);
  .picture {
    width: 128px;
    height: 128px;
    img {
      border-radius: 4px;
      max-width: 100%;
      max-height: 100%;
      object-fit: fill;
    }
  }
  span:first-of-type,
  span:last-of-type {
    margin-top: calc(var(--gap) / 2);
  }
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    .menu {
      display: flex;
    }
  }
`;

export default TokenCard;

const TokenTitle: FC<{
  isCollectionLoading: boolean;
  prefix: string;
  token: INestingToken;
  mode: string;
}> = ({ isCollectionLoading, prefix, token, mode }) => {
  if (isCollectionLoading) return <Skeleton height={52} width={62} />;

  return (
    <>
      <Text color="additional-dark" size="m">
        {prefix} #{token.token_id}
      </Text>
      <Text color="grey-500" size="s">
        {mode}
      </Text>
    </>
  );
};

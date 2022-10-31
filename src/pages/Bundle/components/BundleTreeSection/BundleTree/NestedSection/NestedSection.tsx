import React, { FC } from 'react';
import styled from 'styled-components';
import { Text, Skeleton } from '@unique-nft/ui-kit';

import { INestedSectionView } from '@app/components/TreeView/types';
import { useGraphQlCollection } from '@app/api';
import { SVGIcon } from '@app/components';

import { INestingToken } from '../types';
import TokenCard from './TokenCard';

export const NestedSection: FC<INestedSectionView<INestingToken>> = ({
  selectedToken,
  onViewNodeDetails,
  onUnnestClick,
  onTransferClick,
}) => {
  const { isCollectionFetching, collection } = useGraphQlCollection(
    Number(selectedToken?.collection_id),
  );
  return (
    <NestedDetails>
      {selectedToken && (
        <TitleWrapper>
          <Title
            token={selectedToken}
            isCollectionLoading={isCollectionFetching}
            prefix={collection?.token_prefix || ''}
          />
        </TitleWrapper>
      )}
      {selectedToken && !selectedToken?.nestingChildren?.length && (
        <NoNestedWrapper>
          <SVGIcon name={'noTrades'} width={80} height={80} />
          <Text color="grey-500" size="m">
            No nested tokens
          </Text>
        </NoNestedWrapper>
      )}
      {!!selectedToken?.nestingChildren?.length && (
        <NestedTokens>
          {selectedToken.nestingChildren.map((token) => (
            <TokenCard
              key={`T-${token.token_id} C-${token.collection_id}`}
              token={token}
              onViewNodeDetails={onViewNodeDetails}
              onUnnestClick={onUnnestClick}
              onTransferClick={onTransferClick}
            />
          ))}
        </NestedTokens>
      )}
    </NestedDetails>
  );
};

const NestedDetails = styled.div`
  display: block;
  padding: 16px 32px;
  background-color: #ededee50;
  width: calc(100vw - 777px);
  overflow-y: auto;
  @media (max-width: 1679px) {
    width: calc(100vw - 729px);
  }
  @media (max-width: 1199px) {
    width: calc(100vw - 665px);
  }
  @media (max-width: 991px) {
    display: none;
  }
`;

const NestedTokens = styled.div`
  margin-top: var(--gap);
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title: FC<{
  isCollectionLoading: boolean;
  prefix: string;
  token: INestingToken;
}> = ({ isCollectionLoading, prefix, token }) => {
  if (isCollectionLoading) return <Skeleton height={28} width={156} />;

  return (
    <Text color="additional-dark" size="l">
      Nested in {prefix} #{token.token_id}
    </Text>
  );
};

const NoNestedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: var(--gap);
  width: 100%;
  height: calc(100% - 28px);
  min-height: 140px;
`;

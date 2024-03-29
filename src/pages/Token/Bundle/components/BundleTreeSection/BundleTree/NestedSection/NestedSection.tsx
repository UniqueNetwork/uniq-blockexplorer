import React, { FC } from 'react';
import styled from 'styled-components';
import { Text, Skeleton, Scrollbar } from '@unique-nft/ui-kit';

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
      {selectedToken && !selectedToken?.nestingChildren?.length ? (
        <NoNestedTokens
          selectedToken={selectedToken}
          isCollectionFetching={isCollectionFetching}
          prefix={collection?.token_prefix || ''}
        />
      ) : (
        <Scrollbar width={'100%'} height={'100%'}>
          {selectedToken && (
            <TitleWrapper>
              <Title
                token={selectedToken}
                isCollectionLoading={isCollectionFetching}
                prefix={collection?.token_prefix || ''}
              />
            </TitleWrapper>
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
        </Scrollbar>
      )}
    </NestedDetails>
  );
};

const NoNestedTokens: FC<{
  selectedToken: INestingToken;
  isCollectionFetching: boolean;
  prefix: string;
}> = ({ selectedToken, isCollectionFetching, prefix }) => (
  <>
    <TitleWrapper>
      <Title
        token={selectedToken}
        isCollectionLoading={isCollectionFetching}
        prefix={prefix}
      />
    </TitleWrapper>
    <NoNestedWrapper>
      <SVGIcon name={'noTrades'} width={80} height={80} />
      <Text color="grey-500" size="m">
        No nested tokens
      </Text>
    </NoNestedWrapper>
  </>
);

const NestedDetails = styled.div`
  display: block;
  padding: 0 0 16px 32px;
  background-color: #ededee50;
  width: calc(100vw - 777px);
  .unique-scrollbar:first-of-type {
    padding-top: 16px;
  }
  @media (max-width: 1679px) {
    width: calc(100vw - 624px);
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
  if (isCollectionLoading) return <Skeleton height={42} width={156} />;

  return (
    <TextStyled color="additional-dark" size="l">
      Nested in {prefix} #{token.token_id}
    </TextStyled>
  );
};

const TextStyled = styled(Text)`
  margin-top: 16px;
`;

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

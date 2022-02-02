import React, { FC, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@unique-nft/ui-kit';

import { tokens as gqlTokens } from '../../../api/graphQL';
import LoadingComponent from '../../../components/LoadingComponent';
import { useApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import TokenCard from '../../../components/TokenCard';

interface NewTokensComponentProps {
  searchString?: string
  pageSize?: number
  collectionId?: number
}

const NewTokensComponent: FC<NewTokensComponentProps> = ({ collectionId, pageSize = 8, searchString }) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(`/${currentChain.network}/tokens`);
  }, [currentChain, navigate]);

  const { fetchMoreTokens, isTokensFetching, tokens } = gqlTokens.useGraphQlTokens({
    filter: collectionId ? { collection_id: { _eq: collectionId } } : undefined,
    pageSize
  });

  useEffect(() => {
    void fetchMoreTokens({
      searchString
    });
  }, [searchString, fetchMoreTokens]);

  return (
    <>
      <TokensWrapper>
        {isTokensFetching && <LoadingComponent />}
        {tokens?.map((token) => (
          <TokenCard
            key={`token-${token.collection_id}-${token.token_id}`}
            {...token}
          />
        ))}
      </TokensWrapper>
      <Button
        iconRight={{
          color: 'white',
          name: 'arrow-right',
          size: 10
        }}
        onClick={onClick}
        role={'primary'}
        title={'See all'}
      />
    </>
  );
};

const TokensWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: calc(var(--gap) * 1.5);
  row-gap: calc(var(--gap) * 1.5);
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: var(--gap);
`;

export default NewTokensComponent;

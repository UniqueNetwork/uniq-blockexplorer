import React, { FC } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Heading } from '@unique-nft/ui-kit';
import { tokens } from '../../api/graphQL/';
import TokenDetailComponent from './components/TokenDetailComponent';
import TokensEventsComponent from '../Collection/components/TokensEventsComponent';

interface CollectionProps {
  className?: string
}

const TokenPage: FC<CollectionProps> = ({ className }) => {
  const { tokenId } = useParams<{ tokenId: string }>();

  const { isTokensFetching, token } = tokens.useGraphQlToken(tokenId || '');

  return (
    <div className={className}>
      <TokenDetailComponent token={token} />
      <Heading size={'2'}>Events</Heading>
      <TokensEventsComponent />
    </div>
  );
};

export default styled(TokenPage)`
  .collection-title {
    display: flex;
    align-items: center;
    column-gap: var(--gap);
    margin-bottom: calc(var(--gap) * 2);
    h2 {
      margin-bottom: 0 !important;
    }
    
  }
`;

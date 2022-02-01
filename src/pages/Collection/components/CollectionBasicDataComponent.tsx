import React, { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';
import { Collection, tokens as gqlTokens } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import NewTokensComponent from '../../Main/components/NewTokensComponent';

interface BasicDataComponentProps {
  collection?: Collection
}

const CollectionBasicDataComponent: FC<BasicDataComponentProps> = ({ collection }) => {
  const {
    collection_id: id,
    date_of_creation: createdOn,
    description,
    holders_count: holders,
    owner,
    token_prefix: prefix,
    tokens_aggregate: tokensAggregate
  } = collection || {};

  const { tokens } = gqlTokens.useGraphQlTokens({ filter: { collection_id: { _eq: id } }, pageSize: 8 });

  return (
    <>
      <PropertiesContainer>
        <GeneralInfoContainer>
          <div>
            <Text color={'grey-500'}>ID:</Text>
            <Text color={'black'}>{id?.toString() || ''}</Text>
          </div>
          <div>
            <Text color={'grey-500'}>Items:</Text>
            <Text color={'black'}>{tokensAggregate?.aggregate.count.toString() || ''}</Text>
          </div>
          <div>
            <Text color={'grey-500'}>Prefix:</Text>
            <Text color={'black'}>{prefix?.toString() || ''}</Text>
          </div>
          <div>
            <Text color={'grey-500'}>Holders:</Text>
            <Text color={'black'}>{holders?.toString() || '0'}</Text>
          </div>
          <div>
            <Text color={'grey-500'}>Minting:</Text>
            <Text color={'black'}>{'yes'}</Text>
          </div>
        </GeneralInfoContainer>
        <Text>{`created on ${createdOn || 'undefined'}`}</Text>
      </PropertiesContainer>
      <DescriptionContainer>
        <Text color={'grey-500'}>{description || ''}</Text>
      </DescriptionContainer>
      <OwnerAccountContainer>
        <Avatar
          size={'small'}
        />
        <AccountLinkComponent
          noShort={true}
          value={owner || ''}
        />
      </OwnerAccountContainer>
      <div>
        <Heading size={'2'}>Tokens</Heading>
        <NewTokensComponent tokens={tokens?.slice(0, 18) || []} />
      </div>
    </>
  );
};

const PropertiesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const GeneralInfoContainer = styled.div`
  display: flex;
  column-gap: var(--gap);
  div {
    display: flex;
    column-gap: calc(var(--gap) / 4);
  }
`;

const DescriptionContainer = styled.div`
  margin-bottom: calc(var(--gap) * 1.5);
`;

const OwnerAccountContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) * 2.5);
`;

export default CollectionBasicDataComponent;

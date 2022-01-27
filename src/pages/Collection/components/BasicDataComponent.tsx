import React, { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';
import { Collection } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import NewTokensComponent from '../../Main/components/NewTokensComponent';

interface BasicDataComponentProps {
  className?: string,
  collection?: Collection
}

const BasicDataComponent: FC<BasicDataComponentProps> = ({ className, collection }) => {
  const { collection_id: id, date_of_creation: createdOn, description, holders_count: holders, owner, token_prefix: prefix, tokens, tokens_aggregate: tokensAggregate } = collection || {};

  return (
    <div className={className}>
      <div className={'properties'}>
        <div className={'general'}>
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
        </div>
        <Text>{`created on ${createdOn || 'undefined'}`}</Text>
      </div>
      <div className={'description'}><Text color={'grey-500'}>{description || ''}</Text></div>
      <div className={'owner-account'}>
        <Avatar size={'small'} />
        <AccountLinkComponent
          noShort={true}
          value={owner || ''}
        />
      </div>
      <div>
        <Heading size={'2'}>Tokens</Heading>
        <NewTokensComponent tokens={tokens?.slice(0, 18) || []} />
      </div>
    </div>
  );
};

export default styled(BasicDataComponent)`
  .properties {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .general {
      display: flex;
      column-gap: var(--gap);
      div {
        display: flex;
        column-gap: calc(var(--gap) / 4);
      }
    }
  }
  .description {
    margin-bottom: calc(var(--gap) * 1.5);
  }
  .owner-account {
    display: flex;
    align-items: center;
    column-gap: var(--gap);
    margin-bottom: calc(var(--gap) * 2.5);
  }
`;

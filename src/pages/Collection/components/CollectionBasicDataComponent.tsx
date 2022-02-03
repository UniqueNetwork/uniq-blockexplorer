import React, { FC } from 'react';
import styled from 'styled-components';
import { Text } from '@unique-nft/ui-kit';

import { Collection } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import TokensComponent from './TokensComponent';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';

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

  const deviceSize = useDeviceSize();

  return (
    <>
      <PropertiesWrapper>
        <GeneralInfoWrapper>
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
        </GeneralInfoWrapper>
        <CreatedAccountWrapper>
          <div>
            <Text color={'grey-500'}>{`created on ${createdOn || 'undefined'}`}</Text>
          </div>
          <OwnerAccountWrapper>
            <Avatar
              size={'x-small'}
            />
            <AccountLinkComponent
              noShort={deviceSize >= DeviceSize.lg}
              value={owner || ''}
            />
          </OwnerAccountWrapper>
        </CreatedAccountWrapper>

      </PropertiesWrapper>
      <DescriptionWrapper>
        <Text color={'grey-500'}>{description || ''}</Text>
      </DescriptionWrapper>
      <div>
        <TokensComponent
          collectionId={id}
        />
      </div>
    </>
  );
};

const PropertiesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const GeneralInfoWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  div {
    display: flex;
    column-gap: calc(var(--gap) / 4);
  }
`;

const DescriptionWrapper = styled.div`
  margin-bottom: calc(var(--gap) * 1.5);
`;

const CreatedAccountWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  row-gap: calc(var(--gap) / 2);
  flex-direction: column;
`;

const OwnerAccountWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) * 2.5);
`;

export default CollectionBasicDataComponent;

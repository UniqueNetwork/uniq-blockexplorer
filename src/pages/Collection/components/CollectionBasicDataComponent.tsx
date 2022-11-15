import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { Text } from '@unique-nft/ui-kit';

import { Collection } from '@app/api';
import { timestampFormat } from '@app/utils';
import { useDeviceSize, DeviceSize, DeviceSizes } from '@app/hooks';

import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

interface BasicDataComponentProps {
  collection?: Collection;
}

const CollectionBasicDataComponent: FC<BasicDataComponentProps> = ({ collection }) => {
  const {
    collection_id: id,
    date_of_creation: createdOn,
    description,
    holders_count: holders,
    owner,
    token_prefix: prefix,
    tokens_count: tokensCount,
  } = collection || {};

  const deviceSize = useDeviceSize();

  return (
    <PropertiesWrapper>
      <GeneralInfoWrapper>
        <GeneralInfo>
          <div>
            <Text color="grey-500">ID:</Text>
            <Text color="black">{id?.toString() || ''}</Text>
          </div>
          <div>
            <Text color="grey-500">Items:</Text>
            <Text color="black">{tokensCount?.toString() || '0'}</Text>
          </div>
          <div>
            <Text color="grey-500">Symbol:</Text>
            <Text color="black">{prefix?.toString() || ''}</Text>
          </div>
          <div>
            <Text color="grey-500">Holders:</Text>
            <Text color="black">{holders?.toString() || '0'}</Text>
          </div>
          <div>
            <Text color="grey-500">Minting:</Text>
            <Text color="black">yes</Text>
          </div>
        </GeneralInfo>
        <DescriptionWrapper>
          <Text color="grey-500">{description || ''}</Text>
        </DescriptionWrapper>
      </GeneralInfoWrapper>
      <CreatedAccountWrapper>
        <div>
          <Text color="grey-500">created on {timestampFormat(createdOn)}</Text>
        </div>
        <OwnerAccountWrapper>
          <AccountLinkComponent
            noShort={deviceSize >= DeviceSize.xl}
            value={owner || ''}
          />
        </OwnerAccountWrapper>
      </CreatedAccountWrapper>
    </PropertiesWrapper>
  );
};

const PropertiesWrapper = styled.div`
  padding-top: calc(var(--gap) * 1.5);
  margin-top: var(--gap);
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const GeneralInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: var(--gap);
`;

const GeneralInfo = styled.div`
  display: flex;
  column-gap: var(--gap);

  div {
    display: flex;
    column-gap: calc(var(--gap) / 4);
  }

  @media (max-width: ${DeviceSizes.sm}) {
    flex-wrap: wrap;
  }
`;

const DescriptionWrapper = styled.div`
  margin-bottom: calc(var(--gap) * 1.5);
  word-break: break-word;
`;

const CreatedAccountWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  row-gap: calc(var(--gap) / 2);
  flex-direction: column;

  @media (max-width: 767px) {
    align-items: flex-start;
  }
`;

const OwnerAccountWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
  margin-bottom: calc(var(--gap) * 2.5);

  svg {
    height: 24px;
    width: 24px;
  }
`;

export default CollectionBasicDataComponent;

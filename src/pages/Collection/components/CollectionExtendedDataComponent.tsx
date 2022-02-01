import React, { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';
import { Collection } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

interface ExtendedDataComponentProps {
  collection?: Collection
}

const CollectionExtendedDataComponent: FC<ExtendedDataComponentProps> = ({ collection }) => {
  return (
    <>
      <ContainerWithBorder>
        <Heading size={'4'}>Token attributes</Heading>
        <AttributesContainer>
          <Text color={'grey-500'}>Background</Text>
          <TagsContainer>
            <Tag>Eyes To The Right</Tag>
          </TagsContainer>
        </AttributesContainer>
        <AttributesContainer>
          <Text color={'grey-500'}>Traits</Text>
          <TagsContainer>
            <Tag>Eyes To The Right</Tag>
            <Tag>Eyes To The Right</Tag>
          </TagsContainer>
        </AttributesContainer>
      </ContainerWithBorder>
      <ContainerWithBorder>
        <Heading size={'4'}>Admins</Heading>
        <AccountsContainer>
          <div>
            <Avatar size={'small'} />
            <AccountLinkComponent value={'yGHkvgGth212LzAokvhCMLvs5a9vTpRjKkqjCHfRqwxHn3Lum'} />
          </div>
        </AccountsContainer>
        <Heading size={'4'}>Sponsors</Heading>
        <AccountsContainer>
          <div>
            <Avatar size={'small'} />
            <AccountLinkComponent value={'yGHkvgGth212LzAokvhCMLvs5a9vTpRjKkqjCHfRqwxHn3Lum'} />
          </div>
          <div>
            <Avatar size={'small'} />
            <AccountLinkComponent value={'yGHkvgGth212LzAokvhCMLvs5a9vTpRjKkqjCHfRqwxHn3Lum'} />
          </div>
        </AccountsContainer>
      </ContainerWithBorder>
      <ContainerWithBorder>
        <Heading size={'4'}>Data schema</Heading>
        <DataBlockContainer>
          <Text color={'grey-500'}>Schema version</Text>
          <Text>{collection?.schema_version || ''}</Text>
          <Text color={'grey-500'}>Offchain schema   </Text>
          <Text>{collection?.offchain_schema || ''}</Text>
        </DataBlockContainer>
      </ContainerWithBorder>
      <ContainerWithBorder>
        <Heading size={'4'}>Advanced data</Heading>
        <DataBlockContainer>
          <Text color={'grey-500'}>Token limit</Text>
          <Text>{collection?.token_limit.toString() || ''}</Text>
          <Text color={'grey-500'}>Account token ownership limit</Text>
          <Text>{'unlimited'}</Text>
          <Text color={'grey-500'}>Sponsored mint size</Text>
          <Text>{'unlimited'}</Text>
          <Text color={'grey-500'}>Sponsor timeout</Text>
          <Text>{'unlimited'}</Text>
          <Text color={'grey-500'}>Owner can transfer</Text>
          <Text>{collection?.owner_can_trasfer || 'false'}</Text>
          <Text color={'grey-500'}>Owner can destroy</Text>
          <Text>{collection?.owner_can_destroy || 'false'}</Text>
          <Text color={'grey-500'}>Variable metadata sponsoring rate limit</Text>
          <Text>{'never sponsored'}</Text>
        </DataBlockContainer>
      </ContainerWithBorder>
    </>
  );
};

const AttributesContainer = styled.div`
  margin-bottom: calc(var(--gap) * 1.5);
`;

const TagsContainer = styled.div`
  margin: calc(var(--gap) / 2) 0;
  display: flex;
  column-gap: calc(var(--gap) / 2);
  row-gap: calc(var(--gap) / 2);
`;

const Tag = styled.div`
  padding: 1px calc(var(--gap) / 2);
  background-color: var(--blue-gray);
`;

const AccountsContainer = styled.div`
  display: flex;
  column-gap: calc(var(--gap) / 1.5);
  margin-bottom: calc(var(--gap) * 1.5);
  div {
    display: flex;
    align-items: center;
    column-gap: calc(var(--gap) / 2);
  }
`;

const ContainerWithBorder = styled.div`
  padding-top: var(--gap);
  padding-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);
`;

const DataBlockContainer = styled.div`
  display: grid;
  grid-template-columns: 296px 1fr;
`;

export default CollectionExtendedDataComponent;

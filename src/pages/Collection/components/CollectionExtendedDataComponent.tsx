import { FC } from 'react';
import styled from 'styled-components/macro';
import { Heading, Text } from '@unique-nft/ui-kit';

import { Collection } from '@app/api';
import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';
import { useDeviceSize, DeviceSize } from '@app/hooks';

import CollectionBasicDataComponent from './CollectionBasicDataComponent';

interface ExtendedDataComponentProps {
  collection?: Collection;
}

const CollectionExtendedDataComponent: FC<ExtendedDataComponentProps> = ({
  collection,
}) => {
  const fields = collection?.attributes_schema;

  const {
    sponsorship,
    token_limit: tokenLimit,
    limits_account_ownership: limitsAccountOwnership,
    limits_sponsore_data_size: limitsSponsoreDataSize,
    owner_can_transfer: ownerCanTransfer,
    owner_can_destroy: ownerCanDestroy,
    offchain_schema: offchainSchema,
  } = collection || {};

  const deviceSize = useDeviceSize();

  return (
    <>
      <WrapperWithBorder>
        <CollectionBasicDataComponent collection={collection} key="collections" />
      </WrapperWithBorder>
      <WrapperWithBorder>
        <Heading size="3">NFTs attributes</Heading>
        <AttributesWrapper>
          {Object.keys(fields || {}).map((attrField) => (
            <div key={`attribute-${attrField}`}>
              <Text color="grey-500">{fields?.[attrField].name._}</Text>
              <TagsWrapper>
                {fields?.[attrField]?.enumValues &&
                  Object.values(fields?.[attrField]?.enumValues || {})?.map(
                    (item: { _: string }, index: number) => (
                      <Tag key={`item-${item}-${index}`}>{item._}</Tag>
                    ),
                  )}
              </TagsWrapper>
            </div>
          ))}
        </AttributesWrapper>
      </WrapperWithBorder>
      {sponsorship && (
        <OwnerAccountWrapper>
          <StyledHeading size="3">Sponsors</StyledHeading>
          <AccountLinkComponent
            noShort={deviceSize >= DeviceSize.sm}
            value={sponsorship || ''}
          />
        </OwnerAccountWrapper>
      )}
      <WrapperWithBorder>
        <StyledHeading size="4">Data schema</StyledHeading>
        <DataBlockWrapper>
          <Text color="grey-500">Schema version</Text>
          <Text>{collection?.schema_version || ''}</Text>
          {offchainSchema && (
            <>
              <Text color="grey-500">Offchain schema </Text>
              <Text>{offchainSchema}</Text>
            </>
          )}
        </DataBlockWrapper>
      </WrapperWithBorder>
      <WrapperWithBorder>
        <StyledHeading size="4">Advanced data</StyledHeading>
        <DataBlockWrapper>
          <Text color="grey-500">Token limit</Text>
          <Text>{tokenLimit || ''}</Text>
          {limitsAccountOwnership && (
            <>
              <Text color="grey-500">Account token ownership limit </Text>
              <Text>{limitsAccountOwnership || ''}</Text>
            </>
          )}
          {limitsSponsoreDataSize && (
            <>
              <Text color="grey-500">Sponsored mint size</Text>
              <Text>{limitsSponsoreDataSize || ''}</Text>
            </>
          )}
          <Text color="grey-500">Owner can transfer</Text>
          <Text>{ownerCanTransfer ? 'true' : 'false'}</Text>
          <Text color="grey-500">Owner can destroy</Text>
          <Text>{ownerCanDestroy ? 'true' : 'false'}</Text>
        </DataBlockWrapper>
      </WrapperWithBorder>
    </>
  );
};

const StyledHeading = styled(Heading)`
  margin-bottom: var(--gap) !important;
`;

const AttributesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: var(--gap);
`;

const TagsWrapper = styled.div`
  margin-top: calc(var(--gap) / 2);
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(var(--gap) / 2);
  row-gap: calc(var(--gap) / 2);
`;

const Tag = styled.div`
  padding: 1px calc(var(--gap) / 2);
  background-color: var(--blue-gray);
`;

const WrapperWithBorder = styled.div`
  margin-top: calc(var(--gap) * 2);
  padding-bottom: calc(var(--gap) * 2);
  border-bottom: 1px solid var(--border-color);
  &:last-of-type {
    border-bottom: none;
  }
`;

const OwnerAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  column-gap: var(--gap);
  margin-top: calc(var(--gap) * 2);
  padding-bottom: calc(var(--gap) * 2);
  border-bottom: 1px solid var(--border-color);
  svg {
    height: 24px;
    width: 24px;
  }
`;

const DataBlockWrapper = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  row-gap: var(--gap);
  column-gap: var(--gap);
`;

export default CollectionExtendedDataComponent;

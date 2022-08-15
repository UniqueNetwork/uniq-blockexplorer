import React, { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';

import { Collection } from '@app/api';

interface ExtendedDataComponentProps {
  collection?: Collection;
}

const CollectionExtendedDataComponent: FC<ExtendedDataComponentProps> = ({
  collection,
}) => {
  const fields =
    collection?.const_chain_schema?.nested.onChainMetaData.nested.NFTMeta.fields;

  return (
    <>
      <WrapperWithBorder>
        <Heading size="4">NFTs attributes</Heading>
        <TagsWrapper>
          {Object.keys(fields || {})
            .filter((key) => key !== 'ipfsJson')
            .map((key) => (
              <Tag key={key}>{key}</Tag>
            ))}
        </TagsWrapper>
      </WrapperWithBorder>
      <WrapperWithBorder>
        <Heading size="4">Data schema</Heading>
        <DataBlockWrapper>
          <Text color="grey-500">Schema version</Text>
          <Text>{collection?.schema_version || ''}</Text>
          <Text color="grey-500">Offchain schema </Text>
          <Text>{collection?.offchain_schema || ''}</Text>
        </DataBlockWrapper>
      </WrapperWithBorder>
    </>
  );
};

const TagsWrapper = styled.div`
  margin: calc(var(--gap) / 2) 0;
  display: flex;
  column-gap: calc(var(--gap) / 2);
  row-gap: calc(var(--gap) / 2);
`;

const Tag = styled.div`
  padding: 1px calc(var(--gap) / 2);
  background-color: var(--blue-gray);
`;

const WrapperWithBorder = styled.div`
  padding: calc(var(--gap) * 1.5) 0;
  border-bottom: 1px dashed var(--border-color);

  &:first-child {
    border-top: 1px dashed var(--border-color);
    margin-top: var(--gap);
  }
`;

const DataBlockWrapper = styled.div`
  display: grid;
  grid-template-columns: 296px 1fr;
`;

export default CollectionExtendedDataComponent;

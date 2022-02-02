import React, { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';

import { Token } from '../../../api/graphQL';
import Picture from '../../../components/Picture';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import config from '../../../config';

const { IPFSGateway } = config;

interface TokenDetailComponentProps {
  token?: Token
  loading?: boolean
}

const TokenDetailComponent: FC<TokenDetailComponentProps> = ({ loading, token }) => {
  if (!token) return null;
  const { collection_cover: collectionCover, collection_description: description, collection_id: collectionId, collection_name: name, data, image_path: imagePath, owner, token_id: id, token_prefix: prefix } = token;

  if (loading) return <LoadingComponent />;

  return (
    <Wrapper>
      <TokenPicture
        alt={`${prefix}-${id}`}
        size={557}
        src={imagePath}
      />
      <div>
        <Heading size={'2'}>{`${prefix} #${id}`}</Heading>
        <TokenInfo>
          <Text color={'grey-500'}>Created on</Text>
          <Text>{'undefined'}</Text>
          <Text color={'grey-500'}>Owner</Text>
          <OwnerWrapper>
            <Avatar size={'small'} />
            <AccountLinkComponent value={owner} />
          </OwnerWrapper>
        </TokenInfo>
        <TokenAttributes>
          <Heading size={'4'}>Attributes</Heading>
          <div>
            {Object.keys(data).map((key) => (<div key={`attribute-${key}`}><Text color={'grey-500'}>{key}</Text>
              <TagsWrapper>
                {Array.isArray(data[key]) && (data[key] as string[]).map((item, index) => <Tag key={`item-${item}-${index}`}>{item}</Tag>)}
                {typeof data[key] === 'string' && <Tag>{data[key]}</Tag>}
              </TagsWrapper>
            </div>)
            )}

          </div>
        </TokenAttributes>
        <CollectionInfoWrapper>
          <Heading size={'4'}>Collection</Heading>
          <CollectionTitle>
            <Avatar
              size={'small'}
              src={collectionCover ? `${IPFSGateway || ''}/${collectionCover}` : undefined}
            />
            <div>
              <Text>{name}</Text>
              <div>
                <Text color={'grey-500'}>{description || ''}</Text>
              </div>
              <CollectionProperties>
                <div>
                  <Text color={'grey-500'}>ID:</Text>
                  <Text color={'black'}>{collectionId?.toString() || ''}</Text>
                </div>
                <div>
                  <Text color={'grey-500'}>Prefix:</Text>
                  <Text color={'black'}>{prefix || ''}</Text>
                </div>
                <div>
                  <Text color={'grey-500'}>Items:</Text>
                  <Text color={'black'}>{0 || ''}</Text>
                </div>
              </CollectionProperties>
            </div>
          </CollectionTitle>
        </CollectionInfoWrapper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 557px 1fr;
  grid-column-gap: var(--gap);
`;

const TokenPicture = styled(Picture)`
  width: 557px;
  height: 557px;
`;

const TokenInfo = styled.div`
  display: grid;
  grid-template-columns: 85px 1fr;
  grid-column-gap: calc(var(--gap) * 2);
  grid-row-gap: var(--gap);
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);
  span {
    display: flex;
    align-items: center;
  }
`;

const TokenAttributes = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);
`;

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

const CollectionInfoWrapper = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);
`;

const CollectionTitle = styled.div`
  display: flex;
  column-gap: var(--gap);
  svg {
    min-width: 40px;
  }  
`;

const CollectionProperties = styled.div`
  display: flex;
  column-gap: var(--gap);
  div {
    span:first-child {
      margin-right: calc(var(--gap) / 2);
    } 
  }
`;

const OwnerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
`;

export default TokenDetailComponent;

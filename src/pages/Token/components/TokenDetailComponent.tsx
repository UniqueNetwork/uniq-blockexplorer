import React, { FC } from 'react';
import styled from 'styled-components';
import { Token } from '../../../api/graphQL';
import Picture from '../../../components/Picture';
import { Heading, Text } from '@unique-nft/ui-kit';
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
  const { collection_cover: collectionCover, collection_description: description, collection_id: collectionId, collection_name: name, image_path: imagePath, owner, token_id: id, token_prefix: prefix } = token;

  if (loading) return <LoadingComponent />;

  return (
    <Wrapper>
      <Picture
        alt={`${prefix}-${id}`}
        className={'token-picture'}
        size={557}
        src={imagePath}
      />
      <div>
        <Heading size={'2'}>{`${prefix} #${id}`}</Heading>
        <TokenInfo className={'token-general'}>
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
          <div className={'attributes-block'}>
            <Text color={'grey-500'}>Traits</Text>
            <div className={'tags'}>
              <div>Eyes To The Right</div>
              <div>Eyes To The Right</div>
            </div>
          </div>
        </TokenAttributes>
        <CollectionInfo>
          <Heading size={'4'}>Collection</Heading>
          <div className={'collection-block'}>
            <Avatar
              size={'small'}
              src={collectionCover ? `${IPFSGateway || ''}/${collectionCover}` : undefined}
            />
            <div className={'properties'}>
              <Text>{name}</Text>
              <div className={'description'}><Text color={'grey-500'}>{description || ''}</Text></div>
              <div className={'general'}>
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
              </div>
            </div>
          </div>
        </CollectionInfo>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 557px 1fr;
  grid-column-gap: var(--gap);
  .token-picture {
    width: 557px;
    height: 557px;
  }
`;

const TokenInfo = styled.div`
  display: grid;
  grid-template-columns: 85px 1fr;
  grid-column-gap: calc(var(--gap) * 2);
  grid-row-gap: var(--gap);
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed #D2D3D6;
  span {
    display: flex;
    align-items: center;
  }
`;

const TokenAttributes = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed #D2D3D6;
  .attributes-block {
    margin-bottom: calc(var(--gap) * 1.5);
    .tags {
      margin-top: calc(var(--gap) / 2);
      display: flex;
      column-gap: calc(var(--gap) / 2);
      row-gap: calc(var(--gap) / 2);
      & > div {
        padding: 1px calc(var(--gap) / 2);
        background-color: var(--blue-gray);
      }
    }
  }
`;

const CollectionInfo = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed #D2D3D6;
  .collection-block {
    display: flex;
    column-gap: var(--gap);
    svg {
      min-width: 40px;
    }
    .general {
      display: flex;
      column-gap: var(--gap);
    }
  }
`;

const OwnerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
`;

export default TokenDetailComponent;

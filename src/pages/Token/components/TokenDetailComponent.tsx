import React, { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';

import { Token } from '../../../api/graphQL';
import Picture from '../../../components/Picture';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import LoadingComponent from '../../../components/LoadingComponent';
import config from '../../../config';
import useDeviceSize, { DeviceSize } from '../../../hooks/useDeviceSize';
import { Link } from 'react-router-dom';
import { useApi } from '../../../hooks/useApi';

const { IPFSGateway } = config;

interface TokenDetailComponentProps {
  token?: Token
  loading?: boolean
}

const TokenDetailComponent: FC<TokenDetailComponentProps> = ({ loading, token }) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();

  if (!token) return null;
  const {
    collection_cover: collectionCover,
    collection_description: description,
    collection_id: collectionId,
    collection_name: name,
    data,
    image_path: imagePath,
    owner,
    token_id: id,
    token_prefix: prefix
  } = token;

  if (loading) return <LoadingComponent />;

  return (
    <Wrapper>
      <TokenPicture
        alt={`${prefix}-${id}`}
        src={imagePath}
      />
      <div>
        <Heading size={'2'}>{`${prefix} #${id}`}</Heading>
        <TokenInfo>
          <Text color={'grey-500'}>Created on</Text>
          <Text>{'undefined'}</Text>
          <Text color={'grey-500'}>Owner</Text>
          <OwnerWrapper>
            <Avatar size={'x-small'} />
            <AccountLinkComponent
              noShort={deviceSize >= DeviceSize.lg}
              value={owner}
            />
          </OwnerWrapper>
        </TokenInfo>
        <TokenAttributes>
          <Heading size={'4'}>Attributes</Heading>
          <div>
            {Object.keys(data).filter((key) => key !== 'ipfsJson').map((key) => (<div key={`attribute-${key}`}><Text color={'grey-500'}>{key}</Text>
              <TagsWrapper>
                {Array.isArray(data[key]) && (data[key] as string[]).map((item, index) => <Tag key={`item-${item}-${index}`}>{item}</Tag>)}
                {typeof data[key] === 'string' && <Tag>{data[key]}</Tag>}
              </TagsWrapper>
            </div>)
            )}
          </div>
        </TokenAttributes>
        <CollectionInfoWrapper>
          <CollectionLink to={`/${currentChain.network}/collections/${collectionId}`}>
            <Avatar
              size={'small'}
              src={collectionCover ? `${IPFSGateway || ''}/${collectionCover}` : undefined}
            />
            <div>
              <Heading size={'4'}>{name}</Heading>
              <div>
                <Text color={'grey-500'}>{description || ''}</Text>
              </div>
            </div>
          </CollectionLink>
        </CollectionInfoWrapper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 536px 1fr;
  grid-column-gap: var(--gap);


  @media(max-width: 1024px) {
    grid-template-columns: 326px 1fr;
  }
  @media(max-width: 768px) {
    grid-template-columns: 224px 1fr;
  }
  @media(max-width: 568px) {
    grid-template-columns: 1fr;
  }
  
`;

const TokenPicture = styled(Picture)`
  width: 536px;
  height: 536px;
  svg {
    width: 100%;
  }
  
  @media(max-width: 1024px) {
    width: 326px;
    height: 326px;
  }
  @media(max-width: 768px) {
    width: 224px;
    height: 224px;
  }
  @media(max-width: 568px) {
    width: 100%;
    height: 100%;
  }
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
  display: flex;
  margin: calc(var(--gap) / 2) 0;
  column-gap: calc(var(--gap) / 2);
  row-gap: calc(var(--gap) / 2);
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 1px calc(var(--gap) / 2);
  background-color: var(--blue-gray);
`;

const CollectionInfoWrapper = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
`;

const CollectionLink = styled(Link)`
  display: flex;
  column-gap: var(--gap);
  &:hover {
    text-decoration: none;
    h4 {
      color: var(--primary-500);
    }
  }
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

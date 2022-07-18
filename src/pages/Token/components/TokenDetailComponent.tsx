import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Heading, Text } from '@unique-nft/ui-kit';
import { Token } from '@app/api';
import { Avatar, LoadingComponent, Picture } from '@app/components';
import { DeviceSize, useApi, useDeviceSize } from '@app/hooks';
import { getImageURL, timestampFormat } from '@app/utils';
import amplitude from 'amplitude-js';

import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import { UserEvents } from '@app/analytics/user_analytics';

interface TokenDetailComponentProps {
  token?: Token
  loading?: boolean
}

const TokenDetailComponent: FC<TokenDetailComponentProps> = ({ loading, token }) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  // user analytics
  const onCollectionClick = useCallback(() => {
    amplitude.getInstance().logEvent(UserEvents.Click.COLLECTION_FROM_NFT_CARD);
  }, []);

  if (!token) {
    return null;
  }

  const {
    collection_description: description,
    collection_id: collectionId,
    collection_name: name,
    data,
    date_of_creation: createdOn,
    image_path: imagePath,
    owner,
    token_id: id,
    token_prefix: prefix
  } = token;

  const imageUrl = getImageURL(imagePath);

  if (loading) return <LoadingComponent />;

  return (
    <Wrapper>
      <TokenPicture
        alt={`${prefix}-${id}`}
        src={imageUrl}
      />
      <div>
        <Heading size={'2'}>{`${prefix} #${id}`}</Heading>
        <TokenInfo>
          <Text color={'grey-500'}>Created on</Text>
          <Text>{timestampFormat(createdOn)}</Text>
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
          <CollectionLink onClick={onCollectionClick} to={`/${currentChain.network}/collections/${collectionId}`}>
            <Avatar
              size={'small'}
              src={getCoverURLFromCollection(token)}
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
  border-radius: 8px;
  overflow: hidden;
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

const OwnerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);
`;

export default TokenDetailComponent;

import { FC, useCallback } from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { Heading, Text } from '@unique-nft/ui-kit';

import { Token } from '@app/api';
import { LoadingComponent, Picture } from '@app/components/index';
import { DeviceSize, useApi, useCheckImageExists, useDeviceSize } from '@app/hooks';
import { convertAttributesToView, tokenPageTimestampFormat } from '@app/utils';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { Question } from '@app/images/icons/svgs';
import { getCoverURLFromCollection } from '@app/utils/collectionUtils';
import ProgressBar from '@app/components/ProgressBar';

import AccountLinkComponent from '../pages/Account/components/AccountLinkComponent';

interface TokenDetailComponentProps {
  token: Token;
  loading?: boolean;
}

const TokenDetailComponent: FC<TokenDetailComponentProps> = ({ loading, token }) => {
  const deviceSize = useDeviceSize();
  const { currentChain } = useApi();
  // user analytics
  const onCollectionClick = useCallback(() => {
    logUserEvents(UserEvents.Click.COLLECTION_FROM_NFT_CARD);
  }, []);

  const {
    attributes,
    collection_id: collectionId,
    collection_name: name,
    date_of_creation: createdOn,
    image,
    owner,
    token_id: id,
    token_prefix: prefix,
    type,
  } = token;

  const { imgSrc } = useCheckImageExists(
    getCoverURLFromCollection(token.collection_cover),
  );

  if (loading) return <LoadingComponent />;

  const attributesParsed = convertAttributesToView(attributes);

  const createdOnDate = tokenPageTimestampFormat(createdOn);

  return (
    <Wrapper>
      <TokenPicture
        alt={`${prefix}-${id}`}
        src={image.fullUrl}
        badge={type !== 'NFT' ? type : ''}
      />
      <div>
        <Heading size="2">{`${prefix} #${id}`}</Heading>
        <TokenInfo>
          <Text color="grey-500">Collection</Text>
          <div>
            <CollectionLink
              to={`/${currentChain.network.toLowerCase()}/collections/${collectionId}`}
              onClick={onCollectionClick}
            >
              {/* the picture has not exists */}
              {!imgSrc && (
                <TokenPicture alt={token.collection_id.toString()} src={imgSrc} />
              )}
              {/* the picture has loaded */}
              {imgSrc && (
                <CollectionPictureWrapper>
                  <CollectionPicture src={imgSrc} />
                </CollectionPictureWrapper>
              )}
              <div>
                <Text color="primary-500">{name}</Text>
                <div>
                  <Text color="additional-dark" size="xs">
                    ID {token.collection_id}
                  </Text>
                </div>
              </div>
            </CollectionLink>
          </div>
          <Text color="grey-500">Created on</Text>
          <Text>{createdOnDate}</Text>
          <Text color="grey-500">Owner{type === 'FRACTIONAL' && 's'}</Text>
          <OwnerWrapper>
            <AccountLinkComponent noShort={deviceSize >= DeviceSize.xxl} value={owner} />
          </OwnerWrapper>
        </TokenInfo>
        <TokenAttributes>
          {type !== 'FRACTIONAL' && (
            <CheracteristicsInfo>
              <Heading size="4">Сharacteristics</Heading>
              <RFTAttribute key={`attribute-fractions-minted`}>
                <Text color="grey-500">Total number of minted fractions:</Text>
                <Text>10000</Text>
              </RFTAttribute>
              <RFTAttribute key={`attribute-fractions-sold`}>
                <Text color="grey-500">Total number of fractions sold:</Text>
                <Text>10000</Text>
              </RFTAttribute>
              <RFTAttribute key={`attribute-fractions-owned`}>
                <Text color="grey-500">Owned fractions:</Text>
                <Text>10000</Text>
              </RFTAttribute>
              <RFTAttribute key={`attribute-fractions-owned`}>
                <Text color="grey-500">Ownership percentage:</Text>
                <Text>1,25 %</Text>
              </RFTAttribute>
              <ProgressBarStyled filledPercent={1.25} />
            </CheracteristicsInfo>
          )}
          {type === 'NESTED' ? (
            <HeaderWithTooltip>
              <Heading size="4">Parent NFT attributes</Heading>
              <img
                data-tip={true}
                alt="tooltip"
                data-for="bundleAttrTooltip"
                src={Question}
              />
              <ReactTooltip
                id="bundleAttrTooltip"
                effect="solid"
                place="top"
                className={'tooltip'}
              >
                <span>
                  Special features of the token that the collection creator specifies when
                  minting
                </span>
              </ReactTooltip>
            </HeaderWithTooltip>
          ) : (
            <Heading size="4">Attributes</Heading>
          )}
          <div>
            {attributesParsed.map((attr) => (
              <div key={`attribute-${attr.name}`}>
                <Text color="grey-500">{attr.name}</Text>
                <TagsWrapper>
                  {Array.isArray(attr.value) &&
                    attr.value.map((item: string, index: number) => (
                      <Tag key={`item-${item}-${index}`}>{item}</Tag>
                    ))}
                  {typeof attr.value === 'string' && <Tag>{attr.value}</Tag>}
                </TagsWrapper>
              </div>
            ))}
          </div>
        </TokenAttributes>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 536px 1fr;
  grid-column-gap: calc(var(--gap) * 4);

  @media (max-width: 1024px) {
    grid-template-columns: 326px 1fr;
  }
  @media (max-width: 992px) {
    grid-column-gap: calc(var(--gap) * 2);
  }
  @media (max-width: 768px) {
    grid-template-columns: 224px 1fr;
  }
  @media (max-width: 568px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 290px) {
    .unique-text[class*='size-m'] {
      font-size: 13px;
    }
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

  @media (max-width: 1024px) {
    width: 326px;
    height: 326px;
  }

  @media (max-width: 768px) {
    width: 224px;
    height: 224px;
  }

  @media (max-width: 568px) {
    width: 100%;
    height: 100%;
  }
`;
const CollectionPictureWrapper = styled.div`
  width: 40px;
  display: flex;
  align-items: center;
`;

const CollectionPicture = styled.div<{ src: string }>`
  width: 40px;
  height: 40px;
  border-radius: 48px;
  background-image: url(${(props) => props.src});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 380px) {
    width: 30px;
    height: 30px;
  }
`;

const TokenInfo = styled.div`
  display: grid;
  grid-template-columns: 85px 1fr;
  grid-column-gap: var(--gap);
  grid-row-gap: var(--gap);
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);

  span {
    display: flex !important;
    align-items: center;
  }
`;

const CheracteristicsInfo = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
  border-bottom: 1px dashed var(--border-color);
`;

const RFTAttribute = styled.div`
  display: flex;
  gap: calc(var(--gap) / 2);
  &:first-of-type {
    margin-top: var(--gap);
  }
`;

const ProgressBarStyled = styled(ProgressBar)`
  margin-top: 6px;
`;

const TokenAttributes = styled.div`
  padding-bottom: calc(var(--gap) * 2);
  margin-bottom: calc(var(--gap) * 2);
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

const HeaderWithTooltip = styled.div`
  display: flex;
  gap: calc(var(--gap) / 2);
  align-items: start;
  img {
    margin-top: 2px;
  }
  .tooltip {
    width: 200px;
  }
`;

const CollectionLink = styled(Link)`
  display: flex;
  column-gap: calc(var(--gap) / 2);
  word-break: break-word;
  overflow: hidden;

  &:hover {
    text-decoration: none;
  }

  .picture {
    width: 42px;
    height: 42px;
    border-radius: 48px;
  }
`;

const OwnerWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: var(--gap);

  svg {
    height: calc(var(--gap) * 1.5);
    width: calc(var(--gap) * 1.5);
  }
`;

export default TokenDetailComponent;

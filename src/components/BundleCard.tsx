import { FC, useCallback } from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import { useApi, useCheckImageExists } from '@app/hooks';
import { timeDifference } from '@app/utils';
import { Token } from '@app/api';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { Picture } from '@app/components';
import { SVGIcon } from '@app/components/SVGIcon';

type BundleCardProps = Token & { timeNow?: number };

const BundleCard: FC<BundleCardProps> = ({
  collection_id: collectionId,
  collection_name: name,
  bundle_created: bundleCreated,
  image,
  timeNow,
  token_id: tokenId,
  token_prefix: prefix,
  children_count,
  transfers_count,
}) => {
  const navigate = useNavigate();
  const { currentChain } = useApi();
  // user analytics
  const onNFTCardClick = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('collections')) {
      logUserEvents(UserEvents.Click.ON_NFT_CARD_ON_COLLECTION_PAGE);
    }

    navigate(`/${currentChain.network.toLowerCase()}/nfts/${collectionId}/${tokenId}`);
  }, [collectionId, currentChain.network, navigate, tokenId]);

  const { imgSrc } = useCheckImageExists(image.fullUrl);

  return (
    <TokenCardLink onClick={onNFTCardClick}>
      {/* the picture has not exists */}
      {!imgSrc && <TokenPicture alt={tokenId.toString()} src={imgSrc} />}
      {/* the picture has loaded */}
      {imgSrc && <TokenBackground imgUrl={imgSrc} />}
      <TokenTitle>
        <Text color="primary-500" size="l">{`${prefix || ''} #${tokenId}`}</Text>
        <div>
          <TokenCollectionLink
            to={`/${
              currentChain ? currentChain?.network + '/' : ''
            }collections/${collectionId}`}
          >
            {name} [{collectionId}]
          </TokenCollectionLink>
        </div>
        <TokenProperties>
          <Text color="grey-500" size="xs">
            Transfers:{' '}
            <Text color="additional-dark" size="xs">
              {transfers_count}
            </Text>
          </Text>
          <Text color="grey-500" size="xs">
            Nested items:{' '}
            <Text color="additional-dark" size="xs">
              {children_count}
            </Text>
          </Text>
          <CreatedDate>
            <StyledSVGIcon height={16} name="clock" width={16} />
            <Text color="additional-dark" size="xs">
              {timeDifference(bundleCreated, timeNow)}
            </Text>
          </CreatedDate>
        </TokenProperties>
      </TokenTitle>
    </TokenCardLink>
  );
};

const StyledSVGIcon = styled(SVGIcon)`
  color: var(--blue-gray-400);
  margin-right: 5px;
`;

const TokenCardLink = styled.div`
  cursor: pointer;
  width: 100%;
  border: 1px solid var(--blue-gray-200);
  border-radius: calc(var(--bradius) * 2);
  transition: 50ms;
  overflow: hidden;

  &:hover {
    transform: translate(0, -5px);
    text-decoration: none;
  }
`;

const TokenPicture = styled(Picture)`
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  svg {
    width: 100%;
  }
`;

const TokenCollectionLink = styled(Link)`
  color: var(--primary-500);
  font-size: 12px;
  line-height: 18px;
`;

const TokenBackground = styled.div<{ imgUrl: string }>`
  width: 100%;
  background-image: url(${(props) => props.imgUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 8px 8px 0 0;

  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

const TokenTitle = styled.div`
  margin: var(--gap);

  a {
    word-break: break-word;
  }
`;

const TokenProperties = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: calc(var(--gap) / 2);
  gap: 2px;
`;

const CreatedDate = styled.div`
  display: flex;
  align-items: center;
`;

export default BundleCard;

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

type TokenCardProps = Token & { timeNow?: number };

const TokenCard: FC<TokenCardProps> = ({
  collection_id: collectionId,
  collection_name: name,
  date_of_creation: dateOfCreation,
  image,
  timeNow,
  token_id: tokenId,
  token_prefix: prefix,
  type,
}) => {
  const navigate = useNavigate();
  const { currentChain } = useApi();

  let typeLinkPart = type === 'FRACTIONAL' ? 'rft' : 'nfts';

  const navigateTo = `/${currentChain.network.toLowerCase()}/${typeLinkPart}/${collectionId}/${tokenId}`;

  const logUserAnalytics = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('collections')) {
      logUserEvents(UserEvents.Click.ON_NFT_CARD_ON_COLLECTION_PAGE);
    }
  }, [collectionId, currentChain.network, navigate, tokenId]);

  const { imgSrc } = useCheckImageExists(image.fullUrl);

  return (
    <TokenCardLink to={navigateTo} onClick={logUserAnalytics}>
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
            {name} [ID {collectionId}]
          </TokenCollectionLink>
        </div>
        <TokenProperties>
          <StyledSVGIcon height={16} name="clock" width={16} />
          <Text color="additional-dark" size="xs">
            {timeDifference(dateOfCreation, timeNow)}
          </Text>
        </TokenProperties>
      </TokenTitle>
    </TokenCardLink>
  );
};

const StyledSVGIcon = styled(SVGIcon)`
  color: var(--blue-gray-400);
  margin-right: 5px;
`;

const TokenCardLink = styled(Link)`
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
  align-items: center;
  margin-top: calc(var(--gap) / 2);
`;

export default TokenCard;

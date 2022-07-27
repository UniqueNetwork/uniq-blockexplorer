import { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import { useApi } from '@app/hooks';
import { getImageURL, shortcutText } from '@app/utils';
import { Token } from '@app/api';

import Picture from './Picture';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';

type TokenCardProps = Token;

const TokenCard: FC<TokenCardProps> = ({
  collection_id: collectionId,
  collection_name: name,
  date_of_creation: dateOfCreation,
  image_path: imagePath,
  owner,
  token_id: tokenId,
  token_prefix: prefix
}) => {
  const { currentChain } = useApi();
  // user analytics
  const onNFTCardClick = useCallback(() => {
    const path = window.location.pathname;

    if (path.includes('collections')) {
      logUserEvents(UserEvents.Click.ON_NFT_CARD_ON_COLLECTION_PAGE);
    }
  }, []);

  const imageUrl = getImageURL(imagePath);

  const img = new Image();

  img.src = imageUrl;

  return (
    <TokenCardLink
      onClick={onNFTCardClick}
      to={`/${currentChain.network}/tokens/${collectionId}/${tokenId}`}
    >
      {!imageUrl && <TokenPicture
        alt={tokenId.toString()}
        src={imageUrl}
      />}

      {imageUrl && <TokenImg imgUrl={imageUrl} />}
      <TokenTitle>
        <Text>{`${prefix || ''} #${tokenId}`}</Text>
        <div>
          <Link to={`/${currentChain ? currentChain?.network + '/' : ''}collections/${collectionId}`}>{name} [ID {collectionId}]</Link>
        </div>
        <TokenProperties>
          <Text
            color='grey-500'
            size='xs'
          >
            Owner: </Text>
          <Text
            color='grey-500'
            size='xs'
          >{shortcutText(owner)}</Text>
        </TokenProperties>
      </TokenTitle>
    </TokenCardLink>
  );
};

const TokenCardLink = styled(Link)`
  width: 100%;
  border: 1px solid var(--blue-gray-200);
  border-radius: calc(var(--bradius) * 2);
  transition: 50ms;
  &:hover {
    transform: translate(0, -5px);
    text-decoration: none;
  }
`;

const TokenPicture = styled(Picture)`
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  svg {
    width: 100%
  }
`;

const TokenImg = styled.div<{imgUrl: string}>`
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
  margin-top: calc(var(--gap) / 2);
`;

export default TokenCard;

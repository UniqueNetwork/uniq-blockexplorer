import { FC, useCallback } from 'react';
import styled from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';

import { useApi, useCheckImageExists } from '@app/hooks';
import { timeDifference } from '@app/utils';
import { Token } from '@app/api';
import { Picture } from '@app/components';
import { SVGIcon } from '@app/components/SVGIcon';

type BundleCardProps = Token & { timeNow?: number };

const BundleCard: FC<BundleCardProps> = ({
  bundle_created: dateOfCreation,
  children_count,
  collection_id: collectionId,
  collection_name: name,
  image,
  timeNow,
  token_id: tokenId,
  token_prefix: prefix,
  type,
  transfers_count,
}) => {
  const { currentChain } = useApi();

  let typeLinkPart = type === 'FRACTIONAL' ? 'fractional' : 'nfts';

  const navigateTo = `/${currentChain.network.toLowerCase()}/${typeLinkPart}/${collectionId}/${tokenId}`;

  const { imgSrc } = useCheckImageExists(image.fullUrl);

  return (
    <BundleCardLink to={navigateTo}>
      {/* the picture has not exists */}
      {!imgSrc && <TokenPicture alt={tokenId.toString()} src={imgSrc} />}
      {/* the picture has loaded */}
      {imgSrc && <TokenBackground imgUrl={imgSrc} />}
      <TokenTitle>
        <Text color="primary-500" size="l">{`${prefix || ''} #${tokenId}`}</Text>
        <CollectionLinkWrapper>
          <TokenCollectionLink
            to={`/${
              currentChain ? currentChain?.network + '/' : ''
            }collections/${collectionId}`}
          >
            {name} [ID {collectionId}]
          </TokenCollectionLink>
        </CollectionLinkWrapper>
        <TokenProperties>
          <TransfersRow>
            <Text color="grey-500" size="xs" weight="light">
              Transfers:&nbsp;
            </Text>
            <Text color="additional-dark" size="xs" weight="light">
              {transfers_count}
            </Text>
          </TransfersRow>
          <NestedRow>
            <Text color="grey-500" size="xs" weight="light">
              Nested items:&nbsp;
            </Text>
            <Text color="additional-dark" size="xs" weight="light">
              {children_count}
            </Text>
          </NestedRow>
          <CreatedRow>
            <StyledSVGIcon height={16} name="clock" width={16} />
            <Text color="additional-dark" size="xs" weight="light">
              {timeDifference(dateOfCreation, timeNow)}
            </Text>
          </CreatedRow>
        </TokenProperties>
      </TokenTitle>
    </BundleCardLink>
  );
};

const TokenProperties = styled.div`
  display: flex;
  flex-direction: column;
`;

const NestedRow = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const TransfersRow = styled.div`
  display: flex;
  margin-bottom: 2px;
`;

const StyledSVGIcon = styled(SVGIcon)`
  color: var(--blue-gray-400);
  margin-right: 5px;
`;

const BundleCardLink = styled(Link)`
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

const CollectionLinkWrapper = styled.div`
  margin-bottom: calc(var(--gap) / 2);
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

const CreatedRow = styled.div`
  display: flex;
  align-items: center;
`;

export default BundleCard;

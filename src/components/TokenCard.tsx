import React, { FC, useCallback, useEffect, useState } from 'react';
import { Heading } from '@unique-nft/ui-kit';
import { Token } from '../api/graphQL';
import Picture from './Picture';
import { useApi } from '../hooks/useApi';
import { NFTToken } from '../api/chainApi/unique/types';

// tslint:disable-next-line:no-empty-interface
type TokenCardProps = Token

const TokenCard: FC<TokenCardProps> = (props) => {
  const { collection, collection_id: collectionId, token_id: tokenId } = props;

  const [tokenImageUrl, setTokenImageUrl] = useState<string>();

  const { api, rpcClient } = useApi();

  const fetchToken = useCallback(async () => {
    if (rpcClient?.isApiConnected) {
      const token = await api?.getToken(collectionId, tokenId) as NFTToken;

      setTokenImageUrl(token.imageUrl);
    }
  }, [collectionId, tokenId, rpcClient?.isApiConnected, api]);

  useEffect(() => {
    fetchToken()
      .catch((errMsg) => console.error(errMsg));
  }, [fetchToken]);

  return (
    <div className={'grid-item_col1 card margin-bottom flexbox-container_column'}>
      <Picture
        alt={tokenId.toString()}
        src={tokenImageUrl}
      />
      <div className={'flexbox-container flexbox-container_column flexbox-container_without-gap'}>
        <Heading size={'4'}>{`${collection.token_prefix || ''} #${tokenId}`}</Heading>
        <div>
          <a>
            {props.collection.name} [ID&nbsp;{collectionId}]
          </a>
        </div>
        <div className={'text_grey margin-top'}>Transfers: 0</div>
      </div>
    </div>
  );
};

export default TokenCard;

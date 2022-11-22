import React from 'react';
import { DefaultRecordType } from 'rc-table/es/interface';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';
import { useParams } from 'react-router-dom';

import { EventsActions } from '@app/api/graphQL/tokensEvents/types';
import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { useApi } from '@app/hooks';
import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';
import TokenTableCell from '@app/components/TokenTableCell';
import { Token } from '@app/api';
import config from '@app/config';

function ResultTableCell({ event }: { event: DefaultRecordType }) {
  const { currentChain } = useApi();
  const { chainId } = useParams<'chainId'>();
  const { defaultChain } = config;
  const { action, result, values } = event;
  const formatAddress = (address: string) => {
    let substrateAddress = address;

    // if we get an ether address
    if (/0x[0-9A-Fa-f]{40}/g.test(address)) {
      substrateAddress = getMirrorFromEthersToSubstrate(address, currentChain.network);
    }

    return substrateAddress;
  };

  // mint
  if (action === EventsActions.create) {
    return result ? (
      <Text size="m" weight="regular" color={'blue-grey-600'}>
        Token created
      </Text>
    ) : (
      <Text size="m" weight="regular" color={'coral-700'}>
        Token creation failed
      </Text>
    );
  }

  // destroy
  if (action === EventsActions.burn) {
    return result ? (
      <Text size="m" weight="regular" color={'blue-grey-600'}>
        Token destroyed
      </Text>
    ) : (
      <Text size="m" weight="regular" color={'coral-700'}>
        Token destroy failed
      </Text>
    );
  }

  // nesting
  if (values.toToken) {
    const { toToken, tokens } = values;
    let fromTokenData = tokens[0];
    let toTokenData = tokens[1];

    tokens.forEach((token: Token) => {
      if (token.token_id === toToken.tokenId) {
        toTokenData = token;
      } else fromTokenData = token;
    });

    return result ? (
      <Text size="m" weight="regular" color={'blue-grey-600'}>
        {/* <CellWrapper> */}
        {/*   <TokenTableCell */}
        {/*     chainId={chainId || defaultChain.network} */}
        {/*     collectionId={fromTokenData.collection_id} */}
        {/*     imageUrl={fromTokenData.image.fullUrl} */}
        {/*     tokenId={fromTokenData.token_id} */}
        {/*     tokenPrefix={fromTokenData.token_prefix} */}
        {/*     tokenName={fromTokenData.token_name} */}
        {/*     type={'NESTED'} */}
        {/*     iconSize={24} */}
        {/*   /> */}
        {/* </CellWrapper> */}
        Transferred to
        <CellWrapper>
          <TokenTableCell
            chainId={chainId || defaultChain.network}
            collectionId={toTokenData.collection_id}
            imageUrl={toTokenData.image.fullUrl}
            tokenId={toTokenData.token_id}
            tokenPrefix={toTokenData.token_prefix}
            tokenName={toTokenData.token_name}
            type={'NESTED'}
            iconSize={24}
          />
        </CellWrapper>
      </Text>
    ) : (
      <Text size="m" weight="regular" color={'coral-700'}>
        {/* <CellWrapper> */}
        {/*   <TokenTableCell */}
        {/*     chainId={chainId || defaultChain.network} */}
        {/*     collectionId={fromTokenData.collection_id} */}
        {/*     imageUrl={fromTokenData.image.fullUrl} */}
        {/*     tokenId={fromTokenData.token_id} */}
        {/*     tokenPrefix={fromTokenData.token_prefix} */}
        {/*     tokenName={fromTokenData.token_name} */}
        {/*     type={'NESTED'} */}
        {/*     iconSize={24} */}
        {/*   /> */}
        {/* </CellWrapper> */}
        Transferred to
        <CellWrapper>
          <TokenTableCell
            chainId={chainId || defaultChain.network}
            collectionId={toTokenData.collection_id}
            imageUrl={toTokenData.image.fullUrl}
            tokenId={toTokenData.token_id}
            tokenPrefix={toTokenData.token_prefix}
            tokenName={toTokenData.token_name}
            type={'NESTED'}
            iconSize={24}
          />
        </CellWrapper>
        failed
      </Text>
    );
  }

  // transfer
  return result ? (
    <Text size="m" weight="regular" color={'blue-grey-600'}>
      Transferred to
      <CellWrapper>
        <AccountLinkComponent value={formatAddress(values.to.value)} />
      </CellWrapper>
    </Text>
  ) : (
    <Text size="m" weight="regular" color={'coral-700'}>
      Transferred to failed
      <CellWrapper>
        <AccountLinkComponent value={formatAddress(values.to.value)} />
      </CellWrapper>
      failed
    </Text>
  );
}

const CellWrapper = styled.div`
  display: inline-block;
  vertical-align: bottom;
  margin-left: 4px;
  margin-right: 4px;
`;

export default ResultTableCell;

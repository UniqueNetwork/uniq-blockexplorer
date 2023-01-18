import React from 'react';
import { DefaultRecordType } from 'rc-table/es/interface';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';
import { Address } from '@unique-nft/utils';

import { EventsActions } from '@app/api/graphQL/tokensEvents/types';
import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { useApi } from '@app/hooks';
import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';
import { NestingTableCell } from '@app/components/EventsTable/NestingTableCell';

function ResultTableCell({ event }: { event: DefaultRecordType }) {
  const { currentChain } = useApi();
  const { action, result, values, tokens } = event;
  const formatAddress = (address: string) => {
    let substrateAddress = address;

    // if we get an ether address
    if (Address.is.ethereumAddress(address)) {
      substrateAddress = getMirrorFromEthersToSubstrate(address, currentChain.network);
    }

    return substrateAddress;
  };

  const color = result ? 'blue-grey-600' : 'coral-700';

  // mint
  if (action === EventsActions.create) {
    return (
      <Text size="m" weight="regular" color={color}>
        {result ? 'Token created' : 'Token creation failed'}
      </Text>
    );
  }

  // destroy
  if (action === EventsActions.burn) {
    return (
      <Text size="m" weight="regular" color={color}>
        {result ? 'Token destroyed' : 'Token destroy failed'}
      </Text>
    );
  }

  // nesting
  if (values.toToken) {
    const { toToken } = values;
    return <NestingTableCell tokenId={toToken.tokenId} result={result} tokens={tokens} />;
  }

  // transfer
  return (
    <Text size="m" weight="regular" color={color}>
      {result ? 'Transferred to' : 'Transfer to'}
      <CellWrapper>
        <AccountLinkComponent value={formatAddress(values.to.value)} />
      </CellWrapper>
      {!result && 'failed'}
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

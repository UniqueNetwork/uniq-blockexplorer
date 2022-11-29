import React from 'react';
import { DefaultRecordType } from 'rc-table/es/interface';
import { Text } from '@unique-nft/ui-kit';
import styled from 'styled-components/macro';

import { EventsActions } from '@app/api/graphQL/collectionsEvents/types';
import { getMirrorFromEthersToSubstrate } from '@app/utils';
import { useApi } from '@app/hooks';
import AccountLinkComponent from '@app/pages/Account/components/AccountLinkComponent';

function ResultTableCell({ event }: { event: DefaultRecordType }) {
  const { currentChain } = useApi();
  const { action, result, author } = event;
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
        Collection created
      </Text>
    ) : (
      <Text size="m" weight="regular" color={'coral-700'}>
        Collection creation failed
      </Text>
    );
  }

  // destroy
  if (action === EventsActions.burn) {
    return result ? (
      <Text size="m" weight="regular" color={'blue-grey-600'}>
        Collection destroyed
      </Text>
    ) : (
      <Text size="m" weight="regular" color={'coral-700'}>
        Collection destroy failed
      </Text>
    );
  }

  // transfer
  return result ? (
    <Text size="m" weight="regular" color={'blue-grey-600'}>
      Transferred to
      <CellWrapper>
        <AccountLinkComponent value={formatAddress(author)} />
      </CellWrapper>
    </Text>
  ) : (
    <Text size="m" weight="regular" color={'coral-700'}>
      Transferred to failed
      <CellWrapper>
        <AccountLinkComponent value={formatAddress(author)} />
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

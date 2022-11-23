import { useState, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Button } from '@unique-nft/ui-kit';

import { DeviceSizes, useApi, useQueryParams } from '@app/hooks';
import { PagePaperWrapper, DropdownOptionProps } from '@app/components';

import { HeaderWithDropdown } from '../HeaderWithDropdown';
import {
  lastTransferOptions,
  SELECTED_BLOCK_COIN,
  SELECTED_BLOCK_NFT,
} from './lastTransferOptions';
import { LastCoinsTransfers } from './LastCoinsTransfers';
import { LastNFTsTransfers } from './LastNFTsTransfers';

export type LastTransfersProps = {
  searchString?: string;
  pageSize?: number;
  accountId?: string;
};

export const LastTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 6,
  searchString,
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const { setParamToQuery, mainLastTransfersSort } = useQueryParams();
  const defaultSort = lastTransferOptions.find(
    (option) => option.id === mainLastTransfersSort,
  );
  const [selectedSort, setSelectedSort] = useState<DropdownOptionProps>(
    defaultSort || lastTransferOptions[1],
  );
  const [, setContentExist] = useState<boolean>(false);
  const linkUrl = `/${currentChain.network.toLowerCase()}/last-transfers`;
  const showNFTs = selectedSort.id === SELECTED_BLOCK_NFT;
  const showCoins = selectedSort.id === SELECTED_BLOCK_COIN;

  const onOrderChange = (newOrder: DropdownOptionProps) => {
    setParamToQuery([
      {
        name: 'mainLastTransfersSort',
        value: newOrder.id as string,
      },
    ]);
    setSelectedSort(newOrder);
  };

  const onClickSeeMore = () => {
    navigate(linkUrl);
  };

  return (
    <Wrapper data-automation-id="last-transfers">
      <HeaderWithDropdown
        options={lastTransferOptions}
        selectedSort={selectedSort}
        setSelectedSort={onOrderChange}
        title="Last transfers"
      />
      {showNFTs && (
        <LastNFTsTransfers
          accountId={accountId}
          pageSize={pageSize}
          searchString={searchString}
          hideButton={setContentExist}
        />
      )}
      {showCoins && (
        <LastCoinsTransfers
          accountId={accountId}
          hideButton={setContentExist}
          pageSize={pageSize}
          searchString={searchString}
        />
      )}
      {false && (
        <ButtonWrapper
          iconRight={{
            color: '#fff',
            name: 'arrow-right',
            size: 12,
          }}
          role="primary"
          title="See all"
          onClick={onClickSeeMore}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  display: flex;
  flex-direction: column;

  @media (max-width: ${DeviceSizes.sm}) {
    button.unique-button {
      width: 100%;
    }
  }
`;

const ButtonWrapper = styled(Button)`
  width: 123px;
`;

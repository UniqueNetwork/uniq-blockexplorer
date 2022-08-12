import React, {useState, VFC} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {Button, SelectOptionProps} from '@unique-nft/ui-kit';

import { useApi } from '@app/hooks';
import { PagePaperWrapper } from '@app/components';

import { HeaderWithDropdown} from '../HeaderWithDropdown';
import { lastTransferOptions, SELECTED_BLOCK_NFT } from './lastTransferOptions';
import { LastCoinsTransfers } from "./LastCoinsTransfers";
import { LastNFTsTransfers } from "./LastNFTsTransfers";

export type LastTransfersProps = {
  searchString?: string
  pageSize?: number
  accountId?: string
}

export const LastTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(lastTransferOptions[0]);
  const linkUrl = `/${currentChain.network}/last-transfers`;
  const showNFTs = selectedSort.id === SELECTED_BLOCK_NFT;

  const onClickSeeMore = () => {
    navigate(linkUrl);
  };

  return (
    <Wrapper>
      <HeaderWithDropdown
        options={lastTransferOptions}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        title='Last transfers'
      />
      { showNFTs ? (
        <LastNFTsTransfers
          accountId={accountId}
          pageSize={pageSize}
          searchString={searchString}
        />
      ) : (
        <LastCoinsTransfers
          accountId={accountId}
          pageSize={pageSize}
          searchString={searchString}
        />
      )}
      <Button
        iconRight={{
          color: '#fff',
          name: 'arrow-right',
          size: 12
        }}
        onClick={onClickSeeMore}
        role='primary'
        title='See all'
      />
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;

import { useEffect, useState, VFC } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@unique-nft/ui-kit';

import { DeviceSize, deviceWidth, useApi, useDeviceSize } from '@app/hooks';
import { Header } from '@app/styles/styled-components';
import { PagePaperWrapper, Pagination, Table } from '@app/components';
import {
  TokenTransaction,
  useGraphQlNftTransfers,
} from '@app/api/graphQL/nftTransactions';
import { getTransferNftColumns } from '@app/pages/Main/components/LastTransfers/getTransferNftColumns';

import { transfersWithTimeDifference } from './transfersWithTimeDifference';
import { LastNftTransfersCardsList } from './LastNftTransfersCardsList';

export type LastTransfersProps = {
  searchString?: string;
  pageSize?: number;
  accountId?: string;
  setResultExist?: (val: boolean) => void;
};

export const NFTsTransfersSearchResult: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString,
  setResultExist,
}) => {
  const { currentChain } = useApi();
  const deviceSize = useDeviceSize();
  const prettifiedBlockSearchString =
    searchString !== '' && /^\d+-+\d/.test(searchString || '') ? searchString : undefined;
  const isMobile = deviceSize <= DeviceSize.sm;
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageSize;

  const { isNftTransfersFetching, nftTransfers, nftTransfersCount, timestamp } =
    useGraphQlNftTransfers({
      accountId,
      pageSize,
      offset,
      orderBy: { timestamp: 'desc' },
      searchString: prettifiedBlockSearchString,
    });

  useEffect(() => {
    if (
      !isNftTransfersFetching &&
      setResultExist &&
      !!nftTransfersCount &&
      prettifiedBlockSearchString
    ) {
      setResultExist(true);
    }
  }, [
    nftTransfersCount,
    isNftTransfersFetching,
    setResultExist,
    prettifiedBlockSearchString,
  ]);

  if (!prettifiedBlockSearchString || nftTransfersCount === 0) {
    return null;
  }

  return (
    <Wrapper>
      <StyledHeader size="2">NFTs transfers</StyledHeader>
      {!isMobile && (
        <TableWrapper>
          <Table
            columns={getTransferNftColumns(currentChain?.network)}
            data={transfersWithTimeDifference<TokenTransaction>(nftTransfers, timestamp)}
            loading={isNftTransfersFetching}
            rowKey="block_index"
          />
        </TableWrapper>
      )}
      {isMobile && (
        <LastNftTransfersCardsList
          columns={getTransferNftColumns(currentChain?.network)}
          data={transfersWithTimeDifference<TokenTransaction>(nftTransfers, timestamp)}
          loading={isNftTransfersFetching}
        />
      )}
      <Pagination
        count={nftTransfersCount}
        currentPage={currentPage}
        pageSize={pageSize}
        siblingCount={deviceSize <= DeviceSize.sm ? 1 : 2}
        onPageChange={setCurrentPage}
      />
    </Wrapper>
  );
};

const StyledHeader = styled(Header)`
  @media ${deviceWidth.smallerThan.md} {
    font-size: 20px !important;
    line-height: 28px !important;
    font-weight: 700 !important;
  }
`;

const Wrapper = styled(PagePaperWrapper)`
  display: flex;
  flex-direction: column;

  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;

const TableWrapper = styled.div`
  && td {
    padding: calc(var(--gap));
  }
`;

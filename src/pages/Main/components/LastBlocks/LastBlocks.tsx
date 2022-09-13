import { useEffect, useState } from 'react';
import { Button, Skeleton } from '@unique-nft/ui-kit';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useGraphQlBlocks } from '@app/api/graphQL';
import { PagePaperWrapper, Pagination, Stub, ScrollableTable } from '@app/components';
import { useApi } from '@app/hooks/useApi';
import { HeaderWithDropdown } from '@app/pages/Main/components/HeaderWithDropdown';
import { deviceWidth } from '@app/hooks';
import { Header } from '@app/styles/styled-components';

import { BlockComponentProps } from '../../types';
import { getLastBlocksColumns } from './getLastBlocksColumns';
import { blocksWithTimeDifference } from './blocksWithTimeDifference';
import { DeviceSize, useDeviceSize } from '../../../../hooks/useDeviceSize';

export const LastBlocks = ({
  pageSize = 5,
  searchModeOn,
  searchString,
  setResultExist,
}: BlockComponentProps) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const deviceSize = useDeviceSize();
  const linkText = 'See all';
  const linkUrl = `/${currentChain.network}/last-blocks`;
  const prettifiedBlockSearchString =
    searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageSize;

  const { blockCount, blocks, isBlocksFetching, timestamp } = useGraphQlBlocks({
    offset,
    pageSize,
    searchString: prettifiedBlockSearchString,
  });

  const onClickSeeMore = () => {
    navigate(linkUrl);
  };

  const nothingToShow = !prettifiedBlockSearchString && blockCount === 0;

  useEffect(() => {
    if (
      searchModeOn &&
      !isBlocksFetching &&
      setResultExist &&
      prettifiedBlockSearchString &&
      blockCount !== 0
    ) {
      setResultExist(true);
    }
  }, [
    blockCount,
    isBlocksFetching,
    prettifiedBlockSearchString,
    searchModeOn,
    setResultExist,
  ]);

  if (
    (!prettifiedBlockSearchString && searchModeOn) ||
    (blockCount === 0 && searchModeOn)
  ) {
    return null;
  }

  return (
    <Wrapper data-automation-id="last-blocks">
      {searchModeOn ? (
        <StyledHeader size="2">Blocks</StyledHeader>
      ) : (
        <HeaderWithDropdown title="Last blocks" />
      )}
      {nothingToShow && !isBlocksFetching && <Stub />}
      {isBlocksFetching && (
        <SkeletonWrapper>
          <Skeleton />
        </SkeletonWrapper>
      )}
      {!isBlocksFetching && (
        <ScrollableTable
          columns={getLastBlocksColumns(currentChain.network)}
          data={blocksWithTimeDifference(blocks, timestamp)}
          loading={isBlocksFetching}
          rowKey={'block_number'}
        />
      )}
      <Pagination
        count={blockCount}
        currentPage={currentPage}
        pageSize={{ id: pageSize }}
        siblingCount={deviceSize <= DeviceSize.sm || deviceSize >= DeviceSize.xxl ? 1 : 2}
        onPageChange={setCurrentPage}
      />
      {false && (
        <ButtonWrapper
          iconRight={{
            color: '#fff',
            name: 'arrow-right',
            size: 12,
          }}
          role="primary"
          title={linkText}
          onClick={onClickSeeMore}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)`
  display: flex;
  flex-direction: column;
  .unique-font-heading.size-2 {
    margin-bottom: calc(var(--gap) * 2);
  }

  && td {
    padding: calc(var(--gap) * 1.5) var(--gap);
  }

  @media (max-width: 767px) {
    button.unique-button {
      width: 100%;
    }
  }
`;

const StyledHeader = styled(Header)`
  @media ${deviceWidth.smallerThan.md} {
    font-size: 20px !important;
    line-height: 28px !important;
    font-weight: 700 !important;
  }
`;

const ButtonWrapper = styled(Button)`
  width: 123px;
`;

const SkeletonWrapper = styled.div`
  padding: 0;
  display: flex;
  flex-grow: 1;

  .unique-skeleton {
    width: 100%;
    min-height: 150px;
    border-radius: var(--gap) !important;
  }
`;

import { Icon } from '@unique-nft/ui-kit';
import { FC } from 'react';
import styled from 'styled-components/macro';

import { Select, SelectOptionProps } from '@app/components';
import { DeviceSizes, DOTS, usePagination } from '@app/hooks';
import { DEFAULT_PAGE_SIZE } from '@app/pages/Tokens/constants';

import { PageNumber } from './PageNumber';

interface PaginationProps {
  count: number; // total number of elements in DB
  itemsName?: string;
  pageSize: number; // how many elements we present per single page
  onPageChange: (page: number) => void; // fetch new page data
  setPageSize?: (pageSize: SelectOptionProps) => void;
  siblingCount?: number; // how many pages to show, the rest will be "..."
  currentPage?: number;
}

const OPTIONS: SelectOptionProps[] = [
  {
    id: 24,
    title: '24',
  },
  {
    id: 36,
    title: '36',
  },
];

export const Pagination: FC<PaginationProps> = ({
  count,
  currentPage = 1,
  itemsName,
  onPageChange,
  pageSize,
  setPageSize,
  siblingCount = 2,
}) => {
  const pageSizeNumber = (pageSize?.id as number) || DEFAULT_PAGE_SIZE;
  const paginationRange = usePagination({
    currentPage,
    pageSize: pageSizeNumber,
    siblingCount,
    total: count,
  });

  const lastPage =
    (paginationRange?.length > 1 && paginationRange[paginationRange.length - 1]) || null;

  const onPageChanged = (newPage: number) => {
    onPageChange(newPage);
  };

  const onNext = () => {
    if (currentPage === lastPage || count < pageSizeNumber) return;

    onPageChanged(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage < 2 || count < pageSizeNumber) return;

    onPageChanged(currentPage - 1);
  };

  const changePageSize = (selected: SelectOptionProps) => {
    setPageSize && setPageSize(selected);
    onPageChange(1);
  };

  return (
    <PaginationWrapper className="pagination">
      <div className="count-with-page-size">
        <div>
          {count} {itemsName ?? 'items'}
        </div>
        {!!setPageSize && (
          <PageSize className="page-size">
            Results on the page
            <Select
              options={OPTIONS}
              value={pageSize?.id as string}
              onChange={changePageSize}
            />
          </PageSize>
        )}
      </div>
      {count > pageSizeNumber && (
        <PageNumbersWrapper>
          <li key="prev" onClick={onPrevious}>
            <Icon
              color={currentPage === 1 ? '#ABB6C1' : '#040B1D'}
              name="carret-right"
              size={12}
            />
          </li>
          {paginationRange.map((pageNumber, index) => (
            <PageNumber
              currentPage={currentPage}
              key={pageNumber === DOTS ? `${DOTS}_${index}` : pageNumber}
              pageNumber={pageNumber}
              onPageChanged={onPageChanged}
            />
          ))}
          {/* TODO: disabled={currentPage === lastPage} */}
          <li key="next" onClick={onNext}>
            <Icon
              color={
                currentPage === lastPage || count < pageSizeNumber ? '#ABB6C1' : '#040B1D'
              }
              name="carret-right"
              size={12}
            />
          </li>
        </PageNumbersWrapper>
      )}
    </PaginationWrapper>
  );
};

const PaginationWrapper = styled.div`
  display: flex;
  column-gap: var(--gap);
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${DeviceSizes.sm}) {
    flex-direction: column;
    row-gap: calc(var(--gap) * 1.5);
  }
`;

const PageNumbersWrapper = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;

  li:last-child,
  li:first-child {
    padding: 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  li:first-child {
    transform: rotate(180deg);
  }

  li {
    padding: 4px 6px;
    min-width: 18px;
    text-align: center;
    cursor: pointer;

    &.active {
      border: 1px solid var(--primary-500);
      color: var(--white-color);
      background-color: var(--primary-500);
      border-radius: 4px;
      cursor: default;
    }
  }
`;

const PageSize = styled.div``;

export default Pagination;

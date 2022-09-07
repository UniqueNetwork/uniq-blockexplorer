import React, { useCallback, useState } from 'react';
import { Icon, Select, SelectOptionProps } from '@unique-nft/ui-kit';
import styled from 'styled-components';

import { usePagination, DOTS } from '@app/hooks';
import { DEFAULT_PAGE_SIZE } from '@app/pages/Tokens/constants';

import { PageNumber } from './PageNumber';

interface PaginationProps {
  count: number; // total number of elements in DB
  itemsName?: string;
  pageSize: number; // how many elements we present per single page
  onPageChange: (page: number) => void; // fetch new page data
  selectPageSize?: (pageSize: SelectOptionProps) => void;
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

export const Pagination = ({
  count,
  currentPage = 1,
  itemsName,
  onPageChange,
  // pageSize as defaultPageSize,
  selectPageSize,
  siblingCount = 2,
}: PaginationProps) => {
  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: DEFAULT_PAGE_SIZE,
    title: DEFAULT_PAGE_SIZE.toString(),
  });

  const paginationRange = usePagination({
    currentPage,
    pageSize: 20,
    siblingCount,
    total: count,
  });

  const lastPage =
    (paginationRange?.length > 1 && paginationRange[paginationRange.length - 1]) || null;

  const onPageChanged = useCallback(
    (newPage: number) => {
      onPageChange(newPage);
    },
    [onPageChange],
  );

  const onNext = useCallback(() => {
    if (currentPage === lastPage || count < 20) return;
    onPageChanged(currentPage + 1);
  }, [currentPage, lastPage, count, pageSize, onPageChanged]);

  const onPrevious = useCallback(() => {
    if (currentPage < 2 || count < 20) return;
    onPageChanged(currentPage - 1);
  }, [currentPage, count, pageSize, onPageChanged]);

  const changePageSize = useCallback((selected) => {
    setPageSize(selected);
  }, []);

  console.log('pageSize', pageSize);

  return (
    <PaginationWrapper className="pagination">
      <div>
        {count} {itemsName ?? 'items'}
      </div>
      {!!setPageSize && (
        <PageSize>
          Results on the page
          <Select
            options={OPTIONS}
            value={pageSize?.id as string}
            onChange={changePageSize}
          />
        </PageSize>
      )}
      {count > 20 && (
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
              color={currentPage === lastPage || count < 20 ? '#ABB6C1' : '#040B1D'}
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

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start !important;
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

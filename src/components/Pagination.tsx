import React, { useCallback, useState } from 'react';
import { Icon } from '@unique-nft/ui-kit';
import usePagination, { DOTS } from '../hooks/usePagination';
import styled from 'styled-components';

interface PaginationProps {
  className?: string
  count: number // total number of elements in DB
  pageSize?: number // how many elements we present per single page
  onPageChange: (limit: number, offset: number) => void // fetch new page data
  siblingCount?: number // how many pages to show, the rest will be "..."
  currentPage?: number
}

// TODO: can be string (when DOTS)
const PageNumberComponent = (props: {
  pageNumber: number | string
  currentPage: number
  onPageChanged: (newPage: number) => void
}) => {
  const { currentPage, onPageChanged, pageNumber } = props;

  const onPagePillClick = useCallback(
    () => {
      onPageChanged(pageNumber as number);
    },
    [onPageChanged, pageNumber]
  );

  if (pageNumber === DOTS) {
    return <li>...</li>;
  }

  // Render our Page Pills
  return (
    // highlight if selected
    <li
      className={pageNumber === currentPage ? 'active' : ''}
      key={pageNumber}
      onClick={onPagePillClick}
    >
      {pageNumber}
    </li>
  );
};

const PaginationComponent = ({ className,
  count,
  currentPage: currentPageFromProps,
  onPageChange,
  pageSize = 10,
  siblingCount = 2 }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(currentPageFromProps || 1);
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    total: count
  });
  const lastPage =
    (paginationRange?.length > 1 && paginationRange[paginationRange.length - 1]) || null;

  const onPageChanged = useCallback((newPage: number) => {
    const offset = (newPage - 1) * pageSize;

    setCurrentPage(newPage);
    onPageChange(pageSize, offset);
  }, [pageSize, setCurrentPage, onPageChange]);

  const onNext = useCallback(() => {
    if (currentPage === lastPage || count < pageSize) return;
    onPageChanged(currentPage + 1);
  }, [currentPage, lastPage, count, pageSize, onPageChanged]);

  const onPrevious = useCallback(() => {
    if (currentPage < 2 || count < pageSize) return;
    onPageChanged(currentPage - 1);
  }, [currentPage, count, pageSize, onPageChanged]);

  return (<div className={className}>
    <div className={'pagination-wrapper'}>
      <div>{count} items</div>
      {count > pageSize && (
        <ul className={'pagination-container'}>
          <li
            key={'prev'}
            onClick={onPrevious}
          >
            <Icon
              color={currentPage === 1 ? '#ABB6C1' : '#040B1D'}
              name={'carret-right'}
              size={12}
            />
          </li>
          {paginationRange.map((pageNumber, index) => (
            <PageNumberComponent
              currentPage={currentPage}
              key={pageNumber === DOTS ? `${DOTS}_${index}` : pageNumber}
              onPageChanged={onPageChanged}
              pageNumber={pageNumber}
            />
          ))}
          {/* TODO: disabled={currentPage === lastPage} */}
          <li
            key={'next'}
            onClick={onNext}
          >
            <Icon
              color={currentPage === lastPage || count < pageSize ? '#ABB6C1' : '#040B1D'}
              name={'carret-right'}
              size={12}
            />
          </li>
        </ul>
      )}
    </div>
  </div>);
};

export default styled(PaginationComponent)`
  .pagination-wrapper {
    display: flex;
    column-gap: var(--gap);
    align-items: center;
    justify-content: space-between;

    .pagination-container {
      list-style: none;
      padding: 0;
      display: flex;

      li {
        padding: 4px 6px;
        min-width: 18px;
        text-align: center;
        cursor: pointer;

        &.active {
          border: 1px solid var(--primary-color);
          color: var(--white-color);
          background-color: var(--primary-color);
          border-radius: 4px;
          cursor: default;
        }
      }

      li:last-child, li:first-child {
        padding: 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      li:first-child {
        transform: rotate(180deg);
      }
    }
  }

  @media (max-width: 767px) {
    .pagination-wrapper {
      flex-direction: column;
      align-items: flex-start !important;
      row-gap: calc(var(--gap) * 1.5);
    }
  }
`;

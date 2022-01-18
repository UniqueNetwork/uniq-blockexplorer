import React, { useState } from 'react'
import { Icon } from '@unique-nft/ui-kit'
import usePagination, { UsePaginationProps, DOTS } from '../hooks/usePagination'
import useDeviceSize from '../hooks/useDeviceSize'

interface PaginationProps {
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
  const { pageNumber, currentPage, onPageChanged } = props
  if (pageNumber === DOTS) {
    return <li>...</li>
  }

  // Render our Page Pills
  return (
    // highlight if selected
    <li
      key={pageNumber}
      className={pageNumber === currentPage ? 'active' : ''}
      onClick={() => onPageChanged(pageNumber as number)}
    >
      {pageNumber}
    </li>
  )
}

const PaginationComponent = ({
  currentPage: currentPageFromProps,
  count,
  siblingCount = 2,
  pageSize = 10,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(currentPageFromProps || 1)
  const paginationRange = usePagination({
    total: count,
    currentPage,
    siblingCount,
    pageSize,
  })
  let lastPage =
    (paginationRange?.length > 1 && paginationRange[paginationRange.length - 1]) || null
  const onPageChanged = (newPage: number) => {
    const offset = (newPage - 1) * pageSize
    setCurrentPage(newPage)
    onPageChange(pageSize, offset)
  }
  const onNext = () => {
    if (currentPage === lastPage || count < pageSize) return
    onPageChanged(currentPage + 1)
  }

  const onPrevious = () => {
    if (currentPage < 2 || count < pageSize) return
    onPageChanged(currentPage - 1)
  }


  return (
    <div className={'flexbox-container flexbox-container_space-between pagination-wrapper'}>
      <div>{count} items</div>
      {count > pageSize && <ul className={'pagination-container'}>
        <li key={'prev'} onClick={onPrevious}>
          <Icon name={'carret-right'} size={12} color={currentPage === 1 ? '#ABB6C1' : '#040B1D'} />
        </li>
        {paginationRange.map((pageNumber, index) => (
          <PageNumberComponent
            key={pageNumber === DOTS ? `${DOTS}_${index}` : pageNumber}
            pageNumber={pageNumber}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
          />
        ))}
        {/* TODO: disabled={currentPage === lastPage} */}
        <li key={'next'} onClick={onNext}>
          <Icon name={'carret-right'} size={12} color={currentPage === lastPage || count < pageSize ? '#ABB6C1' : '#040B1D'} />
        </li>
      </ul>}
    </div>
  )
}

export default PaginationComponent

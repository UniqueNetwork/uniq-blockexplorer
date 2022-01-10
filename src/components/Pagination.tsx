import React, { useState } from 'react'
import { Icon, Select } from '@unique-nft/ui-kit'
import usePagination, { DOTS } from '../hooks/usePagination'

interface PaginationProps {
  count: number // total number of elements in DB
  defaultPageSize?: number // how many elements we present per single page
  onPageChange: (limit: number, offset: number) => void // fetch new page data
  siblingCount?: number // how many pages to show, the rest will be "..."
  currentPage?: number
}

const PageSizeOptions = [10, 20, 30]

const DisabledColor = '#ABB6C1'
const ActiveColor = '#040B1D'

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
  defaultPageSize = 10,
  onPageChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(currentPageFromProps || 1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const paginationRange = usePagination({
    total: count,
    currentPage,
    siblingCount,
    pageSize,
  })

  const lastPage =
    (paginationRange?.length > 1 && paginationRange[paginationRange.length - 1]) || null

  const isLastPage = currentPage === lastPage || count < pageSize

  const onPageChanged = (newPage: number) => {
    const offset = (newPage - 1) * pageSize
    setCurrentPage(newPage)
    onPageChange(pageSize, offset)
  }
  const onNext = () => {
    if (isLastPage) return
    onPageChanged(currentPage + 1)
  }

  const onPrevious = () => {
    if (currentPage < 2 || count < pageSize) return
    onPageChanged(currentPage - 1)
  }

  const onPageSizeChange = (value: number) => {
    setPageSize(value)
    setCurrentPage(1)
    onPageChange(value, 0)
  }

  return (
    <div className={'flexbox-container flexbox-container_space-between pagination-wrapper'}>
      <div className={'flexbox-container'}>
        <span className={'total'}>{count} items</span>
        <Select
          label={'On page'}
          value={pageSize}
          options={PageSizeOptions}
          onChange={onPageSizeChange}
        />
      </div>
      {count > pageSize && (
        <ul className={'pagination-container'}>
          <li key={'prev'} onClick={onPrevious}>
            <Icon
              name={'carret-right'}
              size={12}
              color={currentPage === 1 ? DisabledColor : ActiveColor}
            />
          </li>
          {paginationRange.map((pageNumber, index) => (
            <PageNumberComponent
              key={pageNumber === DOTS ? `${DOTS}_${index}` : pageNumber}
              pageNumber={pageNumber}
              currentPage={currentPage}
              onPageChanged={onPageChanged}
            />
          ))}
          <li key={'next'} onClick={onNext}>
            <Icon
              name={'carret-right'}
              size={12}
              color={isLastPage ? DisabledColor : ActiveColor}
            />
          </li>
        </ul>
      )}
    </div>
  )
}

export default PaginationComponent

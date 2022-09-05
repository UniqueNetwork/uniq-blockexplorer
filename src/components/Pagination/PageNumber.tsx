import React, { useCallback } from 'react';

import { DOTS } from '@app/hooks';

export const PageNumber = (props: {
  pageNumber: number | string;
  currentPage: number;
  onPageChanged: (newPage: number) => void;
}) => {
  const { currentPage, onPageChanged, pageNumber } = props;

  const onPagePillClick = useCallback(() => {
    onPageChanged(pageNumber as number);
  }, [onPageChanged, pageNumber]);

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

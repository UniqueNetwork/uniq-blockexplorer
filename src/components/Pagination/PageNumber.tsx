import { FC } from 'react';

import { DOTS } from '@app/hooks';

interface PageNumberProps {
  pageNumber: number | string;
  currentPage: number;
  onPageChanged: (newPage: number) => void;
}

export const PageNumber: FC<PageNumberProps> = (props) => {
  const { currentPage, onPageChanged, pageNumber } = props;

  const onPagePillClick = () => {
    onPageChanged(pageNumber as number);
  };

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

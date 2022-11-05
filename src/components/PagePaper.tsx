import React, { FC } from 'react';
import styled from 'styled-components/macro';

export const PagePaper: FC<{ className?: string }> = ({ children, className }) => {
  return <PagePaperWrapper className={className}>{children}</PagePaperWrapper>;
};

export const PagePaperWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 24px;
  flex: 1;
`;

export default PagePaper;

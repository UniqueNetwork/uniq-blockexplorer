import React, { FC } from 'react';
import styled from 'styled-components';

const PagePaper: FC = ({ children }) => {
  return (
    <PagePaperWrapper>
      {children}
    </PagePaperWrapper>
  );
};

export const PagePaperWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  padding: 24px;
  flex: 1;

  @media (max-width: 1024px) {
    background: #ffffff;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
  }
`;

export default PagePaper;

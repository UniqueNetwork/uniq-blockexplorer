import React from 'react';
import styled from 'styled-components/macro';

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Wrapper className={className}>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: absolute;
  top: var(--gap);
  right: var(--gap);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  background-color: var(--white-color);
  border: 1px solid var(--blue-gray-200);
  border-radius: 4px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: var(--dark);
  z-index: 2;
`;

export default Badge;

import React, { FC } from 'react';
import styled from 'styled-components';

const LoadingComponent: FC<{className?: string}> = ({
  className
}) => {
  return <div className={className}>Loading...</div>;
};

export default styled(LoadingComponent)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  animation: pulse 1.5s infinite;
  
  @keyframes pulse {
    0% {opacity: 1;}
    50% {opacity: 0.2;}
    100% {opacity: 1;}
  }

`;

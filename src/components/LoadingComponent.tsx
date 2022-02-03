import React, { FC } from 'react';
import styled from 'styled-components';

const LoadingComponent: FC<{className?: string }> = ({ className }) => {
  return <LoadingWrapper className={className}><span>Loading...</span></LoadingWrapper>;
};

const LoadingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  span {
    animation: pulse 1.5s infinite;  
  }
  
  @keyframes pulse {
    0% {opacity: 1;}
    50% {opacity: 0.2;}
    100% {opacity: 1;}
  }
`;

export default LoadingComponent;

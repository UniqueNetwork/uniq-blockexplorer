import React, { FC } from 'react';
import styled from 'styled-components';

const LoadingComponent: FC<{className?: string }> = ({ className }) => {
  return <LoadingWrapper className={className}><span>Loading...</span></LoadingWrapper>;
};

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.7);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

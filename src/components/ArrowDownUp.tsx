import React, { FC } from 'react';
import styled from 'styled-components';

interface ArrowDownUpProps {
  direction?: 'both' | 'up' | 'down'
  onClick?(): void
}

const ArrowDownUp: FC<ArrowDownUpProps> = ({ direction = 'both', onClick }) => {
  let children = <><path
    clipRule='evenodd'
    d='M0.646447 10.6464C0.841709 10.4512 1.15829 10.4512 1.35355 10.6464L3 12.2929L4.64645 10.6464C4.84171 10.4512 5.15829 10.4512 5.35355 10.6464C5.54882 10.8417 5.54882 11.1583 5.35355 11.3536L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536L0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464Z'
    fillRule='evenodd'
  />
  <path
    clipRule='evenodd'
    d='M3 0.5C3.27614 0.5 3.5 0.723858 3.5 1V13C3.5 13.2761 3.27614 13.5 3 13.5C2.72386 13.5 2.5 13.2761 2.5 13V1C2.5 0.723858 2.72386 0.5 3 0.5Z'
    fillRule='evenodd'
  />
  <path
    clipRule='evenodd'
    d='M8.64645 0.646447C8.84171 0.451184 9.15829 0.451184 9.35355 0.646447L11.3536 2.64645C11.5488 2.84171 11.5488 3.15829 11.3536 3.35355C11.1583 3.54882 10.8417 3.54882 10.6464 3.35355L9 1.70711L7.35355 3.35355C7.15829 3.54882 6.84171 3.54882 6.64645 3.35355C6.45118 3.15829 6.45118 2.84171 6.64645 2.64645L8.64645 0.646447Z'
    fillRule='evenodd'
  />
  <path
    clipRule='evenodd'
    d='M9 0.5C9.27614 0.5 9.5 0.723858 9.5 1V13C9.5 13.2761 9.27614 13.5 9 13.5C8.72386 13.5 8.5 13.2761 8.5 13V1C8.5 0.723858 8.72386 0.5 9 0.5Z'
    fillRule='evenodd'
  /></>;

  if (direction === 'up') {
    children = <>
      <path
        clipRule='evenodd'
        d='M3 0.5C3.27614 0.5 3.5 0.723858 3.5 1V13C3.5 13.2761 3.27614 13.5 3 13.5C2.72386 13.5 2.5 13.2761 2.5 13V1C2.5 0.723858 2.72386 0.5 3 0.5Z'
        fillRule='evenodd'
      />
      <path
        clipRule='evenodd'
        d='M2.64645 0.646447C2.84171 0.451184 3.15829 0.451184 3.35355 0.646447L5.35355 2.64645C5.54882 2.84171 5.54882 3.15829 5.35355 3.35355C5.15829 3.54882 4.84171 3.54882 4.64645 3.35355L3 1.70711L1.35355 3.35355C1.15829 3.54882 0.841709 3.54882 0.646447 3.35355C0.451184 3.15829 0.451184 2.84171 0.646447 2.64645L2.64645 0.646447Z'
        fillRule='evenodd'
      />
    </>;
  }

  if (direction === 'down') {
    children = <>
      <path
        clipRule='evenodd'
        d='M0.646447 10.6464C0.841709 10.4512 1.15829 10.4512 1.35355 10.6464L3 12.2929L4.64645 10.6464C4.84171 10.4512 5.15829 10.4512 5.35355 10.6464C5.54882 10.8417 5.54882 11.1583 5.35355 11.3536L3.35355 13.3536C3.15829 13.5488 2.84171 13.5488 2.64645 13.3536L0.646447 11.3536C0.451184 11.1583 0.451184 10.8417 0.646447 10.6464Z'
        fillRule='evenodd'
      />
      <path
        clipRule='evenodd'
        d='M3 0.5C3.27614 0.5 3.5 0.723858 3.5 1V13C3.5 13.2761 3.27614 13.5 3 13.5C2.72386 13.5 2.5 13.2761 2.5 13V1C2.5 0.723858 2.72386 0.5 3 0.5Z'
        fillRule='evenodd'
      />
    </>;
  }

  return (
    <ArrowDownUpSvg
      fill='none'
      height='14'
      onClick={onClick}
      viewBox='0 0 12 14'
      width='12'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <rect
          fill='white'
          height='14'
          opacity={0}
          width='12'
          x='0'
          y='0'
        />
        {children}
      </g>
    </ArrowDownUpSvg>
  );
};

const ArrowDownUpSvg = styled.svg`
  g {
    cursor: pointer;  
  }
  path {
    fill: var(--blue-gray-600);
  }
  &:hover {
    path {
      fill: var(--primary-600);
    }
  }
`;

export default ArrowDownUp;

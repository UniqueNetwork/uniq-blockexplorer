import React, { FC } from 'react';
import styled from 'styled-components';

interface MobileMenuIconProps {
  isOpen: boolean
  onClick(): void
}

const MobileMenuIcon: FC<MobileMenuIconProps> = ({ isOpen, onClick }) => {
  if (isOpen) {
    return (
      <MenuIconSvg
        fill='none'
        height='32'
        onClick={onClick}
        viewBox='0 0 32 32'
        width='32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          clipRule='evenodd'
          d='M25.7071 6.29289C26.0976 6.68342 26.0976 7.31658 25.7071 7.70711L7.70711 25.7071C7.31658 26.0976 6.68342 26.0976 6.29289 25.7071C5.90237 25.3166 5.90237 24.6834 6.29289 24.2929L24.2929 6.29289C24.6834 5.90237 25.3166 5.90237 25.7071 6.29289Z'
          fill='#091941'
          fillRule='evenodd'
        />
        <path
          clipRule='evenodd'
          d='M6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L25.7071 24.2929C26.0976 24.6834 26.0976 25.3166 25.7071 25.7071C25.3166 26.0976 24.6834 26.0976 24.2929 25.7071L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z'
          fill='#091941'
          fillRule='evenodd'
        />
      </MenuIconSvg>
    );
  }

  return (
    <MenuIconSvg
      fill='none'
      height='32'
      onClick={onClick}
      viewBox='0 0 32 32'
      width='32'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5 16H27'
        stroke='#091941'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M5 8H27'
        stroke='#091941'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
      <path
        d='M5 24H27'
        stroke='#091941'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
      />
    </MenuIconSvg>
  );
};

const MenuIconSvg = styled.svg`

`;

export default MobileMenuIcon;

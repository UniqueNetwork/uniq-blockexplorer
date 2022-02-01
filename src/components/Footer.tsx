import React, { FC } from 'react';
import styled from 'styled-components';

const Footer: FC = () => {
  return (
    <FooterContainer>
      <div className={'app-footer__info'}>
        <div>Powered by <a href='https://unique.network/'>Unique Network</a> — the NFT chain built for Polkadot and Kusama.</div>
        <div>Version 22.18.1560 </div>
      </div>
      <SocialLinks>
        <a href='https://t.me/Uniquechain'>
          <img
            alt='telegram'
            src='/logos/telegram.svg'
          />
        </a>
        <a href='https://twitter.com/Unique_NFTchain'>
          <img
            alt='twitter'
            src='/logos/twitter.svg'
          />
        </a>
        <a href='https://discord.gg/jHVdZhsakC'>
          <img
            alt='discord'
            src='/logos/discord.svg'
          />
        </a>
        <a href='https://github.com/UniqueNetwork'>
          <img
            alt='github'
            src='/logos/github.svg'
          />
        </a>
        <a href='https://app.subsocial.network/@UniqueNetwork_NFT'>
          <img
            alt='subsocial'
            src='/logos/subsocial.svg'
          />
        </a>
      </SocialLinks>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: var(--blue-gray-500);
  line-height: 22px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  column-gap: var(--gap);
  @media (max-width: 767px) {
    margin-top: var(--gap);
  }
`;

export default Footer;

import { Chain } from '@app/api/ApiContext';

export const getChainColor = (currentChain: Chain) => {
  switch (currentChain.network) {
    case 'QUARTZ':
      return '--quartz-primary';
    case 'OPAL':
      return '--opal-primary';
    default:
      return '--primary-500';
  }
};

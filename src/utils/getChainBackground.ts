import { Chain } from '@app/api/ApiContext';

// TODO - add the same logo for OPAL
import unique from '../logos/unique.png';
import quarts from '../logos/quartz.png';
import opal from '../logos/opal.png';

export const getChainBackground = (currentChain: Chain) => {
  switch (currentChain.network) {
    case 'QUARTZ':
      return quarts;
    case 'UNIQUE':
      return unique;
    case 'OPAL':
      return opal;
    default:
      return unique;
  }
};

import { TChainNetwork } from '@app/api/ApiContext';

export const getTokenSymbols = (chainId: TChainNetwork) => {
  switch (chainId) {
    case 'QUARTZ':
      return 'QTZ';
    case 'UNIQUE':
      return 'UNQ';
    case 'OPAL':
      return 'OPL';
    default:
      return '';
  }
};

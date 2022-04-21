import { useApi } from '@app/hooks/useApi';

export const useChainFormattedOwner = (owner: string): string | undefined => {
  const { api } = useApi();

  return api?.chainAddressFormat(owner);
};

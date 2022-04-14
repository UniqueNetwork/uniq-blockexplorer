import { useEffect, useState } from 'react';
import { useApi } from '@app/hooks/useApi';

export const useChainFormattedOwner = (owner: string): string | undefined => {
  const { api } = useApi();
  const [chainOwner, setChainOwner] = useState<string | undefined>(undefined);

  useEffect(() => {
    const cOwner = api?.chainAddressFormat(owner);

    if (chainOwner !== cOwner) {
      setChainOwner(cOwner ?? undefined);
    }
  }, [api, chainOwner, owner]);

  return chainOwner;
};

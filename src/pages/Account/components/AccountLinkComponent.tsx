import { FC, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Text } from '@unique-nft/ui-kit';
import { shortcutText } from '@app/utils';
import { useApi } from '@app/hooks';
import amplitude from 'amplitude-js';

interface AccountLinkProps {
  value: string
  size?: 'xs' | 's' | 'm' | 'l'
  noShort?: boolean
}

const AccountLinkComponent: FC<AccountLinkProps> = ({ noShort, size = 'm', value }) => {
  const { accountId } = useParams();

  const { currentChain } = useApi();

  const shortcut = noShort ? value : shortcutText(value);

  // user analytics
  const onAccountClick = useCallback(() => {
    const path = window.location.pathname;
    const re = /collections\/\d/i;
    const found = path.match(re);

    if (path.includes('collections')) {
      if (found === null) {
        amplitude.getInstance().logEvent('CLICK_ON_COLLECTIONS_OWNER_ACCOUNT_ON_COLLECTIONS_PAGE');
      } else {
        amplitude.getInstance().logEvent('CLICK_ON_COLLECTIONS_OWNER_ACCOUNT_ON_COLLECTION_PAGE');
      }

      amplitude.getInstance().logEvent('CLICK_ON_COLLECTIONS_OWNER_ACCOUNT_ON_COLLECTIONS_PAGE');
    }

    if (path.includes('tokens')) {
      amplitude.getInstance().logEvent('CLICK_ON_COLLECTIONS_OWNER_ACCOUNT_ON_TOKEN_PAGE');
    }
  }, []);

  if (value === accountId) return <>{shortcut}</>;

  return (
    <Link
      onClick={onAccountClick}
      to={`/${currentChain?.network}/account/${value}`}
    >
      <Text
        color={'primary-600'}
        size={size}
      >
        {shortcut}
      </Text>
    </Link>
  );
};

export default AccountLinkComponent;

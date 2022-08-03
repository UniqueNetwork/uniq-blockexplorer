import { FC, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Text } from '@unique-nft/ui-kit';
import { shortcutText } from '@app/utils';
import { useApi } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { IdentityIcon } from '@app/components';

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
        logUserEvents(UserEvents.Click.ON_COLLECTIONS_OWNER_ACCOUNT_ON_COLLECTIONS_PAGE);
      } else {
        logUserEvents(UserEvents.Click.ON_COLLECTIONS_OWNER_ACCOUNT_ON_COLLECTION_PAGE);
      }
    }

    if (path.includes('tokens')) {
      logUserEvents(UserEvents.Click.ON_COLLECTIONS_OWNER_ACCOUNT_ON_TOKEN_PAGE);
    }
  }, []);

  if (value === accountId) return <>{shortcut}</>;

  return (
    <Wrapper>
      <IdentityIcon address={value} copyable />
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: calc(var(--gap) / 4);
`;

export default AccountLinkComponent;

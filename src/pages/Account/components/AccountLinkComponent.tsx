import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { Text } from '@unique-nft/ui-kit';

import { shortcutText } from '@app/utils';
import { useApi } from '@app/hooks';
import { UserEvents } from '@app/analytics/user_analytics';
import { logUserEvents } from '@app/utils/logUserEvents';
import { IdentityIcon } from '@app/components';

interface AccountLinkProps {
  value: string;
  size?: 'xs' | 's' | 'm' | 'l';
  noShort?: boolean;
  noIcon?: boolean;
}

const AccountLinkComponent: FC<AccountLinkProps> = ({
  noShort,
  size = 'm',
  value,
  noIcon,
}) => {
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

  return (
    <Wrapper>
      {!noIcon && <IdentityIcon copyable address={value} />}
      <Link
        to={`/${currentChain?.network.toLowerCase()}/account/${value}`}
        onClick={onAccountClick}
      >
        <Text color={'primary-500'} size={size}>
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

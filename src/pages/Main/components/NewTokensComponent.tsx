import React, { FC } from 'react';
import Button from '../../../components/Button';
import { Icon, Text } from '@unique-nft/ui-kit';
import { Token } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import Picture from '../../../components/Picture';

interface NewTokensComponentProps {
  tokens: Token[]
}

const NewTokensComponent: FC<NewTokensComponentProps> = (props) => {
  const { tokens } = props;

  return (
    <div>
      <div className={'flexbox-container flexbox-container_align-start margin-bottom'}>
        {tokens.map((token) => (
          <div
            className={'flexbox-container_max-growth'}
            key={`token-${token.id}`}
          >
            <Picture alt={token.id.toString()} />
            <div>{token.id}</div>
            <div>
              {token.collection.name} [ID {token.collection_id}]
            </div>
            <div>
              <Text
                color={'grey-500'}
                size={'s'}
              >
                Owner:
              </Text>
              <AccountLinkComponent value={token.owner} />
            </div>
          </div>
        ))}
      </div>
      <Button
        icon={<Icon
          color={'white'}
          name={'arrow-right'}
          size={10}
        />}
        iconPosition={'right'}
        text={'See all'}
      />
    </div>
  );
};

export default NewTokensComponent;

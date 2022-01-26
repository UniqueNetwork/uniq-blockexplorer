import React, { FC } from 'react';
import styled from 'styled-components';
import { Text, Button } from '@unique-nft/ui-kit';
import { Token } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import Picture from '../../../components/Picture';

interface NewTokensComponentProps {
  className?: string
  tokens: Token[]
}

const NewTokensComponent: FC<NewTokensComponentProps> = (props) => {
  const { className, tokens } = props;

  return (
    <div className={className}>
      <div className={'tokens-container'}>
        {tokens.map((token) => (
          <div
            className={'token-card'}
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
        onClick={() => {}}
        title={'See all'}
      />
    </div>
  );
};

export default styled(NewTokensComponent)`
  .tokens-container {
    display: flex;
    column-gap: calc(var(--gap) * 1.5);
    row-gap: calc(var(--gap) * 1.5);
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: var(--gap);
    .token-card {
      max-width: 174px;
    }
  }
`;

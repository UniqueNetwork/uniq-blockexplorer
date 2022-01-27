import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Text, Button } from '@unique-nft/ui-kit';
import { Token } from '../../../api/graphQL';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import Picture from '../../../components/Picture';
import LoadingComponent from '../../../components/LoadingComponent';
import { useApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';

interface NewTokensComponentProps {
  className?: string
  loading?: boolean
  tokens: Token[]
}

const NewTokensComponent: FC<NewTokensComponentProps> = (props) => {
  const { className, loading, tokens } = props;
  const { currentChain } = useApi();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(`/${currentChain.network}/tokens`);
  }, [currentChain]);

  return (
    <div className={className}>
      <div className={'tokens-container'}>
        {loading && <LoadingComponent />}
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
        iconRight={{
          color: 'white',
          name: 'arrow-right',
          size: 10
        }}
        onClick={onClick}
        role={'primary'}
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

import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '@unique-nft/ui-kit';
import { Token } from '../../../api/graphQL';
import LoadingComponent from '../../../components/LoadingComponent';
import { useApi } from '../../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import TokenCard from '../../../components/TokenCard';

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
  }, [currentChain, navigate]);

  return (
    <div className={className}>
      <div className={'tokens-container'}>
        {loading && <LoadingComponent />}
        {tokens.map((token) => (
          <TokenCard
            key={`token-${token.token_id}`}
            {...token}
          />
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
    justify-content: space-between;
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

import React, { FC, Reducer, useCallback, useReducer, useState } from 'react';
import { Checkbox, InputText, Button } from '@unique-nft/ui-kit';
import { Token, tokens as gqlTokens } from '../../../api/graphQL';
import TokenCard from '../../../components/TokenCard';

interface TokensComponentProps {
  accountId: string
}

type ActionType = 'All' | 'Minted' | 'Received'

const pageSize = 18;

const TokensComponent: FC<TokensComponentProps> = (props) => {
  const { accountId } = props;

  const [filter, dispatchFilter] = useReducer<
  Reducer<Record<string, unknown> | undefined, { type: ActionType; value: string | boolean }>
  >((state, action) => {
    if (action.type === 'All' && action.value) {
      return undefined;
    }

    if (action.type === 'Minted') {
      return { ...state, minted: action.value ? { _eq: accountId } : undefined };
    }

    if (action.type === 'Received') {
      return { ...state, received: action.value ? { _eq: accountId } : undefined };
    }

    return state;
  }, undefined);

  const [searchString, setSearchString] = useState<string | undefined>();

  const { fetchMoreTokens, tokens, tokensCount } = gqlTokens.useGraphQlTokens({ filter, pageSize });

  const onCheckBoxChange = useCallback(
    (actionType: ActionType) => (value: boolean) => dispatchFilter({ type: actionType, value }),
    [dispatchFilter]
  );

  const onSearchChange = useCallback(
    (value: string | number | undefined) => setSearchString(value?.toString()),
    [setSearchString]
  );

  const onSearchClick = useCallback(() => {
    fetchMoreTokens({ searchString })
      .catch((errMsg) => console.error(errMsg));
  }, [fetchMoreTokens, searchString]);

  const onClickSeeMore = useCallback(() => {}, []);

  return (
    <>
      <div className={'flexbox-container flexbox-container_space-between margin-top'}>
        <div className={'flexbox-container flexbox-container_half-gap'}>
          <InputText
            onChange={onSearchChange}
            placeholder={'Collection name'}
          />
          <Button
            onClick={onSearchClick}
            role='primary'
            title={'Search'}
          />
        </div>
        <div className={'flexbox-container'}>
          <Checkbox
            checked={filter === undefined}
            label={'All'}
            onChange={onCheckBoxChange('All')}
            size={'s'}
          />
          <Checkbox
            checked={!!filter?.owner}
            label={'Minted'}
            onChange={onCheckBoxChange('Minted')}
            size={'s'}
          />
          <Checkbox
            checked={!!filter?.admin}
            label={'Received'}
            onChange={onCheckBoxChange('Received')}
            size={'s'}
          />
        </div>
      </div>
      <div className={'margin-top margin-bottom'}>{tokensCount || 0} items</div>
      <div className={'grid-container'}>
        {tokens?.map &&
          tokens.map((token: Token) => (
            <TokenCard
              {...token}
              key={`token-${token.id}`}
            />))}
      </div>
      <Button
        iconRight={{
          color: '#fff',
          name: 'arrow-right',
          size: 12
        }}
        onClick={onClickSeeMore}
        role='primary'
        title={'See all'}
      />
    </>
  );
};

export default TokensComponent;

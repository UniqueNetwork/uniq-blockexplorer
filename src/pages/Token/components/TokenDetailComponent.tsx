import React, { FC } from 'react';
import styled from 'styled-components';
import { Token } from '../../../api/graphQL';
import Picture from '../../../components/Picture';
import { Heading, Text } from '@unique-nft/ui-kit';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';
import LoadingComponent from '../../../components/LoadingComponent';

interface TokenDetailComponentProps {
  className?: string
  token?: Token
  loading?: boolean
}

const TokenDetailComponent: FC<TokenDetailComponentProps> = ({ className, loading, token }) => {
  if (!token) return null;
  const { collection, id, owner } = token;
  const { collection_id: collectionId, description, name, token_prefix: prefix } = collection;

  if (loading) return <LoadingComponent />;

  return (
    <div className={className}>
      <Picture alt={`${prefix}-${id}`} />
      <div>
        <Heading size={'2'}>{`${prefix} #${id}`}</Heading>
        <div className={'token-general'}>
          <Text color={'grey-500'}>Created on</Text>
          <Text>{'undefined'}</Text>
          <Text color={'grey-500'}>Owner</Text>
          <div className={'owner'}>
            <Avatar size={'small'} />
            <AccountLinkComponent value={'yGHkvgGth212LzAokvhCMLvs5a9vTpRjKkqjCHfRqwxHn3Lum'} />
          </div>
        </div>
        <div>
          <Heading size={'2'}>Attributes</Heading>
          <div className={'attributes-block'}>
            <Text color={'grey-500'}>Traits</Text>
            <div className={'tags'}>
              <div>Eyes To The Right</div>
              <div>Eyes To The Right</div>
            </div>
          </div>
        </div>
        <div>
          <Heading size={'2'}>Collection</Heading>
          <div className={'collection-block'}>
            <Avatar size={'small'} />
            <div className={'properties'}>
              <Text>{name}</Text>
              <div className={'description'}><Text color={'grey-500'}>{description || ''}</Text></div>
              <div className={'general'}>
                <div>
                  <Text color={'grey-500'}>ID:</Text>
                  <Text color={'black'}>{collectionId?.toString() || ''}</Text>
                </div>
                <div>
                  <Text color={'grey-500'}>Prefix:</Text>
                  <Text color={'black'}>{prefix || ''}</Text>
                </div>
                <div>
                  <Text color={'grey-500'}>Items:</Text>
                  <Text color={'black'}>{0 || ''}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default styled(TokenDetailComponent)`
`;

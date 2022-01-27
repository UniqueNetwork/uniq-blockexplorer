import React, { FC } from 'react';
import styled from 'styled-components';
import { Heading, Text } from '@unique-nft/ui-kit';
import { Collection } from '../../../api/graphQL';
import Avatar from '../../../components/Avatar';
import AccountLinkComponent from '../../Account/components/AccountLinkComponent';

interface ExtendedDataComponentProps {
  className?: string
  collection?: Collection
}

const ExtendedDataComponent: FC<ExtendedDataComponentProps> = ({
  className, collection
}) => {
  return (
    <div className={className}>
      <div className={'container-with-border'}>
        <Heading size={'4'}>Token attributes</Heading>
        <div className={'attributes-block'}>
          <Text color={'grey-500'}>Background</Text>
          <div className={'tags'}>
            <div>Eyes To The Right</div>
          </div>
        </div>
        <div className={'attributes-block'}>
          <Text color={'grey-500'}>Traits</Text>
          <div className={'tags'}>
            <div>Eyes To The Right</div>
            <div>Eyes To The Right</div>
          </div>
        </div>
      </div>
      <div className={'container-with-border'}>
        <Heading size={'4'}>Admins</Heading>
        <div className={'admins-block'}>
          <div>
            <Avatar size={'small'} />
            <AccountLinkComponent value={'yGHkvgGth212LzAokvhCMLvs5a9vTpRjKkqjCHfRqwxHn3Lum'} />
          </div>
        </div>
        <Heading size={'4'}>Sponsors</Heading>
        <div className={'sponsors-block'}>
          <div>
            <Avatar size={'small'} />
            <AccountLinkComponent value={'yGHkvgGth212LzAokvhCMLvs5a9vTpRjKkqjCHfRqwxHn3Lum'} />
          </div>
          <div>
            <Avatar size={'small'} />
            <AccountLinkComponent value={'yGHkvgGth212LzAokvhCMLvs5a9vTpRjKkqjCHfRqwxHn3Lum'} />
          </div>
        </div>
      </div>
      <div className={'container-with-border'}>
        <Heading size={'4'}>Data schema</Heading>
        <div className={'data-schema-block'}>
          <Text color={'grey-500'}>Schema version</Text>
          <Text>{collection?.schema_version || ''}</Text>
          <Text color={'grey-500'}>Offchain schema   </Text>
          <Text>{collection?.offchain_schema || ''}</Text>
        </div>
      </div>
      <div className={'container-with-border'}>
        <Heading size={'4'}>Advanced data</Heading>
        <div className={'advanced-data-block'}>
          <Text color={'grey-500'}>Token limit</Text>
          <Text>{collection?.token_limit.toString() || ''}</Text>
          <Text color={'grey-500'}>Account token ownership limit</Text>
          <Text>{'unlimited'}</Text>
          <Text color={'grey-500'}>Sponsored mint size</Text>
          <Text>{'unlimited'}</Text>
          <Text color={'grey-500'}>Sponsor timeout</Text>
          <Text>{'unlimited'}</Text>
          <Text color={'grey-500'}>Owner can transfer</Text>
          <Text>{collection?.owner_can_trasfer || 'false'}</Text>
          <Text color={'grey-500'}>Owner can destroy</Text>
          <Text>{collection?.owner_can_destroy || 'false'}</Text>
          <Text color={'grey-500'}>Variable metadata sponsoring rate limit</Text>
          <Text>{'never sponsored'}</Text>
        </div>
      </div>
    </div>
  );
};

export default styled(ExtendedDataComponent)`
  .container-with-border {
    padding-top: var(--gap);
  }
  .attributes-block {
    margin-bottom: calc(var(--gap) * 1.5);
    .tags {
      margin-top: calc(var(--gap) / 2);
      display: flex;
      column-gap: calc(var(--gap) / 2);
      row-gap: calc(var(--gap) / 2);
      & > div {
        padding: 1px calc(var(--gap) / 2);
        background-color: var(--blue-gray);
      }
    }
  }
  .admins-block, .sponsors-block {
    display: flex;
    column-gap: calc(var(--gap) / 1.5);
    margin-bottom: calc(var(--gap) * 1.5);
    div {
      display: flex;
      align-items: center;
      column-gap: calc(var(--gap) / 2);
    }
  }
  .sponsors-block {
    margin-bottom: 0;
  }
  .data-schema-block, .advanced-data-block {
    display: grid;
    grid-template-columns: 296px 1fr;
  }
`;

import React, { useState, useEffect, VFC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Dropdown, Icon, SelectOptionProps } from '@unique-nft/ui-kit';
import { useApi } from '@app/hooks';
import { Table, PagePaperWrapper } from '@app/components';
import { Header } from '@app/styles/styled-components';

import { getTransferColumns } from './getTransferColumns';
import { transfersWithTimeDifference } from './transfersWithTimeDifference';
import { lastTransferOptions } from './lastTransferOptions';
import { transfers as gqlTransfers } from '../../../../api/graphQL';

export type LastTransfersProps = {
  searchString?: string
  pageSize?: number
  accountId?: string
}

export const LastTransfers: VFC<LastTransfersProps> = ({
  accountId,
  pageSize = 5,
  searchString
}) => {
  const { currentChain } = useApi();
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState<SelectOptionProps>(lastTransferOptions[0]);

  const { fetchMoreTransfers, isTransfersFetching, transfers, transfersCount } =
    gqlTransfers.useGraphQlLastTransfers({ accountId, pageSize });

  const onClickSeeMore = () => {
    navigate(`/${currentChain.network}/last-transfers`);
  };

  const selectSorting = (option: SelectOptionProps) => {
    setSelectedSort(option);
  };

  useEffect(() => {
    const prettifiedBlockSearchString = searchString !== '' && /[^$,.\d]/.test(searchString || '') ? undefined : searchString;

    void fetchMoreTransfers({
      limit: pageSize,
      offset: 0,
      searchString: prettifiedBlockSearchString
    });
  }, [pageSize, searchString, fetchMoreTransfers, accountId]);

  if (/[^$,-,.\d]/.test(searchString || '') || transfersCount === 0) return null;

  return (
    <Wrapper>
      <HeaderWithDropdown>
        <Header size='2'>
          Last transfers
        </Header>
        <Dropdown
          onChange={selectSorting}
          options={lastTransferOptions}
          value={selectedSort.id as string}
        >
          <SelectedOption>
            {selectedSort.title}
            <Icon
              name='triangle'
              size={12}
            />
          </SelectedOption>
        </Dropdown>
      </HeaderWithDropdown>
      <Table
        columns={getTransferColumns(
          '',
          currentChain?.network
        )}
        data={transfersWithTimeDifference(transfers)}
        loading={isTransfersFetching}
        rowKey='block_index'
      />
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
    </Wrapper>
  );
};

const Wrapper = styled(PagePaperWrapper)``;
const HeaderWithDropdown = styled.div`
  display: flex;
  grid-column-gap: calc(var(--gap) / 2);
  margin-bottom: calc(var(--gap) * 2);
  
  .unique-dropdown {
    font-style: normal;
    font-weight: 700;
    font-size: 28px;
    line-height: 42px;
    color: var(--link-color);
    cursor: pointer;
    
    .dropdown-wrapper {
      .icon-triangle {
        position: inherit;
        margin-left: calc(var(--gap) / 2);
        
        use {
          fill: var(--link-color);
        }
      }
    }
    
    .dropdown-options {
      width: 142px;

      .dropdown-option {
        font-family: var(--prop-font-family);
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 26px;
        padding: calc(var(--gap) / 4) calc(var(--gap) / 2);
        color: var(--black-color);
        
        &.selected {
          color: var(--link-color);
        }
      }
    }
  }
`;
const SelectedOption = styled.div``;

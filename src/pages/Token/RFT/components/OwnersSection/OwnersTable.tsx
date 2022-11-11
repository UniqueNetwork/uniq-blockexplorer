import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heading } from '@unique-nft/ui-kit';
import { DefaultRecordType } from 'rc-table/lib/interface';

import { useDeviceSize, useQueryParams } from '@app/hooks';
import { EventsSorting } from '@app/api/graphQL/bundleEvents/types';
import { DEFAULT_PAGE_SIZE, defaultEventsOrderBy } from '@app/pages/Bundles/constants';
import { PagePaper, ScrollableTable, SelectOptionProps } from '@app/components';
import { GetOwnersColumns } from '@app/pages/Token/RFT/components/OwnersSection/columnsSchema';

type OwnersItem = {
  account: string;
  fractions: number;
};

const data: OwnersItem[] = [
  {
    account: '5FcCSk2PJrjS2G6EaAw7QvYapBTXtWUShd7kuLwYx4Syp47s',
    fractions: 5000,
  },
  {
    account: '5FcCSk2PJrjS2G6EaAw7QvYapBTXtWUShd7kuLwYx4Syp47s',
    fractions: 3000,
  },
  {
    account: '5FcCSk2PJrjS2G6EaAw7QvYapBTXtWUShd7kuLwYx4Syp47s',
    fractions: 5010,
  },
  {
    account: '5FcCSk2PJrjS2G6EaAw7QvYapBTXtWUShd7kuLwYx4Syp47s',
    fractions: 5900,
  },
];

const OwnersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { sort, setParamToQuery } = useQueryParams();
  const [queryParams, setQueryParams] = useSearchParams();
  const deviceSize = useDeviceSize();

  // get sort from query string
  const getOrderByFromQuery = () => {
    const split = sort?.split('-');
    return split ? { [split[0]]: split[1] } : ({} as EventsSorting);
  };
  const [orderBy, setOrderBy] = useState<EventsSorting>(
    getOrderByFromQuery() || defaultEventsOrderBy,
  );

  useEffect(() => {
    setOrderBy(getOrderByFromQuery());
  }, [sort]);

  const [pageSize, setPageSize] = useState<SelectOptionProps>({
    id: Number(queryParams.get('pageSize')) || DEFAULT_PAGE_SIZE,
    title: queryParams.get('pageSize') || DEFAULT_PAGE_SIZE.toString(),
  });
  const pageSizeNumber = pageSize.id as number;

  const offset = (currentPage - 1) * pageSizeNumber;

  const setOrderAndQuery = (sorting: EventsSorting) => {
    setOrderBy(sorting);
    setParamToQuery([
      {
        name: 'sort',
        // @ts-ignore
        value: `${Object.keys(sorting)[0]}-${sorting[Object.keys(sorting)[0]]}`,
      },
    ]);
  };

  const setPageSizeAndQuery = (option: SelectOptionProps) => {
    setPageSize(option);
    queryParams.set('pageSize', `${option.title}`);
    setQueryParams(queryParams);
  };

  const columns = useMemo(
    () => GetOwnersColumns(orderBy, setOrderAndQuery, deviceSize),
    [orderBy, deviceSize],
  );

  const getRowKey = useMemo(
    () => (item: DefaultRecordType) =>
      `${(item as OwnersItem).account}-${(item as OwnersItem).fractions}`,
    [],
  );

  return (
    <PagePaper>
      <Heading size={'2'}>Owners</Heading>
      <ScrollableTable
        columns={columns}
        data={data || []}
        loading={false}
        rowKey={getRowKey}
      />
    </PagePaper>
  );
};

export default OwnersTable;

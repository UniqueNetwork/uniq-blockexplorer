import React from 'react';
import { Link } from 'react-router-dom';

export const getLastBlocksColumns = (chainId: string) => [
  {
    dataIndex: 'block_number',
    key: 'block_number',
    render: (value: string) => <Link to={`/${chainId}/block/${value}`}>{value}</Link>,
    title: 'Block',
    width: 100
  },
  // Age is calculated from timestamp aftter query execution
  { dataIndex: 'time_difference', key: 'time_difference', title: 'Age', width: 100 },
  { dataIndex: 'total_extrinsics', key: 'total_extrinsics', title: 'Extrinsic', width: 100 },
  { dataIndex: 'total_events', key: 'total_events', title: 'Event', width: 100 }
];

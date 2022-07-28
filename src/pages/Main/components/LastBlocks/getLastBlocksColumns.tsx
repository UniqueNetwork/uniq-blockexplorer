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
  // Age is calculated from timestamp after query execution
  {
    dataIndex: 'time_difference',
    key: 'time_difference',
    title: 'Age',
    width: 100
  },
  {
    dataIndex: 'total_extrinsics',
    key: 'total_extrinsics',
    render: (value: string) => <Link to={`/${chainId}/extrinsic/${value}`}>{value}</Link>,
    title: 'Extrinsic',
    width: 100
  },
  {
    dataIndex: 'total_events',
    key: 'total_events',
    render: (value: string) => <Link to={`/${chainId}/event/${value}`}>{value}</Link>,
    title: 'Event',
    width: 100
  }
];

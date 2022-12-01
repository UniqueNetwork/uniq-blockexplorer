import { CollectionSorting } from '@app/api';

export interface CollectionsEventsVariables {
  limit: number;
  offset: number;
  orderBy?: CollectionSorting;
  where?: { [key: string]: unknown };
}

export interface CollectionsEvent {
  action: string;
  author?: string;
  collection_id: number;
  fee: number;
  result: boolean;
  timestamp: number;
}

export interface CollectionsEventsData {
  collection_events: {
    data: CollectionsEvent[];
    count: number;
    timestamp: number;
  };
}

export interface useGraphQLCollectionsEventsProps {
  limit: number;
  offset?: number;
  orderBy?: CollectionSorting;
  collection_id: number;
  author?: string;
}

export const EventsActions = {
  create: 'CollectionCreated',
  transfer: 'CollectionOwnedChanged',
  burn: 'CollectionDestroyed',
};

export type EventsSorting = {
  [P in keyof CollectionsEvent]?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
};

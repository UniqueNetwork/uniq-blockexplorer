export interface BundleEventsVariables {
  limit: number;
  offset: number;
  orderBy?: EventsSorting;
  where?: { [key: string]: unknown };
}

export interface BundleEventsData {
  token_events: {
    data: BundleEvent[];
    count: number;
    timestamp: number;
  };
}

export interface BundleEvent {
  action: string;
  author?: string;
  collection_id: number;
  fee: number;
  result: boolean;
  timestamp: number;
  token_id: number;
  values?: { [key: string]: unknown };
}

export type EventsSorting = {
  [P in keyof BundleEvent]?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
};

export interface useGraphQLBundleEventsProps {
  limit: number;
  offset?: number;
  orderBy?: EventsSorting;
  collection_id: number;
  token_id: number;
}

export const EventsActions = {
  create: 'ItemCreated',
  transfer: 'Transfer',
  burn: 'Destroy',
};

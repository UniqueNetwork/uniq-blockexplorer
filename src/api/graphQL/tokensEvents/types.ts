export interface TokensEventsVariables {
  limit: number;
  offset: number;
  orderBy?: EventsSorting;
  where?: { [key: string]: unknown };
}

export interface TokensEventsData {
  token_events: {
    data: TokensEvent[];
    count: number;
    timestamp: number;
  };
}

export interface TokensEvent {
  action: string;
  author?: string;
  collection_id: number;
  fee: number;
  result: boolean;
  timestamp: number;
  token_id: number;
  token_name: string;
  values?: { [key: string]: unknown };
  tokens: { [key: string]: unknown };
  data: any[];
}

export type EventsSorting = {
  [P in keyof TokensEvent]?:
    | 'asc'
    | 'desc'
    | 'desc_nulls_last'
    | 'asc_nulls_last'
    | 'asc_nulls_first'
    | 'desc_nulls_first';
};

export type TokenKeys = { tokenId: number; collectionId: number };

export interface useGraphQLTokensEventsProps {
  limit: number;
  offset?: number;
  orderBy?: EventsSorting;
  tokens: TokenKeys[];
  author?: string;
}

export const EventsActions = {
  create: 'ItemCreated',
  transfer: 'Transfer',
  burn: 'ItemDestroyed',
};

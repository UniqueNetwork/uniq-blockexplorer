import { DecodedAttributes } from '@unique-nft/api';

export interface BundleTreeVariables {
  collectionId: number;
  tokenId: number;
}

export interface BundleTreeData {
  bundleTree: NestingToken
}

export type NestingToken = {
  attributes: DecodedAttributes;
  bundle_created: number | null;
  burned: boolean;
  children_count: number | null;
  collection_id: number;
  date_of_creation: number;
  image: string;
  is_sold: boolean;
  nestingChildren?: NestingToken[] | never[];
  owner: string;
  owner_normalized: string;
  parent_id: string | null;
  token_id: number;
  token_name: string;
  token_prefix?: string;
}

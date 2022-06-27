import { Collection, Token } from '@app/api';
import config from '../config';

const { IPFSGateway } = config;

export const getCoverURLFromCollection = (collection: Collection | Token | undefined): string | undefined => {
  if (!collection?.collection_cover) {
    return undefined;
  }

  if (collection.collection_cover.startsWith('http')) {
    return collection.collection_cover;
  }

  return `${IPFSGateway}/${collection?.collection_cover}`;
};

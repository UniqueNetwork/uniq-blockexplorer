import config from '../config';

const { IPFSGateway } = config;

export const getCoverURLFromCollection = (collectionCover: string | undefined) => {
  if (!collectionCover) {
    return undefined;
  }

  if (collectionCover.startsWith('http')) {
    return collectionCover;
  }

  try {
    JSON.parse(collectionCover).ipfs;
  } catch (e) {
    //
  }

  return `${IPFSGateway}/${collectionCover}`;
};

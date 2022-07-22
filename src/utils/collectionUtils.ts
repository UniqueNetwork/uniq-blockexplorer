import config from '../config';

const { IPFSGateway } = config;

export const getCoverURLFromCollection = (collectionCover: string | undefined) => {
  if (!collectionCover) {
    return undefined;
  }

  if (collectionCover.startsWith('http')) {
    return collectionCover;
  }

  return `${IPFSGateway}/${collectionCover}`;
};

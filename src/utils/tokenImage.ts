import config from '../config';

const { IPFSGateway } = config;

export const getImageURL = (tokenImage: string) => {
  try {
    const parsed = JSON.parse(tokenImage);

    return `${IPFSGateway}/${parsed.ipfs}`;
  } catch (e) {
    return tokenImage;
  }
};

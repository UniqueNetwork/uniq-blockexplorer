import config from '../config';
import { GqlClient } from './graphQL/gqlClient';

const { defaultChain } = config;

export const gqlClient = new GqlClient(defaultChain.gqlEndpoint);

export * from './graphQL';

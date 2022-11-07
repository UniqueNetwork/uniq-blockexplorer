import { NestingToken } from '@app/api/graphQL/bundleTree/types';

export interface INestingToken extends NestingToken {
  opened?: boolean
  disabled?: boolean
  selected?: boolean
  isCurrentAccountOwner?: boolean
}

export interface ITokenCard {
  token: INestingToken
  onViewNodeDetails?: (token: INestingToken) => void
  onUnnestClick?: (token: INestingToken) => void
  onTransferClick?: (token: INestingToken) => void
}

/* eslint-disable sort-keys-fix/sort-keys-fix */
import { OverrideBundleDefinition } from '@polkadot/types/types';

// structs need to be in order
/* eslint-disable sort-keys */
const bundledTypesDefinitions: OverrideBundleDefinition = {
  types: [
    {
      // on all versions
      minmax: [0, undefined],
      types: {
        AccessMode: {
          _enum: ['Normal', 'WhiteList']
        },
        Address: 'AccountId',
        ChainLimits: {
          AccountTokenOwnershipLimit: 'u32',
          CollectionAdminsLimit: 'u64',
          CollectionNumbersLimit: 'u32',
          CustomDataLimit: 'u32',
          FungibleSponsorTimeout: 'u32',
          NftSponsorTimeout: 'u32',
          OffchainSchemaLimit: 'u32',
          ConstOnChainSchemaLimit: 'u32',
          RefungibleSponsorTimeout: 'u32',
          VariableOnChainSchemaLimit: 'u32'
        },
        Collection: {
          Access: 'AccessMode',
          DecimalPoints: 'DecimalPoints',
          ConstOnChainSchema: 'Vec<u8>',
          Description: 'Vec<u16>',
          Limits: 'CollectionLimits',
          MintMode: 'bool',
          Mode: 'CollectionMode',
          Name: 'Vec<u16>',
          OffchainSchema: 'Vec<u8>',
          Owner: 'AccountId',
          SchemaVersion: 'SchemaVersion',
          Sponsorship: 'SponsorshipState',
          TokenPrefix: 'Vec<u8>',
          VariableOnChainSchema: 'Vec<u8>'
        },
        AccountInfo: 'AccountInfoWithDualRefCount',
        CollectionId: 'u32',
        CollectionLimits: {
          AccountTokenOwnershipLimit: 'u32',
          SponsorTimeout: 'u32',
          SponsoredDataRateLimit: 'Option<BlockNumber>',
          OwnerCanDestroy: 'bool',
          SponsoredDataSize: 'u32',
          OwnerCanTransfer: 'bool',
          TokenLimit: 'u32'
        },
        CollectionMode: {
          _enum: {
            Fungible: 'DecimalPoints',
            Invalid: null,
            NFT: null,
            ReFungible: null
          }
        },
        CreateFungibleData: {
          value: 'u128'
        },
        CreateItemData: {
          _enum: {
            Fungible: 'CreateFungibleData',
            NFT: 'CreateNftData',
            ReFungible: 'CreateReFungibleData'
          }
        },
        CreateNftData: {
          const_data: 'Vec<u8>',
          variable_data: 'Vec<u8>'
        },
        CreateReFungibleData: {
          const_data: 'Vec<u8>',
          pieces: 'u128',
          variable_data: 'Vec<u8>'
        },
        DecimalPoints: 'u8',
        FungibleItemType: {
          Value: 'u128'
        },
        LookupSource: 'AccountId',
        NftItemType: {
          ConstData: 'Vec<u8>',
          Owner: 'AccountId',
          VariableData: 'Vec<u8>'
        },
        Ownership: {
          Fraction: 'u128',
          Owner: 'AccountId'
        },
        RawData: 'Vec<u8>',
        ReFungibleItemType: {
          ConstData: 'Vec<u8>',
          Owner: 'Vec<Ownership<AccountId>>',
          VariableData: 'Vec<u8>'
        },
        SchemaVersion: {
          _enum: ['ImageURL', 'Unique']
        },
        SponsorshipState: {
          _enum: {
            Confirmed: 'AccountId',
            Disabled: null,
            Unconfirmed: 'AccountId'
          }
        },
        TokenId: 'u32',
        Weight: 'u64'
      }
    }
  ]
};

export default bundledTypesDefinitions;

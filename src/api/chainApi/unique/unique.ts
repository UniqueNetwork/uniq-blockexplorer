import { ApiPromise } from '@polkadot/api';
import { INFTController } from '../types';
import { AttributesDecoded, MetadataType, NFTCollection, NFTToken } from './types';
import { normalizeAccountId } from '../utils/normalizeAccountId';
import { deserializeNft, ProtobufAttributeType } from '../utils/protobufUtils';
import { hex2a } from '../utils/decoder';
import config from '../../../config';
import { DecoratedRpc } from '@polkadot/api/types';
import { RpcInterface } from '@polkadot/rpc-core/types.jsonrpc';
import { Codec } from '@polkadot/types/types';

const { IPFSGateway } = config;

type UniqueDecoratedRpc = DecoratedRpc<'promise', RpcInterface> & {
  unique: {
    collectionById(collectionId: string): Promise<{ toJSON: () => NFTCollection }>
    variableMetadata(collectionId: number, tokenId: number): Promise<{ toJSON: () => string }>
    constMetadata(collectionId: number, tokenId: number): Promise<{ toJSON: () => string }>
    tokenOwner(collectionId: number, tokenId: number): Promise<{ toJSON: () => string }>
  }
}

class UniqueNFTController implements INFTController<NFTCollection, NFTToken> {
  private api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  private decodeStruct({ attr, data }: { attr?: string; data?: string }): AttributesDecoded {
    if (attr && data) {
      try {
        const schema = JSON.parse(attr) as ProtobufAttributeType;

        if (schema?.nested) {
          return deserializeNft(schema, Buffer.from(data.slice(2), 'hex'), 'en') as AttributesDecoded;
        }
      } catch (e) {
        console.log('decodeStruct error', e);
      }
    }

    return {};
  }

  private getTokenImageUrl(urlString: string, tokenId: number): string {
    if (urlString.indexOf('{id}') !== -1) {
      return urlString.replace('{id}', tokenId.toString());
    }

    return urlString;
  }

  // uses for token image path
  private async fetchTokenImage(
    collectionInfo: Pick<NFTCollection, 'offchainSchema'>,
    tokenId: number
  ): Promise<string> {
    try {
      const collectionMetadata = JSON.parse(hex2a(collectionInfo.offchainSchema)) as MetadataType;

      if (collectionMetadata.metadata) {
        const dataUrl = this.getTokenImageUrl(collectionMetadata.metadata, tokenId);
        const urlResponse = await fetch(dataUrl);
        const jsonData = (await urlResponse.json()) as { image: string };

        return jsonData.image;
      }
    } catch (e) {
      console.log('image metadata parse error', e);
    }

    return '';
  }

  private getOnChainSchema(collection: NFTCollection): {
    attributesConst: string
    attributesVar: string
  } {
    if (collection) {
      return {
        attributesConst: hex2a(collection.constOnChainSchema),
        attributesVar: hex2a(collection.variableOnChainSchema)
      };
    }

    return {
      attributesConst: '',
      attributesVar: ''
    };
  }

  public async getCollection(collectionId: number): Promise<NFTCollection | null> {
    if (!this.api) {
      return null;
    }

    try {
      const collection =
        await (this.api.rpc as UniqueDecoratedRpc).unique.collectionById(collectionId.toString());

      const collectionInfo = collection.toJSON();
      let coverImageUrl = '';

      if (collectionInfo?.variableOnChainSchema && hex2a(collectionInfo?.variableOnChainSchema)) {
        const collectionSchema = this.getOnChainSchema(collectionInfo);
        const image = (JSON.parse(collectionSchema?.attributesVar) as { collectionCover?: string })?.collectionCover;

        coverImageUrl = `${IPFSGateway || ''}/${image || ''}`;
      } else {
        if (collectionInfo.offchainSchema) {
          coverImageUrl = await this.getTokenImage(collectionInfo, 1);
        }
      }

      return {
        ...collectionInfo,
        coverImageUrl,
        id: collectionId
      };
    } catch (e) {
      console.log('getDetailedCollectionInfo error', e);
    }

    return null;
  }

  public async getTokenImage(collection: NFTCollection, tokenId: number): Promise<string> {
    if (collection.schemaVersion === 'ImageURL') {
      return this.getTokenImageUrl(hex2a(collection.offchainSchema), tokenId);
    } else {
      return await this.fetchTokenImage(collection, tokenId);
    }
  }

  public async getToken(collectionId: number, tokenId: number): Promise<NFTToken | null> {
    if (!this.api || !collectionId) {
      return null;
    }

    try {
      const collection = await this.getCollection(collectionId);

      if (!collection) {
        return null;
      }

      const variableData = (await (this.api.rpc as UniqueDecoratedRpc).unique.variableMetadata(collection.id, tokenId)).toJSON();
      const constData: string = (await (this.api.rpc as UniqueDecoratedRpc).unique.constMetadata(collection.id, tokenId)).toJSON();
      const crossAccount = normalizeAccountId(
        (await (this.api.rpc as UniqueDecoratedRpc).unique.tokenOwner(collection.id, tokenId)).toJSON()
      ) as { Substrate: string };

      let imageUrl = '';

      if (collection.offchainSchema) {
        imageUrl = await this.getTokenImage(collection, tokenId);
      }

      const onChainSchema = this.getOnChainSchema(collection);

      return {
        attributes: {
          ...this.decodeStruct({ attr: onChainSchema.attributesConst, data: constData }),
          ...this.decodeStruct({ attr: onChainSchema.attributesVar, data: variableData })
        },
        constData,
        id: tokenId,
        imageUrl,
        owner: crossAccount,
        variableData
      };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('getDetailedTokenInfo error', e);

      return null;
    }
  }

  public async getTokensOfCollection(collectionId: number, ownerId: number): Promise<Codec | NFTToken[]> {
    if (!this.api || !collectionId || !ownerId) {
      return [];
    }

    try {
      return await this.api.query.unique.accountTokens(collectionId, { Substrate: ownerId });
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log('getTokensOfCollection error', e);
    }

    return [];
  }
}

export default UniqueNFTController;
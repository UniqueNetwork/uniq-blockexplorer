import { WsProvider } from '@polkadot/api';
import { ApiPromise } from '@polkadot/api/promise';
import { formatBalance } from '@polkadot/util';
import { OverrideBundleType } from '@polkadot/types/types';
import { unique } from '@unique-nft/types/definitions';
import { IRpcClient, INFTController, IRpcClientOptions, ChainProperties } from './types';
import bundledTypesDefinitions from './unique/bundledTypesDefinitions';
import rpcMethods from './unique/rpcMethods';
import UniqueNFTController from './unique/unique';
import { ChainData } from '../ApiContext';

export class RpcClient implements IRpcClient {
  public controller?: INFTController;
  public rawRpcApi?: ApiPromise;
  public isApiConnected = false;
  public isApiInitialized = false;
  public apiError?: string;
  public chainData?: ChainData = undefined;
  public rpcEndpoint: string;
  private options: IRpcClientOptions;

  constructor(rpcEndpoint: string, options?: IRpcClientOptions) {
    this.rpcEndpoint = rpcEndpoint;
    this.options = options || {};
    this.setApi();
  }

  private setIsApiConnected(value: boolean) {
    this.isApiConnected = value;
  }

  private setApiError(message: string) {
    this.apiError = message;
  }

  private setIsApiInitialized(value: boolean) {
    this.isApiInitialized = value;
  }

  private setApi() {
    if (this.rawRpcApi) {
      this.setIsApiConnected(false);

      this.rawRpcApi.disconnect()
        .catch((errMsg: string) => {
          throw new Error(errMsg);
        });
    }

    const typesBundle: OverrideBundleType = {
      spec: {
        nft: bundledTypesDefinitions,
        opal: {
          rpc: { unique: unique.rpc }
        },
        quartz: {
          rpc: { unique: unique.rpc }
        }
      }
    };

    const provider = new WsProvider(this.rpcEndpoint);

    const _api = new ApiPromise({
      provider,
      rpc: {
        unique: rpcMethods
      },
      typesBundle
    });

    let chainProperties: ChainProperties;

    _api.on('connected', () => this.setIsApiConnected(true));
    _api.on('disconnected', () => this.setIsApiConnected(false));
    _api.on('error', (error: Error) => this.setApiError(error.message));

    _api.on('ready', async () => {
      this.setIsApiConnected(true);
      await this.getChainData();

      if (this.options.onChainReady && this.chainData) this.options.onChainReady(this.chainData);

      const info = (_api.registry.getChainProperties())?.toHuman() as { ss58Format: string } | undefined;

      console.log('info', info);

      if (info?.ss58Format && this.options.onPropertiesReady) {
        this.options.onPropertiesReady(info);
      }
    });

    this.rawRpcApi = _api;
    this.controller = new UniqueNFTController(_api);
    this.setIsApiInitialized(true);
  }

  private async getChainData() {
    if (!this.rawRpcApi) throw new Error("Attempted to get chain data while api isn't initialized");
    const [chainProperties, systemChain, systemName] = await Promise.all([
      this.rawRpcApi.rpc.system.properties(),
      this.rawRpcApi.rpc.system.chain(),
      this.rawRpcApi.rpc.system.name()
    ]);

    this.chainData = {
      properties: {
        tokenSymbol: chainProperties.tokenSymbol
          .unwrapOr([formatBalance.getDefaults().unit])[0]
          .toString()
      },
      systemChain: (systemChain || '<unknown>').toString(),
      systemName: systemName.toString()
    };
  }

  public setOnChainReadyListener(callback: (chainData: ChainData) => void) {
    this.options.onChainReady = callback;
  }

  public setOnChainSetProperties(callback: (chainProperties: ChainProperties) => void) {
    this.options.onPropertiesReady = callback;
  }

  public changeEndpoint(rpcEndpoint: string) {
    this.rpcEndpoint = rpcEndpoint;
    this.setApi();
  }
}

export default RpcClient;

export type NetworkType = 'testnet' | 'mainnet';
export interface NetworkConfig {
    network: NetworkType;
    rpcUrl: string;
    networkPassphrase: string;
}
export declare const NETWORKS: Record<NetworkType, NetworkConfig>;
export declare const getNetworkConfig: (network?: NetworkType) => NetworkConfig;

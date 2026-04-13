export type NetworkType = 'testnet' | 'mainnet';

export interface NetworkConfig {
  network: NetworkType;
  rpcUrl: string;
  networkPassphrase: string;
}

export const NETWORKS: Record<NetworkType, NetworkConfig> = {
  testnet: {
    network: 'testnet',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    networkPassphrase: 'Test SDF Network ; September 2015',
  },
  mainnet: {
    network: 'mainnet',
    rpcUrl: 'https://soroban-rpc.mainnet.stellar.org',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
  },
};

export const getNetworkConfig = (network: NetworkType = 'testnet'): NetworkConfig => {
  return NETWORKS[network];
};

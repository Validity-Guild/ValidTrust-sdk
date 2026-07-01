"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNetworkConfig = exports.NETWORKS = void 0;
exports.NETWORKS = {
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
const getNetworkConfig = (network = 'testnet') => {
    return exports.NETWORKS[network];
};
exports.getNetworkConfig = getNetworkConfig;

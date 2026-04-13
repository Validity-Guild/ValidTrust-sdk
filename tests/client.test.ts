import { StellarClient } from '../src/client/stellarClient';

describe('StellarClient', () => {
  it('should initialize with testnet by default', () => {
    const client = new StellarClient();
    expect(client.config.network).toBe('testnet');
    expect(client.config.rpcUrl).toBe('https://soroban-testnet.stellar.org');
  });

  it('should initialize with mainnet when specified', () => {
    const client = new StellarClient('mainnet');
    expect(client.config.network).toBe('mainnet');
    expect(client.config.rpcUrl).toBe('https://soroban-rpc.mainnet.stellar.org');
  });

  it('should have submitTransaction method', () => {
    const client = new StellarClient();
    expect(typeof client.submitTransaction).toBe('function');
  });

  it('should have simulateTransaction method', () => {
    const client = new StellarClient();
    expect(typeof client.simulateTransaction).toBe('function');
  });
});

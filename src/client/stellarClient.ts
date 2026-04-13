import { SorobanRpc, Transaction } from '@stellar/stellar-sdk';
import { NetworkConfig, NetworkType, getNetworkConfig } from '../utils/networkConfig';

export class StellarClient {
  public server: SorobanRpc.Server;
  public config: NetworkConfig;

  constructor(network: NetworkType = 'testnet') {
    this.config = getNetworkConfig(network);
    this.server = new SorobanRpc.Server(this.config.rpcUrl);
  }

  /**
   * Submit a signed transaction to the network
   * @param transaction Signed transaction object
   * @returns Transaction result response
   */
  async submitTransaction(transaction: Transaction) {
    try {
      const response = await this.server.sendTransaction(transaction);
      if (response.status === 'ERROR') {
        throw new Error(`Transaction failed: ${JSON.stringify(response.errorResult)}`);
      }
      return response;
    } catch (error) {
      console.error('Error submitting transaction:', error);
      throw error;
    }
  }

  /**
   * Simulate a transaction to get the footprint and fee
   * @param transaction Unsigned transaction object
   * @returns Simulation result
   */
  async simulateTransaction(transaction: Transaction) {
    return await this.server.simulateTransaction(transaction);
  }
}

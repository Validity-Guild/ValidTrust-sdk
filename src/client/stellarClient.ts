/**
 * @file stellarClient.ts
 * @description Core client for interacting with the Stellar Soroban network.
 * This class provides methods to initialize a connection to the network,
 * simulate transactions, and submit signed transactions to the RPC server.
 * 
 * It serves as the foundation for higher-level contract wrappers in the SDK.
 * 
 * @module client/StellarClient
 */

import { SorobanRpc, Transaction } from '@stellar/stellar-sdk';
import { NetworkConfig, NetworkType, getNetworkConfig } from '../utils/networkConfig';

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';

/**
 * StellarClient Class
 * 
 * A wrapper around the SorobanRpc.Server that handles network-specific configurations
 * and provides standardized methods for transaction handling.
 * 
 * @class StellarClient
 */
export class StellarClient {
  /**
   * The underlying Soroban RPC server instance.
   */
  public server: SorobanRpc.Server;

  /**
   * The network configuration object containing RPC URLs, Passphrases, etc.
   */
  public config: NetworkConfig;

  /**
   * Initializes a new instance of the StellarClient.
   * 
   * @param {NetworkType} [network='testnet'] - The target network ('testnet', 'futurenet', or 'mainnet').
   */
  constructor(network: NetworkType = 'testnet') {
    this.config = getNetworkConfig(network);
    this.server = new SorobanRpc.Server(this.config.rpcUrl);
    
    // Log initialization in development mode
    if (isDev) {
      console.debug(`[StellarClient] Initialized for network: ${network} (RPC: ${this.config.rpcUrl})`);
    }
  }

  /**
   * Submits a signed transaction to the Soroban network.
   * 
   * This method performs several steps:
   * 1. Sends the transaction to the RPC server via `sendTransaction`.
   * 2. Checks the initial submission status.
   * 3. Throws a detailed error if the submission fails immediately.
   * 
   * @async
   * @param {Transaction} transaction - The fully signed transaction object ready for submission.
   * @returns {Promise<SorobanRpc.Api.SendTransactionResponse>} The raw response from the RPC server.
   * @throws {Error} If the transaction fails to submit or returns an error status.
   */
  async submitTransaction(transaction: Transaction) {
    try {
      console.info(`[StellarClient] Submitting transaction ${transaction.hash().toString('hex')}...`);
      
      const response = await this.server.sendTransaction(transaction);
      
      if (response.status === 'ERROR') {
        const errorDetail = JSON.stringify(response.errorResult);
        console.error(`[StellarClient] Transaction submission failed: ${errorDetail}`);
        throw new Error(`Transaction failed: ${errorDetail}`);
      }
      
      console.info(`[StellarClient] Transaction submitted successfully. Status: ${response.status}`);
      return response;
    } catch (error) {
      console.error('[StellarClient] Critical error during transaction submission:', error);
      throw error;
    }
  }

  /**
   * Simulates a transaction on the Soroban network.
   * 
   * Simulation is a crucial step before submission as it:
   * - Calculates required resource footprints (ledger entries).
   * - Estimates the minimum fee required for the transaction.
   * - Verifies if the transaction will succeed without actually changing ledger state.
   * 
   * @async
   * @param {Transaction} transaction - The transaction object to simulate.
   * @returns {Promise<SorobanRpc.Api.SimulateTransactionResponse>} The simulation result including footprint and estimated fee.
   */
  async simulateTransaction(transaction: Transaction) {
    try {
      console.debug(`[StellarClient] Simulating transaction...`);
      const result = await this.server.simulateTransaction(transaction);
      
      if ('error' in result) {
        console.warn(`[StellarClient] Simulation returned an error: ${result.error}`);
      } else {
        console.debug(`[StellarClient] Simulation completed successfully.`);
      }
      
      return result;
    } catch (error) {
      console.error('[StellarClient] Simulation failed:', error);
      throw error;
    }
  }

  /**
   * Utility to refresh the internal RPC server instance if needed.
   * @param {string} rpcUrl - New RPC endpoint URL.
   */
  public updateRpcEndpoint(rpcUrl: string) {
    console.info(`[StellarClient] Updating RPC endpoint to: ${rpcUrl}`);
    this.server = new SorobanRpc.Server(rpcUrl);
  }
}

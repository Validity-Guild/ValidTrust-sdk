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
import { NetworkConfig, NetworkType } from '../utils/networkConfig';
/**
 * StellarClient Class
 *
 * A wrapper around the SorobanRpc.Server that handles network-specific configurations
 * and provides standardized methods for transaction handling.
 *
 * @class StellarClient
 */
export declare class StellarClient {
    /**
     * The underlying Soroban RPC server instance.
     */
    server: SorobanRpc.Server;
    /**
     * The network configuration object containing RPC URLs, Passphrases, etc.
     */
    config: NetworkConfig;
    /**
     * Initializes a new instance of the StellarClient.
     *
     * @param {NetworkType} [network='testnet'] - The target network ('testnet', 'futurenet', or 'mainnet').
     */
    constructor(network?: NetworkType);
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
    submitTransaction(transaction: Transaction): Promise<SorobanRpc.Api.SendTransactionResponse>;
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
    simulateTransaction(transaction: Transaction): Promise<SorobanRpc.Api.SimulateTransactionResponse>;
    /**
     * Utility to refresh the internal RPC server instance if needed.
     * @param {string} rpcUrl - New RPC endpoint URL.
     */
    updateRpcEndpoint(rpcUrl: string): void;
}

/**
 * @file vault.ts
 * @description A high-level wrapper for the Validity Network Vault smart contract.
 * This class provides a developer-friendly interface to interact with the vault,
 * abstracting away the complexities of XDR encoding and Soroban RPC calls.
 * 
 * It allows for building transactions for deposits, withdrawals, and reward claims,
 * as well as querying the current balance of a user in the vault.
 * 
 * @module contracts/VaultContract
 */

import { xdr, Address, scValToNative, Transaction } from '@stellar/stellar-sdk';
import { StellarClient } from '../client/stellarClient';
import { buildContractCallTransaction } from '../utils/transactionBuilder';

const isDev = typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production';

/**
 * VaultContract Class
 * 
 * Provides methods to interact with a specific instance of the Validity Vault contract.
 * 
 * @class VaultContract
 */
export class VaultContract {
  private client: StellarClient;
  private contractId: string;

  /**
   * Initializes a new VaultContract instance.
   * 
   * @param {StellarClient} client - An initialized StellarClient instance.
   * @param {string} contractId - The unique identifier (Address) of the vault contract on-chain.
   */
  constructor(client: StellarClient, contractId: string) {
    this.client = client;
    this.contractId = contractId;
    
    if (isDev) {
      console.debug(`[VaultContract] Initialized for contract: ${contractId}`);
    }
  }

  /**
   * Builds an unsigned transaction for depositing tokens into the vault.
   * 
   * This method prepares the XDR arguments required by the contract's `deposit` method.
   * 
   * @async
   * @param {string} sourceAddress - The public key of the wallet depositing the tokens.
   * @param {string} amount - The amount of tokens to deposit, represented in stroops (integer string).
   * @returns {Promise<Transaction>} A transaction object ready to be signed and submitted.
   * @throws {Error} If the transaction building process fails.
   */
  async buildDeposit(sourceAddress: string, amount: string) {
    console.info(`[VaultContract] Building deposit tx for ${sourceAddress}, amount: ${amount}`);
    
    return await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'deposit',
      args: [
        new Address(sourceAddress).toScVal(),
        // Convert the string amount into a Soroban i128 ScVal
        xdr.ScVal.scvI128(new xdr.Int128Parts({
          hi: new xdr.Int64(0, 0),
          lo: xdr.Uint64.fromString(amount)
        })),
      ],
      sourceAddress,
    });
  }

  /**
   * Builds an unsigned transaction for withdrawing tokens from the vault.
   * 
   * This method prepares the XDR arguments required by the contract's `withdraw` method.
   * 
   * @async
   * @param {string} sourceAddress - The public key of the wallet withdrawing the tokens.
   * @param {string} amount - The amount of tokens to withdraw, represented in stroops (integer string).
   * @returns {Promise<Transaction>} A transaction object ready to be signed and submitted.
   * @throws {Error} If the transaction building process fails.
   */
  async buildWithdraw(sourceAddress: string, amount: string) {
    console.info(`[VaultContract] Building withdraw tx for ${sourceAddress}, amount: ${amount}`);

    return await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'withdraw',
      args: [
        new Address(sourceAddress).toScVal(),
        // Convert the string amount into a Soroban i128 ScVal
        xdr.ScVal.scvI128(new xdr.Int128Parts({
          hi: new xdr.Int64(0, 0),
          lo: xdr.Uint64.fromString(amount)
        })),
      ],
      sourceAddress,
    });
  }

  /**
   * Builds an unsigned transaction for claiming accumulated rewards from the vault.
   * 
   * @async
   * @param {string} sourceAddress - The public key of the wallet claiming the rewards.
   * @returns {Promise<Transaction>} A transaction object ready to be signed and submitted.
   * @throws {Error} If the transaction building process fails.
   */
  async buildClaimRewards(sourceAddress: string) {
    console.info(`[VaultContract] Building claim_rewards tx for ${sourceAddress}`);

    return await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'claim_rewards',
      args: [new Address(sourceAddress).toScVal()],
      sourceAddress,
    });
  }

  /**
   * Fetches the current token balance of a specific address from the vault.
   * 
   * This is a read-only operation that uses transaction simulation to query the contract state.
   * 
   * @async
   * @param {string} address - The public key of the wallet to query.
   * @returns {Promise<string>} The current balance as a string (in stroops).
   * @throws {Error} If the simulation fails or the balance cannot be retrieved.
   */
  async getBalance(address: string): Promise<string> {
    console.debug(`[VaultContract] Fetching balance for address: ${address}`);

    const tx = await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'get_balance',
      args: [new Address(address).toScVal()],
      sourceAddress: address, // Simulated source address for fee estimation
    });

    const simulation = await this.client.simulateTransaction(tx);
    
    // Extract the return value from the first result of the simulation
    if (simulation.results && simulation.results.length > 0) {
      const resultVal = simulation.results[0].retval;
      const balance = scValToNative(resultVal).toString();
      console.debug(`[VaultContract] Retrieved balance: ${balance}`);
      return balance;
    }
    
    console.error(`[VaultContract] Failed to fetch balance for ${address}. Simulation response:`, simulation);
    throw new Error('Failed to fetch balance: No simulation results returned.');
  }
}

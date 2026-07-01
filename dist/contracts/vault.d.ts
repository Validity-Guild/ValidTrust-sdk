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
import { StellarClient } from '../client/stellarClient';
/**
 * VaultContract Class
 *
 * Provides methods to interact with a specific instance of the Validity Vault contract.
 *
 * @class VaultContract
 */
export declare class VaultContract {
    private client;
    private contractId;
    /**
     * Initializes a new VaultContract instance.
     *
     * @param {StellarClient} client - An initialized StellarClient instance.
     * @param {string} contractId - The unique identifier (Address) of the vault contract on-chain.
     */
    constructor(client: StellarClient, contractId: string);
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
    buildDeposit(sourceAddress: string, amount: string): Promise<import("@stellar/stellar-base").Transaction<import("@stellar/stellar-base").Memo<import("@stellar/stellar-base").MemoType>, import("@stellar/stellar-base").Operation[]>>;
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
    buildWithdraw(sourceAddress: string, amount: string): Promise<import("@stellar/stellar-base").Transaction<import("@stellar/stellar-base").Memo<import("@stellar/stellar-base").MemoType>, import("@stellar/stellar-base").Operation[]>>;
    /**
     * Builds an unsigned transaction for claiming accumulated rewards from the vault.
     *
     * @async
     * @param {string} sourceAddress - The public key of the wallet claiming the rewards.
     * @returns {Promise<Transaction>} A transaction object ready to be signed and submitted.
     * @throws {Error} If the transaction building process fails.
     */
    buildClaimRewards(sourceAddress: string): Promise<import("@stellar/stellar-base").Transaction<import("@stellar/stellar-base").Memo<import("@stellar/stellar-base").MemoType>, import("@stellar/stellar-base").Operation[]>>;
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
    getBalance(address: string): Promise<string>;
}

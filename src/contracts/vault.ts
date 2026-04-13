import { xdr, Address, scValToNative } from '@stellar/stellar-sdk';
import { StellarClient } from '../client/stellarClient';
import { buildContractCallTransaction } from '../utils/transactionBuilder';

export class VaultContract {
  private client: StellarClient;
  private contractId: string;

  constructor(client: StellarClient, contractId: string) {
    this.client = client;
    this.contractId = contractId;
  }

  /**
   * Build a deposit transaction
   * @param sourceAddress Wallet address depositing tokens
   * @param amount Amount of tokens to deposit (in stroops)
   */
  async buildDeposit(sourceAddress: string, amount: string) {
    return await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'deposit',
      args: [
        new Address(sourceAddress).toScVal(),
        xdr.ScVal.scvI128(new xdr.Int128Parts({
            hi: new xdr.Int64(0, 0),
            lo: xdr.Uint64.fromString(amount)
        })),
      ],
      sourceAddress,
    });
  }

  /**
   * Build a withdraw transaction
   * @param sourceAddress Wallet address withdrawing tokens
   * @param amount Amount of tokens to withdraw (in stroops)
   */
  async buildWithdraw(sourceAddress: string, amount: string) {
    return await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'withdraw',
      args: [
        new Address(sourceAddress).toScVal(),
        xdr.ScVal.scvI128(new xdr.Int128Parts({
            hi: new xdr.Int64(0, 0),
            lo: xdr.Uint64.fromString(amount)
        })),
      ],
      sourceAddress,
    });
  }

  /**
   * Build a claim rewards transaction
   * @param sourceAddress Wallet address claiming rewards
   */
  async buildClaimRewards(sourceAddress: string) {
    return await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'claim_rewards',
      args: [new Address(sourceAddress).toScVal()],
      sourceAddress,
    });
  }

  /**
   * Fetch the balance of a given address
   * @param address Wallet address to query
   * @returns Balance as a string
   */
  async getBalance(address: string): Promise<string> {
    const tx = await buildContractCallTransaction(this.client.server, this.client.config, {
      contractId: this.contractId,
      method: 'get_balance',
      args: [new Address(address).toScVal()],
      sourceAddress: address, // Simulated source
    });

    const simulation = await this.client.simulateTransaction(tx);
    
    if (simulation.results && simulation.results.length > 0) {
      const resultVal = simulation.results[0].retval;
      return scValToNative(resultVal).toString();
    }
    
    throw new Error('Failed to fetch balance');
  }
}

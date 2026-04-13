import { Account, TransactionBuilder, xdr, Contract, SorobanRpc, TimeoutInfinite } from '@stellar/stellar-sdk';
import { NetworkConfig } from './networkConfig';

export interface ContractCallParams {
  contractId: string;
  method: string;
  args?: xdr.ScVal[];
  sourceAddress: string;
}

export const buildContractCallTransaction = async (
  server: SorobanRpc.Server,
  networkConfig: NetworkConfig,
  params: ContractCallParams
) => {
  const accountDetails = await server.getAccount(params.sourceAddress);
  const account = new Account(params.sourceAddress, accountDetails.sequenceNumber());

  const contract = new Contract(params.contractId);
  const operation = contract.call(params.method, ...(params.args || []));

  const transaction = new TransactionBuilder(account, {
    fee: '100', // Basic fee, will be simulated and updated later
    networkPassphrase: networkConfig.networkPassphrase,
  })
    .addOperation(operation)
    .setTimeout(TimeoutInfinite)
    .build();

  return transaction;
};

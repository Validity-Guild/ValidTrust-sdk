import { StellarClient } from '../src/client/stellarClient';
import { VaultContract } from '../src/contracts/vault';
import * as TransactionBuilderModule from '../src/utils/transactionBuilder';

jest.mock('../src/utils/transactionBuilder', () => ({
  buildContractCallTransaction: jest.fn().mockResolvedValue({
    toXDR: () => 'MOCKED_XDR',
  }),
}));

describe('VaultContract', () => {
  let client: StellarClient;
  let vault: VaultContract;
  const mockAddress = 'GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
  const mockContractId = 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

  beforeEach(() => {
    client = new StellarClient('testnet');
    vault = new VaultContract(client, mockContractId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call buildDeposit correctly', async () => {
    await vault.buildDeposit(mockAddress, '10000000');
    expect(TransactionBuilderModule.buildContractCallTransaction).toHaveBeenCalledWith(
      client.server,
      client.config,
      expect.objectContaining({
        contractId: mockContractId,
        method: 'deposit',
        sourceAddress: mockAddress,
      })
    );
  });

  it('should call buildWithdraw correctly', async () => {
    await vault.buildWithdraw(mockAddress, '5000000');
    expect(TransactionBuilderModule.buildContractCallTransaction).toHaveBeenCalledWith(
      client.server,
      client.config,
      expect.objectContaining({
        contractId: mockContractId,
        method: 'withdraw',
        sourceAddress: mockAddress,
      })
    );
  });

  it('should handle getBalance simulation failure gracefully', async () => {
    client.simulateTransaction = jest.fn().mockResolvedValue({ results: [] });
    await expect(vault.getBalance(mockAddress)).rejects.toThrow('Failed to fetch balance');
  });
});

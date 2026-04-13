import { StellarClient, WalletConnector, VaultContract } from '../src';

const withdrawExample = async () => {
  try {
    const client = new StellarClient('testnet');
    const wallet = new WalletConnector();
    
    console.log('Connecting to wallet...');
    const sourceAddress = await wallet.connect();
    console.log(`Connected address: ${sourceAddress}`);

    const vaultContractId = 'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const vault = new VaultContract(client, vaultContractId);
    
    console.log('Building withdraw transaction for 5 tokens...');
    const amountInStroops = '50000000'; // 5 * 10^7
    const transaction = await vault.buildWithdraw(sourceAddress, amountInStroops);
    
    console.log('Simulating transaction...');
    const simResult = await client.simulateTransaction(transaction);
    console.log('Simulation successful, fee:', simResult.minResourceFee);

    console.log('Signing transaction with wallet...');
    const signedXdr = await wallet.sign(transaction.toXDR(), 'TESTNET');
    
    // const signedTransaction = new Transaction(signedXdr, client.config.networkPassphrase);
    // const response = await client.submitTransaction(signedTransaction);
    // console.log('Transaction successful! Hash:', response.hash);

  } catch (error) {
    console.error('Error in withdraw example:', error);
  }
};

// withdrawExample();

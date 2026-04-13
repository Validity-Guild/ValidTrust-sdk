import { StellarClient, WalletConnector, VaultContract } from '../src';
import { Transaction } from '@stellar/stellar-sdk';

const depositExample = async () => {
  try {
    const client = new StellarClient('testnet');
    const wallet = new WalletConnector();
    
    console.log('Connecting to wallet...');
    const sourceAddress = await wallet.connect();
    console.log(`Connected address: ${sourceAddress}`);

    const vaultContractId = 'CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const vault = new VaultContract(client, vaultContractId);
    
    console.log('Building deposit transaction for 10 tokens...');
    const amountInStroops = '100000000'; // 10 * 10^7
    const transaction = await vault.buildDeposit(sourceAddress, amountInStroops);
    
    console.log('Simulating transaction...');
    const simResult = await client.simulateTransaction(transaction);
    console.log('Simulation successful, fee:', simResult.minResourceFee);

    // In a real scenario, you'd add the simulated fee and rebuild the transaction before signing
    // transaction.fee = simResult.minResourceFee;
    
    console.log('Signing transaction with wallet...');
    const signedXdr = await wallet.sign(transaction.toXDR(), 'TESTNET');
    
    // We would parse the signedXdr back to a Transaction object and submit
    // const signedTransaction = new Transaction(signedXdr, client.config.networkPassphrase);
    // console.log('Submitting transaction...');
    // const response = await client.submitTransaction(signedTransaction);
    // console.log('Transaction successful! Hash:', response.hash);

  } catch (error) {
    console.error('Error in deposit example:', error);
  }
};

// depositExample();

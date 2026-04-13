import { StellarClient, VaultContract } from '../src';

const balanceExample = async () => {
  try {
    const client = new StellarClient('testnet');
    
    // Replace with a valid testnet account and contract ID
    const addressToQuery = 'GBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const vaultContractId = 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    
    const vault = new VaultContract(client, vaultContractId);
    
    console.log(`Fetching balance for address: ${addressToQuery}...`);
    const balance = await vault.getBalance(addressToQuery);
    
    // Balance is returned in stroops (7 decimals)
    const formattedBalance = (parseFloat(balance) / 10000000).toFixed(7);
    console.log(`Current Vault Balance: ${formattedBalance} VLD`);

  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};

// balanceExample();

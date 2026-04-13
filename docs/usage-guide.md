# Usage Guide

## Developer Setup

Install the SDK in your project:
```bash
npm install validity-sdk
```

## Step-by-Step Examples

### 1. Connecting the Wallet

Use `WalletConnector` to connect to Freighter:

```typescript
import { WalletConnector } from 'validity-sdk';

const wallet = new WalletConnector();
const address = await wallet.connect();
```

### 2. Interacting with the Vault

Create a client and initialize the vault contract:

```typescript
import { StellarClient, VaultContract } from 'validity-sdk';

const client = new StellarClient('testnet');
const vault = new VaultContract(client, 'CONTRACT_ID');

// Fetch Balance
const balance = await vault.getBalance(address);
console.log(balance);
```

### 3. Submitting a Transaction

Building and submitting a deposit transaction involves simulating and signing:

```typescript
import { Transaction } from '@stellar/stellar-sdk';

// 1. Build
const tx = await vault.buildDeposit(address, '10000000');

// 2. Simulate (to get fee/footprint)
const simResult = await client.simulateTransaction(tx);
// Add simulation fee to tx here...

// 3. Sign
const signedXdr = await wallet.sign(tx.toXDR(), 'TESTNET');

// 4. Submit
const signedTx = new Transaction(signedXdr, client.config.networkPassphrase);
const result = await client.submitTransaction(signedTx);
console.log(result.hash);
```

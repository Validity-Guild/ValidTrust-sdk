# Validity SDK

Validity SDK is a TypeScript developer toolkit that simplifies interaction with Validity smart contracts deployed on the Stellar blockchain via Soroban.

## Features

- Connect to Stellar networks (testnet/mainnet).
- Call smart contract functions using Soroban RPC.
- Send and simulate transactions with built-in error handling.
- Fetch contract state (e.g., token balances).
- Seamless wallet integration with Freighter.
- Developer-friendly helpers to simplify contract interactions.

## Installation

Install the package via npm:

```bash
npm install validity-sdk @stellar/stellar-sdk @stellar/freighter-api
```

## Quick Start Guide

### 1. Initialize Client & Wallet

```typescript
import { StellarClient, WalletConnector } from 'validity-sdk';

const client = new StellarClient('testnet');
const wallet = new WalletConnector();

const address = await wallet.connect();
```

### 2. Check Vault Balance

```typescript
import { VaultContract } from 'validity-sdk';

const vaultId = 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const vault = new VaultContract(client, vaultId);

const balance = await vault.getBalance(address);
console.log(`Balance: ${balance} stroops`);
```

### 3. Deposit Tokens

See [depositExample.ts](examples/depositExample.ts) for full code on how to build, sign, and submit a deposit transaction.

## Documentation

- [SDK Overview](docs/sdk-overview.md)
- [Usage Guide](docs/usage-guide.md)
- [Contributing](CONTRIBUTING.md)

## License

MIT

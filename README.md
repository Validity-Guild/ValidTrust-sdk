<div align="center">

<img src="logo/valid%20sdk%20logo.png" alt="ValidTrust SDK Logo" width="120" height="120" />

# ValidTrust SDK

**The official TypeScript SDK for building on the ValidTrust protocol.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/badge/npm-validtrust--sdk-red?logo=npm)](https://www.npmjs.com/package/validtrust-sdk)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-7C3AED?logo=stellar)](https://soroban.stellar.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

---

## Overview

`validtrust-sdk` is the official TypeScript developer toolkit for the [ValidTrust Network](https://github.com/Validity-Guild/ValidTrust-sdk). It abstracts the complexity of Soroban RPC calls, transaction building, and wallet integration into a clean, typed API — allowing developers to integrate ValidTrust protocol interactions into any JavaScript or TypeScript application in minutes.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [1. Initialise the Client & Wallet](#1-initialise-the-client--wallet)
  - [2. Check Vault Balance](#2-check-vault-balance)
  - [3. Deposit Tokens](#3-deposit-tokens)
  - [4. Withdraw Tokens](#4-withdraw-tokens)
  - [5. Claim Rewards](#5-claim-rewards)
- [API Reference](#api-reference)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🌐 **Multi-network support** — Connect to Stellar Testnet or Mainnet with a single parameter
- 📡 **Soroban RPC client** — Call, simulate, and submit smart contract transactions
- 🔐 **Wallet integration** — First-class support for [Freighter](https://www.freighter.app/); extensible for Albedo and xBull
- 🏦 **Vault interactions** — Typed wrappers for deposit, withdraw, balance, and reward claim operations
- ⚡ **Built-in error handling** — Descriptive errors for failed simulations and rejected transactions
- 🛠️ **Developer utilities** — Helpers for fee estimation, stroops conversion, and account management

---

## Installation

Install the SDK and its peer dependencies:

```bash
npm install validtrust-sdk @stellar/stellar-sdk @stellar/freighter-api
```

> **Peer dependencies**: `@stellar/stellar-sdk ^12.0.0` and `@stellar/freighter-api ^2.0.0` are required and must be installed alongside the SDK.

---

## Quick Start

### 1. Initialise the Client & Wallet

```typescript
import { StellarClient, WalletConnector } from 'validtrust-sdk';

// Connect to Stellar Testnet
const client = new StellarClient('testnet');

// Connect to the user's Freighter wallet
const wallet = new WalletConnector();
const address = await wallet.connect();

console.log('Connected wallet:', address);
```

### 2. Check Vault Balance

```typescript
import { VaultContract } from 'validtrust-sdk';

const CONTRACT_ID = 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const vault = new VaultContract(client, CONTRACT_ID);

const balance = await vault.getBalance(address);
console.log(`Vault balance: ${balance} stroops`);
```

### 3. Deposit Tokens

```typescript
const TOKEN_CONTRACT_ID = 'CBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const amount = BigInt(100_000_000); // 10 tokens in stroops (7 decimal places)

const txHash = await vault.deposit(wallet, TOKEN_CONTRACT_ID, amount);
console.log('Deposit successful. Transaction:', txHash);
```

### 4. Withdraw Tokens

```typescript
const withdrawAmount = BigInt(50_000_000); // 5 tokens

const txHash = await vault.withdraw(wallet, withdrawAmount);
console.log('Withdrawal successful. Transaction:', txHash);
```

### 5. Claim Rewards

```typescript
const txHash = await vault.claimRewards(wallet);
console.log('Rewards claimed. Transaction:', txHash);
```

For a complete working example, see [examples/depositExample.ts](examples/depositExample.ts).

---

## API Reference

### `StellarClient`

| Method | Description |
|---|---|
| `new StellarClient(network)` | Creates a client. `network` is `'testnet'` or `'mainnet'` |

### `WalletConnector`

| Method | Description |
|---|---|
| `connect()` | Prompts the user to connect Freighter; returns their public key |
| `getPublicKey()` | Returns the currently connected public key |
| `signTransaction(xdr)` | Signs a transaction XDR string and returns the signed XDR |

### `VaultContract`

| Method | Params | Description |
|---|---|---|
| `getBalance(address)` | `address: string` | Returns the deposited balance for an address (in stroops) |
| `deposit(wallet, tokenId, amount)` | `wallet`, `tokenId: string`, `amount: BigInt` | Deposits tokens into the vault |
| `withdraw(wallet, amount)` | `wallet`, `amount: BigInt` | Withdraws tokens from the vault |
| `claimRewards(wallet)` | `wallet` | Claims accrued rewards for the connected wallet |

For full type definitions, see the [SDK Overview](docs/sdk-overview.md) and [Usage Guide](docs/usage-guide.md).

---

## Running Tests

Run the full Jest test suite:

```bash
npm test
```

Build the TypeScript output to `dist/`:

```bash
npm run build
```

Lint the source code:

```bash
npm run lint
```

---

## Project Structure

```
validtrust-sdk/
├── src/
│   ├── client/             # StellarClient — RPC and network configuration
│   ├── wallet/             # WalletConnector — Freighter integration
│   ├── contracts/          # VaultContract — typed contract interactions
│   └── index.ts            # Public API entrypoint
├── examples/
│   └── depositExample.ts   # Full deposit workflow example
├── tests/                  # Jest unit and integration tests
├── docs/                   # SDK overview and usage guides
├── dist/                   # Compiled output (generated)
└── README.md
```

---

---

## Contributing

Contributions are welcome! Please read the [Contributing Guidelines](CONTRIBUTING.md) before opening a Pull Request.

**Priority contribution areas:**
- Additional contract module support (Governance, Staking)
- Extended wallet integrations (Albedo, xBull)
- Auto-calculated optimal resource fee estimation
- Additional examples and documentation improvements

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

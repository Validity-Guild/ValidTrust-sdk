# ValidTrust SDK Architecture

The ValidTrust SDK is structured into clean, modular components to make interacting with Stellar and Soroban smart contracts simple for developers.

## Modules and Responsibilities

### 1. `client/stellarClient.ts`
- **Responsibilities:** Connects to Stellar RPC (testnet/mainnet). Submits transactions and simulates them to calculate resource footprints and fees.
- **Dependencies:** `@stellar/stellar-sdk` (SorobanRpc, Transaction).

### 2. `wallet/walletConnector.ts`
- **Responsibilities:** Handles Freighter wallet integration, checking connection status, connecting users, fetching public keys, and signing transactions securely.
- **Dependencies:** `@stellar/freighter-api`.

### 3. `contracts/vault.ts`
- **Responsibilities:** Interacts specifically with the ValidTrust vault contract. Provides methods to build deposit, withdraw, and claim transactions. Fetches contract state (e.g., balances).
- **Dependencies:** `StellarClient`, `transactionBuilder`.

### 4. `utils/transactionBuilder.ts`
- **Responsibilities:** Abstracting the creation of Soroban transactions. It wraps `Contract` calls, sets up the `TransactionBuilder`, and handles network passphrases.

### 5. `utils/networkConfig.ts`
- **Responsibilities:** Managing network endpoints. Simplifies switching between testnet and mainnet by providing predefined configurations.

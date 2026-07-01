"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletConnector = void 0;
const freighter_api_1 = require("@stellar/freighter-api");
class WalletConnector {
    /**
     * Check if the Freighter wallet is connected
     * @returns boolean indicating connection status
     */
    async isConnected() {
        try {
            return await (0, freighter_api_1.isConnected)();
        }
        catch (error) {
            console.error('Wallet connection check failed:', error);
            return false;
        }
    }
    /**
     * Request user to connect their wallet
     * @returns Public key of the connected wallet
     */
    async connect() {
        const allowed = await (0, freighter_api_1.setAllowed)();
        if (!allowed) {
            throw new Error('Wallet connection was not allowed by the user.');
        }
        return await (0, freighter_api_1.getPublicKey)();
    }
    /**
     * Get the current connected wallet's public key
     * @returns Public key string
     */
    async getPublicKey() {
        return await (0, freighter_api_1.getPublicKey)();
    }
    /**
     * Sign a transaction using the connected wallet
     * @param xdr Base64 encoded XDR of the transaction
     * @param network Network type ('TESTNET' | 'PUBLIC')
     * @returns Signed transaction XDR
     */
    async sign(xdr, network) {
        try {
            // NOTE: signTransaction from freighter returns a signed transaction in base64 format.
            const response = await (0, freighter_api_1.signTransaction)(xdr, { network: network });
            if (response.error) {
                throw new Error(response.error);
            }
            return response;
        }
        catch (error) {
            console.error('Transaction signing failed:', error);
            throw error;
        }
    }
}
exports.WalletConnector = WalletConnector;

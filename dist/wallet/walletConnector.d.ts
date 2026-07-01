export declare class WalletConnector {
    /**
     * Check if the Freighter wallet is connected
     * @returns boolean indicating connection status
     */
    isConnected(): Promise<boolean>;
    /**
     * Request user to connect their wallet
     * @returns Public key of the connected wallet
     */
    connect(): Promise<string>;
    /**
     * Get the current connected wallet's public key
     * @returns Public key string
     */
    getPublicKey(): Promise<string>;
    /**
     * Sign a transaction using the connected wallet
     * @param xdr Base64 encoded XDR of the transaction
     * @param network Network type ('TESTNET' | 'PUBLIC')
     * @returns Signed transaction XDR
     */
    sign(xdr: string, network: 'TESTNET' | 'PUBLIC'): Promise<string>;
}

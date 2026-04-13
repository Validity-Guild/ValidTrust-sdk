import {
  isConnected,
  getPublicKey,
  signTransaction,
  setAllowed
} from '@stellar/freighter-api';

export class WalletConnector {
  /**
   * Check if the Freighter wallet is connected
   * @returns boolean indicating connection status
   */
  async isConnected(): Promise<boolean> {
    try {
      return await isConnected();
    } catch (error) {
      console.error('Wallet connection check failed:', error);
      return false;
    }
  }

  /**
   * Request user to connect their wallet
   * @returns Public key of the connected wallet
   */
  async connect(): Promise<string> {
    const allowed = await setAllowed();
    if (!allowed) {
      throw new Error('Wallet connection was not allowed by the user.');
    }
    return await getPublicKey();
  }

  /**
   * Get the current connected wallet's public key
   * @returns Public key string
   */
  async getPublicKey(): Promise<string> {
    return await getPublicKey();
  }

  /**
   * Sign a transaction using the connected wallet
   * @param xdr Base64 encoded XDR of the transaction
   * @param network Network type ('TESTNET' | 'PUBLIC')
   * @returns Signed transaction XDR
   */
  async sign(xdr: string, network: 'TESTNET' | 'PUBLIC'): Promise<string> {
    try {
      // NOTE: signTransaction from freighter returns a signed transaction in base64 format.
      const response = await signTransaction(xdr, { network: network });
      if (response.error) {
          throw new Error(response.error);
      }
      return response;
    } catch (error) {
      console.error('Transaction signing failed:', error);
      throw error;
    }
  }
}

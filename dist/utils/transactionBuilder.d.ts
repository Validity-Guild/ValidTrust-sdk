import { xdr, SorobanRpc } from '@stellar/stellar-sdk';
import { NetworkConfig } from './networkConfig';
export interface ContractCallParams {
    contractId: string;
    method: string;
    args?: xdr.ScVal[];
    sourceAddress: string;
}
export declare const buildContractCallTransaction: (server: SorobanRpc.Server, networkConfig: NetworkConfig, params: ContractCallParams) => Promise<import("@stellar/stellar-base").Transaction<import("@stellar/stellar-base").Memo<import("@stellar/stellar-base").MemoType>, import("@stellar/stellar-base").Operation[]>>;

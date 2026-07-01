"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildContractCallTransaction = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const buildContractCallTransaction = async (server, networkConfig, params) => {
    const accountDetails = await server.getAccount(params.sourceAddress);
    const account = new stellar_sdk_1.Account(params.sourceAddress, accountDetails.sequenceNumber());
    const contract = new stellar_sdk_1.Contract(params.contractId);
    const operation = contract.call(params.method, ...(params.args || []));
    const transaction = new stellar_sdk_1.TransactionBuilder(account, {
        fee: '100', // Basic fee, will be simulated and updated later
        networkPassphrase: networkConfig.networkPassphrase,
    })
        .addOperation(operation)
        .setTimeout(stellar_sdk_1.TimeoutInfinite)
        .build();
    return transaction;
};
exports.buildContractCallTransaction = buildContractCallTransaction;

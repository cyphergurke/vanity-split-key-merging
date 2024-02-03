import * as bitcoin from "bitcoinjs-lib";
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';

export const isValidKey = (key: string) => {
    // Check if the key starts with 5 or 3 and has 51 characters
    const condition1 = /^(5|3)[0-9a-zA-Z]{50}$/.test(key);
    // Check if the key starts with L or K and has 52 characters
    const condition2 = /^[LK][0-9a-zA-Z]{51}$/.test(key);
    // Check if the key is hex and has a length of 64 characters
    const condition3 = /^[0-9a-fA-F]{64}$/.test(key);
    return condition1 || condition2 || condition3;
};

export function isValidBitcoinAddress(address: string): boolean | undefined {
    try {
        // Attempt to parse the address using bitcoinjs-lib
        const decoded = bitcoin.address.fromBase58Check(address);
        // P2PKH and P2SH addresses
        if (decoded.version === bitcoin.networks.bitcoin.pubKeyHash || decoded.version === bitcoin.networks.bitcoin.scriptHash) {
            return true;
        }
        // Segregated Witness (SegWit) addresses (P2WPKH and P2WSH)
        const bech32Result = bitcoin.address.fromBech32(address);
        if (bech32Result) {
            return true;
        }
        // Taproot address
        bitcoin.initEccLib(ecc);
        const isBitcoin = !!bitcoin.address.toOutputScript(address, bitcoin.networks.bitcoin);
        if (isBitcoin) {
            return true;
        }
    } catch (error) {
        return false; // Invalid address or decoding error
    }
}
import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from 'ecpair';
import * as ecc from '@bitcoin-js/tiny-secp256k1-asmjs';
import bigInt, { BigInteger } from "big-integer";

const ECPair = ECPairFactory(ecc);

const orderOfEcc: BigInteger = bigInt('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141', 16);
const lambdaKey: BigInteger = bigInt('5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72', 16);
const lambdaKey2: BigInteger = bigInt('ac9c52b33fa3cf1f5ad9e3fd77ed9ba4a880b9fc8ec739c2e0cfc810b51283ce', 16);

function negateKey(key: BigInteger): BigInteger {
    return orderOfEcc.minus(key).mod(orderOfEcc);
}

export function getAddressFromKeyType(keyType: string, keyPair: any): string | undefined {
    switch (keyType) {
        case "1":
            return bitcoin.payments.p2pkh({
                pubkey: keyPair.publicKey, 
                network: bitcoin.networks.bitcoin
            }).address;
        case "3":
            return bitcoin.payments.p2sh({ 
                redeem: bitcoin.payments.p2wpkh({ 
                pubkey: keyPair.publicKey 
            }), 
            network: bitcoin.networks.bitcoin 
        }).address;
        case "b":
            return bitcoin.payments.p2wpkh({ 
                pubkey: keyPair.publicKey, 
                network: bitcoin.networks.bitcoin 
            }).address;
        default:
            return;
    }
}

function formatPrivateKey(privKey: string) {
    if (privKey.length === 51 || privKey.length === 52) {
        const ecPair = ECPair.fromWIF(privKey);
        if (!ecPair.privateKey) return;
        return bigInt(ecPair.privateKey.toString('hex'), 16);
    }
    // private hey format
    const hexPrivateKeyRegex = /^[0-9a-fA-F]+$/;
    const isHex = hexPrivateKeyRegex.test(privKey);
    if (isHex) {
        return bigInt(privKey, 16);
    }
}

function isPrivKeyInRange(key: BigInteger): boolean {
    return key.gt(0) && key.lt(orderOfEcc);
}

export function mergeKeys(addr: string, privKey: string, partialPrivKey: string): string | undefined {
    if (privKey === partialPrivKey) {
        throw new Error('Own private key and partial private key are the same');
    }

    const ownKey: BigInteger | undefined = formatPrivateKey(privKey);
    const partPrivKey: BigInteger | undefined = formatPrivateKey(partialPrivKey);
    if (!ownKey || !partPrivKey) {
        throw new Error('One of the Private Keys are invalid');
    }
    const keyPairs: BigInteger[] = [ownKey, partPrivKey];


    const operations = [
        (a: BigInteger, b: BigInteger) => a.add(b).mod(orderOfEcc),
        (a: BigInteger, b: BigInteger) => a.multiply(lambdaKey).mod(orderOfEcc).add(b).mod(orderOfEcc),
        (a: BigInteger, b: BigInteger) => a.multiply(lambdaKey2).mod(orderOfEcc).add(b).mod(orderOfEcc),
        (a: BigInteger, b: BigInteger) => negateKey(a).add(b).mod(orderOfEcc),
        (a: BigInteger, b: BigInteger) => a.multiply(lambdaKey).mod(orderOfEcc).negate().add(orderOfEcc).add(b).mod(orderOfEcc),
        (a: BigInteger, b: BigInteger) => a.multiply(lambdaKey2).mod(orderOfEcc).negate().add(orderOfEcc).add(b).mod(orderOfEcc)
    ];

    for (const op of operations) {
        for (const keyPair1 of keyPairs) {
            for (const keyPair2 of keyPairs) {
                const mergedPrivateKey: BigInteger = op(keyPair1, keyPair2);
                if (isPrivKeyInRange(mergedPrivateKey)) {
                    const privateKeyHex: string = mergedPrivateKey.toString(16).padStart(64, '0');
                    const privateKeyBuffer: Buffer = Buffer.from(privateKeyHex, 'hex');
                    const mergedKeyPair = ECPair.fromPrivateKey(privateKeyBuffer, { 
                        network: bitcoin.networks.bitcoin 
                    });
                    const address: string | undefined = getAddressFromKeyType(addr.charAt(0), mergedKeyPair);
                    if (addr === address) return mergedKeyPair.toWIF();
                }
            }
        }
    }
}

// For testing
/* 
 const vanity_address: string = '1btcxcVyqf8jfkscQmYPBGRurZQG8PMtb';
 const privKeyorg: string = 'KzNCSsMnhf34GBt91tSbgDAC2YKt6cuX2XDiRzZtC487koBUHh5N';
 const partialPrivKeyorg: string = 'Kyc35db3dauFrVLSDYWgmrqAQCEcPf1Xnkv9QbGWYboE3FkV7rMv';
 
 //expected private key: L53BPaiJWm3wJ4APYRzHo6sTUTYc76YY7Kx6ScyTBRkrYJ1My3S4

 mergeKeys(vanity_address, privKeyorg, partialPrivKeyorg);

 */
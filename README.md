# Vanity Address Split Key Merging Webapplication
Combines two Private Keys and returns a new private key that is the result of merging them. This application can be used to get the final Private key for a Split key generated Vanity Address.


## Features
- The merging tool can get any type of Bitcoin Privatekey and returns a final private key WIF-Compressed.

### Supports the following Bitcoin Mainnet address types:
- P2PKH (Pay to Public Key Hash) Legacy
- P2SH (Pay to Script Hash) Nested SegWit
- Bech32 Native SegWit

## Test Keys

 - const vanity_address: string = '1btcxcVyqf8jfkscQmYPBGRurZQG8PMtb';
 - const privKeyorg: string = 'KzNCSsMnhf34GBt91tSbgDAC2YKt6cuX2XDiRzZtC487koBUHh5N';
 - const partialPrivKeyorg: string = 'Kyc35db3dauFrVLSDYWgmrqAQCEcPf1Xnkv9QbGWYboE3FkV7rMv';
 
 - expected private key: L53BPaiJWm3wJ4APYRzHo6sTUTYc76YY7Kx6ScyTBRkrYJ1My3S4

 mergeKeys(vanity_address, privKeyorg, partialPrivKeyorg);



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```


# Todo: 
Create a pure client side application e.g. with react and use there the components Dialog.tsx and KeymergingComponent.tsx as well as the files from utils keyMerging.ts and validation.ts
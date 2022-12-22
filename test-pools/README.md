
## Quick Start Notes

1.  To start install

```bash
npx create-web3
```

2.  Run `yarn` or `npm install` to install all the dependencies
3.  Once installation is complete, `cd` into your app's directory and run `yarn chain` or `npm run chain` to start a local hardhat environment
4.  Open another terminal and `cd` into your app's directory
5.  Run `yarn deploy` or `npm run deploy` to deploy the example contract locally
6.  Run `yarn dev` or `npm run dev` to start your FrontEnd dev environment

## Project 
- static values until refreshed by user  (button to refresh)
`Backend`
- -  the button calls `fetchPriceFromOracle` : contract calls uniswap and razor network values to compute updated values on `public view prices[]`
- - use the oracle price from Razor network - `ETHUSD` 
- - get the price of the `ETHC-USDP` from europa hub 
`Frontend`
- show values in the UI 
- show the price with different input values (1, 10, 100 , 1000 usd)
- show slippage percentages 

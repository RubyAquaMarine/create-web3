require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: '../../.env' });

require('hardhat-deploy');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

const defaultNetwork = 'europa';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.8.10',

  defaultNetwork,

  networks: {
    localhost: {
      chainId: 31337,
    },

    /////////
    // L1 NETWORKS
    /////////

    // mainnet: {
    //   chainId: 1,
    //   url: `https://eth-mainnet.gateway.pokt.network/v1/lb/f0c06ca797ece1fe09dcdf75${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // },

    // L1 TEST NETWORKS
    goerli: {
      chainId: 5,
      url: `https://eth-goerli.gateway.pokt.network/v1/lb/${process.env.POLK_ID}`,
      accounts: [`${process.env.PRIVATE_KEY_MM}`],
    },
    // kovan: {
    //   chainId: 42,
    //   url: `https://eth-kovan.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://kovan.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // },

    /////////
    // L2 NETWORKS
    /////////

    // polygon: {
    //   chainId: 137,
    //   url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://polygon-mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // },

    // L2 TEST NETWORKS

    calypso: {
      chainId: 104734457,
      url: 'https://staging-v2.skalenodes.com/v1/actual-secret-cebalrai',
      accounts: [`${process.env.PRIVATE_KEY_MM}`],
      gas : 100000000
    },

    europa: {
      chainId:2255010950618556,
      url: 'https://staging-v2.skalenodes.com/v1/fancy-rasalhague',
      accounts: [`${process.env.PRIVATE_KEY_MM}`],
      gas : 100000000
    },

    // mumbai: {
    //   chainId: 80001,
    //   url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    //   url: `https://polygon-mumbai.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
    tokenOwner: 1,
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  },
};

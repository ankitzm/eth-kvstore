const INFURA_TOKEN = process.env.INFURA_TOKEN;
const MNEMONIC = process.env.MNEMONIC;
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          MNEMONIC,
          `https://ropsten.infura.io/${INFURA_TOKEN}`
        );
      },
      network_id: "3"
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(
          MNEMONIC,
          `https://rinkeby.infura.io/${INFURA_TOKEN}`
        );
      },
      network_id: "4"
    }
  }
};
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const fs = require('fs');
const path = require('path');

const ADDRESS_OUTPUT_FILENAME = process.env.ADDRESS_OUTPUT_FILENAME || 'ethkvstore.address.json';
const KVStore = artifacts.require('./KVStore.sol');

module.exports = async (deployer) => {
  const kvStore = await deployProxy(KVStore, { deployer });

  const fileContent = {
    address: kvStore.address,
  };

  try {
    fs.mkdirSync(path.dirname(ADDRESS_OUTPUT_FILENAME));
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }

  fs.writeFile(ADDRESS_OUTPUT_FILENAME, JSON.stringify(fileContent, null, 2), (err) => {
    if (err) {
      console.error(`unable to write address to output file: ${ADDRESS_OUTPUT_FILENAME}`);
      return;
    }

    console.log(`deployed kvstore address stored in ${ADDRESS_OUTPUT_FILENAME}`);
  });
};

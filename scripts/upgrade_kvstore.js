const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');
const fs = require('fs');
const path = require('path');

const ADDRESS_OUTPUT_FILENAME = process.env.ADDRESS_OUTPUT_FILENAME || 'ethkvstore.address.json';
const KVStore = artifacts.require('./KVStore.sol');

const getAccounts = async () => {
  return web3.eth.getAccounts()
}

module.exports = async (callback) => {
  try {
    rawData = fs.readFileSync(path.join(__dirname, '..', ADDRESS_OUTPUT_FILENAME));
    const data = JSON.parse(rawData)

    if (!data || !data.address)
      throw new Error('Proxy address does not exists');
    
    const [deployer] = await getAccounts();
    
    const upgraded = await upgradeProxy(data.address, KVStore, { deployer: deployer.address })
    console.log('Upgraded proxy is done: ', upgraded.address)
  } catch (err) {
    console.log(err)
  }

  callback()
};
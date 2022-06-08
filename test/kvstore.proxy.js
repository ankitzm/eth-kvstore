const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');

const MockKVStore = artifacts.require('MockKVStore');
const MockKVStoreV2 = artifacts.require('MockKVStoreV2.sol');

contract('KVStore', async ([user1, user2]) => {
  describe('deploy KVStore proxy', () => {
    let kvStore;

    beforeEach(async () => {
      kvStore = await deployProxy(MockKVStore);
    });

    it('retrieve returns the correct version of implementation', async () => {
      assert.equal(await kvStore.version(), 'V1');
    });

    it('retrieve returns the correct set value', async () => {
      await kvStore.set('key', 'value', { from: user1 });

      const value = await kvStore.get(user1, 'key');
      assert.equal(value, 'value');
    });
  });

  describe('upgrade KVStore proxy', () => {
    let kvStoreUpgraded;

    beforeEach(async () => {
      const kvStore = await deployProxy(MockKVStore);
      await kvStore.set('key', 'value', { from: user1 });

      kvStoreUpgraded = await upgradeProxy(kvStore.address, MockKVStoreV2);
    });

    it('retrieve returns the correct version of implementation', async () => {
      assert.equal(await kvStoreUpgraded.version(), 'V2');
    });

    it('retrieve returns the correct value previously set', async () => {
      assert.equal(await kvStoreUpgraded.get(user1, 'key'), 'value');
    });

    it('retrieve returns the correct set value for upgraded contract', async () => {
      await kvStoreUpgraded.set('newKey', 'newValue', {
        from: user2,
      });

      assert.equal(await kvStoreUpgraded.get(user2, 'newKey'), 'newValue');
    });

    it('retrieve returns the correct set value for the new updated property contract', async () => {
      await kvStoreUpgraded.updateValue(999, {
        from: user2,
      });

      assert.equal(await kvStoreUpgraded.value(), 999);
    });
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract MockKVStore {
    uint constant private MAX_STRING_LENGTH = 1000;
    mapping(address => mapping(string => string)) private store;

    function get(address _account, string memory _key) public view returns(string memory) {
        return store[_account][_key];
    }

    function set(string memory _key, string memory _value) public {
        require(bytes(_key).length <= MAX_STRING_LENGTH && bytes(_value).length <= MAX_STRING_LENGTH, "Maximum string length");
        store[msg.sender][_key] = _value;
    }

    function version() public pure virtual returns (string memory) {
        return "V1";
    }
}

contract MockKVStoreV2 is MockKVStore {
    uint256 public value;
    
    function updateValue(uint256 _value) public {
        value = _value;
    }

    function version() public pure override returns (string memory) {
        return "V2";
    }
}
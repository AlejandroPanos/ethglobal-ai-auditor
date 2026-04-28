export const EXAMPLE_CONTRACT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 private value;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function setValue(uint256 _value) public {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}`;

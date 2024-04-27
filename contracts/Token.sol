//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    // Track Balances
    mapping(address => uint256) public balanceOf;

    // Send Tokens


    constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = (_totalSupply * (10**decimals));
        balanceOf[msg.sender] = totalSupply;
    }

    // function balanceOf(address _owner) public view returns (uint256 balance) {

    // }

    function transfer(address _to, uint256 _value) public returns (bool success) {

    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {

    }





}


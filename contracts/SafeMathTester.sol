// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract SafeMatherTeseter {
    uint8 public bignumber = 255;

    function add() public {
        bignumber = bignumber +1;
    }
}
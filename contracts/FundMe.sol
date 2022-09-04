// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.8;

import "./PriceConverter.sol";

contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 1 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded; 

    function fund() public payable {
        require(msg.value.getConversionRate() >= minimumUsd, "Not enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
        // msg.value has 18 decimals.
    }

    function withdraw() public {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        funders = new address[](0);
    }
}

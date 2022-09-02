// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe {

    uint256 public minimumUsd = 1 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded; 

    function fund() public payable {
        require(getConversionRate(msg.value) >= minimumUsd, "Not enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
        // msg.value has 18 decimals.
    }

    function getPrice() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        (,int price,,,) = priceFeed.latestRoundData();
        // price only has 8 decimals. Increase by 10 to maake 18.
        return uint256(price * 1e10);
    }

    function getVersion() public view returns (uint256)  {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
        return priceFeed.version();
    }

    function getConversionRate(uint256 ethAmount) public view returns(uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
        return ethAmountInUsd;
    } 
}

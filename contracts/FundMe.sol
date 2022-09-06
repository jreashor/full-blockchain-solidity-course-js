// SPDX-License-Identifier: MIT
pragma solidity ^ 0.8.8;

import "./PriceConverter.sol";

error notOwner(); 

contract FundMe {
    using PriceConverter for uint256;

    uint256 public constant MINIUM_USD = 1 * 1e18;

    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public immutable i_owner;

    constructor() {
        i_owner = msg.sender; 
    }

    function fund() public payable {
        require(msg.value.getConversionRate() >= MINIUM_USD, "Not enough!");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] = msg.value;
        // msg.value has 18 decimals.
    }

    function withdraw() public onlyOwner {
        for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            addressToAmountFunded[funder] = 0;
        }

        // Reset funders array.
        funders = new address[](0);

        // Transer.
        // payable(msg.sender).transfer(address(this).balance);

        // Send. 
        // bool sendSucces = payable(msg.sender).send(address(this).balance);
        // require(sendSucces, "Send failed");

        // Call. 
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner {
        // require(msg.sender == i_owner, "You're not the owner!");
        // Custom error with revert uses less gass since no message string is saved.
        if (msg.sender != i_owner) { revert notOwner(); }
        _; // This is the method's code.
    }

    receive() external payable {
        fund();
    }

    fallback() external payable {
        fund();
    }
}

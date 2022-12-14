const { assert } = require("chai");
const { getNamedAccounts, ethers, network } = require("hardhat");
const { devChains } = require("../../helper-hardhat-config");

devChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe;
          let deployer;
          const sendValue = ethers.utils.parseEther("0.02");
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("Allows people to fund and withdraw.", async function () {
              const fundTxResponse = await fundMe.fund({ value: sendValue });
              await fundTxResponse.wait(1);
              const withdrawTxResponse = await fundMe.withdraw();
              await withdrawTxResponse.wait(1);
              const endBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(endBalance.toString(), "0");
          });
      });

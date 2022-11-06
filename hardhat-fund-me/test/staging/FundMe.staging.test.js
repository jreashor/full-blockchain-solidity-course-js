const { assert } = require("chai");
const { getNamedAccounts, ethers, network } = require("hardhat");
const { devChains } = require("../../helper-hardhat-config");

devChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe;
          let deployer;
          const sendValue = ethers.utils.parseEther("1");
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              await ethers.getContract("FundMe", deployer);
          });

          it("Allows people to fund and withdraw.", async function () {
              await fundMe.fundMe({ value: sendValue });
              await fundMe.withdraw();
              const endBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(endBalance.toString(), "0");
          });
      });

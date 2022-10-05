const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage;
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
        // expect(currentValue.toString()).to.equal(expectedValue);
    });

    it("Should update when we call store", async function () {
        const expectedValue = "7";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);

        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });

    it("Should update nameToFavouriteNumber when we add a person", async function () {
        const expectedName = "Wayne";
        const expectedFavouriteNumber = "99";
        const transactionResponse = await simpleStorage.addPerson(
            expectedName,
            expectedFavouriteNumber
        );
        await transactionResponse.wait(1);

        const currentFavouriteNumber =
            await simpleStorage.nameToFavouriteNumber(expectedName);
        assert.equal(
            currentFavouriteNumber.toString(),
            expectedFavouriteNumber
        );
    });
});

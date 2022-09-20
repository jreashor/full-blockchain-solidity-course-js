const { ethers } = require("hardhat");

async function main() {
    const SimpleStoreFactory = await ethers.getContractFactory("SimpleStore");
    console.log("Deploying...");
    const SimpleStorage = await SimpleStoreFactory.deploy();
    await SimpleStorage.deployed();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });

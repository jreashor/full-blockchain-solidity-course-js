const { ethers } = require("hardhat");

async function main() {
    const SimpleStoreFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying...");
    const SimpleStorage = await SimpleStoreFactory.deploy();
    await SimpleStorage.deployed();
    console.log(`Deployed contract to ${SimpleStorage.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });

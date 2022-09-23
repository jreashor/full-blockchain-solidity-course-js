const { ethers, run, network } = require("hardhat");

async function main() {
    const SimpleStoreFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying...");
    const SimpleStorage = await SimpleStoreFactory.deploy();
    await SimpleStorage.deployed();
    console.log(`Deployed contract to ${SimpleStorage.address}`);

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block transaction...");
        await SimpleStorage.deployTransaction.wait(6);
        await verify(SimpleStorage.address, []);
    }

    const currentValue = await SimpleStorage.retrieve();
    console.log(`Current value is ${currentValue}`);

    const transactionResponse = await SimpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await SimpleStorage.retrieve();
    console.log(`Update value is ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgs: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!");
        } else {
            console.log(error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });

// async function deployFunc() {
//     console.log("Hello World...");
// }

const { network } = require("hardhat");
const { networkConfg } = require("../helper-hardhat-config");

// module.exports.default = deployFunc;

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre;
// };

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    const ethUsdPriceFeedAddres = networkConfg[chainId]["ethUsdPriceFeed"];

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [address],
        log: true,
    });
};

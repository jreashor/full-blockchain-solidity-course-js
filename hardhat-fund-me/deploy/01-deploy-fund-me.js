// async function deployFunc() {
//     console.log("Hello World...");
// }

const { network } = require("hardhat");
const { networkConfg, devChains } = require("../helper-hardhat-config");

// module.exports.default = deployFunc;

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre;
// };

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    let ethUsdPriceFeedAddres;
    if (devChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddres = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddres = networkConfg[chainId]["ethUsdPriceFeed"];
    }

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddres],
        log: true,
    });

    log("FundMe deployed.");
    log("--------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];

// async function deployFunc() {
//     console.log("Hello World...");
// }

const { networks } = require("../hardhat.config");

// module.exports.default = deployFunc;

// module.exports = async (hre) => {
//     const { getNamedAccounts, deployments } = hre;
// };

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
};

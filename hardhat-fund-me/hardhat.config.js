require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("hardhat-gas-reporter");
require("solidity-coverage");

const ETH_GOERLI = process.env.ETH_GOERLI;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        compilers: [{ version: "0.7.0" }, { version: "0.8.9" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        local: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
        goerli: {
            url: ETH_GOERLI,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            gas: 3000000,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "CAD",
        // coinmarketcap: COINMARKETCAP_API_KEY,
        // token: "MATIC",
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
};

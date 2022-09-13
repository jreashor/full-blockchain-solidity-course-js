const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "7d66e41f5b907ee5381a159c06a21a8e362c1c7b267094498570c98d77a9e63a",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying...");
  const contract = await contractFactory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log("Deployment Transaction (Transaction response)");
  console.log(contract.deployTransaction);
  console.log("Transaction Receipt");
  console.log(transactionReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

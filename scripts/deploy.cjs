const hre = require("hardhat");

async function main() {
  const Vote = await hre.ethers.getContractFactory("Vote");
  const vote = await Vote.deploy();

  await vote.waitForDeployment();

  console.log("Vote contract deployed to:", vote.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

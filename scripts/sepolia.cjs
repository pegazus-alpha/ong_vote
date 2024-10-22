async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // const balance = await deployer.getBalance(deployer.address);
    // console.log("Account balance:", balance.toString());
  
    const MyContract = await ethers.getContractFactory("Vote");
    const myContract = await MyContract.deploy();
    await myContract.waitForDeployment();
  
    console.log("Contract deployed to address:", myContract.target);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
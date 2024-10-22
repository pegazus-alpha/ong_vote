
require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
// require("@nomiclabs/hardhat-waffle");


module.exports = {
  solidity: "0.8.24",
  paths:{
    artifacts: './src/artifacts',
  },
  networks:{
    hardhat: {
      chainId:1337
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/940caf0c6a23494e95083fac06b87289", // Remplace avec ton Infura Project ID
      accounts: ["0x6697e3d2c05dfb7718b9e560edb8c1e52604de9f5981a942d10b79b91a9cc9ad"] // Remplace avec la clé privée de ton compte MetaMask
    },
  }
};

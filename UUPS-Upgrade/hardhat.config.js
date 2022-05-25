require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {},
    development: {
      url: "http://127.0.0.1:8545",
      accounts: [

      ],
      chainId: 1,
      gas: 2100000,
      gasPrice: 8000000000,
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/gtu_KQm0m4TA9Q6-_f00G3n83Hqb_eF0",
      accounts: [

      ],
      chainId: 80001,
      gas: 2100000,
      gasPrice: 8000000000,
    },

    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: {
        mnemonic: "symptom bean awful husband dice accident crush tank sun notice club creek",
      },
      // chainId: 1234,
    }
  }
};

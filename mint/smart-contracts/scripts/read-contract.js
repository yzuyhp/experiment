const { config } = require("chai")

const MyContract = artifacts.require('CodeWithJoe')

module.exports = async callback => {
  let accounts = await web3.eth.getAccounts()
  console.log("accounts: ", accounts);

  const mc = await MyContract.deployed();
  console.log("contract address: ", mc.address);

  const balance = await mc.balanceOf(accounts[0]);
  //const data = await mc.data.call()
  //callback(data)
  console.log("balance: ", BigInt(balance.toString()));

  const to = "0xff93B45308FD417dF303D6515aB04D9e89a750Ca";
  let result = await mc.mint(to, BigInt(20 * 10 ** 18));
  console.log("result: ", result);

  callback();
}

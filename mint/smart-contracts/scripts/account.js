var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.251:8545"));
//web3.eth.getAccounts().then(console.log);

//import artifact from "../smart-contracts/build/contracts/Counter.json";
var artifact = require("../build/contracts/CodeWithJoe.json");
//const privateKey = "057f3b62db2a93306df49df251e6bd7d71a701d8cc1ea3fd284b925ccd0ad142";
const privateKey = "000000000000000000000000000000000000000000000000000000616c696365";

const setup = async () => {
  const web3 = new Web3("http://192.168.124.251:8545");
  //const web3 = new Web3("https://ropsten.infura.io/v3/e81e5b92311249e08c0a30e1bd7b95fa");
  const account = await web3.eth.accounts.wallet.add(privateKey);
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const contractAddress = artifact.networks[networkId].address;
  console.log("contract address: ", contractAddress)
  console.log("account address: ", account.address)

  // instantiate contract instance and assign to component ref variable
  const myContract = new web3.eth.Contract(artifact.abi, contractAddress, {
   //from: accounts[0],
   from: account.address,
   gasLimit: 100000,
  });
  var balance = await myContract.methods.balanceOf(account.address).call();
  console.log("before mint, balance: ", balance);

  await myContract.methods.mint(account.address, 10000).send();

  balance = await myContract.methods.balanceOf(account.address).call();
  console.log("after mint, balance: ", balance);

  //	var newCount = await myContract.methods.getCount().call();
 	//console.log("newCount: ", newCount);

	//await myContract.methods.increment().send();
	//newCount = await myContract.methods.getCount().call();
	//console.log("newCount: ", newCount);
};
setup();

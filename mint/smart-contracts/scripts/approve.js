var Web3 = require('web3');
//var web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.124.251:8545"));
//web3.eth.getAccounts().then(console.log);

//import artifact from "../smart-contracts/build/contracts/Counter.json";
var artifact = require("../build/contracts/CodeWithJoe.json");
//const privateKey = "057f3b62db2a93306df49df251e6bd7d71a701d8cc1ea3fd284b925ccd0ad142";
const privateKey = "0x5bbad03cdb330c875b30307a1353b0cba65007d1d06f161cd6786992c008db18";//redeemer 0x57b83cFF1CDf9bd28265142e9B4814514631215E

const approve = async () => {
  const web3 = new Web3("https://polygon-mumbai.g.alchemy.com/v2/gtu_KQm0m4TA9Q6-_f00G3n83Hqb_eF0");
  //const web3 = new Web3("https://ropsten.infura.io/v3/e81e5b92311249e08c0a30e1bd7b95fa");
  const account = await web3.eth.accounts.wallet.add(privateKey);
  //const accounts = await web3.eth.getAccounts();
  //const networkId = await web3.eth.net.getId();
  //const contractAddress = artifact.networks[networkId].address;
  //console.log("contract address: ", contractAddress)
  //console.log("account address: ", account.address)
//
  // instantiate contract instance and assign to component ref variable
  const contractAddress = "0xb2EEf957b1F60A3E78539eB2d567B59eBF1B0a3f";
  const cwj = new web3.eth.Contract(artifact.abi, contractAddress, {
   //from: accounts[0],
   from: account.address,
   gasLimit: 100000,
  });
  var startingcwj = await cwj.methods.balanceOf(account.address).call();
  console.log("redeemer cwj balance: ", startingcwj);
//
  //await myContract.methods.mint(account.address, 10000).send();
//
  //balance = await myContract.methods.balanceOf(account.address).call();
  //console.log("after mint, balance: ", balance);

  const nft_contract_address = "0xf8746aAb8bE821E71f79374c885Bb41eA066f077";

  await cwj.methods.approve(nft_contract_address, startingcwj).send();

};
approve();

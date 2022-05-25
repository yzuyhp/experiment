// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { LazyMinter } = require('../lib')

//async function deploy() {
//  const [minter, redeemer, _] = await ethers.getSigners()
//
//  let factory = await ethers.getContractFactory("LazyNFT", minter)
//  const contract = await factory.deploy(minter.address)
//  console.log("contract address: ", contract.address)
//
//  // the redeemerContract is an instance of the contract that's wired up to the redeemer's signing key
//  const redeemerFactory = factory.connect(redeemer)
//  const redeemerContract = redeemerFactory.attach(contract.address)
//
//  return {
//    minter,
//    redeemer,
//    contract,
//    redeemerContract,
//  }
//}

async function deploy() {
  const [minter, redeemer, _] = await ethers.getSigners()

  const contract_addr = '0xf8746aAb8bE821E71f79374c885Bb41eA066f077'
  let factory = await ethers.getContractFactory("LazyNFT", minter)
  const contract = await factory.attach(contract_addr)
  //console.log("------ contract: ", contract)

  // the redeemerContract is an instance of the contract that's wired up to the redeemer's signing key
  const redeemerFactory = factory.connect(redeemer)
  const redeemerContract = redeemerFactory.attach(contract_addr)

  return {
    minter,
    redeemer,
    contract,
    redeemerContract,
  }
}

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const { contract, redeemerContract, redeemer, minter } = await deploy()

  const lazyMinter = new LazyMinter({ contract, signer: minter })
  //const voucher = await lazyMinter.createVoucher(1, "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", BigInt(10 ** 18))
  const voucher = await lazyMinter.createVoucher(1, "ipfs://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi", 100)
  //console.log("minPrice: ", voucher.minPrice);
  await contract.setApprovalForAll(redeemer.address, true);
  await redeemerContract.redeem(redeemer.address, voucher);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

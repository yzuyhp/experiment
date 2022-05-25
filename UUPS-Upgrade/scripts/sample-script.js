// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { upgrades,ethers} = require("hardhat");

async function main() {
  Moon = await ethers.getContractFactory("MoonToken")
  MoonV2 = await ethers.getContractFactory("MoonTokenV2")

  const moon = await upgrades.deployProxy(Moon,{kind:"uups"})
  console.log("moon.name(): ", await moon.name());
  console.log("proxy address: ", moon.address)

  const moonV2 = await upgrades.upgradeProxy(moon, MoonV2, {kind:"uups"});
  await moonV2.changeSym();
  console.log("moonV2.name(): ", await moonV2.name());
  console.log("proxy address: ", moonV2.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

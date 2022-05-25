const { expect } = require("chai");
const { upgrades,ethers} = require("hardhat");
const hre = require("hardhat")
before("get factories",async function(){
  this.Moon = await ethers.getContractFactory("MoonToken")
  this.MoonV2 = await ethers.getContractFactory("MoonTokenV2")
})
// describe("Non Upradable Token Deployment", function () {
//   it("Should deploy the moon token", async function () {

//     const moon = await this.Moon.deploy();
//     await moon.deployed();

//     expect(await moon.name()).to.equal("MoonToken");
//     expect(await moon.symbol()).to.equal("CHANDRA");


//   });


//The below code deploys in the transparent proxy mode.

  // describe("Upgradable token deploymnet",function(){
  //   it("should deploy the upgradable moon token",async function(){
  //     const proxyMoon = await upgrades.deployProxy(this.Moon)
  //     // expect(await moon.name()).to.equal("MoonToken");
  //     // console.log(moon.attach)
  //     // const moon = this.Moon.attach(proxyMoon.address)
  //     expect(await proxyMoon.name()).to.equal("MoonToken");
  //   })
  // })



  describe("Upgradable token deploymnet",function(){
    it("should deploy the upgradable moon token",async function(){
      const moon = await upgrades.deployProxy(this.Moon,{kind:"uups"})
      // expect(await moon.name()).to.equal("MoonToken");
      // console.log(moon.attach)
      // const moon = this.Moon.attach(proxyMoon.address)
      console.log("moon.name(): ", await moon.name());
      expect(await moon.name()).to.equal("MoonToken");

      const moonV2 = await upgrades.upgradeProxy(moon, this.MoonV2, {kind:"uups"});
      console.log("moonV2.name(): ", await moonV2.name());

      expect(await moonV2.version()).to.equal("Version2");
      //expect(await moonV2.symbol()).to.equal("Version2");

      //const smartContract = await this.MoonV2.deploy();
      //await smartContract.initialize();
      //console.log("moonV2.name(): ", await smartContract.name());
//
      //const moonV2 = await upgrades.upgradeProxy(moon, smartContract);
      //console.log("moonV2.name(): ", await moonV2.name());
    })

  })

  // describe("Upgrading the token",function(){
  //   it("should upgrade the token",async function(){
  //     const proxyMoon = await ethers.getContractAt()
  //   })
  // })



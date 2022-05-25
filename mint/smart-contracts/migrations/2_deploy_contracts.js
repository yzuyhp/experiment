const MyToken = artifacts.require("CodeWithJoe");

module.exports = function(deployer) {
  deployer.deploy(MyToken);
};

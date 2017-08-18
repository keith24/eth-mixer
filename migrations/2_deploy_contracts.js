var mixer = artifacts.require("./mixer.sol");

module.exports = function(deployer) {
  deployer.deploy(mixer);
};

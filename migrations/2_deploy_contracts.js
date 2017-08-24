const mixer = artifacts.require("Mixer");

module.exports = function(deployer) {
  deployer.deploy(mixer);
};

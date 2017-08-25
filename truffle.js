module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: process.env.PORT || 8545,
      network_id: "*" // Match any network id
    }
  }
};

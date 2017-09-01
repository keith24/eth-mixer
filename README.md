# eth-mixer
###### [Keith Irwin](https://keithirwin.us/)

Just a simple [mixer](https://en.wikipedia.org/wiki/Cryptocurrency_tumbler) for ether to learn about smart contracting.  Users can deposit ether into the contract using `deposit()`, and withdraw the funds to a different address using `withdraw()`.  

As of right now, this contract is mostly pointless because all these transactions are recorded on the blockchain.  Thus, this mixer doesn't actually anonymize its users.  

## Installation

If you don't already have [truffle](https://github.com/trufflesuite/truffle) installed: 

```sh
sudo npm i -g truffle
```

Clone the repo
```sh
git clone https://github.com/keith24/eth-mixer.git
cd eth-mixer.git
```

## Running Tests

You need to have `testrpc` running (see below).  

```sh
truffle test
```

## Usage

You may want to experiment with [testrpc](https://github.com/ethereumjs/testrpc) since this is alpha software.  

```sh
sudo npm i -g ethereumjs-testrpc &&\
testrpc
```

Once you're ready to deploy: 

```sh
truffle compile
truffle migration
```

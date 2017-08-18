# eth-mixer
###### [Keith Irwin](https://keithirwin.us/)

Just a simple mixer for ether to learn about smart contracting

## Installation

If you don't already have [truffle](https://github.com/trufflesuite/truffle) installed: 

```sh
sudo npm i -g truffle
```

You may want to experiment with [testrpc](https://github.com/ethereumjs/testrpc) since this is alpha software.  

```sh
sudo npm i -g testrpc &&\
testrpc
```

Once you're ready to deploy: 

```sh
git clone https://github.com/keith24/eth-mixer.git &&\
cd mixer &&\
truffle compile &&\
truffle migration
```

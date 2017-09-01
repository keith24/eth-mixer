const Mixer = artifacts.require('Mixer');

// Aliases for web3 functions
function getBalance(address) {
	return web3.eth.getBalance(address);
}
function toEth(wei) {
	return web3.fromWei(wei,'ether');
}
function toWei(eth) {
	return web3.toWei(eth,'ether');
}

contract('Mixer', (accounts)=>{
		var meta, 
			accountInitial, contractInitial, userBalanceInitial,
			accountFinal, contractFinal, userBalanceFinal;
	
	const depositAmount = 10,
		withdrawAmount = 5;

	it(`should let the first account deposit ${depositAmount} eth`, ()=>{
		return Mixer.deployed().then( (instance)=>{
			meta = instance;
			
			// Check initial balances
			accountInitial = toEth(getBalance(accounts[1]));
			contractInitial = toEth(getBalance(meta.address));
			return meta.showUserBalance.call(accounts[1]);
		}).then( (userBalance)=>{
			userBalanceInitial = toEth(userBalance);
			
			// Perform deposit
			return meta.deposit({
				from:accounts[1], 
				value:toWei(depositAmount)
			});
		}).then( ()=>{
			
			// Check final balances
			accountFinal = toEth(getBalance(accounts[1]));
			contractFinal = toEth(getBalance(meta.address));
			return meta.showUserBalance.call(accounts[1]);
		}).then( (userBalance)=>{
			userBalanceFinal = toEth(userBalance);
			
			// Check assertions
			assert.equal(userBalanceFinal-userBalanceInitial, depositAmount, 
				`User balance didn't increase by ${depositAmount}, but went from ${userBalanceInitial} to ${userBalanceFinal}`);
			assert.equal(contractFinal-contractInitial, depositAmount, 
				`Contract balance didn't increase by ${depositAmount} eth, but went from ${contractInitial} to ${contractFinal}`);
			//TODO: Account for spent gas
			//assert.equal(accountInitial-accountFinal, depositAmount, 
			//	`Account one balance didn't decrease by ${depositAmount} eth, but went from ${accountInitial} to ${accountFinal}`);
		});
		
	});
	
	it(`should not let the second account withdraw ${withdrawAmount} eth to the third`, ()=>{
		return Mixer.deployed().then( (instance)=>{
			meta = instance;
			
			// Check initial balances
			accountInitial = toEth(getBalance(accounts[3]));
			contractInitial = toEth(getBalance(meta.address));
			return meta.showUserBalance.call(accounts[1]);
		}).then( (userBalance)=>{
			userBalanceInitial = toEth(userBalance);
			
			// Attempt withdraw and check for failure
			return meta.withdraw(
				accounts[3], 
				toWei(withdrawAmount), 
				{from:accounts[2]}
			);
		}).then(assert.fail).catch( (err)=>{
			assert(err.message.indexOf(
				"invalid opcode")>=0,
				"Didn't ensure the user has deposited that much funds"
			)
		}).then( ()=>{
			
			// Check final balances
			accountFinal = toEth(getBalance(accounts[3]));
			contractFinal = toEth(getBalance(meta.address));
			return meta.showUserBalance.call(accounts[1]);
		}).then( (userBalance)=>{
			userBalanceFinal = toEth(userBalance);
			
			// Check assertions
			assert.equal( accountInitial-accountFinal, 0,
				`Account three balance changed from ${accountInitial} to ${accountFinal}, indicating possible unauthorized withdrawl`);
			assert.equal( userBalanceInitial-userBalanceFinal, 0, 
				`User balance for account one changed from ${userBalanceInitial} to ${userBalanceFinal}, indicating possible unauthorized withdrawl`);
			assert.equal (contractInitial-contractFinal, 0, 
				`Contract balance changed from ${contractInitial} to ${contractFinal}, indicating possible unauthorized withdrawl`);
		});
		
	});
	
	it(`should let the first account withdraw ${withdrawAmount} eth to the third`, ()=>{
		return Mixer.deployed().then( (instance)=>{
			meta = instance;
			
			// Check initial balances
			accountInitial = toEth(getBalance(accounts[3]));
			contractInitial = toEth(getBalance(meta.address));
			return meta.showUserBalance.call(accounts[1]);
		}).then( (userBalance)=>{
			userBalanceInitial = toEth(userBalance);
			
			// Attempt withdraw
			return meta.withdraw(
				accounts[3], 
				toWei(withdrawAmount), 
				{ from: accounts[1] }
			);
		})
		.then( (result)=>{
			
			// Check final balances
			accountFinal = toEth(getBalance(accounts[3]));
			contractFinal = toEth(getBalance(meta.address));
			return meta.showUserBalance.call(accounts[1]);
		}).then( (userBalance)=>{
			userBalanceFinal = toEth(userBalance);
			
			assert.equal( contractInitial-contractFinal, withdrawAmount, 
				`Contract balance didn't decrease by ${withdrawAmount} eth, but went from ${contractInitial} to ${contractFinal}`);
			assert.equal( userBalanceInitial-userBalanceFinal, withdrawAmount, 
				`User balance for account one didn't decrease by ${withdrawAmount}, but went from ${userBalanceInitial} to ${userBalanceFinal}`);
			assert.equal( accountFinal-accountInitial, withdrawAmount, 
				`Account three balance didn't increase by ${withdrawAmount} eth, but went from ${accountInitial} to ${accountFinal}`);
		});
	});

});

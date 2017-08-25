var Mixer = artifacts.require('Mixer');

contract('Mixer', (accounts)=>{

	it("should deposit eth from first account", ()=>{
		var instance;
		return Mixer.deployed().then( (instance)=>{
			meta = instance;
			// Check inital balance
			return meta.balance.call();
		}).then( (balance)=>{
			assert.equal(balance, 0, "Balance didn't initiate at 0");
			// Perform deposit
			return meta.deposit({from:accounts[0], value:10});
		}).then( ()=>{
			// Check final balance
			return meta.balance.call();
		}).then( (balance)=>{
			assert.equal(balance.toNumber(), 10, "Balance didn't increase to 10");
		});
	});
	
	it("should not let the second account withdraw to the third", ()=>{
		var meta;
		return Mixer.deployed().then( (instance)=>{
			meta = instance;
			// Attempt withdraw
			return meta.withdraw.call(accounts[2], 5, {from:accounts[1]});
		}).then( ()=>{
			// Check balance again
			return meta.balance.call();
		}).then( (balance)=>{
			assert.equal(balance.toNumber(), 10, "Unauthorized account withdrew some funds");
		});
	});
	
	it("should let the first account withdraw eth to the third", ()=>{
		var meta;
		return Mixer.deployed().then( (instance)=>{
			meta = instance;
			// Attempt withdraw
			return meta.withdraw.call(accounts[2], 5, {from:accounts[0]});
		}).then( ()=>{
			// Check balance again
			return meta.balance.call();
		}).then( (balance)=>{
			assert.equal(balance.toNumber(), 5, "Unable to withdraw funds");
		});
	});

});	

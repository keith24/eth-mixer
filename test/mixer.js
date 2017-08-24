var Mixer = artifacts.require('Mixer');

contract('Mixer', (accounts)=>{

	it("should receive eth", ()=>{
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

});	

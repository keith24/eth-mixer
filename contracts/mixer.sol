pragma solidity ^0.4.11;

/// @title Mix your ether.
contract Mixer {
	
	/// Total amount of ether in the mixer
	uint public total;
	
	/// Users of the mixer, and the amount deposited
	mapping(address => uint) balances;
	
	/// Event that will fire when the balance changes
	event total_changed(uint newTotal);

	/// Deposit ether into the mixer
	function deposit() payable {
		
		/// Add deposit to mixer
		balances[msg.sender] += msg.value;
		
		/// Increase total value of mixer
		total += msg.value;
		
		/// Notify about change to balance
		total_changed(total);
		
	}
	
	/// Withdraw ether from the mixer
	function withdraw(address output, uint amount) {
		
		/// Ensure the user has deposited that much
		require(amount <= balances[msg.sender]);
		
		// Subtract from that user's balance
		balances[msg.sender] -= amount;
		
		// Subtract from mixer balance
		total -= amount;
		
		// Notify about the change
		total_changed(total);
		
		// Pay the user's new address
		output.transfer(amount);
		
	}
	
}

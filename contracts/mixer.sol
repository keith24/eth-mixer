pragma solidity ^0.4.11;

/// @title Mix your ether.
contract Mixer {
    
    /// Total amount of ether in the mixer
    uint public balance;
    
    /// Users of the mixer, and the amount deposited
    mapping(address => uint) users;
    
    /// Event that will fire when the balance changes
    event balance_changed(uint newBalance);
    
    /// Deposit ether into the mixer
    function deposit() payable {
        
        /// Add deposit to mixer
        users[msg.sender] += msg.value;
        
        /// Increase total value of mixer
        balance += msg.value;
        
        /// Notify about change to balance
        balance_changed(balance);
    }
    
    /// Withdraw ether from the mixer
    function withdraw(address output, uint amount) {
        
        /// Ensure the user has deposited that much
        assert(amount > users[msg.sender]);
        
        // Subtract from that user's balance
        users[msg.sender] -= amount;
        
        // Subtract from mixer balance
        balance -= amount;
        
        // Notify about the change
        balance_changed(balance);
        
        // Pay the user's new address
        output.transfer(amount);
        
    }
    
}

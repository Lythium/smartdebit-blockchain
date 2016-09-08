contract smartdebit {
    
    struct Account {
        address beneficiary;
        uint fee;
        uint period;
        uint deadline;
        bool exists;
    }
    
    mapping (address => Account) private accountsMapping;
    // Mapping from account address to its index in the address array. Used to delete.
    mapping (address => uint) private addressIndices;
    address[] private accountAddresses; // All direct debit account addresses
    address private contractOwner; // Who owns a contract
    
    function smartdebit() {
        contractOwner = msg.sender;
    }
    
    modifier isOwner() {
        if (msg.sender != contractOwner) {
            throw;
        }
        _
    }
    
    function createDirectDebit(address beneficiary, uint fee, uint period) isOwner {
        if (accountsMapping[beneficiary].exists == true) {
            throw; // Account already has a direct debit setup against it
        }
        
        var acc = Account(beneficiary, fee, period, period+now, true);
        accountsMapping[beneficiary] = acc;
        
        accountAddresses.push(beneficiary);
        addressIndices[beneficiary] = accountAddresses.length+1;
    }
    
    function getDirectDebit(address beneficiary) isOwner returns (uint fee, uint period) {
        if (accountsMapping[beneficiary].exists != true) {
            throw;
        }
        
        fee = accountsMapping[beneficiary].fee;
        period = accountsMapping[beneficiary].period;
    }
    
    function getAllDirectDebits() isOwner returns (address[] addresses) {
      addresses = accountAddresses;
    }
    
    function changeDirectDebit(address beneficiary, uint newAmount) isOwner {
        accountsMapping[beneficiary].fee = newAmount;
    }
    
    function deleteDirectDebit(address beneficiary) isOwner {
        if (accountsMapping[beneficiary].exists != true) {
            throw;
        }
        
        delete accountsMapping[beneficiary];
        var index = addressIndices[beneficiary]; // Getting index of the beneficiary in the address array
        delete accountAddresses[index];
    }
    
    function withdrawMoney(uint amount) isOwner returns (bool val) {
        address sender = msg.sender;
        val = sender.send(amount);
    }
    
    function pay() returns (uint count){
        uint successes = 0;
        for(uint i=0; i<accountAddresses.length; i++){
            Account account = accountsMapping[accountAddresses[i]];
            if(account.deadline < now){
                if(account.beneficiary.send(account.fee)) successes += 1;
                account.deadline = account.deadline + account.period;
            }
        }
        return successes;
    }
}

contract exec_me{
	function exec(address smartdebitAddress){
		smartdebit sd = smartdebit(smartdebitAddress);
		uint payments = sd.pay();
	    bool success = msg.sender.send(10*payments);
	}
}
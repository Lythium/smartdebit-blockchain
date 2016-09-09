// Express servers (apps)
var express = require('express');
var app = express();

var Web3 = require('web3');
const path = require('path');

// Connect to a geth server over JSON-RPC
var sandboxId = '59515ced0f';
var sandboxUrl = 'https://lythium.by.ether.camp:8555/sandbox/' + sandboxId;
var web3 = new Web3(new Web3.providers.HttpProvider(sandboxUrl));

// Create a proxy object to access the smart contract
require('./abi.js');
var contractObject = web3.eth.contract(contractAbi);

// instantiate by address
var contractAddress = '0x17956ba5f4291844bc25aedb27e69bc11b5bda39';
var contractInstance = contractObject.at(contractAddress);
web3.eth.defaultAccount = '0xdedb49385ad5b94a16f236a6890cf9e0b1e30392';

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/get', function(req, res) {
    var accountNumber = req.query.acc;
    var fee = contractInstance.getDirectDebit(accountNumber);
    res.send("Account number: " + accountNumber + "; Fee " + fee);
});

app.post('/createDirectDebit', function(req, res) {
    var accountNumber = req.body.beneficiary;
    var fee = req.body.fee;
    var period = req.body.period;
    var allowChanges = req.body.allowChanges;
    
    var fee = contractInstance.createDirectDebit(accountNumber, fee, period, allowChanges);
    res.send('Account number: ' + accountNumber + ' fee: ' + fee + ' period: ' + period + ' added to your account.');
});

app.post('/changeDirectDebit', function(req, res) {
    var beneficiary = req.body.beneficiary;
    var newFee = req.body.beneficiary;
    contractInstance.changeDirectDebit(beneficiary, newFee);
    res.send("Direct debit changed.");
});

app.post('/deleteDirectDebit', function(req, res) {
    var address = req.body.address;
    var bool = contractInstance.deleteDirectDebit(address);
    res.send("The direct debit was succesfully removed.");
});


// Assets files
app.get('/set_action.js', function(req,res) {
    res.sendFile(path.join(__dirname, 'set_action.js'));
});
app.get('/style.css', function(req,res) {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/page_files/fullpage.css', function(req,res) {
    res.sendFile(path.join(__dirname, 'page_files/fullpage.css'));
});
app.get('/page_files/fullpage.js', function(req,res) {
    res.sendFile(path.join(__dirname, 'page_files/fullpage.js'));
});
app.get('/listData.html', function(req,res) {
    res.sendFile(path.join(__dirname, 'listData.html'));
});


// server listen on port 8080
app.listen(8080, function() {
    console.log('express server listening');
});
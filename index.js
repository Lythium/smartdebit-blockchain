// Express servers (apps)
var express = require('express');
var app = express();

var Web3 = require('web3');
const path = require('path');
//var solc = require("solc");
//var fs = require('fs');



// Connect to a geth server over JSON-RPC
var sandboxId = '26a289d866';
var sandboxUrl = 'https://fberney.by.ether.camp:8555/sandbox/' + sandboxId;
var web3 = new Web3(new Web3.providers.HttpProvider(sandboxUrl));


// Create a proxy object to access the smart contract
require('./abi.js');
var contractObject = web3.eth.contract(contractAbi);

// instantiate by address
var contractAddress = '0x17956ba5f4291844bc25aedb27e69bc11b5bda39';
var contractInstance = contractObject.at(contractAddress);

/*
var accountNumber = '0x17956ba5f4291844bc25aedb27e69bc11b5bda39';
var fee = 1;
var periode = 1;
contractInstance.createDirectDebit(accountNumber, fee, periode);
*/

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'set_action.html'));
});

// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/success', function(req, res) {
    var accountNumber = req.body.name;
    var fee = req.body.email;
    var periode = req.body.contact;
    
    //contractInstance.createDirectDebit(accountNumber, fee, periode);
    
    res.send(' Account number: ' + accountNumber + ' fee: ' + fee + ' periode: ' + periode);
});



app.get('/style.css', function(req,res) {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/set_action.js', function(req,res) {
    res.sendFile(path.join(__dirname, 'set_action.js'));
});

// server listen on port 8080
app.listen(8080, function() {
    console.log('express server listening');
});



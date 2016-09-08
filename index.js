// Express servers (apps)
var express = require('express'), stylus = require('stylus'), nib = require('nib');
var app = express();

var Web3 = require('web3');
const path = require('path');
var ejs = require('ejs');

// Connect to a geth server over JSON-RPC
var sandboxId = '30401bc224';
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

console.log(web3.version.api);

var accountNumber = '0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826';
var fee = 1;
var period = 1;
//contractInstance.createDirectDebit.sendTransaction(accountNumber, fee, period, txCb);
//contractInstance.createTestDD(accountNumber, fee, period);

console.log('test');

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/get', function(req, res) {
    var accountNumber = req.query.acc;
    var fee = contractInstance.getDirectDebit(accountNumber);
    res.sendFile(path.join(__dirname, 'create_direct_debit.html'));
});

app.post('/createDirectDebit', function(req, res) {
    var name = req.body.name;
    var accountNumber = req.body.beneficiary;
    var fee = req.body.fee;
    var period = req.body.period;
    
    var fee = contractInstance.createDirectDebit(name, accountNumber, fee, period);
    res.send('Account number: ' + accountNumber + ' fee: ' + fee + ' period: ' + period);
});

app.get('/changeDirectDebit', function(req, res) {
    res.sendFile(path.join(__dirname, 'change_direct_debit.html'));
});

app.post('/deleteDirectDebit', function(req, res) {
    var address = req.body.address;
    var bool = contractInstance.deleteDirectDebit(address);
    res.sendFile(path.join(__dirname, 'change_direct_debit.html'));
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
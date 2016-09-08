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
   //Display all direct debits set up
    var all = contractInstance.getAllDirectDebits();
    var listData = '<table class="table-fill"><thead><tr><th class="text-left">Account Number</th><th class="text-left">Fee</th><th class="text-left">Period</th></tr></thead><tbody class="table-hover">' + 
    '<%for(var i=0; i<all.length; i++) { %>' +
    '<tr>' + 
'<td class="text-left">all[i]</td>' +
'<td class="text-left">123</td>' +
'<td class="text-left">123</td>' +
'</tr>' +
'<% } %>' +
'</tbody>' +
'</table>';
    html = ejs.render(listData, all);

    res.send(html);

   //res.send(html);
});

app.get('/createDirectDebit', function(req, res) {
    res.sendFile(path.join(__dirname, 'create_direct_debit.html'));
});

// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/createDirectDebit', function(req, res) {
    var accountNumber = req.body.name;
    var fee = req.body.email;
    var periode = req.body.contact;
    
    //contractInstance.createDirectDebit(accountNumber, fee, periode);
    
    res.send(' Account number: ' + accountNumber + ' fee: ' + fee + ' periode: ' + periode);
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
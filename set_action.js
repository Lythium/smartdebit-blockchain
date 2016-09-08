// Submit form with id function
function myfunction() {
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var contact = document.getElementById("contact").value;
if (validation()) // Calling validation function
{
document.getElementById("form_id").action = "/success"; // Setting form action to "success.php" page
document.getElementById("form_id").submit(); // Submitting form
}
}
// Name and Email validation Function
function validation() {
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var contact = document.getElementById("contact").value;
//var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
if (name === '' || email === '' || contact === '') {
alert("Please fill all fields...!!!!!!");
return false;
//} else if (!(email).match(emailReg)) {
//alert("Invalid Email...!!!!!!");
//return false;
} else {
return true;
}
}
const express = require('express');
const app = express();
var fs = require('fs');
var guests = require("./Guests.json");
var companies = require("./Companies.json");
var templates = require("./Templates.json");

app.use(express.static(__dirname + '/www'));

var message = templates[0].message;
var firstName = guests[1].firstName;
var lastName = guests[1].lastName;
message = message.replace("$"+"firstName" +"$",firstName);
message = message.replace("$"+"lastName" +"$",lastName);


app.get('/init',function(req,res){
    res.send([guests,companies,templates]);  

});

console.log(guests.length);

const server = app.listen(process.env.PORT || 3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
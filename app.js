//require or import? 
const http = require('http');
const routes = require('./routes');

// //using functiion
// http.createServer(rqListener);

// //inline anonymous func
// http.createServer(function(req,res) {

// });

//function keyword
const server = http.createServer(routes);

//listen for server
server.listen(4321);
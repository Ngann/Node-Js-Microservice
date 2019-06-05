'use strict';

//import the service from service.js
const service = require('../server/service');

// import http object from node
const http = require('http');

// initiate the server by adding the service object, create a const call server and create a server and pass in the service
const server = http.createServer(service);
// server to start on port 3000 
server.listen(3000);

// add log message to tell us the service is running. 
// server.address().port will returen object information about the running server
server.on('listening', function(){
    console.log(`IRIS is listning on ${server.address().port} in ${service.get('env')}.mode`)
})

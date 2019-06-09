'use strict';

//import the service from service.js
const service = require('../server/service');

// import http object from node
const http = require('http');

// initiate the server by adding the service object, create a const call server and create a server and pass in the service
const server = http.createServer(service);
const slackClient = require('../server/slackClient');

// slackClient.addAuthenticatedHandler(rtm,() => server.listen(3000))
// An access token (from your Slack app or custom integration - usually xoxb)
// const token = process.env.SLACK_TOKEN;
const slackToken ='xoxb-609731003684-645236093250-l82ByGnNRNFxBCTwg0RAmAyA';
const slackLogLevel = 'verbose';

const witToken = 'KPMFSP47OMKLHSFAQWZXUJI3VTSHSIHV';
const witClient = require('../server/witClient')(witToken);

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

// server to start on port 3000 
server.listen(3000);

// add log message to tell us the service is running. 
// server.address().port will returen object information about the running server
server.on('listening', function(){
    console.log(`IRIS is listning on ${server.address().port} in ${service.get('env')}.mode`)
})

'use strict';

const request = require('superagent');
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
const slackToken =process.env.SLACK_TOKEN;
const slackLogLevel = 'verbose';

const witToken = process.env.WIT_TOKEN;
const witClient = require('../server/witClient')(witToken);

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

// server to start on port 3000 
server.listen(3000);

// add log message to tell us the service is running. 
// server.address().port will returen object information about the running server
server.on('listening', function(){
    console.log(`IRIS is listning on ${server.address().port} in ${service.get('env')}.mode`)

    const announce = () => {
        request.put(`http://localhost:3000/service/time/${server.address().port}`, (err, res) =>{
            if(err){
                console.log(err)
                console.log("Error connecting to Iris");
                return;
            }
            console.log(res.body);
        })
    };

    //tell Iris that we are still alive, so we'll add set interval announce, and we will do this every 15 times thousand milliseconds, which means 15 seconds.
    announce();
    setInterval(announce, 15*1000);
})

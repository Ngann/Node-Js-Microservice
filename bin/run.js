'use strict';

// const slackClient = require('../server/slackClient');
//import the service from service.js
const service = require('../server/service');

// import http object from node
const http = require('http');

// initiate the server by adding the service object, create a const call server and create a server and pass in the service
const server = http.createServer(service);

const { RTMClient, CLIENT_EVENTS } = require('@slack/rtm-api');


// An access token (from your Slack app or custom integration - usually xoxb)

// const token = process.env.SLACK_TOKEN;

// const { WebClient } = require('@slack/web-api');

// const web = new WebClient(token, {logLevel:'verbose'});

// // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
// const conversationId = 'CHLQ1HU91';

// (async () => {
//   // See: https://api.slack.com/methods/chat.postMessage
//   const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there Ngan' });

//   // `res` contains information about the posted message
//   console.log('Message sent: ', res.ts);
// })();


// // The client is initialized and then started to get an active connection to the platform
const rtm = new RTMClient(token, {logLevel: 'verbose'});
rtm.start()
  .catch(console.error);

rtm.on('authenticated', (event) => {
// The argument is the event as shown in the reference docs.
// For example, https://api.slack.com/events/user_typing
console.log(event);
})
  

// // Calling `rtm.on(eventName, eventHandler)` allows you to handle events (see: https://api.slack.com/events)
// When the connection is active, the 'ready' event will be triggered
rtm.on('ready', async () => {

  // Sending a message requires a channel ID, a DM ID, an MPDM ID, or a group ID
  // The following value is used as an example
  const conversationId = 'CHLQ1HU91';

  // The RTM client can send simple string messages
  const res = await rtm.sendMessage('Hello there team', conversationId);

  // `res` contains information about the sent message
  console.log('Message sent: ', res.ts);
});

// After the connection is open, your app will start receiving other events.
rtm.on('user_typing', (event) => {
  // The argument is the event as shown in the reference docs.
  // For example, https://api.slack.com/events/user_typing
  console.log(event);
})


// server to start on port 3000 
server.listen(3000);

// add log message to tell us the service is running. 
// server.address().port will returen object information about the running server
server.on('listening', function(){
    console.log(`IRIS is listning on ${server.address().port} in ${service.get('env')}.mode`)
})

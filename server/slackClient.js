// 'use strict';

// const { RTMClient } = require('@slack/rtm-api');
// let rtm = null;

// function handleOnAuthenticated(rtmStartData){
//     // // After the connection is open, your app will start receiving other events.
//     // rtm.on('user_typing', (event) => {
//     //   // The argument is the event as shown in the reference docs.
//     //   // For example, https://api.slack.com/events/user_typing
//     //   console.log(event);
//     // })
//     console.log(`Logged in as ${rtmStartData.self.name} on team ${rtmStartData.team.name}, but not yet connected to a channel`);
// }

// function addAuthenticatedHandler(rtm, handler){
//     rtm.on('authenticated', (handler) => {
//     console.log(handler);
//     })
// }

// function handleOnMessage(message){
//   // Sending a message requires a channel ID, a DM ID, an MPDM ID, or a group ID
//   // The following value is used as an example
//   const conversationId = 'CHLQ1HU91';

//   // The RTM client can send simple string messages
//   const res = await rtm.sendMessage('Hello there team', conversationId);

//   // `res` contains information about the sent message
//   console.log('Message sent: ', res.ts);
//     console.log(message);
// }

// module.exports.init = function slackClient(token,logLevel){
//     // The client is initialized and then started to get an active connection to the platform
//     rtm = new RTMClient(token,{logLevel: logLevel});
//     addAuthenticatedHandler(rtm, handleOnAuthenticated);
//     rtm.on('messsage', handleOnMessage );
//     return rtm;
// }

// module.exports.addAuthenticatedHandler = addAuthenticatedHandler;
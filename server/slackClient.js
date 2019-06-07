'use strict';

const { RTMClient } = require('@slack/rtm-api');
let rtm = null;
let nlp = null;



module.exports.init = function slackClient(token,logLevel, nlpClient){
    // The client is initialized and then started to get an active connection to the platform
    rtm = new RTMClient(token,{logLevel: logLevel});
    nlp = nlpClient;
        
    rtm.on('authenticated', (event) => {
    // The argument is the event as shown in the reference docs.
    // For example, https://api.slack.com/events/user_typing
    console.log(event);
    console.log(`Logged in as ${event.self.name} on team ${event.team.name}, but not yet connected to a channel`)
    })

    // // Calling `rtm.on(eventName, eventHandler)` allows you to handle events (see: https://api.slack.com/events)
    // When the connection is active, the 'ready' event will be triggered
    rtm.on('ready', async () => {

    // Sending a message requires a channel ID, a DM ID, an MPDM ID, or a group ID
    // The following value is used as an example
    const conversationId = 'CHLQ1HU91';

    // The RTM client can send simple string messages
    const res = await rtm.sendMessage('New message', conversationId);

    // `res` contains information about the sent message
    console.log('Message sent: ', res.ts);
    });

    // After the connection is open, your app will start receiving other events.
    rtm.on('user_typing', (event) => {
    // The argument is the event as shown in the reference docs.
    // For example, https://api.slack.com/events/user_typing
    console.log(event);
    })

    rtm.on('message', (event) => {
        nlp.ask(event.text);
        // The argument is the event as shown in the reference docs.
        // For example, https://api.slack.com/events/user_typing
        rtm.sendMessage('this is a test message', 'CHLQ1HU91', function messageSent(){
        });
        console.log(event);
    })
    return rtm;
}

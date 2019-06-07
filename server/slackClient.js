'use strict';

const { RTMClient } = require('@slack/rtm-api');
let rtm = null;
let nlp = null;

function addAuthentication() {
    rtm.on('authenticated', (event) => {
    // The argument is the event as shown in the reference docs.
    // For example, https://api.slack.com/events/user_typing
    console.log(event);
    console.log(`Logged in as ${event.self.name} on team ${event.team.name}, but not yet connected to a channel`)
    })
}


function handleOnMessage(aiClient) {
    rtm.on('message', (event) => {
        aiClient.ask(event.text, (err, res) => {
            if(err) {
                console.log(err);
                return;
            }

            if(!res.intent) {
                return rtm.sendMessage('Sorry, I did not understand', 'CHLQ1HU91', function messageSent(){
                });
            } else if( res.intent[0].value =='time' && res.location){
                return rtm.sendMessage(`I did yet know the time in ${res.location}`, 'CHLQ1HU91', function messageSent(){
                });
            } else {
                console.log(res)
            // The argument is the event as shown in the reference docs.
            // For example, https://api.slack.com/events/user_typing
            rtm.sendMessage('Sorry, I did not understand', 'CHLQ1HU91', function messageSent(){
            });
            }
        });
    })
}

module.exports.init = function slackClient(token,logLevel, nlpClient){
    // The client is initialized and then started to get an active connection to the platform
    rtm = new RTMClient(token,{logLevel: logLevel});
    nlp = nlpClient;

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

    addAuthentication();
    handleOnMessage(nlp);
    return rtm;
}

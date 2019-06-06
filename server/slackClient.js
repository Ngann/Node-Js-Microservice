'use strict';
//Slack Infoconst { RTMClient } = require('@slack/rtm-api');
const { RTMClient } = require('@slack/rtm-api');

module.exports.init = function slackClient(token){
    // The client is initialized and then started to get an active connection to the platform
    const rtm = new RTMClient(token);
    return rtm;
}
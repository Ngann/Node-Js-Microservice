'use strict';
const request = require('superagent');

// module.exports.process = function process(intentData, callback){
//     if(intentData.intent[0].value != 'time')
//         return callback(new Error(`expected time intent, got ${intentData.intent[0].value}`));
   
//     if(!intentData.location) return callback(new Error('Missing location in time intent'));
//    return callback(false, `i don't yet know in ${intentData.location[0].value}`);
// }

module.exports.process = function process(intentData, callback){
    if(intentData.intent[0].value != 'time')
        return callback(new Error(`expected time intent, got ${intentData.intent[0].value}`));
   
    if(!intentData.location) return callback(new Error('Missing location in time intent'));
    const location = intentData.location[0].value;

    request.get(`http://locahost:3010/${location}`, (err,res) => {
        if (err || res.statusCode != 200 || ! res.body.result){
            console.log(err)
            console.log(res.body)

            return callback(false, `I had a problem finding out the time in the ${location}`);
        }

        return callback(false, `In ${location}, it is now ${res.body.result}`);
    });
}
'use strict';

const request = require('superagent');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);
server.listen();

server.on('listening', function() {
    console.log(`IRIS-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://127.0.0.1:3000/service/time/${server.address().port}`, (err, res) =>{
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
});
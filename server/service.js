//With strict mode, you can not, for example, use undeclared variables.
'use strict';

// setting up the express server
const express = require('express');
const service = express();


//exporting the service
module.exports = service;

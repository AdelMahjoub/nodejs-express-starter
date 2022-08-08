//@ts-check
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.resolve('log')
});

const accessLogger = morgan('combined', { stream: accessLogStream });

module.exports = accessLogger;
//@ts-check
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const errorLogStream = rfs.createStream('error.log', {
    interval: '1d',
    path: path.resolve('log')
});

/**
 * @type {import('express').ErrorRequestHandler}
 * @param {Error} err 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const errorLogger = async function (err, req, res, next) {
    const message = `${req.headers['origin']} ${req.method}  ${req.url} - ${(new Date()).toISOString()} - ${req.headers['user-agent']}\nError: ${err.message}\n`
    const line = '-'.repeat(message.length) + '\n';
    const log = `${line}${message}${line}`;
    errorLogStream.write(log, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('500 INTERNAL SERVER ERROR');
        }
        fs.readFile(path.resolve('public', '500.html'), { encoding: 'utf-8' }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send('500 INTERNAL SERVER ERROR');
            }
            return res.status(500).send(data);
        });
    });
}

module.exports = errorLogger;
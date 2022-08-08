//@ts-check
const fs = require('fs');
const path = require('path');

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const renderSpa = async (req, res, next) => {
    fs.readFile(path.resolve('public', 'index.html'), { encoding: 'utf-8' }, (err, data) => {
        if (err)
            return next(err);
        return res.status(200).send(data);
    });
}

module.exports = renderSpa;
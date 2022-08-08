//@ts-check
require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet').default;
const cors = require('cors');
const compression = require('compression');

const accessLogger = require('./http/middlewares/accessLogger');
const errorLogger = require('./http/middlewares/errorLogger');
const notFound = require('./http/middlewares/notFound');
const renderSpa = require('./http/middlewares/renderSpa');

const SPA = process.env.SPA || false;
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || 'production';
const app = express();

app.use(accessLogger);
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.static(path.resolve('public')))
app.get('*', SPA ? renderSpa : notFound);
app.use(errorLogger);

app.listen(PORT, () => {
    console.info(`SERVER RUNNING\nPORT: ${PORT}\nENV: ${ENV}`);
});
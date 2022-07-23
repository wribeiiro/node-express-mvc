const { logEvents } = require('./logEvents');
const httpStatus = require('../enum/httpStatus');

const errorHandler = (error, request, response, next) => {
    logEvents(`${error.name}: ${error.message}`, 'logger.txt');
    console.error(error.stack)
    response.status(httpStatus.HTTP_INTERNAL_SERVER_ERROR).send(error.message);
}

module.exports = errorHandler;
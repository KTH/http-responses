const logger = require("kth-node-log");
const packageFile = require("./package.json");

/**
 * Gets the log level passed as env LOG_LEVEL
 * or defaults to info.
 *
 * Levels are:
 * log.info('hello from info, log level usually used in setup')
 * log.warn('error that code handled and can recover from')
 * log.error({err: err}, 'error that should be fixed in code')
 * log.fatal('a really bad error that will crash the application')
 * log.debug({req: request, res: res}, 'log a request and response, basic dev log')
 * log.trace('granular logging, rarely used')
 */
let _getLogLevel = function getLogLevel() {
  result = "info";

  if (process.env.LOG_LEVEL != null) {
    result = process.env.LOG_LEVEL;
  }

  console.log(`Loglevel: '${result}'`);

  return result;
};

/**
 * Set logging to the level specified in env LOG_LEVEL
 * or use default.
 */
logger.init({
  name: packageFile.name,
  app: packageFile.name,
  level: _getLogLevel()
});

/**
 * Log incomming request unless if env DISABLE_REQUEST_LOGGING is set.
 * E.g:  http://localhost:3000/_about - Response Code: 200, Client IP: 127.0.0.1
 */
let logRequest = function logRequest(request, statusCode) {
  if (process.env.DISABLE_REQUEST_LOGGING) {
    return;
  }
  logger.info(
    `${request.method} ${request.protocol}://${request.get("Host")}${
      request.url
    } - Response: ${statusCode}, Client IP: ${getClientIp(request)}`
  );
  logger.debug(`Request headers: ${JSON.stringify(request.headers)}`);
};

/**
 * Gets out the requestors IP.
 * The IP is found on differnt places depending on
 * if the service is accessed directly or via proxy.
 */
let getClientIp = function getClientIp(request) {
  let result = request.headers["x-forwarded-for"];

  if (result == null) {
    if (request.connection && request.connection.remoteAddress) {
      result = request.connection.remoteAddress;
    }
  }

  if (result == null) {
    result = request.ip;
  }

  if (result == null) {
    result = "missing remote ip";
  }

  return result;
};

/**
 * Module exports
 */
module.exports = {
  log: logger,
  logRequest: logRequest
};
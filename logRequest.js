/**
 * Log incomming request unless if env DISABLE_REQUEST_LOGGING is set.
 * E.g:  http://localhost:3000/_about - Response Code: 200, Client IP: 127.0.0.1
 */
const logRequest = function logRequest(request, statusCode, logger) {
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
const getClientIp = function getClientIp(request) {
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
  logRequest: logRequest,
};

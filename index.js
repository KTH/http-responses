"use strict";

let logger = console;

const { logRequest } = require("./logRequest");

const contentTypes = {
  PLAIN_TEXT: "text/plain",
  HTML: "text/html",
  JSON: "application/json",
};

const statusCodes = {
  OK: 200,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  TEMPORARY_REDIRECT: 307,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
};

/**
 * Set default headers.
 */
let _addDefaultHeaders = function addDefaultHeaders(response) {
  response.set("X-Frame-Options", "sameorigin");
  response.set(
    "X-KTH",
    "Black Lives Matter, HBTQI or just love. Lets make this world a little bit better, for a brighter tomorrow."
  );
};

/**
 * Send status 200 with a body set to the content type.
 * Default content type is text/html.
 */
let _ok = function ok(
  request,
  response,
  body,
  contentType = contentTypes.HTML
) {
  logger.debug("Using contentType: " + contentType);
  _send(request, response, body, statusCodes.OK, contentType);
};

/**
 * Redirect to a url with a status code.
 */
let _redirect = function redirect(response, statusCode, url) {
  _addDefaultHeaders(response);
  response.status(statusCode).redirect(url);
};

/**
 * Send a temporary redirect to the client redirectint to a url.
 * Normally a bad option, but good if the redirect really is temporary.
 */
let _temporaryRedirect = function temporaryRedirect(response, url) {
  _redirect(response, statusCodes.TEMPORARY_REDIRECT, url);
};

/**
 * Send a permanent redirect to the client redirectint to a url.
 * This is the option you use if SEO is important when following links.
 * A permanent redirect will be cached in the client browser for some time.
 */
let _permanentRedirect = function permanentRedirect(response, url) {
  _redirect(response, statusCodes.MOVED_PERMANENTLY, url);
};

/**
 * Send status 404 with a body set to the content type.
 * Default content type is text/html.
 */
let _notFound = function notFound(
  request,
  response,
  body,
  contentType = contentTypes.HTML
) {
  _send(request, response, body, statusCodes.NOT_FOUND, contentType);
};

/**
 * An empty body should be sent for a ok request.
 * @param {} request
 * @param {*} response
 */
let _noContent = function noContent(request, response) {
  _send(request, response, "", statusCodes.NO_CONTENT, contentTypes.PLAIN_TEXT);
};

/**
 * Send status internal server error with a body set to the content type.
 * Default content type is text/html.
 */
let _internalServerError = function internalServerError(
  request,
  response,
  body,
  contentType = contentTypes.HTML
) {
  _send(
    request,
    response,
    body,
    statusCodes.INTERNAL_SERVER_ERROR,
    contentType
  );
};

/**
 * Send status bad gateway server error with a body set to the content type.
 * Default content type is text/html.
 */
let _badGateway = function badGateway(
  request,
  response,
  body = `${statusCodes.BAD_GATEWAY} Bad Gateway`,
  contentType = contentTypes.HTML
) {
  _send(request, response, body, statusCodes.BAD_GATEWAY, contentType);
};

/**
 * Send the content type with the passed status code.
 * Default content type is text/html.
 * Default status code is 200.
 */
let _send = function send(
  request,
  response,
  bodyContent,
  statusCode = statusCodes.OK,
  contentType = contentTypes.HTML
) {
  logRequest(request, statusCode, logger);
  _addDefaultHeaders(response);
  response.set("Content-Type", contentType);
  /*
  response.set("X-Frame-Options", "sameorigin");
  response.set(
    "X-KTH",
    "Black Lives Matter, HBTQI or just love. Lets make this world a little bit better, for a brighter tomorrow."
  );
  */
  response.status(statusCode).send(bodyContent);
};

/**
 * Set a logger of your choice that implements functions debug, info, warn and error.
 * @param {*} log
 */
const setLogger = (log) => {
  logger = log;
};

/**
 * Module exports
 */
module.exports = {
  ok: _ok,
  notFound: _notFound,
  noContent: _noContent,
  internalServerError: _internalServerError,
  badGateway: _badGateway,
  permanentRedirect: _permanentRedirect,
  temporaryRedirect: _temporaryRedirect,
  statusCodes: statusCodes,
  contentTypes: contentTypes,
  setLogger: setLogger,
};

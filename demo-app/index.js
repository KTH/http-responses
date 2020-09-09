const express = require("express");
const httpResponse = require("@kth/http-responses");
const app = express();

app.get("/", function (request, response) {
  httpResponse.ok(request, response, "<!DOCTYPE html><h1>Hello world!<h1>");
});

app.get("/_monitor", function (request, response) {
  httpResponse.ok(
    request,
    response,
    "APPLICATION_STATUS: OK",
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

app.get("/error5xx.html", function (request, response) {
  httpResponse.internalServerError(request, response, "Internal Server Error");
});

app.get("/favicon.ico", function (request, response) {
  httpResponse.noContent(request, response);
});

app.use(function (request, response) {
  httpResponse.notFound(request, response, "Page not found");
});

app.listen(80, function () {
  console.log("Server started");
});

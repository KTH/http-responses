# HTTP Responses ![alt text](https://api.travis-ci.org/KTH/http-responses.svg?branch=master) ![Continous Integration](https://github.com/KTH/http-responses/actions/workflows/main.yml/badge.svg)

Npm: `@kth/http-responses`

Simple ways of returning responses in a declarative way without status codes.
Note that it is not async so use it for simple smal stuff.


## Demo application

[Demo code source here](https://github.com/KTH/http-responses/tree/master/demo-app/).


```javascript
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
```

```json
{
  "name": "Demo",
  "version": "1.0.0",
  "description": "Demo app for @kth/http-responses",
  "main": "index.js",
  "scripts": {
    "clean": "rm -r ./node_modules && rm package-lock.json"
  },
  "author": "paddy@kth.se",
  "license": "MIT",
  "dependencies": {
    "@kth/http-responses": "^1.0.20",
    "express": "^4.17.1"
  }
}
```

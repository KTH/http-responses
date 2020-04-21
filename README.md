# HTTP Responses ![alt text](https://api.travis-ci.org/KTH/http-responses.svg?branch=master)

```javascript
const { templates } = require("@kth/basic-html-templates");
const httpResponse = require("@kth/http-responses");


/**
 * Index page.
 */
app.get("/", function (request, response) {
  httpResponse.ok(request, response, templates.index((title = "Your title")));
});

/**
 * About page. Versions and such.
 */
app.get("/_about", function (request, response) {
  const about = {
    jenkinsBuildDate: 'Not set by CI.',
    dockerName: 'Not set by CI.',
    dockerVersion: 'Not set by CI.'
}
  httpResponse.ok(request, response, templates._about(about, started));
});

/**
 * Health check route.
 */
app.get("/_monitor", function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates._monitor(
      (status = "OK")
    ),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

/**
 * Crawler access definitions.
 */
app.get("/robots.txt", function (request, response) {
  httpResponse.ok(
    request,
    response,
    templates.robotstxt(),
    httpResponse.contentTypes.PLAIN_TEXT
  );
});

app.get("/error5xx.html", function (request, response) {
  httpResponse.internalServerError(request, response, "Internal Server Error");
});

/**
 * Ignore favicons.
 */
app.get("/favicon.ico", function (request, response) {
  httpResponse.noContent(request, response);
});

/**
 * Default route, if no other route is matched (404 Not Found).
 */
app.use(function (request, response) {
  httpResponse.notFound(request, response, templates.error404());
});
```

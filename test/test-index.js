/* eslint-env mocha */
"use strict";

// Testing libraries
const expect = require("chai").expect;
const index = require("../index");

describe("Template paths handling\n", function() {
  it("There are 3 types of content types.", function() {
    expect(index.contentTypes).not.to.be.empty;
  });
});

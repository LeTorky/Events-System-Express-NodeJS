/* -------------------------- Acquiring MiddleWares ------------------------- */
const logger = require("./../MiddleWares/logger");
const errorHandler = require("./../MiddleWares/errorHandler");
const notFoundHandler = require("./../MiddleWares/notFound");
const authentication = require("./../MiddleWares/authentication");
const testRequest = require("./../MiddleWares/testingRequest");
require("dotenv").config();
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting MiddleWares ------------------------- */
module.exports.logger = logger;
module.exports.errorHandler = errorHandler;
module.exports.notFoundHandler = notFoundHandler;
module.exports.authentication = authentication;
module.exports.testRequest = testRequest;
/* -------------------------------------------------------------------------- */
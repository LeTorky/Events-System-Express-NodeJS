/* --------------------------- Creating MiddleWare -------------------------- */
const logger = function (request, response, next){
    console.log(`IP: ${request.ip}\nURL: ${request.url}\nMethod: ${request.method}\n-------------------------------`);
    next();
}
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting MiddleWare -------------------------- */
module.exports = logger;
/* -------------------------------------------------------------------------- */
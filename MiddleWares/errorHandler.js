/* ------------------------- Acquiring Dependancies ------------------------- */
const dotenv = require("dotenv").config();
/* -------------------------------------------------------------------------- */
/* --------------------------- Creating MiddleWare -------------------------- */
const errorHandler = (error, request, response, next)=>{
    errorMessage = process.env.dev == "true" ? error.message : "An Error has Occured!";
    response.json({message:errorMessage});
    console.log(`${error}\n-------------------------------`);
}
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting MiddleWare -------------------------- */
module.exports = errorHandler;
/* -------------------------------------------------------------------------- */
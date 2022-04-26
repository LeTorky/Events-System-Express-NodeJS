/* ------------------------- Acquiring Dependancies ------------------------- */
require("dotenv").config();
/* -------------------------------------------------------------------------- */

/* --------------------------- Creating MiddleWare -------------------------- */
const testRequest = (request, response, next)=>{
    if(process.env.dev == "true"){
        console.log("Body:")
        for(let i in request.body){
            console.log(`${i}: ${request.body[i]}`);
        }
        console.log("\n-------------------------------");
    }
    next();
}
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting MiddleWare -------------------------- */
module.exports = testRequest;
/* -------------------------------------------------------------------------- */
/* ------------------------- Acquiring Dependancies ------------------------- */
const eventModel = require("./../Models/models").eventModel;
const authorize = require("./authorizeController");
const {validationResult}=require("express-validator");
/* -------------------------------------------------------------------------- */

/* -------------------------- Creating Controllers -------------------------- */
const getEvent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong form Data");
    }
    authorize(request, response, ["Admin"]);
    eventModel.find({
    }).then((data)=>{
        response.status(200);
        response.json(data);
    }).catch((error)=>{
        response.status(404);
        next(error);
    });
}
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controllers ------------------------- */
module.exports.get = getEvent;
module.exports.post = getEvent;
module.exports.put = getEvent;
module.exports.delete = getEvent;
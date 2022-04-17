/* ------------------------- Acquiring Dependancies ------------------------- */
const speakerModel = require("./../Models/models").speakerModel;
const identity = require("./identityController");
const authorize = require("./authorizeController");
const {validationResult, check}=require("express-validator");
/* -------------------------------------------------------------------------- */

/* -------------------------- Creating Controllers -------------------------- */
const validationArray = new Object();

const getSpeaker = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong form Data");
    }
    authorize(request, response, ["Admin"]);
    speakerModel.find({
    }).then((data)=>{
        let filteredData = [];
        data.forEach((entry)=>{
            filteredData.push({email:entry.email, userName:entry.userName});
        })
        response.status(200);
        response.json(filteredData);
    }).catch((error)=>{
        response.status(404);
        next(error);
    });
}

const postSpeaker = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        console.log(request.body);
        throw Error("Wrong Form Data!");
    }
    let newId = identity(speakerModel)
    .then((newId)=>{
        let newSpeaker = new speakerModel({
            _id:newId,
            email:request.body.email,
            userName:request.body.userName,
            passWord:request.body.passWord,
            address:{
                // city:request.body.address.city,
                // street:request.body.address.street,
                // building:request.body.address.building
                city:request.body.city,
                street:request.body.street,
                building:request.body.building
            }
        });
        newSpeaker.save((error, result)=>{
            if(error){
                response.status(404);
                next(error) 
            }
            else{
                response.status(200);
                response.json(result);
            }
        });
    })
    .catch((error)=>{
        next(error);
    });
}

const postVal = [
    check('userName').exists().not().isEmpty(),
    check('email').exists().isEmail().not().isEmpty(),
    check('passWord').exists().not().isEmpty(),
    // check('address.*.city').exists(),
    // check('address.*.street').exists(),
    // check('address.*.building').exists(),
    check('city').exists(),
    check('street').exists(),
    check('building').exists(),
];

validationArray.post = postVal;
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controllers ------------------------- */
module.exports.get = getSpeaker;
module.exports.post = postSpeaker;
module.exports.put = getSpeaker;
module.exports.delete = getSpeaker;
module.exports.validationArray = validationArray;
/* -------------------------------------------------------------------------- */
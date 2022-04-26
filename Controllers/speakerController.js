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
            filteredData.push({_id:entry._id, email:entry.email, userName:entry.userName, address:entry.address});
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
    identity(speakerModel)
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

const putSpeaker = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["speakerModel", "Admin"]);
    let role = request.formData.role;
    let updateFields = {};
    let filterField = {};
    request.body.city || request.body.street || request.body.building ? updateFields.address = {} : null;
    switch(role){
        case "speakerModel":
            filterField._id = request.formData._id;
            request.body.email != "" ? updateFields.email = request.body.email : null;
            request.body.userName != "" ? updateFields.userName = request.body.userName : null;
            request.body.passWord != "" ? updateFields.passWord = request.body.passWord : null;
            request.body.city != "" ? updateFields.address.city = request.body.city : null;
            request.body.street != "" ? updateFields.address.street = request.body.street : null;
            request.body.building != "" ? updateFields.address.building = request.body.building : null;
            break;
        case "Admin":
            if(!request.query._id)
                throw Error("No ID Selected!");
            filterField._id = request.query._id;
            request.body.email != "" ? updateFields.email = request.body.email : null;
            request.body.city != "" ? updateFields.address.city = request.body.city : null;
            request.body.street != "" ? updateFields.address.street = request.body.street : null;
            request.body.building != "" ? updateFields.address.building = request.body.building : null;
            break;
    }
    speakerModel.updateOne({
        filterField
    },
    updateFields,
    {
        upsert:false
    }).then((data)=>{
        response.status(200);
        response.json(data);
    }).catch((error)=>{
        response.status(404);
        next(error);
    });
}

const deleteSpeaker = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["speakerModel", "Admin"]);
    let filteredData = {};
    switch(request.formData.role){
        case "Admin":
            if(!request.query._id)
                throw Error("No ID Selected!");
                filteredData._id = request.query._id;
            break;
        case "speakerModel":
            filteredData._id = request.formData._id;
    }
    speakerModel.deleteOne(filteredData).then((data)=>{
        response.status(200);
        response.json(data);
    }).catch((error)=>{
        response.status(404);
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

const putVal = [
    check('userName').exists(),
    check('email').custom(email=>{
        if(email != ""){
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              );
        }
        else{
            return true;
        }
    }),
    check('passWord').exists(),
    // check('address.*.city').exists(),
    // check('address.*.street').exists(),
    // check('address.*.building').exists(),
    check('city').exists(),
    check('street').exists(),
    check('building').exists(),
];

validationArray.post = postVal;
validationArray.put = putVal;
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controllers ------------------------- */
module.exports.get = getSpeaker;
module.exports.post = postSpeaker;
module.exports.put = putSpeaker;
module.exports.delete = deleteSpeaker;
module.exports.validationArray = validationArray;
/* -------------------------------------------------------------------------- */
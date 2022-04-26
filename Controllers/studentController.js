/* ------------------------- Acquiring Dependancies ------------------------- */
const studentModel = require("./../Models/models").studentModel;
const identity = require("./identityController");
const authorize = require("./authorizeController");
const {validationResult, check}=require("express-validator");
/* -------------------------------------------------------------------------- */

/* -------------------------- Creating Controllers -------------------------- */
const validationArray = new Object();

const getStudent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["Admin"]);
    studentModel.find({
    }).then((data)=>{
        let filteredData = [];
        data.forEach((entry)=>{
            filteredData.push({_id:entry._id,  email:entry.email, userName:entry.userName});
        });
        response.status(200);
        response.json(filteredData);
    }).catch((error)=>{
        response.status(404);
        next(error);
    });
}

const postStudent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    identity(studentModel)
    .then((newId)=>{
        let newStudent = new studentModel({
            _id:newId,
            email:request.body.email,
            userName:request.body.userName,
            passWord:request.body.passWord
        });
        newStudent.save((error, result)=>{
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

const putStudent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["studentModel", "Admin"]);
    let role = request.formData.role;
    let updateFields = {};
    let filterField = {};
    switch(role){
        case "studentModel":
            filterField._id = request.formData._id;
            request.body.email != "" ? updateFields.email = request.body.email : null;
            request.body.userName != "" ? updateFields.userName = request.body.userName : null;
            request.body.passWord != "" ? updateFields.passWord = request.body.passWord : null;
            break;
        case "Admin":
            if(!request.query._id)
                throw Error("No ID Selected!");
            filterField._id = request.query._id;
            request.body.email != "" ? updateFields.email:request.body.email;
            break;
    }
    console.log(updateFields);
    studentModel.updateOne(
    filterField,
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

const deleteStudent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["studentModel", "Admin"]);
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
]

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
];

validationArray.post = postVal;
validationArray.put = putVal;
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controllers ------------------------- */
module.exports.get = getStudent;
module.exports.post = postStudent;
module.exports.put = putStudent;
module.exports.delete = deleteStudent;
module.exports.validationArray = validationArray;
/* -------------------------------------------------------------------------- */
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
            filteredData.push({email:entry.email, userName:entry.userName});
        })
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
    let newId = identity(studentModel)
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

const putStudent = async (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["Admin","Student"]);
    let newId = await identity(studentModel);
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
}

const postVal = [
    check('userName').exists().not().isEmpty(),
    check('email').exists().isEmail().not().isEmpty(),
    check('passWord').exists().not().isEmpty(),
]

validationArray.post = postVal;
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controllers ------------------------- */
module.exports.get = getStudent;
module.exports.post = postStudent;
module.exports.put = getStudent;
module.exports.delete = getStudent;
module.exports.validationArray = validationArray;
/* -------------------------------------------------------------------------- */
/* ------------------------- Acquiring Dependancies ------------------------- */
const eventModel = require("./../Models/models").eventModel;
const identity = require("./identityController");
const authorize = require("./authorizeController");
const {validationResult, check}=require("express-validator");
/* -------------------------------------------------------------------------- */

/* -------------------------- Creating Controllers -------------------------- */
const validationArray = new Object();

const getEvent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong form Data");
    }
    authorize(request, response, ["Admin", "speakerModel", "studentModel"]);
    let filterData = {$or:[]};
    switch(request.formData.role){
        case "speakerModel":
                filterData.$or.push({otherSpeakers:{$in:request.formData._id}});
                filterData.$or.push({mainSpeaker:request.formData._id});
            break;
        case "studentModel":
            filterData.$or.push({students:{$in:request.formData._id}});
            break;
        case "Admin":
            filterData.$or.push({});
            break;
    }
    eventModel.find(filterData
    ).populate(["otherSpeakers","mainSpeaker","students"]).then((data)=>{
        response.status(200);
        let newData = JSON.parse(JSON.stringify(data));
        newData.forEach(ev=>{
            ev.otherSpeakers.forEach(oS=>{
                delete oS.passWord;
            })
            ev.students.forEach(s=>{
                delete s.passWord;
            })
            delete ev.mainSpeaker.passWord;
        })
        response.json(newData);
    }).catch((error)=>{
        response.status(404);
        next(error);
    });
}

const deleteEvent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong form Data");
    }
    authorize(request, response, ["Admin"]);
    eventModel.deleteOne({_id:request.body._id}).then((data)=>{
        response.status(200);
        response.json(data);
    }).catch((error)=>{
        response.status(404);
        next(error);
    });
}

const postEvent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["Admin"]);
    identity(eventModel)
    .then((newId)=>{
        let newEvent = new eventModel({
            _id:newId,
            title:request.body.title,
            date:request.body.date,
            mainSpeaker:request.body.mainSpeaker,
            otherSpeakers:request.body.otherSpeakers,
            students:request.body.students,
        });
        newEvent.save((error, result)=>{
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

const putEvent = (request, response, next)=>{
    if(!validationResult(request).isEmpty()){
        throw Error("Wrong Form Data!");
    }
    authorize(request, response, ["speakerModel", "Admin"]);
    let role = request.formData.role;
    let updateFields = {};
    let filterFields = {_id:request.body._id};
    switch(role){
        case "speakerModel":
            request.body.acceptFlag == 0 ? updateFields.mainSpeaker = "" : updateFields.acceptFlag = 1;
            filterFields.mainSpeaker = request.formData._id;
            break;
        case "Admin":
            request.body.title != "" ? updateFields.title = request.body.title : null;
            request.body.students != "" ? updateFields.students = request.body.students : null;
            request.body.mainSpeaker != "" ? updateFields.mainSpeaker = request.body.mainSpeaker : null;
            request.body.otherSpeakers != "" ? updateFields.otherSpeakers = request.body.otherSpeakers : null;
            request.body.date != "" ? updateFields.date = request.body.date : null;
            request.body.acceptFlag != "" ? updateFields.acceptFlag = request.body.acceptFlag : null;
            break;
    }
    console.log(updateFields);
    eventModel.updateOne(
    filterFields
    ,
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

const deleteVal = [
    check('_id').exists().not().isEmpty()
]

const postVal = [
    check('title').exists().not().isEmpty(),
    check('date').exists().not().isEmpty(),
    check('mainSpeaker').exists(),
    check('otherSpeakers').isArray().exists(),
    check('students').isArray().exists(),
]

const putVal = [
    check('_id').exists().not().isEmpty(),
    check('title').exists(),
    check('date').exists(),
    check('mainSpeaker').exists(),
    check('otherSpeakers').exists(),
    check('students').exists(),
    check('acceptFlag').exists(),
]

validationArray.post = postVal;
validationArray.delete = deleteVal;
validationArray.put = putVal;
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controllers ------------------------- */
module.exports.get = getEvent;
module.exports.post = postEvent;
module.exports.put = putEvent;
module.exports.delete = deleteEvent;
module.exports.validationArray = validationArray;
/* -------------------------------------------------------------------------- */
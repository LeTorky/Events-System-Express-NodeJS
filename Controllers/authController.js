/* ------------------------- Acquiring Dependancies ------------------------- */
models = require("../Models/models");
require("dotenv").config();
/* -------------------------------------------------------------------------- */

/* --------------------------- Creating Functions --------------------------- */
const Authenticate = (formData, res, rej, iteration=0)=>{
    let modelTypes = process.env.modelAuth.split(" ");
    let count = modelTypes.length;
    if(formData.email != process.env.adminEmail || formData.passWord != process.env.adminPassWord)
    {
        models[modelTypes[iteration]].findOne({email:formData.email, password:formData.password}).then((data)=>{
            if(data == null){
                throw Error("Wrong Username or Password!");
            }
            else{
                data.role = modelTypes[iteration];
                res(data);
            }
        }).catch(
            (error)=>{
                if(iteration == count-1){
                    rej(error);
                }
                else{
                    Authenticate(formData, res, rej, ++iteration);
                }
            }
        );
    }
    else{
        let data = {
            _id:1,
            userName:"admin",
            email:process.env.adminEmail,
            role:"Admin"
        }
        res(data);
    }
}

const AuthPromise = (formData)=>{
    return (new Promise((res,rej)=>{
        Authenticate(formData,res,rej);
    }));
}
/* -------------------------------------------------------------------------- */

/* --------------------------- Exporting Functions -------------------------- */
module.exports = AuthPromise;
/* -------------------------------------------------------------------------- */
/* --------------------------- Creating Controller -------------------------- */
const identity = (model)=>{return new Promise((resolve, reject)=>{
    model.find().sort({"_id":-1}).limit(1)
    .then((data)=>{
        data.length == 0? resolve(1) : 
        resolve(data[0]._id + 1); 
    })
    .catch((error)=>{
        reject(error);
    })
});}
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controller -------------------------- */
module.exports = identity;
/* -------------------------------------------------------------------------- */
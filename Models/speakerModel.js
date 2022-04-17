/* ------------------------- Acquiring Dependancies ------------------------- */
const mongoose = require("mongoose");
/* -------------------------------------------------------------------------- */

/* --------------------------- Creating Collection -------------------------- */
const speakerSchema = new mongoose.Schema({
    _id:Number,
    userName:{type:String, required:true},
    email:{type:String, unique:true, required:true},
    passWord:{type:String, required:true},
    address:[{
        city:String,
        street:String,
        building:String,
    }]
});

const speakers = mongoose.model("speaker", speakerSchema);
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Collection -------------------------- */
module.exports = speakers;
/* -------------------------------------------------------------------------- */

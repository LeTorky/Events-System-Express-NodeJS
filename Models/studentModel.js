/* ------------------------- Acquiring Dependancies ------------------------- */
const mongoose = require("mongoose");
/* -------------------------------------------------------------------------- */

/* --------------------------- Creating Collection -------------------------- */
const studentSchema = new mongoose.Schema({
    _id:Number,
    email:{type:String, unique:true, required:true},
    userName:{type:String, required: true},
    passWord:{type:String, required:true},
});

const students = mongoose.model("student", studentSchema);
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Collection -------------------------- */
module.exports = students;
/* -------------------------------------------------------------------------- */

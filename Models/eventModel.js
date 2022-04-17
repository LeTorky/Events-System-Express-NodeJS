/* ------------------------- Acquiring Dependancies ------------------------- */
let mongoose = require("mongoose");
/* -------------------------------------------------------------------------- */

/* --------------------------- Creating Collection -------------------------- */
const eventSchema = new mongoose.Schema({
    _id:Number,
    title:{type:String, required:true},
    date:{type:Date, required:true},
    mainSpeaker:{type: Number, ref: "speakers"},
    otherSpeakers:[
        {type: Number, ref: "speakers"}
    ],
    students:[
        {type: Number, ref: "students"}
      ]
});

const events = mongoose.model("event", eventSchema);
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Collection -------------------------- */
module.exports = events;
/* -------------------------------------------------------------------------- */

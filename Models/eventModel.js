/* ------------------------- Acquiring Dependancies ------------------------- */
let mongoose = require("mongoose");
/* -------------------------------------------------------------------------- */

/* --------------------------- Creating Collection -------------------------- */
const eventSchema = new mongoose.Schema({
    _id:Number,
    title:{type:String, required:true},
    date:{type:Date, required:true},
    mainSpeaker:{type: Number, ref: "speaker"},
    otherSpeakers:[
        {type: Number, ref: "speaker"}
    ],
    students:[
        {type: Number, ref: "student"}
      ],
    accepted:{type: Number}
});

const events = mongoose.model("event", eventSchema);
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Collection -------------------------- */
module.exports = events;
/* -------------------------------------------------------------------------- */

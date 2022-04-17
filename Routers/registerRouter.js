/* ------------------------- Acquiring Dependancies ------------------------- */
const express = require("express");
const studentController = require("./../Controllers/studentController");
const speakerController = require("./../Controllers/speakerController");
const routerStudent = express.Router();
const routerSpeaker = express.Router();
/* -------------------------------------------------------------------------- */

/* ----------------------------- Creating Router ---------------------------- */
routerStudent.route("/RegisterStudent")
.post(studentController.validationArray.post, studentController.post)

routerSpeaker.route("/RegisterSpeaker")
.post(speakerController.validationArray.post, speakerController.post)
/* -------------------------------------------------------------------------- */

/* ---------------------------- Exporting Router ---------------------------- */
module.exports.routerStudent = routerStudent;
module.exports.routerSpeaker = routerSpeaker;
/* -------------------------------------------------------------------------- */

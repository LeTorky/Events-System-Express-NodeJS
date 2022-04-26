/* ------------------------- Acquiring Dependancies ------------------------- */
const express = require("express");
const auth = require("./../MiddleWares/authentication").auth;
const speakerController = require("./../Controllers/speakerController");
const router = express.Router();
/* -------------------------------------------------------------------------- */

/* ----------------------------- Creating Router ---------------------------- */
router.route("/Speaker")
.get(speakerController.get)
.put(speakerController.validationArray.put,speakerController.put)
.delete(speakerController.delete);
/* -------------------------------------------------------------------------- */

/* ---------------------------- Exporting Router ---------------------------- */
module.exports = router;
/* -------------------------------------------------------------------------- */
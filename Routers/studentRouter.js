/* ------------------------- Acquiring Dependancies ------------------------- */
const express = require("express");
const studentController = require("./../Controllers/studentController");
const router = express.Router();
/* -------------------------------------------------------------------------- */

/* ----------------------------- Creating Router ---------------------------- */
router.route("/Student")
.get(studentController.get)
.put()
.delete();
/* -------------------------------------------------------------------------- */

/* ---------------------------- Exporting Router ---------------------------- */
module.exports = router;
/* -------------------------------------------------------------------------- */
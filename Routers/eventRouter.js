/* ------------------------- Acquiring Dependancies ------------------------- */
const express = require("express");
const auth = require("./../MiddleWares/authentication").auth;
const eventController = require("./../Controllers/eventController");
const router = express.Router();
/* -------------------------------------------------------------------------- */

/* ----------------------------- Creating Router ---------------------------- */
router.route("/Event")
.get(eventController.get)
.post()
.put()
.delete();
/* -------------------------------------------------------------------------- */

/* ---------------------------- Exporting Router ---------------------------- */
module.exports = router;
/* -------------------------------------------------------------------------- */
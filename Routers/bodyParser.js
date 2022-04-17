/* -------------------------- Acquring Dependancies ------------------------- */
const express = require("express");
const bodyParser = require("body-parser");
/* -------------------------------------------------------------------------- */

/* --------------------------- Creating MiddleWare -------------------------- */
const router = express.Router();
router.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:false}));
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting MiddleWare -------------------------- */
module.exports = router;
/* -------------------------------------------------------------------------- */
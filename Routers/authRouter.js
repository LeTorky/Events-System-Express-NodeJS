/* ------------------------- Acquiring Dependancies ------------------------- */
const express = require("express");
const router = express.Router();
const mw = require("./../MiddleWares/middleWares");
/* -------------------------------------------------------------------------- */

/* ----------------------------- Creating Router ---------------------------- */
router.use(mw.authentication.auth)
.post("/Login",mw.authentication.login);
/* -------------------------------------------------------------------------- */

/* ---------------------------- Exporting Router ---------------------------- */
module.exports = router;
/* -------------------------------------------------------------------------- */
/* -------------------------- Acquiring all routers ------------------------- */
const bodyParser = require("./bodyParser");
const eventRouter = require("./eventRouter");
const speakerRouter = require("./speakerRouter");
const studentRouter = require("./studentRouter");
const registerRouter = require("./registerRouter");
const authRouter = require("./authRouter");
const corsParser = require("./corsParser");
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting All Routers ------------------------- */
module.exports.bodyParser = bodyParser;
module.exports.eventRouter = eventRouter;
module.exports.speakerRouter = speakerRouter;
module.exports.studentRouter = studentRouter;
module.exports.authRouter = authRouter;
module.exports.corsParser = corsParser;
module.exports.registerRouter = registerRouter;
/* -------------------------------------------------------------------------- */
//region
express = require("express");
server = express();

//Starting Server
server.listen(process.env.PORT ||8000, ()=>{
    console.log("Server is running");
});

//
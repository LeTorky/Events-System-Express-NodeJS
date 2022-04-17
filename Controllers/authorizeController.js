/* --------------------------- Creating Controller -------------------------- */
const authorize = (request, response, role)=>{

    if(!role.includes(request.formData.role)){
        response.status(403);
        throw Error("Un-Authorized!");
    }
}
/* -------------------------------------------------------------------------- */

/* -------------------------- Exporting Controller -------------------------- */
module.exports = authorize;
/* -------------------------------------------------------------------------- */
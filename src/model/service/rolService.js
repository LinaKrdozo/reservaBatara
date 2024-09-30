let db = require('../db/models')

module.exports = {
    getAllRoles: async function() {
        try {
            return await db.Roles.findAll();
        } catch (error) {
            console.log(error);
        } 
    },
}

const { Type } = require("../db");

const getAllTypes = async () => {
    try {
        let allTypes = await Type.findAll();
        if (!allTypes.length) throw new Error("No Types in Database");
        return allTypes;
    } catch (error) {
        return error.message;
    }
};

module.exports = getAllTypes;
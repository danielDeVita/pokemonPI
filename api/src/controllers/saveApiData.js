const axios = require("axios");
const { Type } = require("../db")

const saveApiData = async () => {
    try {
        const response = await axios('https://pokeapi.co/api/v2/type');
        await Promise.all(
            response.data.results.map(type => {
                let typeToFindOrCreate = {
                    id: type.id,
                    name: type.name
                };
                let { name } = typeToFindOrCreate
                Type.findOrCreate({ where: { name } })
            })
        );
    } catch (error) {
        return error.message
    }
};

module.exports = { saveApiData }

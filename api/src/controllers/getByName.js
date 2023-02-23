const { Pokemon, Type } = require("../db");
const axios = require("axios");

const fromAPI = async (name) => {
    try {
        let responseDB = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let pokeFound = {
            id: responseDB.data.id,
            name: responseDB.data.name,
            image: responseDB.data.sprites.front_default,
            life: responseDB.data.stats[0].base_stat,
            attack: responseDB.data.stats[1].base_stat,
            defense: responseDB.data.stats[2].base_stat,
            speed: responseDB.data.stats[5].base_stat,
            height: responseDB.data.height,
            weight: responseDB.data.weight,
            Types: responseDB.data.types.map(type => type.type.name),
        }
        return pokeFound;
    } catch (error) {
        return `No pokemons found with name ${name} in API`;
    }
};

const fromDB = async (name) => {
    try {
        let responseDB = await Pokemon.findOne({ where: { name: name }, include: [Type] });
        if (!responseDB) throw new Error(`No Pokemons found with name ${name} in DB`);
        return responseDB
    } catch (error) {
        return error.message;
    }
};

const getByName = async (name) => {
    try {
        let pokeFromAPI = await fromAPI(name);
        let pokeFromDB = await fromDB(name);
        let allFoundPoke = [pokeFromAPI, pokeFromDB];
        return allFoundPoke;
    } catch (error) {
        return error.message;
    }
};

module.exports = getByName;
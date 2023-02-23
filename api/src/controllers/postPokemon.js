const { Pokemon, Type } = require("../db");

const postPokemon = async (pokemon) => {
    try {
        const { name, image, life, attack, defense, speed, height, weight, Types } = pokemon;
        if (!name || !image || !life || !attack || !defense) throw new Error("Missing information");
        const pokemonToPost = { name, image, life, attack, defense, speed, height, weight };
        let newPokemon = await Pokemon.create(pokemonToPost);
        newPokemon.addTypes(Types)
        return pokemonToPost;
    } catch (error) {
        return error.message;
    }
};

module.exports = postPokemon;
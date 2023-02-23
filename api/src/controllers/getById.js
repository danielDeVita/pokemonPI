const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getById = async (id) => {
    /* 1008 es el ult pokemon, lo demas es DB (aún siendo UUID) */
    try {
        if (id <= 1008) {
            let response = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
            let data = response.data
            let pokeFound = {
                id: data.id,
                name: data.name,
                image: data.sprites.front_default,
                life: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat,
                height: data.height,
                weight: data.weight,
                Types: data.types.map(type => type.type.name + " ")
            };
            return pokeFound
        } else {
            const pokemon = await Pokemon.findByPk(id, {
                include: [{
                    model: Type,
                    attributes: ["name"],
                    through: { attributes: [] }
                }]
            });
            if (!pokemon) throw new Error("No Pokemons with that id");
            let cleanPokemon = { ...pokemon.toJSON(), Types: pokemon.Types.map((type) => type.name + " ") }
            return cleanPokemon;
        }
    } catch (error) {
        return error.message;
    }
};

module.exports = getById;
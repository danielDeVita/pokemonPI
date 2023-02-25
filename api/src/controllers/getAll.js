const { Pokemon, Type } = require("../db");
const axios = require("axios");

const getAllApi = async () => {
    try {

        const promises = [];
        let url = "https://pokeapi.co/api/v2/pokemon"
        while (promises.length < 50) {
            const { data } = await axios.get(url);
            promises.push(...data.results);
            url = data.next;
        };
        const resolvedPromises = await Promise.all(
            promises.map(async (promise) => {
                const res = await axios.get(promise.url);
                return res.data;
            })
        );
        const pokemonsFromApi = resolvedPromises.map((pokemon) => {
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.sprites.front_default,
                life: pokemon.stats[0].base_stat,
                attack: pokemon.stats[1].base_stat,
                defense: pokemon.stats[2].base_stat,
                speed: pokemon.stats[5].base_stat,
                height: pokemon.height,
                weight: pokemon.weight,
                Types: pokemon.types.map(elem => elem.type.name + " "),
            };
        });

        /* const response = await axios("https://pokeapi.co/api/v2/pokemon?limit=50");
        const pokemons = response.data.results;

        const linkToPokemon = [];

        pokemons.map(pokemon => linkToPokemon.push(axios(pokemon.url).then(response => response.data)));

        const pokemonsFromApi = Promise.all(linkToPokemon).then(response =>
            response.map(pokemon => {
                return {
                    id: pokemon.id,
                    name: pokemon.name,
                    image: pokemon.sprites.front_default,
                    life: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    Types: pokemon.types.map(r => r.type.name + " "),
                }
            }));
        if (!pokemonsFromApi) throw new Error("No pokemons found in API")*/

        return pokemonsFromApi;
    } catch (error) {
        return error.message //o return "No pokemons found in API"
    }
};

const getAllDb = async () => {
    try {
        let pokemonsDB = []
        pokemonsDB = await Pokemon.findAll({
            include: [{
                model: Type,
                attributes: ["name"],
                through: { attributes: [] }
            }]
        });
        if (!pokemonsDB.length) {
            /* throw new Error("No pokemons found in DB") */
            return []
        }
        let cleanPokemonsDB = pokemonsDB.map(pokemon => ({
            ...pokemon.toJSON(),
            Types: pokemon.Types.map(type => type.name + " ")
        }));
        return cleanPokemonsDB
    } catch (error) {
        return error.message;
    }
};

const getAll = async () => {
    try {
        let pokesFromApi = await getAllApi();
        let pokesFromDb = await getAllDb();
        let allPoke = pokesFromApi.concat(pokesFromDb);
        if (!allPoke.length) throw new Error("No pokemons found")
        return allPoke
    } catch (error) {
        return error.message
    }
};

module.exports = getAll;
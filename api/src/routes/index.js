const { Router } = require('express');
const postPokemon = require("../controllers/postPokemon");
const getAll = require("../controllers/getAll");
const getById = require('../controllers/getById');
const getAllTypes = require("../controllers/getAllTypes");
const getByName = require("../controllers/getByName")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", async (req, res) => {
    try {
        const { name } = req.query;
        let allPokemons;

        if (name) allPokemons = await getByName(name)
        else allPokemons = await getAll();

        if (allPokemons.error) throw new Error(allPokemons.error);
        return res.status(200).json(allPokemons);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.get("/pokemons/:id", async (req, res) => {
    try {
        const pokemon = await getById(req.params.id);
        if (pokemon.error) throw new Error(pokemon.error);
        return res.status(200).json(pokemon);
    } catch (error) {
        return res.status(404).send(error)
    }
});

router.post("/pokemons", async (req, res) => {
    try {
        const pokemonToPost = await postPokemon(req.body);
        if (pokemonToPost.error) throw new Error(pokemonToPost.error);
        return res.status(200).json(pokemonToPost);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.get("/types", async (req, res) => {
    try {
        const allTypes = await getAllTypes();
        if (allTypes.error) throw new Error(allTypes.error);
        return res.status(200).json(allTypes);
    } catch (error) {
        return res.status(404).send(error)
    }
});

module.exports = router;

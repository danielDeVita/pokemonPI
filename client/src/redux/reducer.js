import { GET_POKEMONS, ORDER_BY_NAME, ORDER_BY_ATTACK, FILTER_BY_SOURCE, SEARCH_BY_NAME, FILTER_BY_TYPE, GET_TYPES, GET_POKEMON } from "./actions";

const initialState = {
    pokemons: [],
    pokemonsToOrder: [],
    types: [],
    pokemon: {},
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsToOrder: action.payload
            };
        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            };
        case ORDER_BY_NAME:
            return {
                ...state,
                pokemonsToOrder: [...state.pokemonsToOrder].sort((a, b) => {
                    if (action.payload === "Ascendent") {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    } else { //es "Descendent"
                        if (a.name < b.name) return 1;
                        if (a.name > b.name) return -1;
                        return 0;
                    }
                }),
            };
        case ORDER_BY_ATTACK:
            return {
                ...state,
                pokemonsToOrder: [...state.pokemonsToOrder].sort((a, b) => {
                    if (action.payload === "Ascendent") {
                        if (a.attack < b.attack) return -1;
                        if (a.attack > b.attack) return 1;
                        return 0;
                    } else { //es "Descendent"
                        if (a.attack < b.attack) return 1;
                        if (a.attack > b.attack) return -1;
                        return 0;
                    }
                }),
            };
        case FILTER_BY_SOURCE:
            let createdPokemons;
            if (action.payload === "Db") createdPokemons = [...state.pokemons].filter(pokemon => pokemon.createdAt);
            if (action.payload === "Api") createdPokemons = [...state.pokemons].filter(pokemon => !pokemon.createdAt);

            return {
                ...state,
                pokemonsToOrder: action.payload === "Reset" ? state.pokemons : createdPokemons
            };
        case SEARCH_BY_NAME:
            return {
                ...state,
                pokemonsToOrder: state.pokemons.filter(pokemon => pokemon.name === action.payload)
            };
        case FILTER_BY_TYPE:

            return {
                ...state,
                pokemonsToOrder: state.pokemons.filter(pokemon => pokemon.Types.includes(action.payload))
            };
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        default:
            return { ...state }
    }
};

export default reducer;
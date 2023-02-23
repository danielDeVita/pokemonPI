import axios from 'axios';

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON = "GET_POKEMON";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_TYPES = "GET_TYPES";

export const getPokemons = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            "http://localhost:3001/pokemons"
        );
        const pokemons = apiData.data;
        dispatch({ type: GET_POKEMONS, payload: pokemons })
    };
};

export const getPokemon = (id) => {
    return async function (dispatch) {
        const apiData = await axios.get(
            `http://localhost:3001/pokemons/${id}`
        );
        const pokemon = apiData.data;
        dispatch({ type: GET_POKEMON, payload: pokemon })
    };
};

export const filterByType = (type) => {
    return { type: FILTER_BY_TYPE, payload: type }
};

export const filterBySource = (createdAt) => {
    return { type: FILTER_BY_SOURCE, payload: createdAt }
};

export const orderByName = (criteria) => {
    return { type: ORDER_BY_NAME, payload: criteria }
};

export const orderByAttack = (criteria) => {
    return { type: ORDER_BY_ATTACK, payload: criteria }
};

export const searchByName = (name) => {
    return { type: SEARCH_BY_NAME, payload: name }
};

export const getTypes = () => {
    return async function (dispatch) {
        const apiData = await axios.get(
            "http://localhost:3001/types"
        );
        const types = apiData.data;
        dispatch({ type: GET_TYPES, payload: types })
    }
}
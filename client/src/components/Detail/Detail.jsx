import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Detail.module.css';

const Detail = () => {

    const navigate = useNavigate();
    const handleNavigate = () => navigate("/home")

    const { id } = useParams();

    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/pokemons/${id}`)
            .then(response => setPokemon(response.data))
            .catch(error => console.error(error))
    }, [id]);

    return (

        <div className={styles.detail}>
            <button className={styles.buttonToHome} onClick={handleNavigate}>Go back to Home Page</button>
            <h4>Id: {pokemon.id}</h4>
            <h1>Name: {pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>Life: {pokemon.life}</h3>
            <h3>Attack: {pokemon.attack}</h3>
            <h3>Defense: {pokemon.defense}</h3>
            <h3>Speed: {pokemon.speed}</h3>
            <h3>Height: {pokemon.height}</h3>
            <h3>Weight: {pokemon.weight}</h3>
            <h3>Types: {pokemon.Types}</h3>

        </div>

    );
};

export default Detail;

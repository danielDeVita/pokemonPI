import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchByName } from '../../redux/actions';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {

    const [pokeSearch, setPokeSearch] = useState("");

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setPokeSearch(e.target.value)
    };

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(searchByName(pokeSearch))
    };

    const navigate = useNavigate();
    const handleNavigate = () => navigate("/form")

    return (
        <form className={styles.searchBar} onSubmit={handleSearch}>
            <input className={styles.searchInput} type="search" placeholder='Search...' onChange={handleChange} value={pokeSearch} />
            <button className={styles.searchButton}>Go!</button>
            <button className={styles.buttonToHome} onClick={handleNavigate}>Create Pokemon</button>
        </form>
    );
}

export default SearchBar;

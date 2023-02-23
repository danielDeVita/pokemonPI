import React, { useEffect } from 'react';
import CardContainer from '../CardContainer/CardContainer';
import SearchBar from '../SearchBar/SearchBar';
import { useDispatch } from 'react-redux';
import { getPokemons, orderByName, orderByAttack, filterBySource, filterByType } from '../../redux/actions';
import styles from './Homepage.module.css';

const Homepage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    const handleChange = (e) => {
        e.target.name === "orderByName" && dispatch(orderByName(e.target.value))
        e.target.name === "orderByAttack" && dispatch(orderByAttack(e.target.value))
        e.target.name === "filterBySource" && dispatch(filterBySource(e.target.value))
        e.target.name === "filterByType" && dispatch(filterByType(e.target.value))
    };

    return (
        <div>
            <SearchBar />
            <h1 className={styles.h1title}>Homepage</h1>
            <div className={styles.selectContainer}>
                <select className={styles.selectList} name="orderByName" defaultValue={"default"} onChange={handleChange}>
                    <option value="default" disabled>Order by name</option>
                    <option value="Ascendent">Ascendent</option>
                    <option value="Descendent">Descendent</option>
                </select>

                <select className={styles.selectList} name="orderByAttack" defaultValue={"default"} onChange={handleChange}>
                    <option value="default" disabled>Order by attack</option>
                    <option value="Ascendent">Ascendent</option>
                    <option value="Descendent">Descendent</option>
                </select>

                <select className={styles.selectList} name="filterBySource" defaultValue={"default"} onChange={handleChange}>
                    <option value="default" disabled>Filter by source</option>
                    <option value="Reset">Reset filter</option>
                    <option value="Api">Api</option>
                    <option value="Db">Db</option>
                </select>

                <select className={styles.selectList} name="filterByType" defaultValue={"default"} onChange={handleChange}>
                    <option value="default" disabled>Filter by Type</option>
                    <option value="ground ">Ground</option>
                    <option value="steel ">Steel</option>
                    <option value="dark ">Dark</option>
                    <option value="flying ">Flying</option>
                    <option value="rock ">Rock</option>
                    <option value="water ">Water</option>
                    <option value="psychic ">Psychic</option>
                    <option value="unknown ">Unknown</option>
                    <option value="poison ">Poison</option>
                    <option value="fire ">Fire</option>
                    <option value="ice ">Ice</option>
                    <option value="shadow ">Shadow</option>
                    <option value="normal ">Normal</option>
                    <option value="bug ">Bug</option>
                    <option value="grass ">Grass</option>
                    <option value="dragon ">Dragon</option>
                    <option value="fairy ">Fairy</option>
                    <option value="fighting ">Fighting</option>
                    <option value="ghost ">Ghost</option>
                    <option value="electric ">Electric</option>
                </select>
            </div>
            <CardContainer />
        </div>
    );
}

export default Homepage;

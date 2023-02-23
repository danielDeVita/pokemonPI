import React, { useState } from 'react';
import Card from '../Card/Card'
import { useSelector } from 'react-redux';
import styles from './CardContainer.module.css';

const CardContainer = () => {

    const pokemons = useSelector(state => state.pokemonsToOrder);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const pages = [];
    for (let i = 1; i <= Math.ceil(pokemons.length / itemsPerPage); i++) {
        pages.push(i);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))
    };

    const renderPageNumbers = pages.map(number => {
        return (
            <li className={styles.listItem} key={number} id={number} onClick={handleClick}>
                {number}
            </li>
        )
    });

    return (
        <div>
            <div className={styles.ulContainer}>
                <ul className={styles.unorganizedList}>{renderPageNumbers}</ul>
            </div>

            {!pokemons.length && <h3>No se hallaron resultados.</h3>}

            <div className={styles.cardContainer}>
                {
                    currentItems.map(pokemon => (
                        <Card
                            name={pokemon.name}
                            image={pokemon.image}
                            types={pokemon.Types}
                            key={pokemon.id}
                            id={pokemon.id}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default CardContainer;

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

const Card = ({ name, image, types, id }) => {
    return (
        <div className={styles.card}>
            <Link to={`/detail/${id}`}>
                <h1>Name: {name}</h1>
                <img src={image} alt={name} />
                <p>Types: {types}</p>
            </Link>
        </div>
    );
}

export default Card;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {

    const navigate = useNavigate();
    const handleNavigate = () => navigate("/")

    return (
        <div className={styles.notFoundContainer}>
            <button className={styles.buttonToHome} onClick={handleNavigate}>404: click here to return</button>
        </div>
    );
}

export default NotFound;

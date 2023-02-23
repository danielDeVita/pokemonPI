import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css'

const LandingPage = () => {

    const navigate = useNavigate();
    const handleNavigate = () => navigate("/home")

    return (
        <div className={styles.container}>
            <h1 className={styles.h1welcome}>Welcome!</h1>
            <button className={styles.button} onClick={handleNavigate}>Come in and Catch'Em All!</button>
            <img className={styles.backgroundImage} src='https://wallpapercave.com/wp/dIqooJo.jpg' alt='pokeball' />
        </div>
    );
}

export default LandingPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validate } from './Validate';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes } from '../../redux/actions';
import styles from './Form.module.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {

    const [pokeData, setPokeData] = useState({
        name: "",
        image: "",
        life: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        Types: [],
    });

    const [errors, setErrors] = useState({
        /*   name: "",
          image: "",
          life: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          Types: "", */
    });

    const handleInputChange = (e) => {
        setPokeData({
            ...pokeData,
            [e.target.name]: e.target.value
        });

        setErrors(
            validate({
                ...pokeData,
                [e.target.name]: e.target.value
            })
        );
    };

    // if (Object.keys(errors).length === 0) {
    //   setErrors({
    //     name: "",
    //   image: "",
    // life: "",
    //attack: "",
    //defense: "",
    //speed: "",
    //height: "",
    // weight: "",
    // /* types: "", */
    // })
    // };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (Object.keys(errors).length === 0) {
                await axios.post('http://localhost:3001/pokemons/', pokeData);
                alert("Pokemon created succesfully");
                navigate("/home")
            } else {
                alert("Missing information")
            }
        } catch (error) {
            console.error(error)
        }
    };

    let types = useSelector(state => state.types);
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

    const navigate = useNavigate();
    const handleNavigate = () => navigate("/home")

    return (

        <form className={styles.formPoke} onSubmit={handleSubmit}>

            <button className={styles.buttonToHome} onClick={handleNavigate}>Go back to Home Page</button>

            <label htmlFor='name'>Name</label>
            <input name='name' id='name' onChange={handleInputChange} value={pokeData.name}></input>
            <p className={styles.error}>{errors.name}</p>
            <label htmlFor='image'>Image</label>
            <input name='image' id='image' onChange={handleInputChange} value={pokeData.image}></input>
            <p className={styles.error}>{errors.image}</p>
            <label htmlFor='life'>Life</label>
            <input name='life' id='life' onChange={handleInputChange} value={pokeData.life}></input>
            <p className={styles.error}>{errors.life}</p>
            <label htmlFor='attack'>Attack</label>
            <input name='attack' id='attack' onChange={handleInputChange} value={pokeData.attack}></input>
            <p className={styles.error}>{errors.attack}</p>
            <label htmlFor='defense'>Defense</label>
            <input name='defense' id='defense' onChange={handleInputChange} value={pokeData.defense}></input>
            <p className={styles.error}>{errors.defense}</p>
            <label htmlFor='speed'>Speed</label>
            <input name='speed' id='speed' onChange={handleInputChange} value={pokeData.speed}></input>
            <p className={styles.error}>{errors.speed}</p>
            <label htmlFor='height'>Height</label>
            <input name='height' id='height' onChange={handleInputChange} value={pokeData.height}></input>
            <p className={styles.error}>{errors.height}</p>
            <label htmlFor='weight'>Weight</label>
            <input name='weight' id='weight' onChange={handleInputChange} value={pokeData.weight}></input>
            <p className={styles.error}>{errors.weight}</p>
            <label htmlFor='types'>Types</label>

            <select multiple={true} value={pokeData.Types} name='Types' onChange={handleInputChange}>
                {types.map((type, index) => <option key={index} value={type.id}>{type.name}</option>)}
            </select>

            {/*  <label>Ground<input type="checkbox" value={1} name="Types" onChange={handleInputChange}></input></label>
            <label>Fighting<input type="checkbox" value={2} name="Types" onChange={handleInputChange}></input></label>
            <label>Flying<input type="checkbox" value={3} name="Types" onChange={handleInputChange}></input></label>
            <label>Normal<input type="checkbox" value={4} name="Types" onChange={handleInputChange}></input></label>
            <label>Poison<input type="checkbox" value={5} name="Types" onChange={handleInputChange}></input></label><br />
            <label>Rock<input type="checkbox" value={6} name="Types" onChange={handleInputChange}></input></label>
            <label>Bug<input type="checkbox" value={7} name="Types" onChange={handleInputChange}></input></label>
            <label>Ghost<input type="checkbox" value={8} name="Types" onChange={handleInputChange}></input></label>
            <label>Water<input type="checkbox" value={9} name="Types" onChange={handleInputChange}></input></label>
            <label>Fire<input type="checkbox" value={10} name="Types" onChange={handleInputChange}></input></label><br />
            <label>Steel<input type="checkbox" value={11} name="Types" onChange={handleInputChange}></input></label>
            <label>Grass<input type="checkbox" value={12} name="Types" onChange={handleInputChange}></input></label>
            <label>Psychic<input type="checkbox" value={13} name="Types" onChange={handleInputChange}></input></label>
            <label>Ice<input type="checkbox" value={14} name="Types" onChange={handleInputChange}></input></label>
            <label>Dragon<input type="checkbox" value={15} name="Types" onChange={handleInputChange}></input></label> <br />
            <label>Electric<input type="checkbox" value={16} name="Types" onChange={handleInputChange}></input></label>
            <label>Dark<input type="checkbox" value={17} name="Types" onChange={handleInputChange}></input></label>
            <label>Fairy<input type="checkbox" value={18} name="Types" onChange={handleInputChange}></input></label>
            <label>Unknown<input type="checkbox" value={19} name="Types" onChange={handleInputChange}></input></label>
            <label>Shadow<input type="checkbox" value={20} name="Types" onChange={handleInputChange}></input></label> */}

            <button type="submit">Create</button>

        </form>
    );
}

export default Form;

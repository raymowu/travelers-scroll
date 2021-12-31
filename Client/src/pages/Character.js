import React from 'react'
import '../css/home.css'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const CHARACTER_API = 'https://api.genshin.dev/characters/';

const Character = () => {

    const [ character, setCharacter ] = useState([]);
    useEffect(() => {
        getCharacter(characterName);
        }, []);
    
    
        //fetches character w unique character api
        const getCharacter = (characterName) => {
        fetch(CHARACTER_API + characterName)
        .then(res => res.json())
        .then(data => {
            setCharacter(data);
        })
        // const res = await fetch(API);
        // const data = await res.json()
        // setCharacter(data.results)
        }

    let { characterName } = useParams();


    return (
        <div className="character-container">
        <div className="character">
            <img src={(CHARACTER_API + characterName + '/icon')} alt={characterName} />
            <h3>{character.name}</h3>
        </div>
                    
                    <h3>{character.description}</h3>
                    </div>
    )
}

export default Character

import React from 'react'
import '../css/character.css'
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
        <div className="character-header">
        <div className="character-page">
            <img src={(CHARACTER_API + characterName + '/icon')} alt={characterName} />
            <h1>{character.name}</h1>
            </div>
            <div className="break"></div>
            <h3>{character.description}</h3>
        
                    
                    </div>
                    </div>
    )
}

export default Character

import React from 'react'
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
        <div>
            <h1>{character.name}</h1>
            <h2>{character.vision}</h2>
        </div>
    )
}

export default Character

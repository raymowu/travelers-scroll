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
        
        
        <div className="container">
            <div className="character-header" 
            style={{backgroundImage: `url(https://api.genshin.dev/characters/${characterName}/gacha-splash)`}}>
            <img src={(CHARACTER_API + characterName + '/icon')} alt={characterName} />
            <ul>
                <li><h2>Genshin Impact</h2></li>
                <li><h1>{character.name}</h1></li>
                <li><h2> <span className={`${character.vision}`}>{character.vision}</span> &#x2022; {character.weapon}</h2></li>
            </ul>
            
            </div>
            
            <h3>{character.description}</h3>
        
                    
                    </div>
                    
                  
    )
}

export default Character

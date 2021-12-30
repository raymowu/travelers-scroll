import React, { useEffect, useState } from 'react';
import '../css/home.css'
import CharacterCard from '../components/CharacterCard'
import Axios from "axios"

const CHARACTER_API = 'https://api.genshin.dev/characters/';

function Home() {
    const [ characters, setCharacters ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');

    useEffect(() => {
    getCharacters(CHARACTER_API);
    }, []);


    //fetches characters w character api
    const getCharacters = (API) => {
    fetch(API)
    .then(res => res.json())
    .then(data => {
        setCharacters(data);
    })
    // const res = await fetch(API);
    // const data = await res.json()
    // setCharacters(data.results)
    }

    const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm) {
        console.log('render')
        // getCharacters(CHARACTER_API + searchTerm)
    }
    }

    const handleOnSubmit = (e) => {
    e.preventDefault();
    }



    return (
        <>
        <div className="character-container">
        <form onSubmit={handleOnSubmit}>
        <input className="search-bar"
        type="search"
        placeholder="Search for a character..."
        value={searchTerm}
        onChange={handleOnChange}/>
        </form>
        <div className="break"></div>
        {characters.length > 0 && 
        characters.filter((characterName) => {
            if (searchTerm === "") {
            return characterName
            } else if (characterName.toLowerCase().includes(searchTerm.toLowerCase())) {
            return characterName
            }
            return false;
        }).map((characterName) => {
            return (

            <CharacterCard characterName={characterName}/>
           
            )
    })}
        </div>
        </>
    );
}

export default Home;

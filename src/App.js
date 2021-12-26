import React, { useEffect, useState } from 'react';
import './App.css';
import Character from './components/Character'

const CHARACTER_API = 'https://api.genshin.dev/characters/';

function App() {
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
      <div class="break"></div>
      {characters.length > 0 && 
      characters.filter((characterName) => {
        if (searchTerm == "") {
          return characterName
        } else if (characterName.toLowerCase().includes(searchTerm.toLowerCase())) {
          return characterName
        }
      }).map((characterName) => {
        return (
      <div className="character">
            <img src={(CHARACTER_API + characterName + '/icon')} alt={characterName}
            />
        <h3>{characterName}</h3>
        
        </div>
        );
})}
    </div>
    </>
  );
}

export default App;

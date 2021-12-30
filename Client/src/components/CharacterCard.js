import React from 'react'

const CHARACTER_API = 'https://api.genshin.dev/characters/';

//replaces "-" with a space and capitalizes each word
function initializeName(string) {
    let newName;
    newName = string.replace('-', ' ');
    const words = newName.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    newName = words.join(' ');
    
    return newName;
    }
    
   
const CharacterCard = ({ characterName }) => {
    
    return (
        
        <>
        <div className="character">
            <a href={`/characters/${characterName}`}>
                <img src={(CHARACTER_API + characterName + '/icon')} alt={characterName}
                />
                </a>
            <h3>{initializeName(characterName)}</h3>
            
            </div>
</>
    )
}

export default CharacterCard

import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';
import notavailable from '/Users/totallyfarhan/Desktop/PokemonGame/frontend/src/resources/notavailable.png';

const playerWin = () => {
  return <p>Player Wins!</p>
}
const computerWin = () => {
  return <p>Computer Wins!</p>
}


function App() {
  const [playerPokemonName, setPlayerPokemonName] = useState("Name")
  const [playerPokemonImage, setPlayerPokemonImage] = useState(`${notavailable}`)
  const [playerPokemonAttack, setPlayerPokemonAttack] = useState(0)
  const [playerPokemonDefense, setPlayerPokemonDefense] = useState(0)
  const [playerPokemonSpeed, setPlayerPokemonSpeed] = useState(0)

  const [computerPokemonName, setComputerPokemonName] = useState("Name")
  const [computerPokemonImage, setComputerPokemonImage] = useState(`${notavailable}`)
  const [computerPokemonAttack, setComputerPokemonAttack] = useState(0)
  const [computerPokemonDefense, setComputerPokemonDefense] = useState(0)
  const [computerPokemonSpeed, setComputerPokemonSpeed] = useState(0)

  const [randomId1, setRandomId1] = useState(Math.floor(Math.random() * 898))
  const [randomId2, setRandomId2] = useState(Math.floor(Math.random() * 898))

  const [winStatus, setWinStatus] = useState(null)

  return (
    <div className="App">
      <h1 className="header">PokéFight</h1>
      <div className="pokemon">
        <Pokemon 
          name={playerPokemonName} 
          image={playerPokemonImage}
          attack={playerPokemonAttack}
          defense={playerPokemonDefense}
          speed={playerPokemonSpeed}
        />
        <Pokemon 
          name={computerPokemonName} 
          image={computerPokemonImage}
          attack={computerPokemonAttack}
          defense={computerPokemonDefense}
          speed={computerPokemonSpeed}
        />  
        <button onClick={async () => {
            setRandomId1(randomId1 => Math.floor(Math.random() * 898));
            setRandomId2(randomId2 => Math.floor(Math.random() * 898));

            if (randomId1 === 0 || randomId2 === 0) {
              setRandomId1(randomId1 => Math.floor(Math.random() * 898));
              setRandomId2(randomId2 => Math.floor(Math.random() * 898));
            }

            await axios.get(`/${randomId1}`).then(response => {
              console.log(response)
              setPlayerPokemonName(playerPokemonName => response.data.name)
              setPlayerPokemonImage(playerPokemonImage => response.data.image)
              setPlayerPokemonAttack(playerPokemonAttack => response.data.stats.attack)
              setPlayerPokemonDefense(playerPokemonDefense => response.data.stats.defense)
              setPlayerPokemonSpeed(playerPokemonSpeed => response.data.stats.speed)
            })

            await axios.get(`/${randomId2}`).then(response => {
              console.log(response)
              setComputerPokemonName(computerPokemonName => response.data.name)
              setComputerPokemonImage(computerPokemonImage => response.data.image)
              setComputerPokemonAttack(computerPokemonAttack => response.data.stats.attack)
              setComputerPokemonDefense(computerPokemonDefense => response.data.stats.defense)
              setComputerPokemonSpeed(computerPokemonSpeed => response.data.stats.speed)
            })
        }}>FIGHT!</button>
      </div>
      <div className="results">
        {playerPokemonAttack + playerPokemonDefense + playerPokemonSpeed > computerPokemonAttack + computerPokemonDefense + computerPokemonSpeed ? playerWin() : playerPokemonAttack + playerPokemonDefense + playerPokemonSpeed < computerPokemonAttack + computerPokemonDefense + computerPokemonSpeed ? computerWin() : <p>Tie!</p>}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { fetchPokemonData } from "./useFetchPokemon";
import "./App.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const data = await fetchPokemonData(8);
        setCards(data);
      } catch (error){
        console.log("Error fetching Pokemon data:", error);
      }
    };
    loadPokemonData();
  }, []);

  const handleCardClick = (id) => {
    if (pickedCards.includes(id)){
      alert("You picked the same card! Game over");
      setBestScore(Math.max(currentScore, bestScore));
      setCurrentScore(0);
      setPickedCards([]);
    } else {
      setPickedCards([...pickedCards, id]);
      setCurrentScore(currentScore + 1);
    }
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <h2>Best Score: {bestScore}</h2>
      <h2>Current Score: {currentScore}</h2>
      <div className="card-grid">
        {cards.map(card => (
          <div key={card.id} className="card" onClick={() => handleCardClick(card.id)}>
            <img src={card.image} alt={`Pokemon ${card.id}`}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
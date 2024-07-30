import React, { useState, useEffect } from "react";
import { fetchPokemonData } from "./useFetchPokemon";
import "./App.css";

const App = () => {
  const [cards, setCards] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }
  
  const resetGame = () => {
    const newShuffledCards = shuffleArray(cards);
    setCards([...newShuffledCards]);
  }

  useEffect(() => {
    const loadPokemonData = async () => {
      try {
        const data = await fetchPokemonData(8);
        const shuffledData = shuffleArray(data);
        console.log("initial load and shuffle", shuffledData);
        setCards(shuffledData);
      } catch (error){
        console.log("Error fetching Pokemon data:", error);
      }
    };
    loadPokemonData();
  }, []);

  const handleCardClick = (id) => {
    console.log(`card clicked: ${id}`);
    if (pickedCards.includes(id)){
      alert("You picked the same card! Game over");
      setBestScore(Math.max(currentScore, bestScore));
      setCurrentScore(0);
      setPickedCards([]);

      resetGame();

    } else {
      setPickedCards([...pickedCards, id]);
      setCurrentScore(currentScore + 1);

      if (pickedCards.length + 1 === cards.length){
        alert("you won!");
        resetGame();
      } else {
        const newShuffledCards = shuffleArray(cards);
        setCards([...newShuffledCards]);
      }
    }
  }

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <h2>Best Score: {bestScore}</h2>
      <h2>Current Score: {currentScore}</h2>
      <div className="card-grid">
        {Array.isArray(cards) && cards.map(card => (
          <div key={card.id} className="card" onClick={() => handleCardClick(card.id)}>
            <img src={card.image} alt={`Pokemon ${card.id}`}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
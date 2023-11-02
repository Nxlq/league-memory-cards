import { useEffect, useState } from "react";
import "../styles/GameDisplay.css";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Card({ imgSrc, handleCardClick, id }) {
  return (
    <div className="card">
      <img
        draggable="false"
        onClick={(e) => handleCardClick(e)}
        id={id}
        className="card-img"
        src={imgSrc}
      ></img>
    </div>
  );
}

function CardGrid({ displayedCards, handleCardClick }) {
  console.log({ displayedCards });

  return (
    <div className="card-grid">
      {displayedCards?.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          imgSrc={card.img}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
}

function ScoreBoard({ cardCount }) {
  return (
    <div className="scoreboard">
      <h2>Score: 0/{cardCount}</h2>
    </div>
  );
}

export default function GameDisplay({ imagePool }) {
  const [displayedCards, setdisplayedCards] = useState(selectRandomImages(18));
  const [playerScore, setPlayerScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");

  const cardCount = displayedCards.length;

  function selectRandomImages(amountToSelect) {
    const randomImages = [];

    for (let i = 0; i < amountToSelect; i++) {
      const randomIndex = getRandomIntInclusive(0, imagePool.length - 1);
      const randomImageObj = { ...imagePool[randomIndex], clicked: false };
      randomImages.push(randomImageObj);
    }

    return randomImages;
  }

  function shuffleCards(cardsArr) {
    const newCardsToDisplay = [...cardsArr];

    let CardsLeftToShuffle = newCardsToDisplay.length;

    // while there are Cards left to shuffle
    while (CardsLeftToShuffle) {
      // pick a remaining element
      const index = Math.floor(Math.random() * CardsLeftToShuffle--);

      // and swap it with the current element
      const placeHolder = newCardsToDisplay[CardsLeftToShuffle];
      newCardsToDisplay[CardsLeftToShuffle] = newCardsToDisplay[index];
      newCardsToDisplay[index] = placeHolder;
    }

    return newCardsToDisplay;
  }

  function handleCardClick(e) {
    const clickedCardIndex = displayedCards.findIndex(
      (card) => card.id === e.target.id
    );

    if (displayedCards[clickedCardIndex].clicked) return setGameStatus("over");

    const updatedCards = [...displayedCards];
    updatedCards[clickedCardIndex].clicked = true;

    const newCardsToDisplay = shuffleCards(updatedCards);
    setdisplayedCards(newCardsToDisplay);
  }

  return (
    <>
      {gameStatus === "over" ? <h1>GAME OVER 🤡🤜🤛👹 YOU SUCK</h1> : ""}
      {gameStatus === "playing" ? (
        <>
          <ScoreBoard cardCount={cardCount} />
          <CardGrid
            displayedCards={displayedCards}
            handleCardClick={handleCardClick}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
}

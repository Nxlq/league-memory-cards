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
    <>
      <div className="card-grid invisible">
        {displayedCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            imgSrc={card.img}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
}

function ScoreBoard({ cardCount, playerScore }) {
  return (
    <div className="scoreboard">
      <h2>
        Score: {playerScore}/{cardCount}
      </h2>
    </div>
  );
}

export default function GameDisplay({ imagePool, handleGameOver }) {
  const [displayedCards, setdisplayedCards] = useState(selectRandomImages(18));
  const [playerScore, setPlayerScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        document.querySelector(".card-grid").classList.remove("invisible");
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  const cardCount = displayedCards?.length;

  function selectRandomImages(amountToSelect) {
    if (!imagePool) return;
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

    if (displayedCards[clickedCardIndex].clicked) return handleGameOver();

    const updatedCards = [...displayedCards];
    updatedCards[clickedCardIndex].clicked = true;

    const newCardsToDisplay = shuffleCards(updatedCards);

    setdisplayedCards(newCardsToDisplay);
    setPlayerScore(playerScore + 1);
  }

  return (
    <>
      {isLoading ? <div>LOADING LOADING LOADING</div> : null}
      {!isLoading ? (
        <ScoreBoard cardCount={cardCount} playerScore={playerScore} />
      ) : null}
      <CardGrid
        displayedCards={displayedCards}
        handleCardClick={handleCardClick}
      />
    </>
  );
}

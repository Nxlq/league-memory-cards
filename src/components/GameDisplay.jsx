import { useEffect, useState } from "react";
import "../styles/GameDisplay.css";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Card({ imgSrc, handleCardClick, id }) {
  return (
    <div className="card" id={id} onClick={handleCardClick}>
      <img draggable="false" className="card-img" src={imgSrc}></img>
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

  const cardCount = displayedCards.length;

  function selectRandomImages(amountToSelect) {
    const randomImages = [];

    for (let i = 0; i < amountToSelect; i++) {
      const randomIndex = getRandomIntInclusive(0, imagePool.length - 1);
      randomImages.push(imagePool[randomIndex]);
    }

    return randomImages;
  }

  function shuffleImages() {
    const newImagesToDisplay = [...displayedCards];
    console.log({ newImagesToDisplay });
    let imagesLeftToShuffle = newImagesToDisplay.length;

    // while there are images left to shuffle
    while (imagesLeftToShuffle) {
      // pick a remaining element
      const index = Math.floor(Math.random() * imagesLeftToShuffle--);

      // and swap it with the current element
      const placeHolder = newImagesToDisplay[imagesLeftToShuffle];
      newImagesToDisplay[imagesLeftToShuffle] = newImagesToDisplay[index];
      newImagesToDisplay[index] = placeHolder;
    }

    setdisplayedCards(newImagesToDisplay);
    return newImagesToDisplay;
  }

  return (
    <>
      <ScoreBoard cardCount={cardCount} />
      <CardGrid
        displayedCards={displayedCards}
        handleCardClick={shuffleImages}
      />
    </>
  );
}

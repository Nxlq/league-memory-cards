import { useEffect, useRef, useState } from "react";
import "../styles/GameDisplay.css";
import LoadingBar from "./LoadingScreen";
import Header from "./Header";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Card({ imgSrc, handleCardClick, id, isFlipped }) {
  return (
    <div
      className={`card__wrapper ${isFlipped ? "flipped" : null}`}
      onClick={(e) => handleCardClick(e)}
    >
      <div className="card">
        <div className="front">
          <img
            draggable="false"
            id={id}
            className="card-img"
            src={imgSrc}
          ></img>
        </div>
        <div className="back"></div>
      </div>
    </div>
  );
}

function CardGrid({ displayedCards, handleCardClick, isFlipped }) {
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
            isFlipped={isFlipped}
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

export default function GameDisplay({
  imagePool,
  handleGameOver,
  curCardAmount,
}) {
  const [displayedCards, setdisplayedCards] = useState(
    selectRandomImages(curCardAmount)
  );
  const [playerScore, setPlayerScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  // const cardGridNode = useRef(null);

  // function flipCardsToBack() {
  //   const gridNode = cardGridNode.current;
  //   const cardList = gridNode.querySelectorAll(".card__wrapper");
  //   cardList.forEach((card) => card.classList.add("flipped"));
  // }

  // function unFlipCards() {
  //   if (!cardGridNode.current) return;
  //   const gridNode = cardGridNode.current;
  //   const cardList = gridNode.querySelectorAll(".card__wrapper");
  //   cardList.forEach((card) => card.classList.remove("flipped"));
  // }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        document.querySelector(".card-grid").classList.remove("invisible");
        setIsLoading(false);
      }, 1000);
    }
  }, [isLoading]);

  const cardCount = displayedCards?.length;

  if (playerScore === cardCount) handleGameWin();

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
    //prevents user from clicking while flipping
    if (isFlipped) return;
    const clickedCardIndex = displayedCards.findIndex(
      (card) => card.id === e.target.id
    );
    console.log({ clickedCardIndex });

    if (displayedCards[clickedCardIndex].clicked) return handleGameOver();

    const updatedCards = [...displayedCards];
    updatedCards[clickedCardIndex].clicked = true;

    const newCardsToDisplay = shuffleCards(updatedCards);

    setPlayerScore(playerScore + 1);

    setTimeout(() => {
      setdisplayedCards(newCardsToDisplay);
    }, 600);

    setIsFlipped(true);

    setTimeout(() => {
      setIsFlipped(false);
    }, 1000);
  }

  function handleGameWin() {
    console.log("won");
  }

  return (
    <>
      <Header />
      {isLoading ? <LoadingBar /> : null}
      {!isLoading ? (
        <ScoreBoard cardCount={cardCount} playerScore={playerScore} />
      ) : null}
      <div className="card-grid__wrapper">
        <CardGrid
          displayedCards={displayedCards}
          handleCardClick={handleCardClick}
          isFlipped={isFlipped}
        />
      </div>
    </>
  );
}

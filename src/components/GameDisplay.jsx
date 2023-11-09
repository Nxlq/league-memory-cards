import { useEffect, useRef, useState } from "react";
import "../styles/GameDisplay.css";
import LoadingBar from "./LoadingScreen";
import Header from "./Header";
import cardFlipSound from "../assets/sounds/card-flip-sound.mp3";
import victorySound from "../assets/sounds/victory-sound.mp3";
import defeatSound from "../assets/sounds/fail-sound.mp3";
import epicBackgroundSong from "../assets/sounds/epic-background-song.mp3";

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
  handleVictory,
}) {
  const [displayedCards, setdisplayedCards] = useState(
    selectRandomImages(curCardAmount)
  );
  const [playerScore, setPlayerScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [music] = useState(new Audio(epicBackgroundSong));
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const cardCount = displayedCards?.length;
  let displayTimeout;
  let unflipTimeout;

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
        setIsMusicPlaying(true);
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    if (playerScore === cardCount) {
      clearTimeout(displayTimeout);
      clearTimeout(unflipTimeout);
      music.pause();
      playVictorySound();
      handleVictory();
    }
  });

  useEffect(() => {
    isMusicPlaying ? music.play() : music.pause();
  }, [isMusicPlaying, music]);

  function playVictorySound() {
    const sound = new Audio(victorySound);
    sound.volume = 0.6;
    sound.playbackRate = 1.1;
    sound.play();
  }

  function playDefeatSound() {
    const sound = new Audio(defeatSound);
    sound.volume = 0.7;
    sound.play();
  }

  function selectRandomImages(amountToSelect) {
    if (!imagePool) return;
    const randomImages = [];

    for (let i = 0; i < amountToSelect; i++) {
      let randomIndex = getRandomIntInclusive(0, imagePool.length - 1);

      // if the randomIndex is a duplicate, then keep selecting another one until it is not
      while (
        randomImages.some(
          (imgObj) => imgObj.id === imagePool[randomIndex].id
        ) ||
        imagePool[randomIndex] == null
      ) {
        randomIndex = getRandomIntInclusive(0, imagePool.length - 1);
        console.log("duplicate prevented");
      }

      const randomImageObj = { ...imagePool[randomIndex], clicked: false };
      console.log({ randomImageObj });
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

    if (displayedCards[clickedCardIndex].clicked) {
      music.pause();
      playDefeatSound();
      handleGameOver();
      return;
    }

    const updatedCards = [...displayedCards];
    updatedCards[clickedCardIndex].clicked = true;

    const newCardsToDisplay = shuffleCards(updatedCards);

    setPlayerScore(playerScore + 1);

    displayTimeout = setTimeout(() => {
      setdisplayedCards(newCardsToDisplay);
    }, 600);

    playCardFlipSound();
    setIsFlipped(true);

    unflipTimeout = setTimeout(() => {
      setIsFlipped(false);
      playCardFlipSound();
    }, 1000);
  }

  function playCardFlipSound() {
    if (playerScore + 1 === cardCount) return;
    const sound = new Audio(cardFlipSound);
    sound.playbackRate = 1.3;
    sound.play();
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

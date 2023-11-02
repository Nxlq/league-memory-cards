import { useEffect, useState } from "react";
import "../styles/CardGrid.css";

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Card({ imgSrc, handleCardClick }) {
  return (
    <img
      onClick={handleCardClick}
      draggable="false"
      className="card-img"
      src={imgSrc}
    ></img>
  );
}

function CardGrid({ displayedImages, handleCardClick }) {
  console.log({ displayedImages });

  return (
    <div className="card-grid">
      {displayedImages?.map((image, i) => (
        <Card key={i} imgSrc={image} handleCardClick={handleCardClick} />
      ))}
    </div>
  );
}

export default function GameDisplay({ imagePool }) {
  const [displayedImages, setDisplayedImages] = useState(
    selectRandomImages(18)
  );

  function selectRandomImages(amountToSelect) {
    const randomImages = [];

    for (let i = 0; i < amountToSelect; i++) {
      const randomIndex = getRandomIntInclusive(0, imagePool.length - 1);
      randomImages.push(imagePool[randomIndex]);
    }

    return randomImages;
  }

  function shuffleImages() {
    const newImagesToDisplay = [...displayedImages];
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

    setDisplayedImages(newImagesToDisplay);
    return newImagesToDisplay;
  }

  return (
    <CardGrid
      displayedImages={displayedImages}
      handleCardClick={shuffleImages}
    />
  );
}

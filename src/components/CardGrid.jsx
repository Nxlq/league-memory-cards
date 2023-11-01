import { useEffect, useState } from "react";
import fetchAllSplashArts from "../leagueData";
import "../styles/CardGrid.css";

let images;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function selectRandomImages(amountToSelect) {
  const randomImages = [];

  for (let i = 0; i < amountToSelect; i++) {
    const randomIndex = getRandomIntInclusive(0, images.length - 1);
    randomImages.push(images[randomIndex]);
  }

  return randomImages;
}

function Card({ imgSrc }) {
  return <img className="card-img" src={imgSrc}></img>;
}

export default function CardGrid() {
  // const [allImages, setAllImages] = useState(null);
  const [displayedImages, setDisplayedImages] = useState(null);
  console.log({ images });
  console.log({ displayedImages });

  useEffect(() => {
    if (!displayedImages) {
      fetchAllSplashArts().then((res) => {
        console.log("fired");
        images = res;
        const randomImages = selectRandomImages(18);
        setDisplayedImages(randomImages);
      });
    }
    console.log("fired");
  }, [displayedImages]);

  console.log({ images });
  //   console.log({ leagueImages });

  return (
    <div className="card-grid">
      {displayedImages?.map((image, i) => (
        <Card key={i} imgSrc={image} />
      ))}
    </div>
  );
}

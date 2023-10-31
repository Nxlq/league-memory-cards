import { useEffect, useState } from "react";

function Card({ imgSrc }) {
  console.log(imgSrc);
  return <img src={imgSrc}></img>;
}

export default function CardGrid() {
  const [leagueImages, setLeagueImages] = useState([]);

  useEffect(() => {
    async function getLeagueImages() {
      // fetch a list of all champions
      const response = await fetch(
        "http://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion.json"
      );
      console.log({ response });

      const championsList = await response.json();

      // for each champion fetch their individual json page which contains info about skins that we need
      const promises = [];
      for (const champion in championsList.data) {
        promises.push(
          fetch(
            `http://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion/${champion}.json`
          )
        );
      }

      console.log({ promises });
      const championResponses = await Promise.all(promises);
      console.log({ championResponses });
      const championJson = championResponses.map((res) => res.json());
      console.log({ championJson });
      const data = await Promise.all(championJson);

      console.log(data);

      //   const images = [];

      // for (const champion in data) {
      //   images.push(
      //     `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion}_0.jpg`
      //   );
      // }
      const images = [];

      data.forEach((champion) => {
        const [champInfo] = Object.values(champion.data);
        console.log(champInfo);

        const allSkins = champInfo.skins.map(
          (skin) =>
            `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champInfo.id}_${skin.num}.jpg`
        );

        images.push(...allSkins);
      });
      //   console.log(...allSkinsImagesArr);
      console.log({ images });
      //   console.log(images);
      setLeagueImages(images);
    }

    getLeagueImages();
  }, []);

  console.log({ leagueImages });

  return (
    <div className="card-grid">
      {leagueImages.map((image, i) => (
        <Card key={i} imgSrc={image} />
      ))}
    </div>
  );
}

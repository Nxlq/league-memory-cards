async function fetchChampionsList() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion.json",
    { mode: "cors" }
  );

  const championsList = await response.json();
  return championsList;
}

async function fetchChampionsDetails(championsList) {
  const promises = [];
  for (const champion in championsList.data) {
    promises.push(
      fetch(
        `https://ddragon.leagueoflegends.com/cdn/13.21.1/data/en_US/champion/${champion}.json`,
        { mode: "cors" }
      )
    );
  }

  const championResponses = await Promise.all(promises);

  const championJson = championResponses.map((res) => res.json());

  const data = await Promise.all(championJson);

  return data;
}

export default async function fetchAllSplashArts() {
  // fetch the list of champs json
  const championsList = await fetchChampionsList();

  // fetch each champs individual json page which contains more details about each individual champ than the championsList provides
  const championsDetails = await fetchChampionsDetails(championsList);

  // create an array of all the image links for all champ skin splash arts
  const images = [];

  // loop through the championsDetails.data, map the image link and id for each champs skin, and spread them into the images arr
  championsDetails.forEach((champion) => {
    const [champInfo] = Object.values(champion.data);

    const allSkins = champInfo.skins.map((skin) => {
      if (skin.id == "9009" || skin.id == "9027") return null;

      return {
        img: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champInfo.id}_${skin.num}.jpg`,
        id: skin.id,
      };
    });

    images.push(...allSkins);
  });

  return images;
}

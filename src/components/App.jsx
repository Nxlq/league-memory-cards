import { useEffect, useState } from "react";
import "/src/styles/App.css";
import Header from "./Header";
import fetchAllSplashArts from "../leagueData";
import GameDisplay from "./GameDisplay";
import StartScreen from "./StartScreen";
import VictoryScreen from "./VictoryScreen";

function App() {
  const [imagePool, setImagePool] = useState(null);
  const [gameStatus, setGameStatus] = useState("startScreen");
  const [difficultyLevel, setDifficultyLevel] = useState({
    name: "Iron",
    cardAmt: 3,
  });
  const [highestRankAcheived, setHighestRankAcheived] = useState("Iron");

  const DIFFICULTIES = [
    { name: "Iron", cardAmt: 3 },
    { name: "Bronze", cardAmt: 6 },
    { name: "Silver", cardAmt: 9 },
    { name: "Gold", cardAmt: 12 },
    { name: "Platinum", cardAmt: 15 },
    { name: "Diamond", cardAmt: 18 },
    { name: "Master", cardAmt: 21 },
    { name: "Grandmaster", cardAmt: 24 },
    { name: "Challenger", cardAmt: 27 },
  ];

  console.log({ imagePool });

  const curDifficultyIndex = findDifficultyIndex(difficultyLevel.name);
  const curCardAmount = difficultyLevel.cardAmt;

  console.log({ curDifficultyIndex });

  // handling the imagePool fetching
  useEffect(() => {
    if (!imagePool) {
      fetchAllSplashArts().then((res) => setImagePool(res));
    }
  }, [imagePool]);

  // syncing the user's highest rank achieved to local storage
  // useEffect(() => {
  //   localStorage.setItem("highestRankAchieved", highestRankAcheived);
  // }, [highestRankAcheived]);

  // grabbing the user's highest rank achieved from local storage
  // useEffect(() => {
  //   const highestRankInStorage = localStorage.getItem("highestRankAchieved");
  //   if (highestRankAcheived !== highestRankInStorage) {
  //     setHighestRankAcheived(highestRankInStorage);
  //   }
  // }, [highestRankAcheived]);

  function setGameStatusToPlaying() {
    setGameStatus("playing");
  }

  function setGameStatusToOver() {
    setGameStatus("over");
  }

  function setGameStatusToVictory() {
    setGameStatus("victory");
  }

  function handleDifficultySelect(index) {
    setDifficultyLevel(DIFFICULTIES[index]);
  }

  function findDifficultyIndex(difficultyName) {
    return DIFFICULTIES.findIndex((dif) => dif.name === difficultyName);
  }

  return (
    <>
      {gameStatus === "startScreen" && (
        <StartScreen
          handleStartGame={setGameStatusToPlaying}
          difficultyLevel={difficultyLevel}
          handleDifficultySelect={handleDifficultySelect}
          difficulties={DIFFICULTIES}
        />
      )}
      {gameStatus === "playing" && (
        <GameDisplay
          imagePool={imagePool}
          handleGameOver={setGameStatusToOver}
          curCardAmount={curCardAmount}
          handleVictory={setGameStatusToVictory}
        />
      )}
      {gameStatus === "over" && <h1>GAME OVER 🤡🤜🤛👹 YOU SUCK</h1>}
      {gameStatus === "victory" && <VictoryScreen />}
    </>
  );
}

export default App;

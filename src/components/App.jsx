import { useEffect, useState } from "react";
import "/src/styles/App.css";
import fetchAllSplashArts from "../leagueData";
import GameDisplay from "./GameDisplay";
import StartScreen from "./StartScreen";
import VictoryScreen from "./VictoryScreen";
import GameOverScreen from "./GameOverScreen";

function App() {
  const [imagePool, setImagePool] = useState(null);
  const [gameStatus, setGameStatus] = useState("startScreen");
  const [difficultyLevel, setDifficultyLevel] = useState({
    name: "Iron",
    cardAmt: 3,
  });
  const [highestRankAcheived, setHighestRankAcheived] = useState("Iron");

  console.log({ highestRankAcheived }, "FROM APP");

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

  const curCardAmount = difficultyLevel.cardAmt;
  const curDifficultyIndex = findDifficultyIndex(difficultyLevel.name);
  const curHighestRankIndex = findDifficultyIndex(highestRankAcheived);
  const highestRankInStorage = localStorage.getItem("highestRankCompleted");
  const storageRankIndex = findDifficultyIndex(highestRankInStorage);
  console.log({ highestRankInStorage });

  console.log({ curDifficultyIndex });

  // handling the imagePool fetching
  useEffect(() => {
    if (!imagePool) {
      fetchAllSplashArts().then((res) => setImagePool(res));
    }
  }, [imagePool]);

  //syncing the user's highest rank achieved from local storage
  useEffect(() => {
    if (storageRankIndex > curHighestRankIndex) {
      setHighestRankAcheived(highestRankInStorage);
    }
  }, [curHighestRankIndex, highestRankInStorage, storageRankIndex]);

  function setGameStatusToStartScreen() {
    setGameStatus("startScreen");
  }
  function setGameStatusToPlaying() {
    setGameStatus("playing");
  }

  function setGameStatusToOver() {
    setGameStatus("over");
  }

  function setGameStatusToVictory() {
    setGameStatus("victory");
  }

  function handleVictory() {
    const highestRankInStorage = localStorage.getItem("highestRankCompleted");
    const storageRankIndex = findDifficultyIndex(highestRankInStorage);
    const completedRankIndex = findDifficultyIndex(difficultyLevel.name);

    if (completedRankIndex > storageRankIndex) {
      localStorage.setItem("highestRankCompleted", difficultyLevel.name);
      setHighestRankAcheived(difficultyLevel.name);
    }
    setGameStatusToVictory();
  }

  function handleDifficultySelect(index) {
    setDifficultyLevel(DIFFICULTIES[index]);
  }

  function findDifficultyIndex(difficultyName) {
    return DIFFICULTIES.findIndex((dif) => dif.name === difficultyName);
  }

  function handleTryAgain() {
    setGameStatusToPlaying();
  }

  function handleNextRankBtn() {
    const nextDifficulty = DIFFICULTIES[curDifficultyIndex + 1];
    setDifficultyLevel(nextDifficulty);
    setGameStatusToPlaying();
  }

  return (
    <>
      {gameStatus === "startScreen" && (
        <StartScreen
          handleStartGame={setGameStatusToPlaying}
          difficultyLevel={difficultyLevel}
          handleDifficultySelect={handleDifficultySelect}
          difficulties={DIFFICULTIES}
          highestRankAchieved={highestRankAcheived}
        />
      )}
      {gameStatus === "playing" && (
        <GameDisplay
          imagePool={imagePool}
          handleGameOver={setGameStatusToOver}
          curCardAmount={curCardAmount}
          handleVictory={handleVictory}
        />
      )}
      {gameStatus === "over" && (
        <GameOverScreen
          goToStartScreen={setGameStatusToStartScreen}
          handleTryAgain={handleTryAgain}
        />
      )}
      {gameStatus === "victory" && (
        <VictoryScreen
          goToStartScreen={setGameStatusToStartScreen}
          attemptedDifficulty={difficultyLevel}
          attemptNextRank={handleNextRankBtn}
        />
      )}
    </>
  );
}

export default App;

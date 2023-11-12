import { useEffect, useState } from "react";
import "/src/styles/App.css";
import fetchAllSplashArts from "../leagueData";
import GameDisplay from "./GameDisplay";
import StartScreen from "./StartScreen";
import VictoryScreen from "./VictoryScreen";
import GameOverScreen from "./GameOverScreen";
import clickSound from "../assets/sounds/click-sound.mp3";

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
    { name: "Rank 1", cardAmt: 36 },
  ];

  const curCardAmount = difficultyLevel.cardAmt;
  const curDifficultyIndex = findDifficultyIndex(difficultyLevel.name);
  const curHighestRankIndex = findDifficultyIndex(highestRankAcheived);
  const highestRankInStorage = localStorage.getItem("highestRankCompleted");
  const storageRankIndex = findDifficultyIndex(highestRankInStorage);

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

  // useEffect(() => {
  //   music.addEventListener("ended", () => music.play());
  // });

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

  function playClickSound() {
    const sound = new Audio(clickSound);
    sound.playbackRate = 1.7;
    sound.play();
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
          playClickSound={playClickSound}
          imagePool={imagePool}
        />
      )}
      {gameStatus === "playing" && (
        <GameDisplay
          imagePool={imagePool}
          handleGameOver={setGameStatusToOver}
          curCardAmount={curCardAmount}
          handleVictory={handleVictory}
          curDifficultyName={difficultyLevel.name}
        />
      )}
      {gameStatus === "over" && (
        <GameOverScreen
          goToStartScreen={setGameStatusToStartScreen}
          handleTryAgain={handleTryAgain}
          playClickSound={playClickSound}
        />
      )}
      {gameStatus === "victory" && (
        <VictoryScreen
          goToStartScreen={setGameStatusToStartScreen}
          attemptedDifficulty={difficultyLevel}
          attemptNextRank={handleNextRankBtn}
          playClickSound={playClickSound}
        />
      )}
    </>
  );
}

export default App;

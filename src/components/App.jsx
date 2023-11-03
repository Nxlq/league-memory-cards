import { useEffect, useState } from "react";
import "/src/styles/App.css";
import Header from "./Header";
import fetchAllSplashArts from "../leagueData";
import GameDisplay from "./GameDisplay";
import StartScreen from "./StartScreen";

function App() {
  const [imagePool, setImagePool] = useState(null);
  const [gameStatus, setGameStatus] = useState("startScreen");
  const [difficultyLevel, setDifficultyLevel] = useState("Iron");
  console.log({ imagePool });

  useEffect(() => {
    if (!imagePool) {
      fetchAllSplashArts().then((res) => setImagePool(res));
    }
  }, [imagePool]);

  function setGameStatusToPlaying() {
    setGameStatus("playing");
  }

  function setGameStatusToOver() {
    setGameStatus("over");
  }

  function handleDifficultySelect(e) {
    console.log(e);
    setDifficultyLevel(e.target.textContent);
  }

  return (
    <>
      {gameStatus === "startScreen" && (
        <StartScreen
          handleStartGame={setGameStatusToPlaying}
          difficultyLevel={difficultyLevel}
          handleDifficultySelect={handleDifficultySelect}
        />
      )}
      {gameStatus === "playing" && (
        <GameDisplay
          imagePool={imagePool}
          handleGameOver={setGameStatusToOver}
        />
      )}
      {gameStatus === "over" && <h1>GAME OVER 🤡🤜🤛👹 YOU SUCK</h1>}
    </>
  );
}

export default App;

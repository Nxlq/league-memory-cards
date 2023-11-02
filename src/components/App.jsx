import { useEffect, useState } from "react";
import "/src/styles/App.css";
import Header from "./Header";
import fetchAllSplashArts from "../leagueData";
import GameDisplay from "./GameDisplay";
import StartScreen from "./StartScreen";

function App() {
  const [imagePool, setImagePool] = useState(null);
  const [gameStatus, setGameStatus] = useState("startScreen");
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

  return (
    <>
      <Header />
      {gameStatus === "startScreen" && (
        <StartScreen handleStartGame={setGameStatusToPlaying} />
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

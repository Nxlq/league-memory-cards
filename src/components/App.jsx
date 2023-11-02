import { useEffect, useState } from "react";
import "/src/styles/App.css";
import Header from "./Header";
import fetchAllSplashArts from "../leagueData";
import GameDisplay from "./GameDisplay";

function App() {
  const [imagePool, setImagePool] = useState(null);
  console.log({ imagePool });

  useEffect(() => {
    if (!imagePool) {
      fetchAllSplashArts().then((res) => setImagePool(res));
    }
  }, [imagePool]);

  return (
    <>
      <Header />
      {!imagePool ? "" : <GameDisplay imagePool={imagePool} />}
    </>
  );
}

export default App;

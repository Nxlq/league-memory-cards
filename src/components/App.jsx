import { useEffect, useState } from "react";
import "/src/styles/App.css";
import CardGrid from "./CardGrid";
import Header from "./Header";
import fetchAllSplashArts from "../leagueData";

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
      {!imagePool ? "" : <CardGrid imagePool={imagePool} />}
    </>
  );
}

export default App;

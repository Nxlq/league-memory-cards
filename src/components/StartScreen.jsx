import "../styles/StartScreen.css";
import Header from "./Header";

function DifficultySelection() {
  return (
    <div className="difficulty-selection__container">
      <h2>Select your game mode:</h2>
      <div className="difficulties__container">
        <button>Iron</button>
        <button>Bronze</button>
        <button>Silver</button>
        <button>Gold</button>
        <button>Platinum</button>
        <button>Diamond</button>
        <button>Master</button>
        <button>Grand Master</button>
        <button>Challenger</button>
      </div>
    </div>
  );
}

function CurrentRankDisplay() {
  return (
    <div className="rank-display__container">
      <h2>Your Current Rank:</h2>
      <img
        className="rank-image"
        src="src/assets/rank-icons/Rank=Iron.png"
        alt="image of the players current rank"
      />
      <h2>Iron</h2>
    </div>
  );
}

function HighestRankDisplay() {
  return (
    <div className="rank-display__container">
      <h2>Your Highest Rank:</h2>
      <img
        className="rank-image"
        src="src/assets/rank-icons/Rank=Iron.png"
        alt="image of the players current rank"
      />
      <h2>Iron</h2>
    </div>
  );
}

export default function StartScreen({ handleStartGame }) {
  return (
    <div className="start-screen__container">
      <Header />
      <button className="start-btn" onClick={handleStartGame}>
        Play
      </button>
      <div className="game-info__wrapper">
        <CurrentRankDisplay />
        <DifficultySelection />
        <HighestRankDisplay />
      </div>
    </div>
  );
}

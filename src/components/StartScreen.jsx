import "../styles/StartScreen.css";
import Header from "./Header";

function DifficultySelection({ handleDifficultySelect }) {
  return (
    <div className="difficulty-selection__container">
      <h2>Select your game mode:</h2>
      <div className="difficulties__container">
        <button onClick={(e) => handleDifficultySelect(e)}>Iron</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Bronze</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Silver</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Gold</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Platinum</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Diamond</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Master</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Grandmaster</button>
        <button onClick={(e) => handleDifficultySelect(e)}>Challenger</button>
      </div>
    </div>
  );
}

function CurrentDifficultyDisplay({ difficultyLevel }) {
  return (
    <div className="rank-display__container">
      <h2>Difficulty Selected:</h2>
      <img
        className="rank-image"
        src={`src/assets/rank-icons/Rank=${difficultyLevel}.png`}
        alt="image of the players current rank"
      />
      <h2>{difficultyLevel}</h2>
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

export default function StartScreen({
  handleStartGame,
  difficultyLevel,
  handleDifficultySelect,
}) {
  return (
    <div className="start-screen__container">
      <Header />
      <button className="start-btn" onClick={handleStartGame}>
        Play
      </button>
      <div className="game-info__wrapper">
        <CurrentDifficultyDisplay difficultyLevel={difficultyLevel} />
        <DifficultySelection handleDifficultySelect={handleDifficultySelect} />
        <HighestRankDisplay />
      </div>
    </div>
  );
}

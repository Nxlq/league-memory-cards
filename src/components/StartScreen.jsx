import "../styles/StartScreen.css";
import Header from "./Header";

function DifficultySelection({
  handleDifficultySelect,
  difficulties,
  playClickSound,
}) {
  return (
    <div className="difficulty-selection__container">
      <h2>Select your game mode:</h2>
      <div className="difficulties__container">
        {difficulties.map((dif, i) => (
          <button
            key={dif.name}
            onClick={() => {
              playClickSound();
              handleDifficultySelect(i);
            }}
          >
            {dif.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function CurrentDifficultyDisplay({ difficultyLevel }) {
  return (
    <div className="rank-display__container" id="current-diff-display">
      <h2>Difficulty Selected:</h2>
      <img
        className="rank-image"
        src={`/rank-icons/Rank=${difficultyLevel.name}.png`}
        alt="image of the players current rank"
      />
      <h2>{difficultyLevel.name}</h2>
    </div>
  );
}

function HighestRankDisplay({ highestRankAchieved }) {
  return (
    <div className="rank-display__container" id="highest-diff-display">
      <h2>Your Highest Rank:</h2>
      <img
        className="rank-image"
        src={`/rank-icons/Rank=${highestRankAchieved}.png`}
        alt="image of the players current rank"
      />
      <h2>{highestRankAchieved}</h2>
    </div>
  );
}

export default function StartScreen({
  handleStartGame,
  difficultyLevel,
  handleDifficultySelect,
  difficulties,
  highestRankAchieved,
  playClickSound,
  imagePool,
}) {
  return (
    <div className="start-screen__container">
      <Header />
      {imagePool !== null ? (
        <button
          className="start-btn"
          onClick={() => {
            playClickSound();
            handleStartGame();
          }}
        >
          Play
        </button>
      ) : (
        <button className="start-btn">loading...</button>
      )}
      <div className="game-info__wrapper">
        <CurrentDifficultyDisplay difficultyLevel={difficultyLevel} />
        <DifficultySelection
          handleDifficultySelect={handleDifficultySelect}
          difficulties={difficulties}
          playClickSound={playClickSound}
        />
        <HighestRankDisplay highestRankAchieved={highestRankAchieved} />
      </div>
    </div>
  );
}

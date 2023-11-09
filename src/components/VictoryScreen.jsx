import "../styles/VictoryScreen.css";

export default function VictoryScreen({
  goToStartScreen,
  attemptedDifficulty,
  attemptNextRank,
  playClickSound,
}) {
  return (
    <div className="victory-screen">
      <div className="header__container">
        <h1>Victory!</h1>
        <span>{attemptedDifficulty.name} rank complete</span>
      </div>
      <p>Not bad bucko 🥴 Where would you like to go next?</p>
      <div className="btns__container">
        <button
          onClick={() => {
            playClickSound();
            goToStartScreen();
          }}
        >
          Main menu
        </button>
        {attemptedDifficulty.name === "Rank 1" ? null : (
          <button
            onClick={() => {
              playClickSound();
              attemptNextRank();
            }}
          >
            Next rank
          </button>
        )}
      </div>
    </div>
  );
}

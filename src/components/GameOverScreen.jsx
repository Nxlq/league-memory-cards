import "../styles/GameOverScreen.css";

export default function GameOverScreen({
  goToStartScreen,
  handleTryAgain,
  playClickSound,
}) {
  return (
    <div className="game-over-screen">
      <h1>GAME OVER 🤡🤜🤛👹 YOU SUCK</h1>
      <div className="btns__container">
        <button
          onClick={() => {
            playClickSound();
            goToStartScreen();
          }}
        >
          Main menu
        </button>
        <button
          onClick={() => {
            playClickSound();
            handleTryAgain();
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

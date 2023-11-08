import "../styles/GameOverScreen.css";

export default function GameOverScreen({ goToStartScreen, handleTryAgain }) {
  return (
    <div className="game-over-screen">
      <h1>GAME OVER 🤡🤜🤛👹 YOU SUCK</h1>
      <div className="btns__container">
        <button onClick={goToStartScreen}>Main menu</button>
        <button onClick={handleTryAgain}>Try again</button>
      </div>
    </div>
  );
}

import "../styles/VictoryScreen.css";

export default function VictoryScreen() {
  return (
    <div className="victory-screen">
      <div className="header__container">
        <h1>Victory!</h1>
        <span>Diamond rank complete</span>
      </div>
      <p>Not bad bucko 🥴 Where would you like to go next?</p>
      <div className="btns__container">
        <button>Main menu</button>
        <button>Next rank</button>
      </div>
    </div>
  );
}

import "../styles/Header.css";

function HeaderTitle() {
  return (
    <div className="header-title">
      <img draggable="false" src="/LOL_Icon_Rendered_Hi-Res-NoRing.png"></img>
      <h1>eague Of Memory</h1>
    </div>
  );
}

export default function Header() {
  return <HeaderTitle />;
}

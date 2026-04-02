export default function Menu({ setGame }) {
  return (
    <div className="menu">
      <h1>Mini Game Hub</h1>

      <button onClick={() => setGame("block")}>Block Puzzle</button>
      <button onClick={() => setGame("colorScrew")}>Color Screw Sort</button>

      {/* Future Games */}
      <button disabled>More Coming Soon</button>
    </div>
  );
}
import { useState } from "react";
import Menu from "./menu/menu";
import BlockPuzzle from "./games/blockPuzzle/BlockPuzzle";
import ColorScrewSort from "./games/colorScrewSort/ColorScrewSort";


export default function App() {
  const [game, setGame] = useState(null);

  if (!game) return <Menu setGame={setGame} />;

  return (
    <div>
      <button className="back" onClick={() => setGame(null)}>
        ← Back to Menu
      </button>

      {game === "block" && <BlockPuzzle />}
      {game === "colorScrew" && <ColorScrewSort />}
    </div>
  );
}
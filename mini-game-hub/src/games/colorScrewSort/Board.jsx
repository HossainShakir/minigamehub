import { useState } from "react";

export default function Board({ board, onDrop }) {
  const [draggedFrom, setDraggedFrom] = useState(null);

  const handleDragStart = (e, colIdx) => {
    setDraggedFrom(colIdx);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e) => {
    // If dropped outside a bolt, do nothing: screw stays in original bolt
    setDraggedFrom(null);
  };

  const handleDrop = (e, toIdx) => {
    e.preventDefault();
    if (draggedFrom === null) return;

    // Only drop if rules allow
    const fromBolt = board[draggedFrom];
    const toBolt = board[toIdx];

    if (!fromBolt || fromBolt.length === 0) return;

    const movingScrew = fromBolt[fromBolt.length - 1];

    // Rules: max per bolt, only same color on top or empty
    if (toBolt.length >= 4) return;
    if (toBolt.length > 0 && toBolt[toBolt.length - 1] !== movingScrew) return;

    onDrop(draggedFrom, toIdx);
    setDraggedFrom(null);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="board">
      {board.map((bolt = [], idx) => (
        <div
          key={idx}
          className="bolt"
          onDrop={(e) => handleDrop(e, idx)}
          onDragOver={handleDragOver}
        >
          {bolt.map((screw, i) => {
            const isTop = i === bolt.length - 1;
            return (
              <div
                key={i}
                className="screw"
                style={{ backgroundColor: screw }}
                draggable={isTop}
                onDragStart={(e) => isTop && handleDragStart(e, idx)}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
import { useState } from "react";
import { canPlace } from "./logic";

export default function Board({ grid, dragging, onPlace }) {
  const [hover, setHover] = useState(null);

const getAnchorStart = (x, y) => {
  if (!dragging) return { x, y };
  const shape = dragging.shape;
  const anchorX = 0;
  const anchorY = 1;

  let startX = x - anchorX;
  let startY = y - anchorY;

  // Clamp startX and startY to avoid negative indexing
  startX = Math.max(0, Math.min(startX, grid[0].length - shape[0].length));
  startY = Math.max(0, Math.min(startY, grid.length - shape.length));

  return { x: startX, y: startY };
};

  const isPreviewCell = (x, y) => {
  if (!dragging || !hover) return false;
  const start = getAnchorStart(hover.x, hover.y);
  const shape = dragging.shape;

  for (let sy = 0; sy < shape.length; sy++) {
    for (let sx = 0; sx < shape[sy].length; sx++) {
      if (!shape[sy][sx]) continue;
      const px = start.x + sx;
      const py = start.y + sy;
      if (px < 0 || py < 0 || py >= grid.length || px >= grid[0].length) continue;
      if (px === x && py === y) return true;
    }
  }
  return false;
};

  return (
    <div className="board">
      {grid.map((row, y) =>
        row.map((cell, x) => {
          const preview = isPreviewCell(x, y);
          let valid = false;

          if (dragging && hover) {
            const start = getAnchorStart(hover.x, hover.y);
            valid = canPlace(grid, dragging.shape, start.x, start.y);
          }

          return (
            <div
              key={`${x}-${y}`}
              className="cell"
              style={{
                background:
                  cell ||
                  (preview && valid && dragging?.color) ||
                  (preview && !valid && "#ff000055"),
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setHover({ x, y });
              }}
              onDrop={() => {
                if (!hover) return;
                const start = getAnchorStart(hover.x, hover.y);
                onPlace(start.x, start.y);
              }}
            />
          );
        })
      )}
    </div>
  );
}
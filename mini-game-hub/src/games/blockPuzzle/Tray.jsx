const COLORS = ["#ff4d8d", "#4dd2ff", "#ffd24d", "#7dff7d", "#c47dff"];

export default function Tray({ blocks, setDragging }) {
  return (
    <div className="tray">
      {blocks.map((shape, i) => {
        if (!shape) return <div key={i} className="block-preview empty" />;

        const color = COLORS[i % COLORS.length];

        return (
          <div
            key={i}
            className="block-preview"
            draggable
            onDragStart={() => setDragging({ shape, index: i, color })}
            onDragEnd={() => setDragging(null)}
          >
            {shape.map((row, y) => (
              <div key={y} className="preview-row">
                {row.map((cell, x) => (
                  <div
                    key={x}
                    className="preview-cell"
                    style={{ background: cell ? color : "transparent" }}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
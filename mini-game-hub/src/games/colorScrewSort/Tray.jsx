export default function Tray({ tray, setTray, board, setBoard }) {
  const handleDragStart = (e, idx) => {
    e.dataTransfer.setData("trayIndex", idx);
  };

  return (
    <div className="tray">
      {tray.map((screw, idx) => (
        <div
          key={idx}
          className="screw"
          style={{ backgroundColor: screw }}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
        />
      ))}
    </div>
  );
}
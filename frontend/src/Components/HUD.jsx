export default function HUD({ running, timeLeft, hits, shots, acc, onStart }) {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        padding: 10,
        borderRadius: 10,
        background: "rgba(255,255,255,0.85)",
        fontFamily: "system-ui, Arial",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button onClick={onStart} disabled={running}>
          Start (60s)
        </button>
        <div>Time: <b>{timeLeft.toFixed(1)}</b>s</div>
        <div>Hits: <b>{hits}</b></div>
        <div>Shots: <b>{shots}</b></div>
        <div>Acc: <b>{acc}</b>%</div>
      </div>
      <div style={{ marginTop: 6, color: "#444" }}>
        Click scene to lock mouse. Click to shoot.
      </div>
    </div>
  );
}
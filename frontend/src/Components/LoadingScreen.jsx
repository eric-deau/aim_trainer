export default function LoadingScreen({ label = "Loading…", visible }) {
  return (
    <div
      className={[
        "fixed inset-0 z-50 flex items-center justify-center bg-zinc-900",
        "transition-opacity duration-500 ease-out",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-9xl text-center font-bold tracking-tight text-white">Git Gud</h1>
        <div className="h-30 w-30 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
        <p className="text-base text-zinc-400">{label}</p>
      </div>
    </div>
  );
}
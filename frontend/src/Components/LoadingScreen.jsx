export default function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-4xl font-bold text-white tracking-tight">
            Git Gud
            </h1>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-white" />
            <p className="text-sm text-zinc-400">
            Initializing…
            </p>
        </div>
    </div>
  );
}